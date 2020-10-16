export const getDirectional = (params: {
  startPos: FC.IPosition;
  endPos: FC.IPosition;
}) => {
  const { startPos, endPos } = params;
  const width = Math.abs(startPos.left - endPos.left);
  const height = Math.abs(startPos.top - endPos.top);
  const leftToRight = startPos.left < endPos.left;
  const topToBottom = startPos.top < endPos.top;
  const isHorizontal = width > height;

  return { width, height, leftToRight, topToBottom, isHorizontal };
};

export const generateRightAnglePath = (params: {
  startPos: FC.IPosition;
  endPos: FC.IPosition;
}) => {
  const { startPos, endPos } = params;
  const { leftToRight, topToBottom, isHorizontal } = getDirectional(params);
  let start: FC.IPosition;
  let end: FC.IPosition;
  if (isHorizontal) {
    start = leftToRight ? startPos : endPos;
    end = leftToRight ? endPos : startPos;
  } else {
    start = topToBottom ? startPos : endPos;
    end = topToBottom ? endPos : startPos;
  }

  const vertex = isHorizontal
    ? `${start.left},${end.top}`
    : `${end.left},${start.top}`;

  return `M${start.left},${start.top} L ${vertex} ${end.left},${end.top}`;
};
export const generateCurvePath = (params: {
  startPos: FC.IPosition;
  endPos: FC.IPosition;
}): string => {
  const { startPos, endPos } = params;

  const {
    width,
    height,
    leftToRight,
    topToBottom,
    isHorizontal,
  } = getDirectional(params);

  let start: FC.IPosition;
  let end: FC.IPosition;
  if (isHorizontal) {
    start = leftToRight ? startPos : endPos;
    end = leftToRight ? endPos : startPos;
  } else {
    start = topToBottom ? startPos : endPos;
    end = topToBottom ? endPos : startPos;
  }

  const curve = isHorizontal ? width / 3 : height / 3;
  const curveX = isHorizontal ? curve : 0;
  const curveY = isHorizontal ? 0 : curve;

  return `M${start.left},${start.top} C ${start.left + curveX},${
    start.top + curveY
  } ${end.left - curveX},${end.top - curveY} ${end.left},${end.top}`;
};
