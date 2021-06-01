import React from 'react';
import styles from './main.module.scss'
import { shallowEqual, useSelector } from 'react-redux'
import { AppState } from 'store/app/reducer'
import { State } from 'store/reducer'
import Header from 'components/header/header'

function Main(props:any) {
  const { bottomHeight } = useSelector<State, AppState>(state => state.app, shallowEqual)
  
  return (
    <div className={styles["main-container"]} style={{height: `calc(100vh - ${bottomHeight}px)`}}>
      <Header left="" title="XXXX平台"></Header>
    </div>
  )
}

export default Main;