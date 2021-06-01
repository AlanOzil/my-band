import { MusicActionConstants, MusicActionTypes } from './types'
import { Song, Album } from 'types/types'

export type MusicState = {
  songList: Array<Song>
  albumList: Array<Album>
  audio: HTMLAudioElement
  songId: string,
  playStatus: number,
  playList: Array<Song>
}

const initialState: MusicState = {
  songList: [],
  albumList: [],
  audio: new Audio(),
  songId: '',
  playStatus: 0, // 0 停止 1 播放 2 暂停
  playList: []
}

const reducer = (state = initialState, action: MusicActionTypes): MusicState => {
  switch (action.type) {
    case MusicActionConstants.SET_SONG_LIST: 
      return { ...state, songList: action.payload }
    case MusicActionConstants.SET_ALBUM_LIST: 
      return { ...state, albumList: action.payload }
    case MusicActionConstants.SET_PLAY_LIST: 
      return { ...state, playList: action.payload }
    case MusicActionConstants.SET_AUDIO_PROGRESS: 
      let __audio = state.audio
      __audio.currentTime = action.payload
      return { ...state, audio: __audio }
    case MusicActionConstants.SET_PLAY_STATUS: 
      let _audio = state.audio
      if (action.payload === 2) {
        _audio.pause()
      }
      if (action.payload === 1) {
        _audio.play()
      }
      return { ...state, audio: _audio, playStatus: action.payload }
    case MusicActionConstants.SET_PLAY_INFO: 
      if (state.songId === action.songId) return state
      let audio = state.audio
      audio.setAttribute('src', action.audio)
      audio.play()
      let songId = action.songId
      let playList = !state.playList.length || action.albumId ? action.playList : state.playList
      return { ...state, audio, songId, playStatus: 1, playList }
    default:
      return state
  }
}

export default reducer