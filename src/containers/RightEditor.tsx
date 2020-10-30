import React from "react";
import styled from "styled-components";
import { CloseOutlined } from "@ant-design/icons";
import { ShowEditState, EditDataState } from "../states/codeState";
import { useRecoilState, useRecoilValue } from "recoil";

const RightEditorContainer = styled.div`
  position: absolute;
  padding: 40px 20px 0 10px;
  right: 0;
  top: 0;
  width: 250px;
  height: 100%;
  background: white;
  border-right: 1px #dddddd solid;
  box-sizing: border-box;
  z-index: 99;
`;

const Row = styled.div`
  margin: 20px 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
`;

export const RightEditor: React.FC = () => {
  const [showEditState, setEditState] = useRecoilState(ShowEditState);
  const editData = useRecoilValue(EditDataState);

  const handleCloseRightEditor = () => {
    // setEditState(false);
  };

  return showEditState ? (
    <RightEditorContainer>
      <Row>
        <CloseOutlined
          style={{ cursor: "pointer" }}
          onClick={handleCloseRightEditor}
        />
        <h3 style={{ marginLeft: 10 }}>节点详情</h3>
      </Row>
      <div>{JSON.stringify(editData)}</div>
    </RightEditorContainer>
  ) : (
    <div>
      {showEditState}
      {JSON.stringify(editData)}
    </div>
  );
};
