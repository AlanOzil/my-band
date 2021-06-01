import React, { useState, useEffect, useCallback, useMemo, useRef } from 'react'
import styles from './audioBar.module.scss'
import qs from 'query-string'
import { Song, Album } from '../../types/types'
import { shallowEqual, useSelector } from 'react-redux'
import { MusicState } from 'store/music/reducer'
import { State } from 'store/reducer'
import axios from '../../libs/axios.js'
import { ReactComponent as ResumeIcon } from 'assets/svg/bofang.svg'
import { ReactComponent as PauseIcon } from 'assets/svg/zanting.svg'
import { setPlayStatus, setPlayInfo, setAudioProgress } from 'store/music/actions'
import { setBottomHeight } from 'store/app/actions'
import store from 'store'
import { useHistory, useLocation } from 'react-router-dom'
import { RouteProps } from 'react-router-dom'
// import { ReactComponent as ListIcon } from 'assets/svg/bofangliebiao.svg'
// import { ReactComponent as LikeIcon } from 'assets/svg/like.svg'

const DefaultAvatar = require('assets/img/band-bg1.jpeg').default

type Music = {
  url: string
}

type MusicInfo = {
  code: number,
  data: Array<Music>
}

type Menu = {
  id: string | number
  name: string
  key: string
  path: string
}

type Props = Readonly<{
  routes: RouteProps[]
  name?: string
}>

function AudioBar() {
  const { songList, songId, albumList, playStatus, audio, playList } = useSelector<State, MusicState>(state => state.music, shallowEqual)
  const [curSong, setCurSong] = useState<Song>();
  const [curAlbum, setCurAlbum] = useState<Album>();
  const [palyRate, setpalyRate] = useState<number>();
  const [menuList] = useState<Array<Menu>>([{
    id: 0,
    name: '首页',
    key: 'main',
    path: '/'
  }, {
    id: 1,
    name: '乐队',
    key: 'band',
    path: '/band'
  }, {
    id: 2,
    name: '我的',
    key: 'my',
    path: '/my'
  }]);
  const [totalTime, settotalTime] = useState<number>(0);
  const [curTime, setcurTime] = useState<number>(0);

  const location = useLocation()
  const pathname = useMemo(() => {
    return location.pathname
  }, [location])

  const barEl = useRef<HTMLDivElement>(null)
  useEffect(() => {
    let node = barEl.current
    node && store.dispatch(setBottomHeight(node.clientHeight))
  }, [barEl])
  
  useEffect(() => {
    audio.onpause = () => {
      store.dispatch(setPlayStatus(2))
    }
    audio.onplay = () => {
      store.dispatch(setPlayStatus(1))
    }
    audio.onended = async () => {
      let i: number = playList.findIndex((el: Song) => el.songId === songId)
      if (++i === playList.length) i = 0
      let next: Song = playList[i]
      let res: MusicInfo = await axios.get(`/getSong?type=song&id=${next.songId}&br=128000`)
      store.dispatch(setPlayInfo(next.songId, res.data[0].url) as any)
    }

    audio.onloadedmetadata = (e) => {
      settotalTime((e.currentTarget as HTMLAudioElement).duration)
    }

    audio.ontimeupdate = (e) => {
      setcurTime((e.currentTarget as HTMLAudioElement).currentTime)
    }
  }, [audio, playList, songId, curTime]);

  const history = useHistory()
  const handleRouteChange = useCallback((path) => {
    history.push(path)
  }, [])

  useEffect(() => {
    let cur = songList.find((el: Song) => el.songId === songId)
    if (!cur) cur = songList[0]
    setCurSong(cur)
    setCurAlbum(albumList.find((el: Album) => el.id === curSong?.albumId))
  }, [songId, songList, albumList, curSong]);

  useEffect(() => {
    setpalyRate(curTime / totalTime * 100)
  }, [curTime, totalTime]);

  const handlePlay = useCallback(async () => {
    if (!songId) {
      let res: MusicInfo = await axios.get(`/getSong?type=song&id=${curSong?.songId}&br=128000`)
      store.dispatch(setPlayInfo(curSong?.songId ?? '', res.data[0].url) as any)
    }
    store.dispatch(setPlayStatus(playStatus === 1 ? 2 : 1))
  }, [playStatus, curSong, songId])

  const handleClick = useCallback((e) => {
    if (playStatus === 0) return
    let pageX = e.pageX || e.clientX
    setpalyRate(pageX / window.innerWidth * 100)
    store.dispatch(setAudioProgress(pageX / window.innerWidth * totalTime))
  }, [playStatus, totalTime])

  const handleDragOver = useCallback((e) => {
    // if (playStatus === 0) return
    // let pageX = e.pageX || e.clientX
    // setpalyRate(pageX / window.innerWidth * 100)
  }, [])

  return (
    <div ref={barEl} className={styles['bottom-wrapper'] + ' fixed fixed-bottom'}>
      {pathname?.includes('band') || playStatus > 0 ? <div className={styles['audio-bar-wrapper']}>
        <div className={styles['mask-wrap']} onClick={handleClick}></div>
        <div className={styles['progress-bar']} onClick={handleClick}>
          <div className={styles['progress-panel']} style={{width: palyRate + '%'}}></div>
          <div className={styles['progress-btn']} style={{left: palyRate + '%'}} onMouseDown={handleDragOver}></div>
        </div>
        <div className={styles['song-info']}>
          <div className={styles['album-logo']}>
            <img src={curAlbum?.img || DefaultAvatar} className={curAlbum && playStatus === 1 ? styles['rotate'] : ''} alt={curAlbum?.name}></img>
          </div>
          <div className={styles['song-wrap']}>
            <span className={styles['song-name']}>
              {curSong?.songName}
            </span>
            <span className={styles['gap']}>{curSong ? '-' : ''}</span>
            <span className={styles['album-name']}>
              {curAlbum?.name}
            </span>
          </div>
        </div>
        <div className={styles['song-btn']}>
          <div className={styles['resume-btn']} onClick={() => handlePlay()}>
            {playStatus === 1 ? <PauseIcon className={styles['btn-circle']}></PauseIcon> : <ResumeIcon className={styles['btn-circle']}></ResumeIcon>}
          </div>
          {/* <div className={styles['resume-btn']}>
            <ListIcon></ListIcon>
          </div> */}
          {/* <div className={styles['resume-btn']}>
            <LikeIcon></LikeIcon>
          </div> */}
        </div>
      </div> : ''}
      <div className={styles['footer-wrapper']}>
        <div className={styles['tabs-list']}>
          { menuList.map((el: Menu) => {
            return <div className={styles['tab'] + ' ' + styles['active']} key={el.key} onClick={() => handleRouteChange(el.path)}>{el.name}</div>
          }) }
        </div>
      </div>
    </div>
  )
}

export default AudioBar
