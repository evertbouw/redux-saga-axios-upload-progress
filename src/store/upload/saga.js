import { put, take, takeEvery, call, fork } from 'redux-saga/effects';
import { eventChannel, END } from 'redux-saga';
import { UPLOAD_FILES } from './actionTypes';
import {
  uploadFilesStart,
  uploadFilesProgress,
  uploadFilesSuccess,
  uploadFilesFailed,
} from './actionCreators';
import upload from '../../api';

function createUploader(files) {
  let emit;
  const chan = eventChannel((emitter) => {
    emit = emitter;
    return () => {};
  });
  const uploadProgressCb = ({ total, loaded }) => {
    const percentage = Math.round((loaded * 100) / total);
    emit(percentage);
    if (percentage === 100) emit(END);
  };
  const uploadPromise = upload(files, uploadProgressCb);
  return [uploadPromise, chan];
}

function* uploadProgressWatcher(chan) {
  while (true) { // eslint-disable-line no-constant-condition
    const progress = yield take(chan);
    yield put(uploadFilesProgress(progress));
  }
}

function* uploadFiles({ payload: { files }}) {
  yield put(uploadFilesStart());
  try {
    const [uploadPromise, chan] = yield call(createUploader, files);
    yield fork(uploadProgressWatcher, chan);
    const res = yield call(() => uploadPromise);
    yield put(uploadFilesSuccess(res));
  } catch (e) {
    yield put(uploadFilesFailed(e));
  }
}

export default function* uploadSaga() {
  yield takeEvery(UPLOAD_FILES, uploadFiles);
}
