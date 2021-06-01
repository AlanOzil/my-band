// import axios from 'axios'
import { AppActionConstants } from './types'

export const setHeaderTitle = (title: string) =>
  ({
    type: AppActionConstants.SET_HEADER_TITLE,
    payload: title,
  } as const)

export const setIsLoading = (isLoading: boolean) =>
  ({
    type: AppActionConstants.SET_IS_LOADING,
    payload: isLoading,
  } as const)

export const setBottomHeight = (height: number) =>
  ({
    type: AppActionConstants.SET_BOTTOM_HEIGHT,
    payload: height,
  } as const)
