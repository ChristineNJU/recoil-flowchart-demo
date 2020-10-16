import React, { useState } from "react";
import styled from "styled-components";
import { Select, Radio } from "antd";
const { Option } = Select;

const EditorBg = styled.div`
  position: absolute;
  width: 300px;
  padding: 50px;
  border: 1px solid #aaa;
  box-shadow: 1px 1px 1px 1px rgb(100 100 100);
  right: 0;
  top: 0;
  bottom: 0;
  background: white;
`;
const options = [
  { label: "不做限制", value: -1 },
  { label: "固定限制", value: 0 },
  { label: "用户输入", value: 1 },
];
const Editor = (props: any) => {
  const { info } = props;
  // const [infoEditing, serInfoEditing] = useState(() => {});

  const handleChange = () => {};

  if (info === null) {
    return null;
  } else {
    return (
      <EditorBg>
        <h3>编辑方法 - {info.name}</h3>
        {info.inputs.map((input: any, index: number) => {
          return (
            <div key={index}>
              {input.label}
              <Radio.Group
                options={options}
                onChange={handleChange}
                value={0}
                optionType="button"
                buttonStyle="solid"
              />
            </div>
          );
        })}
      </EditorBg>
    );
  }
};

export default Editor;
