import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import { createEpicMiddleware, combineEpics } from "redux-observable";
import {uploadReducer} from './upload/reducer';
import { uploadEpic } from './upload/epic';

const rootReducer = combineReducers({
    upload: uploadReducer,
});

const rootEpic = combineEpics(
    uploadEpic
)

const devToolsKey = "__REDUX_DEVTOOLS_EXTENSION_COMPOSE__";

declare const window: Window & {
    [devToolsKey]?: typeof compose;
};

const composeEnhancers = window[devToolsKey] || compose;

export const configureStore = () => {
    const epicMiddleware = createEpicMiddleware();
    const store = createStore(
        rootReducer,
        composeEnhancers(applyMiddleware(epicMiddleware)),
    );
    epicMiddleware.run(rootEpic);

    return store;
};
