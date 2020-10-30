import React from "react";
import styled from "styled-components";
import { useAddNode } from "../states/flowchartState";
import { FUNCS } from "../constants";

const LeftMenuWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 200px;
  height: 100%;
  padding: 40px 20px 0 10px;
  background: white;
  /* box-shadow: 2px 2px 2px 2px rgba(200, 200, 200, 0.3); */
  border-right: 1px #dddddd solid;
  box-sizing: border-box;
  z-index: 99;
`;

const GroupName = styled.div`
  margin: 10px 0 10px 10px;
  font-weight: bold;
`;

const Function = styled.div`
  margin: 0 0 10px 0;
  padding: 5px 10px;
  width: 100%;
  background: #dddddd;
  border-radius: 5px;
  cursor: pointer;
  &:active {
    background: #aaaaaa;
  }
`;

export interface LeftMenuProps {}

const LeftMenu: React.FC<LeftMenuProps> = () => {
  const addNode = useAddNode();

  const handleFuncClick = (data: any) => () => {
    addNode({ data: data, type: "Func" });
  };
  return (
    <LeftMenuWrapper>
      <GroupName>函数</GroupName>
      {FUNCS.map((func, index) => {
        return (
          <Function key={`func${index}`} onClick={handleFuncClick(func)}>
            {func.name}
          </Function>
        );
      })}

      <GroupName>字段选择器</GroupName>

      <GroupName>数据联结器</GroupName>
    </LeftMenuWrapper>
  );
};

export default LeftMenu;
