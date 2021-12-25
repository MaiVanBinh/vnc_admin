import React, { lazy, Suspense } from "react";
import {
  Switch,
  Route,
  Redirect,
  useRouteMatch,
  useLocation,
} from "react-router-dom";
import SadminLayout from "./../components/Layout/LayoutSadmin";

import Loader from "../components/UI/Loader/Loader";
import { useSelector } from "react-redux";

const publicRoutes = [
  {
    path: "dau-chan",
    exact: true,
    component: lazy(() => import("./../pages/Admin/Footprint/Footprint")),
  },
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
  {
    path: "tai-khoan",
    exact: true,
    component: lazy(() => import("./../pages/Admin/Profile/Profile")),
  },
  {
    path: "phan-loai-dong-vat",
    exact: true,
    component: lazy(() =>
      import("./../pages/Admin/CreaturesCategories/CreaturesCategories")
    ),
  },
  {
    path: "quan-li-sinh-vat",
    exact: true,
    component: lazy(() => import("./../pages/Admin/Creatures/Creatures")),
  },
  {
    path: "mau-go",
    exact: true,
    component: lazy(() => import("./../pages/Admin/TimberSample/TimberSample")),
  },
  {
    path: "feedbacks",
    exact: true,
    component: lazy(() => import("./../pages/Admin/Feedbacks/Feedbacks")),
  },
  {
    path: "questions",
    exact: true,
    component: lazy(() => import("./../pages/Admin/Question/Question")),
  },
  {
    path: "events",
    exact: true,
    component: lazy(() => import("./../pages/Admin/Event/Event")),
  },
  {
    path: "contributions",
    exact: true,
    component: lazy(() =>
      import("./../pages/Admin/Contributions/Contributions")
    ),
  },
  {
    path: "dashboard",
    exact: true,
    component: lazy(() => import("./../pages/Admin/Dashboard/Dashboard")),
  },
];

function PrivateRoute({ children, ...rest }) {
  let location = useLocation();
  const isLoggedIn = useSelector((state) => state.auth.token);
  if (isLoggedIn) return <Route {...rest}>{children}</Route>;
  return (
    <Redirect
      to={{
        pathname: "/dashboard",
        state: { from: location },
      }}
    />
  );
}

function PageRouter() {
  const { url } = useRouteMatch();
  return (
    <Suspense fallback={<Loader />}>
      <Switch>
        {publicRoutes.map((route, index) => (
          <Route key={index} path={`${url}${route.path}`} exact={route.exact}>
            <route.component />
          </Route>
        ))}
        <PrivateRoute path="/">
          <SadminLayout />
        </PrivateRoute>
      </Switch>
    </Suspense>
  );
}

export default PageRouter;
