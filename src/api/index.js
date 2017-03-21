import axios from 'axios';

export default (files, onUploadProgress) => {
    const data = new FormData();
    [...files].map(file => data.append('files', file));

    return axios.post('/api/uploadFiles', data, { onUploadProgress });
};
