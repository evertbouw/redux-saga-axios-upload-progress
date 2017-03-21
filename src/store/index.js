import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import upload from './upload/reducer';
import saga from './upload/saga';

export default () => {
    const sagaMiddleware = createSagaMiddleware();
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const store = createStore(
        combineReducers({
            upload,
        }),
        composeEnhancers(applyMiddleware(sagaMiddleware)),
    );
    sagaMiddleware.run(saga);

    return store;
};
