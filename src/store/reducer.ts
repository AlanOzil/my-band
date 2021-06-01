import { combineReducers } from 'redux'
import appReducer from './app/reducer'
import musicReducer from './music/reducer'

export const reducer = combineReducers({
  app: appReducer,
  music: musicReducer
})

export type State = ReturnType<typeof reducer>
