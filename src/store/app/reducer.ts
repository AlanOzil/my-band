import { AppActionConstants, AppActionTypes } from './types'

export type AppState = {
  headerTitle: string
  isLoading: boolean
  bottomHeight: number
}

const initalState: AppState = {
  headerTitle: '',
  isLoading: false,
  bottomHeight: 0
}

const reducer = (state = initalState, action: AppActionTypes): AppState => {
  switch (action.type) {
    case AppActionConstants.SET_HEADER_TITLE:
      return { ...state, headerTitle: action.payload }
    case AppActionConstants.SET_IS_LOADING:
      return { ...state, isLoading: action.payload }
    case AppActionConstants.SET_BOTTOM_HEIGHT: 
      return { ...state, bottomHeight: action.payload }
    default:
      return state
  }
}

export default reducer
