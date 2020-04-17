
import {SET_CURRENT_DATASOURCE} from "../constants/action-types"

export function setCurrentDatasource(key){
  return {type: SET_CURRENT_DATASOURCE,
          currentDatasource: key
  };
}
