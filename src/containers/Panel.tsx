import React, { useState } from "react";
import styled from "styled-components";
import { FlowChart } from "../flowchartnew";

const PanelBg = styled.div`
  position: relative;
  width: 100%;
  height: calc(100vh - 40px);
  padding-left: 200px;
  box-sizing: border-box;
`;

const chartSimple: FC.IChart = {
  offset: {
    left: 0,
    top: 0,
  },
  scale: 1,
  nodes: [
    {
      id: "node0",
      name: "用户输入",
      type: "Input",
      position: {
        left: 500,
        top: 20,
      },
      size: {
        width: 200,
        height: 80,
      },
      ports: [
        {
          id: "port0",
          position: "Bottom",
        },
      ],
    },
    {
      id: "node1",
      name: "查询高铁",
      type: "Func",
      position: {
        left: 330,
        top: 200,
      },
      size: {
        width: 200,
        height: 80,
      },
      ports: [
        {
          id: "port0",
          position: "Top",
        },
        {
          id: "port1",
          position: "Bottom",
        },
      ],
    },
    {
      id: "node2",
      name: "查询航班",
      type: "Func",
      position: {
        left: 650,
        top: 200,
      },
      size: {
        width: 200,
        height: 80,
      },
      ports: [
        {
          id: "port0",
          position: "Top",
        },
        {
          id: "port1",
          position: "Bottom",
        },
      ],
    },
    {
      id: "node3",
      name: "查询人口",
      type: "Func",
      position: {
        left: 500,
        top: 400,
      },
      size: {
        width: 200,
        height: 80,
      },
      ports: [
        {
          id: "port0",
          position: "Top",
        },
        {
          id: "port1",
          position: "Bottom",
        },
      ],
    },
  ],
  links: [
    {
      id: "link1",
      from: {
        nodeId: "node0",
        portId: "port0",
      },
      to: {
        nodeId: "node1",
        portId: "port0",
      },
    },
    {
      id: "link2",
      from: {
        nodeId: "node0",
        portId: "port0",
      },
      to: {
        nodeId: "node2",
        portId: "port0",
      },
    },
    {
      id: "link3",
      from: {
        nodeId: "node1",
        portId: "port1",
      },
      to: {
        nodeId: "node3",
        portId: "port0",
      },
    },
    {
      id: "link4",
      from: {
        nodeId: "node2",
        portId: "port1",
      },
      to: {
        nodeId: "node3",
        portId: "port0",
      },
    },
  ],
};

const Panel = () => {
  const [chartState] = useState(chartSimple);

  return (
    <PanelBg>
      <FlowChart chart={chartState} />
    </PanelBg>
  );
};

export default Panel;
