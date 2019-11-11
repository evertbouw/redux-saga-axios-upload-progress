import {
    UPLOAD_FILES,
    UPLOAD_FILES_START,
    UPLOAD_FILES_PROGRESS,
    UPLOAD_FILES_SUCCESS,
    UPLOAD_FILES_FAILED,
} from './actionTypes';

export const uploadFiles = (files: FileList) => ({
    type: UPLOAD_FILES,
    payload: {
        files,
    },
});

export const uploadFilesStart = () => ({
    type: UPLOAD_FILES_START,
});

export const uploadFilesSuccess = () => ({
    type: UPLOAD_FILES_SUCCESS,
});

export const uploadFilesFailed = (error: Error) => ({
    type: UPLOAD_FILES_FAILED,
    payload: {
        error,
    },
    error: true,
});

export const uploadFilesProgress = (progress: number) => ({
    type: UPLOAD_FILES_PROGRESS,
    payload: {
        progress,
    },
});
