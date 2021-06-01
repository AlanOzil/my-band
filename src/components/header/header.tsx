import React, { useCallback } from 'react'
import styles from './header.module.scss'
import { ReactComponent as BackIcon } from 'assets/svg/back.svg'
import { useHistory } from 'react-router-dom'
// import ReactDOM from 'react-dom'

type Props = {
  left?: React.Component | string
  leftCallback?: Function
  title?: string
  children?: JSX.Element
  right?: React.Component
}

function Header(props: Props) {
  const history = useHistory()
  const handleClickLeftBtn = useCallback(() => {
    if (props.leftCallback) {
      props.leftCallback()
    } else {
      history.goBack()
    }
  }, [])

  return (
    <div className={styles['header-wrapper']}>
      <div className={styles['btn-wrap']} onClick={() => handleClickLeftBtn()}>
        {props.left ?? <BackIcon/>}
      </div>
      <div className={styles['header-title-wrap']}>
        {props.children ?? props.title ?? ''}
      </div>
      <div className={styles['btn-wrap']} id="right-btn">
        { props.right ?? ''}
      </div>
    </div>
  )
}

export default Header