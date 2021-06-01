import { Song, Album } from 'types/types'
import { MusicActionConstants } from './types'
const MusicListData = require('mock/songList.json').result
const AlbumListData = require('mock/albumList.json').result

export const setSongList = (songList: Array<Song>) => 
  ({
    type: MusicActionConstants.SET_SONG_LIST,
    payload: songList
  } as const)

export const setAlbumList = (albumList: Array<Album>) => 
  ({
    type: MusicActionConstants.SET_ALBUM_LIST,
    payload: albumList
  } as const)

export const fetchMusicInfo = () => {
  return (dispatch: any) => {
    const songData = MusicListData
    const albumData = AlbumListData
    dispatch(setSongList(songData))
    dispatch(setAlbumList(albumData))
  }
}

export const setPlayInfo = (songId: string, audio: string, albumId: string = '') => {
  let list = MusicListData.filter((el: Song) => el.albumId === albumId)
  return ({
    type: MusicActionConstants.SET_PLAY_INFO,
    songId,
    audio,
    status: 1,
    playList: list.length ? list : MusicListData,
    albumId
  } as const)
}

export const setPlayStatus = (status: number) => 
({
  type: MusicActionConstants.SET_PLAY_STATUS,
  payload: status
} as const)

export const setPlayList = (albumId: string) => {
  let list = MusicListData.filter((el: Song) => el.albumId === albumId)
  return ({
    type: MusicActionConstants.SET_PLAY_LIST,
    payload: list
  } as const)
}

export const setAudioProgress = (seconds: number) => 
({
  type: MusicActionConstants.SET_AUDIO_PROGRESS,
  payload: seconds
} as const)
