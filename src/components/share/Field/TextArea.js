import React from "react";
import styled from "styled-components";
import { Input as AntdInput } from "antd";

const { TextArea } = AntdInput;

const CustomInput = styled(TextArea)``;

const Input = ({ input, meta, ...props }) => (
  <CustomInput rows={4} {...input} {...props} />
);

export default Input;
