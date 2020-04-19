
import { SET_CURRENT_DATASOURCE } from '../constants/action-types';

export const setCurrentDatasource = (key) => ({
    type: SET_CURRENT_DATASOURCE,
    currentDatasource: key,
  });
