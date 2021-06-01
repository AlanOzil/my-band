import React, { Fragment, Suspense, useEffect, useState } from 'react'
import { RouteProps } from 'react-router-dom'
import { RouteWithSubRoutes } from 'config/router'
import AudioBar from 'components/audioBar/audioBar'
import Loading from 'components/loading/loading'

type Props = Readonly<{
  routes: RouteProps[]
  name?: string
}>

function Index(props: Props) {
  return (
    <Fragment>
      <Suspense fallback={null}>
        { props.routes.map((route, i) => (
            <React.Fragment key={route.path as string}>{
              <RouteWithSubRoutes key={i} {...route}></RouteWithSubRoutes>
            }</React.Fragment>
          ))
        }
      </Suspense>
      <AudioBar></AudioBar>
      <Loading></Loading>
    </Fragment>
  )
}

export default Index