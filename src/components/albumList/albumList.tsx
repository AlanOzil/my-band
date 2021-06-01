import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import styles from './albumList.module.scss'
import { Album, Song } from '../../types/types'
import { shallowEqual, useSelector } from 'react-redux'
import { MusicState } from 'store/music/reducer'
import { State } from 'store/reducer'
// const AlbumListData = require('../../mock/albumList.json')
// const SongListData = require('../../mock/songList.json')

function AlbumList() {
  const history = useHistory()
  const { songList, albumList } = useSelector<State, MusicState>(state => state.music, shallowEqual)
  const [list, setList] = useState<Array<Album>>([]);

  useEffect(() => {
    setList(albumList.map((el :Album) => {
      let tmpSongList: Array<Song> = songList.filter((e: Song) => e.albumId === el.id)
      el.total = tmpSongList.length
      return el
    }))
  }, [songList, albumList]);

  const openAlbum = useCallback((el: Album) => {
    history.push(`/albumDetail?albumId=${el.id}`)
  }, [history])


  const albumItem = list.map((el: Album) => {
    return (
      <div className={styles['album-item']} key={el.id} onClick={() => openAlbum(el)}>
        <div className={styles['avatar']}>
          {/* require引用图片 必须写入'../../'之类的格式，否则会报错，fuck！ */}
          <img src={el.img} alt={el.name}></img>
        </div>
        <div className={styles['name']}>
          {el.name}
          <div className={styles['date']}>{el.date} {el.total}首</div>
        </div>
      </div>
    )
  })
  return (  
    <div className={styles['album-list']}>
      {albumItem}
    </div>
  );
}

export default AlbumList;