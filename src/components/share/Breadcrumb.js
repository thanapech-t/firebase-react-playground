import React from "react";
import { Link, withRouter } from "react-router-dom";
import { Breadcrumb } from "antd";

const getRoute = pathname => {
  const splited = pathname.split("/");
  let buffer = "";
  const output = [];
  for (let i = 1; i < splited.length; i++) {
    const refPath = `${buffer}/${splited[i]}`;
    if (splited[i]) {
      output.push({
        key: splited[i],
        path: refPath
      });
      buffer = refPath;
    }
  }
  return output;
};

const Navigator = ({ location: { pathname } }) => {
  const pathSplited = getRoute(pathname);
  return (
    <Breadcrumb>
      {pathSplited.map((p, i) => (
        <Breadcrumb.Item key={p.key}>
          {pathSplited.length - 1 === i ? (
            p.key.toUpperCase()
          ) : (
            <Link to={p.path}>{p.key.toUpperCase()}</Link>
          )}
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
};

export default withRouter(Navigator);
