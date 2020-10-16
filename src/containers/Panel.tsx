import React, { useState, useEffect, useMemo } from "react";
import { cloneDeep, mapValues } from "lodash";
import styled from "styled-components";
import Func from "../components/Func";
import Editor from "../components/Editor";
import { FlowChart, Page } from "../flowchartnew";

const PanelBg = styled.div`
  position: relative;
  height: 100vh;
  padding-top: 40px;
`;
const Outer = styled.div`
  padding: 30px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid cornflowerblue;
  width: 100%;
`;

const funcs = [
  {
    id: "func1",
    name: "查询人口",
    inputs: [
      {
        type: "number",
        key: "age",
        label: "年龄",
      },
      {
        type: "enum",
        key: "gender",
        label: "性别",
      },
    ],
    outputs: [
      {
        type: "object",
        key: "citizen",
        label: "公民信息",
      },
    ],
  },
  {
    id: "func2",
    name: "查询航班",
    inputs: [
      {
        type: "string",
        key: "department",
        label: "出发地",
      },
      {
        type: "string",
        key: "arrival",
        label: "到达地",
      },
      {
        type: "timestamp",
        key: "departdate",
        label: "出发日期",
      },
      {
        type: "timestamp",
        key: "arrivedate",
        label: "到达日期",
      },
    ],
    outputs: [
      {
        type: "object",
        key: "flightinfo",
        label: "个人航程信息",
      },
    ],
  },
  {
    id: "func3",
    name: "查询高铁",
    inputs: [
      {
        type: "string",
        key: "department",
        label: "出发地",
      },
      {
        type: "string",
        key: "arrival",
        label: "到达地",
      },
      {
        type: "timestamp",
        key: "departdate",
        label: "出发日期",
      },
      {
        type: "timestamp",
        key: "arrivedate",
        label: "到达日期",
      },
    ],
    outputs: [
      {
        type: "object",
        key: "traininfo",
        label: "个人高铁信息",
      },
    ],
  },
];

const chartSimple: FC.IChart = {
  offset: {
    left: 0,
    top: 0,
  },
  scale: 1,
  nodes: [
    {
      id: "node1",
      type: "output-only",
      position: {
        left: 300,
        top: 100,
      },
      size: {
        width: 300,
        height: 100,
      },
      ports: [
        {
          id: "port2",
          position: "Bottom",
        },
        {
          id: "port3",
          position: "Bottom",
        },
      ],
    },
    {
      id: "node2",
      type: "input-output",
      position: {
        left: 300,
        top: 300,
      },
      size: {
        width: 300,
        height: 100,
      },
      ports: [
        {
          id: "port1",
          position: "Top",
        },
        {
          id: "port4",
          position: "Top",
        },
      ],
    },
  ],
  links: [
    {
      id: "link1",
      from: {
        nodeId: "node1",
        portId: "port2",
      },
      to: {
        nodeId: "node2",
        portId: "port1",
      },
    },
  ],
};

const Panel = () => {
  const [chartState, setChartState] = useState(chartSimple);

  return (
    <PanelBg>
      {/* <Page> */}
      <FlowChart chart={chartState} />
      {/* </Page> */}
    </PanelBg>
  );
};

export default Panel;
