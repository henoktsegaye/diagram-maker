import { useState, useEffect } from "react";
import { Handle, Position } from "reactflow";
import { Values } from "./GenericBox";
const handleSourceStyle = {
  backgroundColor: "red",
  width: 10,
  marginRight: 10,
  height: 10,
};
const handleTargetStyle = {
  marginLeft: 10,
  backgroundColor: "blue",
  width: 10,
  height: 10,
};

type Props = {
  data: Values;
};

function TextUpdaterNode({ data }: Props) {
  const {
    color,
    tags,
    value,
    id,
    active,
    shape,
    width = 40,
    height = 40,
  } = data;
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <div className="box-cont">
      <div
        className={`  flex flex-col justify-center items-center ${
          shape === "circle" && "rounded-full "
        } ${shape === "square" && "rounded-md"} ${
          shape === "rectangle" && "rounded p-2"
        } ${shape === "triangle" && "rounded-md"} ${
          shape === "diamond" && "rounded-md"
        } 

        border-4 ${
          active && " border-4 border-dotted border-black"
        } rounded-md  overflow-hidden ${color}}`}
        style={{
          backgroundColor: color,
          borderColor: !active ? color : "black",
          width,
          height,
        }}
      >
        <div
          className={`text-md text-center bg-transparent w-full ${
            isColorDark(color) ? "text-white" : "text-black"
          }`}
        >
          {text}
        </div>

        {tags && Array.isArray(tags) && tags.length >= 1 && (
          <div className="flex  flex-wrap p-2">
            {tags?.map((tag) => (
              <span
                key={tag}
                className={`bg-gray-200 dark:bg-gray-700 rounded-md px-2 py-1 mr-1 mt-1 text-xs font-medium inline-block h-auto text-gray-800 dark:text-gray-200`}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
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

const isColorDark = (color: string) => {
  const rgb = color.replace(/^#/, "").match(/.{2}/g);
  if (rgb) {
    const [r, g, b] = rgb.map((x) => parseInt(x, 16));
    return r * 0.299 + g * 0.587 + b * 0.114 < 186;
  }
  return false;
};

export { TextUpdaterNode };
