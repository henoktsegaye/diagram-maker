import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/react";
import { Button } from "@mui/material";
import { Edge } from "reactflow";
import { Color, EdgeType } from "../types";
import { isColor } from "../util/ts";
import { ColorPicker } from "../basic/ColorPicker";
import { defaultEdgeColor } from "../chart/constant";

type Props = {
  // TODO: Type Any :pray
  editor: BlockNoteEditor<any>;
  selectedEdge: Edge<EdgeType>;
  onEdgeChange: (edge: Edge<EdgeType>) => void;
  colorsPlate: Color[];
};
export const ActiveEdgeEditor = ({
  editor,
  selectedEdge,
  onEdgeChange,
  colorsPlate,
}: Props) => {
  return (
    <div className="bg-transparent p-2 w-full ">
      <p className="mb-2"> Text for Selected Node.</p>

      <div className="grid grid-cols-1 gap-3 ">
        <BlockNoteView
          style={{
            borderWidth: 1,
            borderRadius: 4,
            minHeight: 200,
            width: "100%",
            height: "100%",
            background: "transparent",
          }}
          editor={editor}
          theme={"light"}
        />

        <p className="mb-0 mt-2"> Color: </p>

        <ColorPicker
          color={selectedEdge?.data?.color ?? defaultEdgeColor}
          onChange={(value) => {
            if (!value) {
              return;
            }
            if (!isColor(value)) {
              return;
            }
            const updatedEdge = {
              ...selectedEdge,
              data: {
                ...selectedEdge.data,
                color: value,
              },
            };
            onEdgeChange(updatedEdge);
          }}
        />
        <div className="flex gap-2 ">
          {colorsPlate?.map((color) => (
            <Button
              variant="outlined"
              key={color}
              onClick={() => {
                const updatedEdge = {
                  ...selectedEdge,
                  data: {
                    ...selectedEdge.data,
                    color: color,
                  },
                };
                onEdgeChange(updatedEdge);
              }}
            >
              <div
                style={{
                  width: 40,
                  height: 20,
                  backgroundColor: color,
                }}
              />
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};
