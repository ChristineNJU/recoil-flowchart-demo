import {
  atom,
  atomFamily,
  useRecoilState,
  useRecoilCallback,
  useSetRecoilState,
  selector,
  selectorFamily,
  useRecoilValue,
  useResetRecoilState,
} from "recoil";
import React, { useCallback } from "react";

export const nodesState = atom<string[]>({
  key: "nodes",
  default: [],
});

export const nodeStateFamily = atomFamily<FC.INode, string>({
  key: "node",
  default: {
    id: "node",
    type: "output-only",
    position: {
      left: 300,
      top: 100,
    },
    size: {
      width: 300,
      height: 200,
    },
    ports: [],
  },
});

export const portPositionFamily = atomFamily<FC.IPosition, string>({
  key: "portPosition",
  default: { left: 0, top: 0 },
});

export const linksState = atom<string[]>({
  key: "linksId",
  default: [],
});

export const linkStateFamily = atomFamily<FC.ILink, string>({
  key: "NodeWithId",
  default: {
    id: "link",
    from: {
      nodeId: "",
      portId: "",
    },
    to: {
      nodeId: "",
      portId: "",
    },
  },
});

export const portCenterPosition = selectorFamily<
  any,
  { nodeId: string; portId: string }
>({
  key: "portCenterPosition",
  get: (port) => ({ get }) => {
    const { position: nodePosition } = get(nodeStateFamily(port.nodeId));
    const portPosition = get(portPositionFamily(port.nodeId + port.portId));
    return {
      left: nodePosition.left + portPosition.left + 10,
      top: nodePosition.top + portPosition.top + 10,
    };
  },
});

// export const allPortArea = selector({
//   key:'allPortArea',
//   get:({get}) =>{
//     const nodeIds = get(nodesState);
//     const nodes = nodeIds.map((id) => get(nodeStateFamily(id)));
//     const ports = nodes.reduce((prev,curNode) =>{
//       return prev.concat(curNode.ports)
//     },[] as any[] )
//   }
// })

export const linkWithPosition = selectorFamily<any, string>({
  key: "linkWithPosition",
  get: (linkId) => ({ get }) => {
    const link = get(linkStateFamily(linkId));
    const { from, to, toPosition } = link;
    const startPos = get(portCenterPosition(from));
    const endPos = to
      ? get(portCenterPosition(to))
      : toPosition
      ? toPosition
      : startPos;

    return {
      startPos,
      endPos,
      // type: to ? "Normal" : "New",
    };
  },
});

export const newLinkState = atom<FC.INewLink>({
  key: "newLinkEndState",
  default: {
    from: {
      nodeId: "",
      portId: "",
    },
  },
});

export const newLinkWithPosition = selector({
  key: "newLinkWithPosition",
  get: ({ get }) => {
    const { from, mouseDownPos, mouseCurPos } = get(newLinkState);
    const startPos = get(portCenterPosition(from));
    if (mouseDownPos && mouseCurPos) {
      const endPos = {
        left: startPos.left + mouseCurPos?.left - mouseDownPos?.left,
        top: startPos.top + mouseCurPos?.top - mouseDownPos?.top,
      };
      return {
        from,
        active: true,
        startPos,
        endPos,
      };
    } else {
      return {
        from,
        active: false,
        startPos,
        endPos: startPos,
      };
    }
  },
});

export const canvasState = atom({
  key: "canvasState",
  default: {
    scale: 1,
    offset: {
      x: 0,
      y: 0,
    },
  },
});

export const useInitNodeAndLinks = () => {
  const setNodesId = useSetRecoilState(nodesState);
  const setLinksId = useSetRecoilState(linksState);
  return useRecoilCallback(({ set }) => {
    return (chart: FC.IChart) => {
      const nodesId = chart.nodes.map((node: FC.INode) => node.id);
      const linksId = chart.links.map((link: FC.ILink) => link.id);
      setNodesId(nodesId);
      setLinksId(linksId);
      for (const node of chart.nodes) {
        set(nodeStateFamily(node.id), node);
      }
      for (const link of chart.links) {
        set(linkStateFamily(link.id), link);
      }
    };
  }, []);
};

export const useAddNode = () => {
  const [nodesId, setNodesId] = useRecoilState(nodesState);
  return useRecoilCallback(
    ({ set }) => {
      return () => {
        const newId = `node-${nodesId.length}`;
        setNodesId([...nodesId, newId]);
        set(nodeStateFamily(newId), {
          id: newId,
          type: "output-only",
          position: {
            left: 300 * nodesId.length,
            top: 100 * nodesId.length,
          },
          size: {
            width: 300,
            height: 200,
          },
          ports: [],
        });
      };
    },
    [nodesId]
  );
};

export const useAddLink = () => {
  const [linksId, setLinksId] = useRecoilState(linksState);
  return useRecoilCallback(
    ({ set }) => {
      return ({ from, to }) => {
        const newId = `link-${linksId.length + 1}`;
        set(linksState, [...linksId, newId]);
        set(linkStateFamily(newId), {
          id: newId,
          from,
          to,
        });
      };
    },
    [linksId]
  );
};

export const useStartNewLink = (nodeId: string, portId: string) => {
  const setNewLink = useSetRecoilState(newLinkState);

  return useCallback(
    (startX: number, startY: number) => {
      setNewLink((newLink) => {
        return {
          ...newLink,
          from: {
            nodeId,
            portId,
          },
          mouseDownPos: {
            left: startX,
            top: startY,
          },
        };
      });
    },
    [nodeId, portId]
  );
};

export const useMoveNewLink = () => {
  const [newLink, setNewLink] = useRecoilState(newLinkState);
  return React.useCallback(
    (e: React.MouseEvent) => {
      if (newLink.mouseDownPos) {
        setNewLink((newLink) => {
          return {
            ...newLink,
            mouseCurPos: {
              left: e.clientX,
              top: e.clientY,
            },
          };
        });
      }
    },
    [newLink]
  );
};

export const useDownNewLink = () => {
  // const [newLink, setNewLink] = useRecoilState(newLinkState);
  const linkWithPos = useRecoilValue(newLinkWithPosition);
  const resetNewLink = useResetRecoilState(newLinkState);
  const addLink = useAddLink();

  return React.useCallback(
    (e: React.MouseEvent) => {
      const el = e.target as HTMLElement;
      const nodeId = el.getAttribute && el.getAttribute("data-node-id");
      const portId = el.getAttribute && el.getAttribute("data-port-id");
      if (nodeId && portId) {
        addLink({
          from: {
            nodeId: linkWithPos.from.nodeId,
            portId: linkWithPos.from.portId,
          },
          to: {
            nodeId,
            portId,
          },
        });
      }

      console.log(e.target, nodeId, portId);
      console.log(linkWithPos);
      resetNewLink();
    },
    [linkWithPos]
  );
};
