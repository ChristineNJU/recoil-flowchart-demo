import React from "react";
import { PlusCircleFilled } from "@ant-design/icons";
import styled from "styled-components";
import { useAddNode } from "../states/flowchartState";

const MenuWrapper = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 40px;
  background: white;
  box-shadow: 2px 2px 2px 2px rgba(200, 200, 200, 0.3);
  z-index: 999;
`;
const Menu: React.FC = () => {
  const addNode = useAddNode();

  return (
    <MenuWrapper>
      <h3>菜单</h3>
      <PlusCircleFilled
        onClick={() => {
          addNode();
        }}
      />
    </MenuWrapper>
  );
};

export default Menu;
