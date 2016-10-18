
import { handleActions } from 'redux-actions'

const initialState = {
  status: []
}

export default handleActions({
  'init status' (state, action) {
    return {...state, status: action.payload}
  }
}, initialState)
