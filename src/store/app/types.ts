import * as Actions from './actions'

export enum AppActionConstants {
  SET_HEADER_TITLE = 'SET_HEADER_TITLE',
  SET_IS_LOADING = 'SET_IS_LOADING',
  SET_BOTTOM_HEIGHT = 'SET_BOTTOM_HEIGHT'
}

export type AppActionTypes =
  | ReturnType<typeof Actions.setHeaderTitle>
  | ReturnType<typeof Actions.setIsLoading>
  | ReturnType<typeof Actions.setBottomHeight>
