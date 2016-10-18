
import { routerReducer as routing } from 'react-router-redux'
import { combineReducers } from 'redux'
import dashboard from './dashboard'

export default combineReducers({
  routing,
  dashboard
})
