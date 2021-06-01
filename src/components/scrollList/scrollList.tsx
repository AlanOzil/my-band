import React, {useEffect, useState, useRef} from 'react'
import styles from './scrollList.module.scss'

type Props = {
  children: JSX.Element
}

function ScrollList (props: Props) {
  const [height, setHeight] = useState(444)
  const listEl = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let node = listEl.current
    node && setHeight(window.innerHeight - node.offsetTop)
  }, [listEl])

  return (  
    <div ref={listEl} className={styles['scroll-list']} style={{minHeight: height}}>
      {props.children}
    </div>
  )
}
 
export default ScrollList;