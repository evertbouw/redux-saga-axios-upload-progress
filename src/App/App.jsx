import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

export default class App extends PureComponent {

    static propTypes = {
        status: PropTypes.string.isRequired,
        error: PropTypes.oneOfType([
            PropTypes.bool,
            PropTypes.object,
        ]).isRequired,
        progress: PropTypes.number.isRequired,
        files: PropTypes.arrayOf(PropTypes.string).isRequired,
        uploadFiles: PropTypes.func.isRequired,
    };

    render() {
        const {
            status,
            error,
            progress,
            files,
            uploadFiles,
        } = this.props;

        return (
            <div>
                <div>
                    <input
                        value=""
                        type="file"
                        multiple
                        onChange={uploadFiles}
                    />
                </div>
                <div>Status: {status}</div>
                <div>Progress: {progress}%</div>
                <div>Files: {files.length ? files.join(', ') : 'None'}</div>
                {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
            </div>
        );
    }

}
