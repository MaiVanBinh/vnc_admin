import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect } from "react-router-dom";

import Loader from "../components/UI/Loader/Loader";

const publicRoutes = [
  {
    path: "/admin",
    exact: false,
    component: lazy(() => import("./../pages/Admin/AdminPage")),
  },
  {
    path: "/admin/bai-viet",
    exact: false,
    component: lazy(() => import("./../pages/Admin/Post/Post")),
  },

  {
    path: "/admin/hinh-anh",
    exact: false,
    component: lazy(() => import("./../pages/Admin/Asset/Asset")),
  },
];

function PageRouter() {
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {publicRoutes.map((route, index) => (
          <Route key={index} path={route.path} exact={route.exact}>
            <route.component />
          </Route>
        ))}
        <Redirect to="/" />
      </Switch>
    </Suspense>
  );
}

export default PageRouter;
