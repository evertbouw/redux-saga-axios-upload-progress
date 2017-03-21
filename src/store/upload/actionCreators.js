import {
    UPLOAD_FILES,
    UPLOAD_FILES_START,
    UPLOAD_FILES_PROGRESS,
    UPLOAD_FILES_SUCCESS,
    UPLOAD_FILES_FAILED,
} from './actionTypes';

export const uploadFiles = files => ({
    type: UPLOAD_FILES,
    payload: {
        files,
    },
});

export const uploadFilesStart = () => ({
    type: UPLOAD_FILES_START,
});

export const uploadFilesSuccess = result => ({
    type: UPLOAD_FILES_SUCCESS,
    payload: {
        result,
    },
});

export const uploadFilesFailed = error => ({
    type: UPLOAD_FILES_FAILED,
    payload: {
        error,
    },
    error: true,
});

export const uploadFilesProgress = progress => ({
    type: UPLOAD_FILES_PROGRESS,
    payload: {
        progress,
    },
});
