import React from "react";
import Draggable from "react-draggable";
import styled from "styled-components";

const FuncWrap = styled.div`
  width: 400px;
  height: 150px;
  display: flex;
  flex-direction: column;
  background: white;
  border: 1px solid #cccccc;
  box-shadow: 0 2px 1px 2px rgba(100, 100, 100, 0.1);
  border-radius: 10px;
`;

const Ports = styled.div`
  display: flex;
  height: 30px;
  flex-direction: row;
`;

const Main = styled.div`
  flex: 1;
  padding: 0 20px;
  font-size: 20px;
  color: #333333;
`;

const Func = (props: any) => {
  const { funcData, funcKey, onClick } = props;
  const handleStart = () => {
    // console.log("start drag");
  };
  const handleDrag = () => {
    // console.log("during drag");
  };
  const handleStop = () => {
    // console.log("stop drag");
  };

  const handleClick = () => {
    onClick(funcKey);
  };

  return (
    <Draggable
      axis="both"
      handle={`.func${funcKey}`}
      defaultPosition={{ x: 100, y: 0 }}
      grid={[25, 25]}
      scale={1}
      onStart={handleStart}
      onDrag={handleDrag}
      onStop={handleStop}
    >
      <FuncWrap className={`func${funcKey}`} onClick={handleClick}>
        <Ports></Ports>
        <Main>{funcData.name}</Main>
        <Ports></Ports>
      </FuncWrap>
    </Draggable>
  );
};

export default Func;
