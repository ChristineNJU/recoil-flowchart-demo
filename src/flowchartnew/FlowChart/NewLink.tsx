import React from "react";
import { useRecoilValue } from "recoil";
import { newLinkWithPosition } from "../../states/flowchartState";
import { generateCurvePath } from "../utils/generatePath";

const NewLink: React.FC = () => {
  const pos = useRecoilValue(newLinkWithPosition);
  if (!pos.active) return null;
  const points = generateCurvePath({
    startPos: pos.startPos,
    endPos: pos.endPos,
  });

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
      <path
        d={points}
        strokeWidth="3"
        stroke="cornflowerblue"
        fill="none"
        stroke-dasharray="10 3"
      />
    </svg>
  );
};

export default NewLink;
