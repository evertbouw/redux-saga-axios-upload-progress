import { Reducer } from "redux";

export default <S>(
  initialState: S,
  handlers: {
    [key: string]: Reducer<S>;
  }
): Reducer<S> => (state = initialState, action) =>
  handlers.hasOwnProperty(action.type)
    ? handlers[action.type](state, action)
    : state;
