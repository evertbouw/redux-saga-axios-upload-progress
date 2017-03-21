import { combineReducers } from 'redux';
import createReducer from '../../lib/createReducer';
import {
    UPLOAD_FILES,
    UPLOAD_FILES_START,
    UPLOAD_FILES_PROGRESS,
    UPLOAD_FILES_SUCCESS,
    UPLOAD_FILES_FAILED,
} from './actionTypes';

export default combineReducers({
    status: createReducer('init', {
        [UPLOAD_FILES]: () => 'pending',
        [UPLOAD_FILES_START]: () => 'in progress',
        [UPLOAD_FILES_SUCCESS]: () => 'done',
        [UPLOAD_FILES_FAILED]: () => 'error',
    }),
    error: createReducer(false, {
        [UPLOAD_FILES]: () => false,
        [UPLOAD_FILES_FAILED]: (state, action) => action.payload.error,
    }),
    progress: createReducer(0, {
        [UPLOAD_FILES]: () => 0,
        [UPLOAD_FILES_PROGRESS]: (state, action) => action.payload.progress,
    }),
    files: createReducer([], {
        [UPLOAD_FILES]: (state, action) => [...action.payload.files].map(file => file.name),
    }),
});
