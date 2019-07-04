import React from "react";
import styled from "styled-components";

import { Spin, Icon } from "antd";

export const LoadingContainer = styled.div`
  position: absolute;
  z-index: 1;

  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  opacity: 0.5;
  filter: blur(0.5px);
`;

const CustomIcon = styled(Icon)`
  font-size: 24px;
`;

const Loading = ({ className, isLoading = false, children }) => (
  <Spin
    className={className}
    spinning={isLoading}
    indicator={<CustomIcon type="loading" spin />}
  >
    {children}
  </Spin>
);

export default Loading;
