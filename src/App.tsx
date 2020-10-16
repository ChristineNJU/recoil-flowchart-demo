import React from "react";
import { RecoilRoot } from "recoil";
import Panel from "./containers/Panel";
import Menu from "./containers/Menu";
import styled from "styled-components";

const BG = styled.div`
  // min-height: 100vh;
`;

const Header = styled.header`
  background-color: #282c34;
  position: absolute;
  width: 100vw;
  height: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: 20px;
  color: white;
  z-index: 100;
`;

function App() {
  return (
    <RecoilRoot>
      <BG>
        <Menu></Menu>
        <Panel></Panel>
      </BG>
    </RecoilRoot>
  );
}

export default App;
