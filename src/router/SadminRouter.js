import React, { lazy, Suspense } from "react";
import { Switch, Route, Redirect, useRouteMatch } from "react-router-dom";

import Loader from "../components/UI/Loader/Loader";

const publicRoutes = [
  {
    path: "users",
    exact: true,
    component: lazy(() => import("./../pages/Admin/User/User")),
  },
];

function SadminRouter() {
  const { url } = useRouteMatch();
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {publicRoutes.map((route, index) => (
          <Route key={index} path={`${url}` + `${route.path}`} exact={route.exact}>
            <route.component />
          </Route>
        ))}
      </Switch>
    </Suspense>
  );
}

export default SadminRouter;
