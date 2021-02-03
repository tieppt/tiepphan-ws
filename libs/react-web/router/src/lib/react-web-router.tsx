import React, { ComponentType, Fragment, ReactNode, Suspense } from "react";
import { Route, Switch } from 'react-router-dom';

export interface IRoute {
  path: string;
  component: React.LazyExoticComponent<ComponentType<unknown>> | ComponentType<unknown>;
  exact?: boolean;
  guard?: React.LazyExoticComponent<ComponentType<unknown>> | ComponentType<unknown>;
  layout?: React.LazyExoticComponent<ComponentType<unknown>> | ComponentType<unknown>;
  routes?: IRoute[];
}

function renderRoutes(routes: IRoute[], fallback: ReactNode = <div>Loading...</div>, prefix = '') {
  return routes && Array.isArray(routes) ? (
    <Suspense fallback={fallback}>
      <Switch>
        {routes.map((route: IRoute) => {
          const Guard = route.guard || Fragment;
          const Layout = route.layout || Fragment;
          const Component = route.component;
          const path = prefix + route.path;

          return (
            <Route
              key={path}
              path={path}
              exact={route.exact}
              render={(props: unknown) => (
                <Guard>
                  <Layout>
                    {route.routes ? (
                      <Component {...props}>
                        {renderRoutes(route.routes, route.path)}
                      </Component>
                    ) : (
                      <Component {...props} />
                    )}
                  </Layout>
                </Guard>
              )}
            />
          );
        })}
      </Switch>
    </Suspense>
  ) : null;
}

export interface RoutesProps {
  routesConfig: IRoute[];
  fallback?: ReactNode;
}

export function Routes({ routesConfig, fallback }: RoutesProps) {
  return renderRoutes(routesConfig, fallback);
}

