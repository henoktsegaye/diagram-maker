import { CloseOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Panel } from "reactflow";
import { Edge, Node } from "reactflow";
import { Color, EdgeType, NodeType } from "../../types";
import { BlockNoteEditor } from "@blocknote/core";
import { ActiveEdgeEditor } from "../../components/ActiveEdgeEditor";
import { ActiveNodeEditor } from "../../components/ActiveNodeEditor";

type Props = {
  deselectComponent: () => void;
  // TODO: Type Any :pray
  editor: BlockNoteEditor<any>;
  selectedEdge?: Edge<EdgeType>;
  onEdgeChange: (edge: Edge<EdgeType>) => void;
  // TODO: fix TYPEO
  edgesColorsPlate: Color[];
  selectedNode?: Node<NodeType>;
  onNodeChange: (node: Node<NodeType>) => void;
  colorsPlate: Color[];
};
export const EditDetailPanel = ({
  deselectComponent,
  selectedEdge,
  editor,
  onEdgeChange,
  edgesColorsPlate,
  //nodes
  selectedNode,
  onNodeChange,
  colorsPlate,
}: Props) => {
  return (
    <Panel
      className="panel p-2  rounded-lg shadow-lg bg-white dark:bg-black"
      position="top-left"
      style={{
        marginLeft: 70,
        width: 400,
      }}
    >
      <div className="absolute top-2 right-2">
        <IconButton size="small" onClick={deselectComponent}>
          <CloseOutlined />
        </IconButton>
      </div>
      <div className="flex w-full flex-col gap-2">
        {selectedEdge && selectedEdge.data && (
          <ActiveEdgeEditor
            editor={editor}
            selectedEdge={selectedEdge}
            onEdgeChange={onEdgeChange}
            // TD: MOVE THIS UP TO A MEMO VALUE
            colorsPlate={edgesColorsPlate}
          />
        )}
        {selectedNode && (
          <ActiveNodeEditor
            editor={editor}
            selectedNode={selectedNode}
            onNodeChange={onNodeChange}
            colorsPlate={colorsPlate}
          />
        )}
      </div>
    </Panel>
  );
};
