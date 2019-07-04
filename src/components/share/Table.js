import React from "react";
import styled from "styled-components";
import { Table as AntdTable } from "antd";

import Loading from "./Loading";

const CustomTable = styled(AntdTable)`
  margin: 0 auto;

  .ant-table {
    table {
      thead {
        th {
          text-align: center;
          white-space: nowrap;
        }
      }
      tbody {
        text-align: center;
        tr {
          transition: background 0.3s;
        }
        tr.ant-table-row-selected {
          td {
            background: none;
          }
        }
      }
    }
  }
`;

const Table = ({ isLoading, ...props }) => (
  <Loading isLoading={isLoading}>
    <CustomTable {...props} />
  </Loading>
);

export default Table;
