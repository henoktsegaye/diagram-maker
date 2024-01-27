import { Edge, MarkerType, Node } from "reactflow";
import { Color, EdgeType, NodeType, NodeTypes } from "../types";
 
const defaultNodeBorder: NodeType["border"] = {
  borderColor: "#000000",
  borderWidth: 0,
  borderStyle: "solid",
};

const defaultBorderRadius = 10;
export const defaultEdgeColor = "#F0C6C6";
export const defaultNodeBackgroundColor = "#F0C6C6";

export const getDefaultEdgeProps = (color: Color, textContent?: string) => {
  return {
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: color,
    },
    data: {
      color: color,
      textContent: textContent,
    },
  };
};

export const initialEdges: Edge<EdgeType>[] = [
  {
    id: "edge-1",
    source: "node-1",
    sourceHandle: "node-1-bs",
    targetHandle: "node-2-tt",
    target: "node-2",
    ...getDefaultEdgeProps("#F0C6C6", "Ideas"),
  },
  {
    id: "edge-2",
    sourceHandle: "node-2-bs",
    targetHandle: "node-3-tt",
    source: "node-2",
    target: "node-3",
    ...getDefaultEdgeProps("#F0C6C6", "Experiments"),
  },
];

export const getDefaultNodeProps = ({
  id,
  textContent,
  x,
  y,
  shape = "rectangle",
  type = "box",
  backgroundColor = defaultNodeBackgroundColor,
  borderRadius = defaultBorderRadius,
  zIndex = 0,
}: {
  id: string;
  textContent: string;
  x: number;
  y: number;
  shape?: NodeType["shape"];
  type?: NodeTypes;
  backgroundColor?: Color;
  borderRadius?: number;
  zIndex?: number;
}) => {
  return {
    id,
    type: type,
    position: { x, y },
    zIndex,
    data: {
      id,
      backgroundColor: backgroundColor,
      borderRadius: borderRadius,
      textContent: textContent,
      shape: shape,
      border: defaultNodeBorder,
     
    },
  };
};

export const getInitialNodes = ({
  width,
  height,
}: {
  width: number;
  height: number;
}): Node<NodeType>[] => [
  {
    ...getDefaultNodeProps({
      id: "node-1",

      textContent: "Ideas",
      x: width / 2,
      y: height / 10,
      shape: "rectangle",
      type: "box",
      backgroundColor: "#F0C6C6",
      zIndex:1,
    }),
  },
  {
    ...getDefaultNodeProps({
      id: "node-2",
      textContent: "Experiments",
      x: width / 2.5,
      y: height / 3,
      shape: "rectangle",
      type: "box",
      backgroundColor: "#9ce29d",
      zIndex: 2
    }),
  },
  {
    ...getDefaultNodeProps({
      id: "node-3",
      textContent: "Evaluation",
      x: width / 2,
      y: height / 1.7,
      shape: "rectangle",
      type: "box",
      backgroundColor: "#B9D0FD",
      zIndex: 3
    }),
  },
];
