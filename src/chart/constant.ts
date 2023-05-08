import { Edge, MarkerType } from "reactflow";

export const initialEdges = [
  {
    id: "edge-1",
    source: "node-1",
    sourceHandle: "node-1-bs",
    targetHandle: "node-2-tt",
    target: "node-2",
    style: {
      stroke: "#F0C6C6",
    },
    arrowHeadType: "arrowclosed",
    label: "IDEAS",
    labelStyle: {
      fontSize: 12,
      fontWeight: 700,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#F0C6C6",
    },
  },
  {
    sourceHandle: "node-2-bs",
    targetHandle: "node-3-tt",
    id: "edge-2",
    source: "node-2",
    target: "node-3",
    style: {
      stroke: "#9ce29d",
    },
    label: "Experiments",
    labelStyle: {
      fontSize: 12,
      fontWeight: 700,
    },
    markerEnd: {
      type: MarkerType.ArrowClosed,
      color: "#9ce29d",
    },
  },
] as Edge[];
