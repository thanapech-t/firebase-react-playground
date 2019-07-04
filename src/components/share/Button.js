import React from "react";
import styled from "styled-components";
import { Button as AntdButton } from "antd";

const CustomButton = styled(AntdButton)`
  width: fit-context;
  margin: 0 auto;
`;

const Button = props => <CustomButton {...props} />;

export default Button;
