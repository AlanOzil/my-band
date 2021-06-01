import * as React from 'react'
import styles from './tabs.module.scss'

type Props = {
  className?: string
  tabList: Tab[]
  active: number,
  setActive: Function
}

type Tab = {
  id: number
  name: string
}

function Tabs (props: Props) {
  const handleChange = (id: number) => {
    props.setActive(id)
  }

  const tabItem = props.tabList.map((el: Tab) => {
    return (
      <div className={styles['tabs-item'] + ' ' + styles[(el.id === props.active ? 'active' : '')]} key={el.id} onClick={() => handleChange(el.id)}>{el.name}</div>
    )
  })
  return (
    <div className={styles['tabs-wrapper'] + ' ' + props.className} id="mainTabs">
      {tabItem}
    </div>
  )
}

export default Tabs