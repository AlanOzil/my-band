import React, { useState, useEffect } from 'react'
import styles from './musicList.module.scss'
import axios from '../../libs/axios.js'
import store from 'store'
import { Song } from '../../types/types'
import { shallowEqual, useSelector } from 'react-redux'
import { MusicState } from 'store/music/reducer'
import { State } from 'store/reducer'
import { setPlayInfo } from 'store/music/actions'
import { ReactComponent as Playing } from 'assets/svg/music.svg'

type Music = {
  url: string
}

type MusicInfo = {
  code: number,
  data: Music[]
}

type Props = {
  pageList?: Array<Song>,
  albumId?: string
}

function MusicList(props: Props) {  
  const { songList, songId } = useSelector<State, MusicState>(state => state.music, shallowEqual)
  const [list, setList] = useState<Array<Song>>([])
  
  useEffect(() => {
    if (props.pageList && props.pageList.length) {
      setList(props.pageList)
      return
    }
    setList(songList)
  }, [songList, props]);

  const handlePlay = async (el: Song) => {
    let res: MusicInfo = await axios.get(`/getSong?type=song&id=${el.songId}&br=128000`)
    if (res.code === 200) {
      store.dispatch(setPlayInfo(el.songId, res.data[0].url, props.albumId) as any)
    }
  }

  const musicItem = list.map((el: Song, i) => {
    return (
      <div className={styles['music-item']} key={el.songId} onClick={() => handlePlay(el)} >
        {songId === el.songId ? <div className={styles['playing']}><Playing></Playing></div> : <div className={styles['index']}>{i + 1}</div>}
        <div className={styles['name']}>
          {el.songName}
          <div className={styles['album']}>{el.albumName}</div>
        </div>
      </div>
    )
  })
  return (  
    <div className={styles['music-list']}>
      <div className={styles['sub-title']}>主唱推荐</div>
      {musicItem}
    </div>
  )
}

export default MusicList;