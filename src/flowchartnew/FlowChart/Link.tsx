import React from "react";
import { useRecoilValue } from "recoil";
import { linkWithPosition } from "../../states/flowchartState";
import { generateCurvePath } from "../utils/generatePath";

export interface LinkProps {
  linkId: string;
}

const Link: React.FC<LinkProps> = (props) => {
  const { linkId } = props;
  const pos = useRecoilValue(linkWithPosition(linkId));
  const points = generateCurvePath(pos);

  return (
    <svg
      style={{
        overflow: "visible",
        position: "absolute",
        cursor: "pointer",
        left: 0,
        right: 0,
      }}
    >
      <path d={points} strokeWidth="3" stroke="cornflowerblue" fill="none" />
    </svg>
  );
};

export default Link;
