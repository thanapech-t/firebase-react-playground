import React from "react";
import styled from "styled-components";
import { Input as AntdInput } from "antd";

const CustomInput = styled(AntdInput)``;

const Input = ({ input, meta, ...props }) => (
  <CustomInput.Password {...input} {...props} />
);

export default Input;
