import { createAction } from 'redux-actions'
import config from '../config'

export const initStatus = createAction('init status', () => {
  return fetch(config.entry).then(res => res.json())
})
