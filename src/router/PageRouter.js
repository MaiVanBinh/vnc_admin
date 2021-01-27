import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";

import Loader from "../components/UI/Loader/Loader";

const routes = [
  // {
  //   path: "/admin",
  //   exact: false,
  //   component: lazy(() => import("./../pages/Admin/AdminPage")),
  // },
  {
    path: "danh-muc",
    exact: true,
    component: lazy(() => import("./../pages/Admin/Category/Category")),
  },
  {
    path: "bai-viet",
    exact: true,
    component: lazy(() => import("./../pages/Admin/Post/Post")),
  },
  {
    path: "quan-li-anh",
    exact: true,
    component: lazy(() => import("./../pages/Admin/Image/ImageManagement")),
  },
];

function PageRouter() {
  const { url } = useRouteMatch();
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {routes.map((route, index) => (
          <Route key={index} path={`${url}` + `${route.path}`} exact={route.exact}>
            <route.component />
          </Route>
        ))}
      </Switch>
    </Suspense>
  );
}

export default PageRouter;
