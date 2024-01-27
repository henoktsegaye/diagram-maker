export type NodeShapeType =
  | "circle"
  | "rectangle"
  | "triangle"
  | "line"
  | "pentagon"
  | "hexagon"
  | "None"

export type Color = `#${string}` | "transparent";
export type NodeTypes = 'default' | 'box'

export type NodeType = {
  id: string;
   
  backgroundColor: `#${string}` | "transparent";
  borderRadius?: number;

  textContent: string;
  border: {
    borderColor: `#${string}` | "transparent";
    borderWidth: number;
    borderStyle: "solid" | "dashed" | "dotted";
  }
  shape: NodeShapeType;
  active?: boolean;
};

export type EdgeType = {
  color?: Color
  textContent?: string;
  active?: boolean;
}