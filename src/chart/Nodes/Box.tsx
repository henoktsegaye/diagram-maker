import { useState } from "react";
import {
  Handle,
  Node,
  NodeResizeControl,
  NodeResizer,
  Position,
} from "reactflow";
import { NodeType } from "../../types";
import { isColorDark } from "../../util/color";
import cslx from "clsx";

const handleSourceStyle = {
  backgroundColor: "gray",
  border: "3px solid lightgreen",
  width: 4,
  marginRight: 10,
  height: 4,
};
const handleTargetStyle = {
  marginLeft: 10,
  backgroundColor: "gray",
  border: "3px solid lightred",
  width: 4,
  height: 4,
};

type Props = { data: NodeType };

function TextUpdaterNode({ data, zIndex }: Props) {
  const {
    backgroundColor: color,
    textContent: value,
    id,
    active,
    shape,
    borderRadius,
    border,
  } = data;
   const [hover, setHover] = useState(false);

  const className = cslx(
    " flex flex-1 overflow-y-auto w-full h-full w-full flex-col justify-center items-center",
    {
      "rounded-full": shape === "circle",
      "rounded p-2": shape === "rectangle",
      "outline-dotted outline-blue-600 ": active,
      "outline-none": !active,
    }
  );

  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className="box-cont w-full h-full relative"
    >
      <NodeResizer
        lineStyle={{
          borderWidth: 1,
          borderColor: "rgba(0,0,0,0.2)",
        }}
        handleStyle={{
          width: 10,
          height: 10,
          borderRadius: 10,
        }}
        minWidth={40}
        minHeight={40}
        isVisible={hover}
      />
      <NodeResizeControl />
      <div
        style={{
          backgroundColor: color,
          borderRadius: `${borderRadius}%`,
          border: border.borderWidth
            ? `${border.borderWidth}px ${border.borderStyle} ${border.borderColor} `
            : 0,
        }}
        className={className}
      >
        <div
          className={`text-md text-center bg-transparent w-full ${
            isColorDark(color) ? "text-white" : "text-black"
          }`}
          dangerouslySetInnerHTML={{ __html: value }}
        />
      </div>

      <Handle
        type="source"
        className="handle"
        style={handleSourceStyle}
        position={Position.Top}
        id={`${id}-ts`}
      />
      <Handle
        type="target"
        className="handle"
        style={handleTargetStyle}
        position={Position.Top}
        id={`${id}-tt`}
      />
      <Handle
        type="source"
        className="handle"
        style={handleSourceStyle}
        position={Position.Left}
        id={`${id}-leftsource`}
      />
      <Handle
        type="target"
        className="handle"
        style={{
          ...handleTargetStyle,
          marginLeft: 0,
          marginTop: 10,
        }}
        position={Position.Left}
        id={`${id}-lefttarget`}
      />

      <Handle
        type="source"
        className="handle"
        style={{
          ...handleSourceStyle,
          marginRight: 0,
        }}
        position={Position.Right}
        id={`${id}-rightsource`}
      />
      <Handle
        type="target"
        className="handle"
        style={{
          ...handleTargetStyle,
          marginLeft: 0,
          marginTop: 10,
        }}
        position={Position.Right}
        id={`${id}-righttarget`}
      />

      <Handle
        type="source"
        className="handle"
        style={handleSourceStyle}
        position={Position.Bottom}
        id={`${id}-bs`}
      />
      <Handle
        type="target"
        className="handle"
        style={handleTargetStyle}
        position={Position.Bottom}
        id={`${id}-bt`}
      />
    </div>
  );
}

export { TextUpdaterNode };
