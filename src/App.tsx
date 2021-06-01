import React, { useEffect, useState } from 'react';
import { Provider } from 'react-redux'
import RouteConfig from 'config/router'
import store from 'store'
import './App.css';
// import { Song } from 'types/types'
// import axios from 'libs/axios.js'

type Music = {
  url: string
}

type MusicInfo = {
  code: number,
  data: Music[]
}

function App() {
  return (
    <div className="App">
      <Provider store={store}>
        <RouteConfig />
      </Provider>
    </div>
  );
}

export default App;
