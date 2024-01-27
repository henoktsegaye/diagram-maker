import { BlockNoteEditor } from "@blocknote/core";
import { BlockNoteView } from "@blocknote/react";
import {
  Button,
  FormControl,
  FormControlLabel,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Switch,
  Typography,
} from "@mui/material";
import { Node } from "reactflow";
import { Color, NodeType } from "../types";
import { isColor } from "../util/ts";
import { defaultNodeBackgroundColor } from "../chart/constant";
 import { ColorPicker } from "../basic/ColorPicker";

type Props = {
  editor: BlockNoteEditor<any>;
  selectedNode: Node<NodeType>;
  onNodeChange: (node: Node<NodeType>) => void;
  colorsPlate: Color[];
};
export const ActiveNodeEditor = ({
  editor,
  selectedNode,
  onNodeChange,
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

        <p className="mb-0 mt-2"> Border Radius: </p>

        <Slider
          valueLabelDisplay="on"
          value={selectedNode?.data?.borderRadius || 0}
          onChange={(e, val) => {
            if (!val) return;
            if (Array.isArray(val)) return;
            const updateNode = {
              ...selectedNode,
              data: {
                ...selectedNode.data,
                borderRadius: val,
              },
            };
            onNodeChange(updateNode);
          }}
          size="small"
          defaultValue={0}
        />
        <div className="border p-4 rounded border-gray-200">
          <Typography id="track-inverted-range-slider" gutterBottom>
            Border Width
          </Typography>
          <Slider
            valueLabelDisplay="on"
            value={selectedNode?.data?.border.borderWidth || 0}
            onChange={(e, val) => {
              if (!val) return;
              if (Array.isArray(val)) return;
              const updateNode = {
                ...selectedNode,
                data: {
                  ...selectedNode.data,
                  border: {
                    ...selectedNode.data.border,
                    borderWidth: val,
                  },
                },
              };
              onNodeChange(updateNode);
            }}
            size="small"
            defaultValue={0}
          />

          <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Border Style</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={selectedNode?.data?.border.borderStyle || "solid"}
              label="Age"
              onChange={(e) => {
                const val = e.target.value;
                if (!val) return;
                if (!["dotted", "solid", "dashed"].includes(val)) {
                  return;
                }
                const updateNode = {
                  ...selectedNode,
                  data: {
                    ...selectedNode.data,
                    border: {
                      ...selectedNode.data.border,
                      borderStyle: val as "dotted" | "solid" | "dashed",
                    },
                  },
                };
                onNodeChange(updateNode);
              }}
            >
              <MenuItem value={"solid"}>Solid</MenuItem>
              <MenuItem value={"dotted"}>Dotted</MenuItem>
              <MenuItem value={"dashed"}>Dashed</MenuItem>
            </Select>
          </FormControl>
          <Typography gutterBottom> Border Color</Typography>
          <ColorPicker
            color={
              selectedNode?.data?.border.borderColor ||
              defaultNodeBackgroundColor
            }
            onChange={(val) => {
              if (!val) {
                return;
              }
              if (!isColor(val)) {
                return;
              }
              const updatedNode = {
                ...selectedNode,
                data: {
                  ...selectedNode.data,
                  border: {
                    ...selectedNode.data.border,
                    borderColor: val,
                  },
                },
              };
              onNodeChange(updatedNode);
            }}
          />
        </div>

        <p className="mb-0 mt-2"> Color: </p>
        <FormControlLabel
          control={
            <Switch
              checked={selectedNode.data.backgroundColor === "transparent"}
              onChange={(e) => {
                const val = e.target.checked;
                const updatedNode = {
                  ...selectedNode,
                  data: {
                    ...selectedNode.data,
                    backgroundColor: val
                      ? "transparent"
                      : (defaultNodeBackgroundColor as Color),
                  },
                };
                onNodeChange(updatedNode);
              }}
            />
          }
          label="Transparent"
        />

        {selectedNode.data.backgroundColor !== "transparent" && (
          <>
            <ColorPicker
              color={selectedNode?.data.backgroundColor}
              onChange={(value) => {
                if (!value) {
                  return;
                }
                if (!isColor(value)) {
                  return;
                }
                const updatedNode = {
                  ...selectedNode,
                  data: {
                    ...selectedNode.data,
                    backgroundColor: value,
                  },
                };
                onNodeChange(updatedNode);
              }}
            />
            <div className="flex gap-2 ">
              {colorsPlate?.map((color) => (
                <Button
                  variant="outlined"
                  key={color}
                  onClick={() => {
                    const updatedNode = {
                      ...selectedNode,
                      data: {
                        ...selectedNode.data,
                        backgroundColor: color,
                      },
                    };
                    onNodeChange(updatedNode);
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
          </>
        )}
      </div>
    </div>
  );
};
