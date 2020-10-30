import React, { useEffect } from "react";
import { useRecoilValue } from "recoil";
import Node from "./Node";
import Link from "./Link";
import {
  nodesState,
  linksState,
  useInitNodeAndLinks,
  useMoveNewLink,
  useDownNewLink,
} from "../../states/flowchartState";
import styled from "styled-components";
import NewLink from "./NewLink";

const CanvasWrapper = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  background: #eee;
`;

export interface IFlowChartProps {
  chart: FC.IChart;
}

export const FlowChart = (props: IFlowChartProps) => {
  const { chart } = props;
  const nodesId = useRecoilValue(nodesState);
  const linksId = useRecoilValue(linksState);
  const initChart = useInitNodeAndLinks();
  const handleNewLinkMove = useMoveNewLink();
  const handleNewLinkDown = useDownNewLink();

  useEffect(() => {
    initChart(chart);
  }, []);

  const handleMousemove = (e: React.MouseEvent) => {
    handleNewLinkMove(e);
  };

  const handleMouseup = (e: React.MouseEvent) => {
    handleNewLinkDown(e);
  };

  return (
    <CanvasWrapper onMouseMove={handleMousemove} onMouseUp={handleMouseup}>
      <NewLink />
      {linksId.map((linkId) => {
        return <Link key={`link-${linkId}`} linkId={linkId} />;
      })}
      {nodesId.map((nodeId) => {
        return <Node nodeId={nodeId} key={nodeId} />;
      })}
    </CanvasWrapper>
  );
};
