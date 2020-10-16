import React, { useCallback } from "react";
import styled from "styled-components";
import {
  portPositionFamily,
  linkStateFamily,
  linksState,
  newLinkState,
  useStartNewLink,
} from "../../states/flowchartState";
import { useSetRecoilState, useRecoilState } from "recoil";

const PortWrapper = styled.div`
  margin: 5px;
  width: 20px;
  height: 20px;
  background: #999;
  border: 5px solid white;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0 0 1px 1px #dddddd;
`;

export interface PortProps {
  port: FC.IPort;
  nodeId: string;
}

const Port: React.FC<PortProps> = React.memo((props) => {
  const { port, nodeId } = props;
  const setPortPosition = useSetRecoilState(
    portPositionFamily(nodeId + port.id)
  );
  const handleCreateNewLink = useStartNewLink(nodeId, port.id);

  const measuredRef = useCallback((domNode) => {
    if (domNode !== null) {
      const pos = {
        left: domNode.offsetLeft + domNode.parentNode.offsetLeft,
        top: domNode.offsetTop + domNode.parentNode.offsetTop,
      };
      setPortPosition(pos);
    }
  }, []);

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    handleCreateNewLink(e.clientX, e.clientY);
  };

  return (
    <PortWrapper
      ref={measuredRef}
      onMouseDown={handleMouseDown}
      data-node-id={nodeId}
      data-port-id={port.id}
    ></PortWrapper>
  );
});

export default Port;
