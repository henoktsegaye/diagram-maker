import {
  EdgeProps,
  getBezierPath,
  BaseEdge,
  EdgeLabelRenderer,
} from "reactflow";
import { EdgeType } from "../../types";

export function CustomEdge({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style = {},
  data,
  markerEnd,
}: EdgeProps<EdgeType>) {
  if (!data) return null;
  const { color, textContent, active } = data;
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });
  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          ...style,
          stroke: color,

          // TODO: find a better way to outline active edges :(
          borderStyle: active ? "dotted" : "solid",
        }}
      />
      {textContent && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              fontSize: 12,
              // everything inside EdgeLabelRenderer has no pointer events by default
              // if you have an interactive element, set pointer-events: all
              pointerEvents: "all",
            }}
            className="nodrag nopan"
          >
            <div
              style={{
                backgroundColor: "white",
                borderRadius: 5,
                padding: "2px 8px",
              }}
            >
              <div
                dangerouslySetInnerHTML={{
                  __html: textContent || "",
                }}
              />
            </div>
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}
