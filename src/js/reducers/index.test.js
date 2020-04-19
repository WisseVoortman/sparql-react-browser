import { SET_CURRENT_DATASOURCE } from '../constants/action-types';
import { rootReducer, initialState } from './index';
import { setCurrentDatasource } from '../actions/index';

test('test root reducer setCurrentDatasource', () => {
  let expectedState = Object.assign({}, initialState);
  expectedState.connection.currentDatasource = 1;
  let newState = rootReducer(initialState, setCurrentDatasource(1));
  expect(newState)
    .toEqual(expectedState);
  expect(newState).not.toBe(initialState);
});
