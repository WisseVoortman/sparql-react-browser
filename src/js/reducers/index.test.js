import { SET_CURRENT_DATASOURCE } from '../constants/action-types';
import { datasourceReducer, initialConnectionState } from './index';
import { setCurrentDatasource } from '../actions/index';

test('test datasourceReducer reducer setCurrentDatasource', () => {
  let newState = datasourceReducer(initialConnectionState, setCurrentDatasource(1));
  expect(newState.currentDatasource)
    .toEqual(1);
});
