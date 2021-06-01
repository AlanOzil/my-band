import React, { useMemo, useEffect, useState, Fragment, useCallback } from 'react';
import { useLocation, useHistory } from 'react-router-dom'
import styles from './albumDetail.module.scss'
import qs from 'query-string'
import { Album, Song } from 'types/types'
import { shallowEqual, useSelector } from 'react-redux'
import { MusicState } from 'store/music/reducer'
import { State } from 'store/reducer'
import Header from 'components/header/header'
import MusicList from 'components/musicList/musicList'
import ScrollList from 'components/scrollList/scrollList'
import { setPlayStatus, setPlayInfo, setAudioProgress } from 'store/music/actions'

function AlbumDetail() {
  const location = useLocation()
  const history = useHistory()
  const { songList, albumList } = useSelector<State, MusicState>(state => state.music, shallowEqual)
  const [pageList, setpageList] = useState<Array<Song>>();
  const [curAlbum, setcurAlbum] = useState<Album>();

  const params = useMemo(() => {
    return qs.parse(location.search)
  }, [location])
  
  useEffect(() => {
    let _list: Array<Song> = songList.filter((el: Song) => el.albumId === params.albumId)
    setpageList(_list)
    setcurAlbum(albumList.find((el: Album) => el.id === params.albumId))
  }, [params, songList, albumList, curAlbum]);

  const handleBack = useCallback(() => {
    history.replace('/?active=1')
  }, [])

  return (
    <Fragment>
      <Header title={curAlbum?.name ?? '专辑'} leftCallback={handleBack}></Header>
      <div className={styles['album-intro']}>
        <div className={styles['album-avatar']}>
          <img src={curAlbum?.img} alt={curAlbum?.name}></img>
        </div>
        <div className={styles['album-date']}>{curAlbum?.date}</div>
        <div className={styles['album-msg']}>这里是乐队的介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍介绍</div>
      </div>
      <ScrollList>
        <MusicList pageList={pageList} albumId={params.albumId?.toString()}></MusicList>
      </ScrollList>
    </Fragment>
  )
}

export default AlbumDetail