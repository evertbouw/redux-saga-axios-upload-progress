import { connect } from 'react-redux';
import { uploadFiles } from '../store/upload/actionCreators';
import App from './App';

const mapStateToProps = ({ upload }) => upload;

const mapDispatchToProps = dispatch => ({
    uploadFiles: ({ target: { files } }) => dispatch(uploadFiles(files)),
});

export default connect(mapStateToProps, mapDispatchToProps)(App);
