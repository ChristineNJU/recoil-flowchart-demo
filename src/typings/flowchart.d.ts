declare namespace FC {
  interface IPosition {
    left: number;
    top: number;
  }
  interface ISize {
    width: number;
    height: number;
  }
  type IPortPosition = "Left" | "Top" | "Right" | "Bottom";
  interface IPort {
    id: string;
    type?: string;
    value?: string;
    offset?: IPosition;
    position: IPortPosition;
  }
  type INodeType = "Func" | "Selector" | "Input" | "Join";
  interface INode {
    id: string;
    type: INodeType;
    data?: any;
    name: string;
    position: IPosition;
    orientation?: number;
    readonly?: boolean;
    ports: IPort[];
    size: ISize;
  }
  interface ILink {
    id: string;
    from: {
      nodeId: string;
      portId: string;
    };
    to?: {
      nodeId: string;
      portId: string;
    };
    toPosition?: IPosition;
    toOffset?: any;
  }
  interface INewLink {
    from: {
      nodeId: string;
      portId: string;
    };
    mouseDownPos?: IPosition;
    mouseCurPos?: IPosition;
  }
  interface IChart {
    scale: number;
    offset: IPosition;
    nodes: INode[];
    links: ILink[];
  }
}
