import * as Actions from './actions'

export enum MusicActionConstants {
  SET_SONG_LIST = 'SET_SONG_LIST',
  SET_ALBUM_LIST = 'SET_ALBUM_LIST',
  SET_PLAY_INFO = 'SET_PLAY_INFO',
  SET_PLAY_STATUS = 'SET_PLAY_STATUS',
  SET_PLAY_LIST = 'SET_PLAY_LIST',
  SET_AUDIO_PROGRESS = 'SET_AUDIO_PROGRESS'
}

export type MusicActionTypes = 
| ReturnType<typeof Actions.setAlbumList>
| ReturnType<typeof Actions.setSongList>
| ReturnType<typeof Actions.setPlayInfo>
| ReturnType<typeof Actions.setPlayStatus>
| ReturnType<typeof Actions.setPlayList>
| ReturnType<typeof Actions.setAudioProgress>