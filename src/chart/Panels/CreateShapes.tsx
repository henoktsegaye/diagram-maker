import { IconButton } from "@mui/material";
import { NodeShapeType } from "../../types";
import {
  CircleOutlined,
  RectangleOutlined,
  TextFieldsOutlined,
} from "@mui/icons-material";
import { Panel } from "reactflow";

type Props = {
  onAdd: (shape: NodeShapeType) => void;
};
export const CreateShapesPanel = ({ onAdd }: Props) => {
  return (
    <Panel
      className="panel  justify-center  rounded-lg shadow-lg bg-white dark:bg-black"
      position="top-left"
      style={{
        width: 50,
      }}
    >
      <div className="flex  w-full items-center flex-col ">
        <IconButton
          onClick={() => {
            onAdd("rectangle");
          }}
        >
          <RectangleOutlined color="primary" />
        </IconButton>
        <IconButton
          onClick={() => {
            onAdd("circle");
          }}
        >
          <CircleOutlined color="primary" />
        </IconButton>
        <IconButton
          onClick={() => {
            onAdd("None");
          }}
        >
          <TextFieldsOutlined color="primary" />
        </IconButton>
      </div>
    </Panel>
  );
};
