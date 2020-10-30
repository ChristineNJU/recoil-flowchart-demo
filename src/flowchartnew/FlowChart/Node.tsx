import React from "react";
import Draggable from "react-draggable";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import Port from "./Port";
import { nodeStateFamily } from "../../states/flowchartState";
import { ShowEditState, EditDataState } from "../../states/codeState";

const NodeWrapper = styled.div`
  position: absolute;
  background: white;
  border-radius: 5px;
  box-shadow: 0 3px 5px 5px rgba(200, 200, 200, 0.3);
  padding: 10px;
`;

const InnerWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;
`;

const PortsWrapper = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const LeftPortsWrapper = styled(PortsWrapper)`
  left: -15px;
  top: calc(50% - 15px);
  /* transform: translate(-50%, -50%); */
  flex-direction: column;
`;
const TopPortsWrapper = styled(PortsWrapper)`
  left: calc(50% - 15px);
  top: -15px;
  /* transform: translate(-50%, -50%); */
  flex-direction: row;
`;
const RightPortsWrapper = styled(PortsWrapper)`
  right: -15px;
  top: calc(50% - 15px);
  /* transform: translate(50%, -50%); */
  flex-direction: column;
`;
const BottomPortsWrapper = styled(PortsWrapper)`
  left: calc(50% - 15px);
  bottom: -15px;
  /* transform: translate(-50%, 50%); */
  flex-direction: row;
`;
const Content = styled.p`
  text-align: center;
  cursor: default;
`;

const POSITIONS: FC.IPortPosition[] = ["Left", "Top", "Right", "Bottom"];
const PortsWrapperMap = {
  Left: LeftPortsWrapper,
  Top: TopPortsWrapper,
  Right: RightPortsWrapper,
  Bottom: BottomPortsWrapper,
};

export interface NodeProps {
  nodeId: string;
}

const Node: React.FC<NodeProps> = (props) => {
  const { nodeId } = props;
  const nodeRef = React.useRef(null);
  const [nodeState, setNodeState] = useRecoilState(nodeStateFamily(nodeId));
  const setShowEdit = useSetRecoilState(ShowEditState);
  const setEditData = useSetRecoilState(EditDataState);

  const handleDrag = (e: any) => {
    setNodeState((nodeState) => {
      return {
        ...nodeState,
        position: {
          left: nodeState.position.left + e.movementX,
          top: nodeState.position.top + e.movementY,
        },
      };
    });
  };

  const createPortWrapper = (position: FC.IPortPosition) => {
    const Container = PortsWrapperMap[position];
    return (
      <Container>
        {nodeState.ports
          .filter((port) => port.position === position)
          .map((port) => (
            <Port key={port.id} port={port} nodeId={nodeState.id} />
          ))}
      </Container>
    );
  };

  const handleNodeClick = (_e: React.MouseEvent) => {
    // e.persist();
    // console.log("Node click", e);
    console.log(nodeState.data);
    setShowEdit(true);
    setEditData({ type: "123", data: {} });
  };

  return (
    <Draggable
      onDrag={handleDrag}
      nodeRef={nodeRef}
      position={{ x: nodeState.position.left, y: nodeState.position.top }}
    >
      <NodeWrapper style={nodeState.size}>
        <InnerWrapper ref={nodeRef} onClick={handleNodeClick}>
          <Content>{nodeState.name}</Content>
          {POSITIONS.map((position) => {
            return createPortWrapper(position);
          })}
        </InnerWrapper>
      </NodeWrapper>
    </Draggable>
  );
};

export default Node;
