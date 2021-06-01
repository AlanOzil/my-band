import React, { useEffect } from 'react';
import ReactDOM from 'react-dom'
import styles from './loading.module.scss'
import { ReactComponent as LoadingIcon } from 'assets/svg/loading.svg'
import { shallowEqual, useSelector } from 'react-redux'
import { AppState } from 'store/app/reducer'
import { State } from 'store/reducer'

function Loading() {
  const { isLoading } = useSelector<State, AppState>(state => state.app, shallowEqual)
  const $div = document.createElement('div')

  useEffect(() => {
    let loadingRoot = document.getElementById('appLoading')
    if (!loadingRoot) {
      loadingRoot = document.createElement('div')
      loadingRoot.setAttribute('id', 'appLoading')
      document.body.appendChild(loadingRoot)
    }
    loadingRoot.appendChild($div)

    return () => {
      loadingRoot?.removeChild($div)
    }
  }, [$div])

  return isLoading ? ReactDOM.createPortal(
    <div className={styles['loading-wrapper']}>
      <LoadingIcon></LoadingIcon>
    </div>,
    $div
  ) : null
}

export default Loading;