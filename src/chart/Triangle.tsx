import { useCallback, useState, useEffect } from "react";
import { Handle, Position } from "reactflow";
import { Values } from "./GenericBox";
const handleSourceStyle = {
  left: 100,
  backgroundColor: "red",
  width: 10,
  height: 10,
};
const handleTargetStyle = {
  left: 120,
  backgroundColor: "blue",
  width: 10,
  height: 10,
};

type Props = {
  data: Values;
};

function Triage({ data }: Props) {
  const { color, tags, value, id, active } = data;
  const [text, setText] = useState(value);

  useEffect(() => {
    setText(value);
  }, [value]);

  return (
    <div className="box-cont">
      <div
        className={`p-2 border-4 ${
          active && " border-4 border-dotted border-black"
        } rounded-md w-60 overflow-hidden ${color}}`}
        style={{
          backgroundColor: color,
          borderColor: !active ? color : "black",
        }}
      >
        <div
          className={`text-lg mb-2 text-center bg-transparent w-full ${
            isColorDark(color) ? "text-white" : "text-black"
          }`}
        >
          {text}
        </div>

        <div className="flex flex-wrap">
          {tags?.map((tag) => (
            <span
              key={tag}
              className={`bg-gray-200 dark:bg-gray-700 rounded-md px-2 py-1 mr-1 mt-1 text-xs font-medium text-gray-800 dark:text-gray-200`}
            >
              {tag}
            </span>
          ))}
        </div>
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

export { Triage as TextUpdaterNode };
