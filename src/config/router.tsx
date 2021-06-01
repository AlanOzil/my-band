import React, { Suspense, lazy } from 'react'
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom'
import { QueryParamProvider } from 'use-query-params'
import { connect } from 'react-redux'

// 路由配置
const routes = [
  {
    path: '',
    exact: false,
    component: lazy(() => import('views/index')),
    redirect: '/bandDetail',
    routes: [
      {
        path: '/',
        name: 'main',
        exact: true,
        component: lazy(() => import('views/main/main'))
      },
      {
        path: '/bandDetail',
        exact: true,
        component: lazy(() => import('views/band/bandDetail')),
      },
      {
        path: '/albumDetail',
        component: lazy(() => import('views/band/album/albumDetail')),
      }
    ]
  }
]

const mapStateToProps = (state: any, ownProps: any) => ({
  ...ownProps,
});

export function RouteWithSubRoutes(route: any) {
  return (
    <Route
      path={route.path}
      exact={route.exact}
      render={(props: any) => <route.component {...props} routes={route.routes} />}
    />
  )
}

function RouteConfig() {
  return (
    <BrowserRouter>
      <QueryParamProvider ReactRouterRoute={Route}>
        <Suspense fallback={null}>
          <Switch>
            {routes.map((route, i) => (
              <RouteWithSubRoutes key={i} {...route}></RouteWithSubRoutes>
            ))}
            <Redirect to="/bandDetail" />
          </Switch>
        </Suspense>
      </QueryParamProvider>
    </BrowserRouter>
  )
}

export default connect(mapStateToProps, null)(RouteConfig);
