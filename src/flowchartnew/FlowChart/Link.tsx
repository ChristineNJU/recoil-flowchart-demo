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
      {/* <marker
        id="markerArrow"
        markerWidth="13"
        markerHeight="13"
        refX="10"
        refY="6"
        orient="auto"
      >
        <path d="M2,2 L2,11 L10,6 L2,2" fill="cornflowerblue" />
      </marker> */}

      <path
        d={points}
        strokeWidth="3"
        stroke="cornflowerblue"
        fill="none"
        marker-end="url(#markerArrow)"
      />
    </svg>
  );
};

export default Link;
