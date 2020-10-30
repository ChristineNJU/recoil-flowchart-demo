import React from "react";
import { RecoilRoot } from "recoil";
import Panel from "./containers/Panel";
import Menu from "./containers/Menu";
import LeftMenu from "./containers/LeftMenu";
import { RightEditor } from "./containers/RightEditor";
import styled from "styled-components";
import "./App.css";

const MainWrapper = styled.div`
  position: relative;
  height: 100vh;
  padding-top: 40px;
  box-sizing: border-box;
`;

function App() {
  return (
    <RecoilRoot>
      {/* <BG> */}
      <Menu></Menu>
      <MainWrapper>
        <LeftMenu></LeftMenu>
        <Panel></Panel>
        <RightEditor></RightEditor>
      </MainWrapper>
      {/* </BG> */}
    </RecoilRoot>
  );
}

export default App;
