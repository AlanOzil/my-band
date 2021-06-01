import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import Avatar from 'components/avatar/avatar'
import qs from 'query-string'
import store from 'store'
import Tabs from 'components/tabs/tabs'
import ScrollList from 'components/scrollList/scrollList'
import MusicList from 'components/musicList/musicList'
import AlbumList from 'components/albumList/albumList'
import { fetchMusicInfo } from 'store/music/actions'

function BandDetail() {
  const history = useHistory()
  const location = useLocation()

  const params = useMemo(() => {
    return qs.parse(location.search)
  }, [location])

  useEffect(() => {
    if (params.active && params.active.toString() !== active.toString()) {
      setActive(+params.active.toString())
    }
  }, [params])
  
  type Tab = {
    id: number
    name: string
  }

  const tabList: Array<Tab> = [{
    id: 0,
    name: '歌曲'
  }, {
    id: 1,
    name: '专辑'
  }, {
    id: 2,
    name: '介绍'
  }]

  const listEl = useRef<HTMLHeadingElement>(null)

  const [active, setActive] = useState(0)

  const [tabFixed, setTabFixed] = useState(false);

  useEffect(() => {
    store.dispatch(fetchMusicInfo() as any)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleScroll = () => {
    let offSetTop = (listEl.current as HTMLHeadingElement).getBoundingClientRect().top
    if (offSetTop < 0) {
      setTabFixed(true)
    } else {
      setTabFixed(false)
    }
  }

  const handleActive = useCallback((id) => {
    history.push(`/?active=${id}`)
    setActive(id)
  }, [])

  return (  
    <div>
      <Avatar></Avatar>
      {tabFixed ? <Tabs tabList={tabList} className="fixed fixed-top zIndex1" active={active} setActive={handleActive}></Tabs> : ''}
      <div className="main-wrapper" ref={listEl}>
        <Tabs tabList={tabList}  active={active} setActive={handleActive}></Tabs>
        <ScrollList>
          {active === 0 ? <MusicList></MusicList> 
            : active === 1 ? <AlbumList></AlbumList> : <span></span>}
        </ScrollList>
      </div>
    </div>
  )
}
 
export default BandDetail;