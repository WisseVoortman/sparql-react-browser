import { SET_FORCEGRAPH_SETTINGS } from '../actionTypes'

export default function forcegraphSettingsReducer(state = {
  linkDistance: {
    min: 0,
    max: 400,
    value: 400,
  },
  forceCharge: {
    min: 0,
    max: 3000,
    value: 3000,

  }
},
  action) {
  let NewState = Object.assign({}, state);
  switch (action.type) {
    case SET_FORCEGRAPH_SETTINGS: {

      return action.settings
    }

    default:
      return state
  }
}