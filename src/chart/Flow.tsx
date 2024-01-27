import { useCallback, useMemo, useState, useRef, useEffect } from "react";
import ReactFlow, {
  Connection,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
} from "reactflow";
import { TextUpdaterNode } from "./Nodes/Box";
import {
  defaultEdgeColor,
  defaultNodeBackgroundColor,
  getDefaultEdgeProps,
  getDefaultNodeProps,
  getInitialNodes,
  initialEdges,
} from "./constant";
import { useOnKeyDown } from "../hooks/useKeyboardShortcuts";
import { useBlockNote } from "@blocknote/react";
import { v4 as uuid } from "uuid";
import { CustomEdge } from "./Edges/default";
import { EdgeType, NodeShapeType, NodeType, NodeTypes } from "../types";
import { EditDetailPanel } from "./Panels/EditDetail";
import { OptionsPanel } from "./Panels/OptionsPanel";
import { CreateShapesPanel } from "./Panels/CreateShapes";
import { NeitherNullNorUndefined } from "../util/ts";

type Props = {
  width: number;
  height: number;
};

const definedNodeTypes = { box: TextUpdaterNode };
const definedEdgeTypes = { default: CustomEdge };

function Flow({ width, height }: Props) {
  const [val, setVal] = useState("");

  const [selectedComponent, setSelectedComponent] = useState<{
    type: "Node" | "Edge";
    id: string;
  } | null>(null);

  const [nodes, setNodes, onNodesChange] = useNodesState<NodeType>(
    getInitialNodes({ width, height })
  );
  const [edges, setEdges, onEdgesChanges] =
    useEdgesState<EdgeType>(initialEdges);

  const containerRef = useRef<HTMLDivElement>(null);

  const onConnect = useCallback(
    (connection: Connection) => {
      const id = uuid();
      const newEdge = addEdge(
        {
          ...connection,
          id,
          ...getDefaultEdgeProps(defaultEdgeColor),
        },
        edges
      );
      setEdges(newEdge);
    },
    [edges, setEdges]
  );

  const nodesWithActive = useMemo(
    () =>
      nodes.map((node) => {
        if (
          selectedComponent?.type !== "Node" ||
          selectedComponent.id !== node.id
        ) {
          return {
            ...node,
            data: {
              ...node.data,
              active: false,
            },
          };
        }

        return {
          ...node,
          data: {
            ...node.data,
            active: true,
          },
        };
      }),
    [nodes, selectedComponent]
  );
  const edgeWithActive = useMemo(
    () =>
      edges.map((edge) => {
        if (
          selectedComponent?.type !== "Edge" ||
          selectedComponent.id !== edge.id
        ) {
          return {
            ...edge,
            data: {
              ...edge.data,
              active: false,
            },
          };
        }
        return {
          ...edge,
          data: {
            ...edge.data,
            active: true,
          },
        };
      }),
    [edges, selectedComponent]
  );

  const selectedNode = useMemo(
    () =>
      nodesWithActive.find(
        (node) =>
          node.id === selectedComponent?.id && selectedComponent.type === "Node"
      ),
    [nodesWithActive, selectedComponent]
  );

  const selectedEdge = useMemo(
    () =>
      edgeWithActive.find(
        (edge) =>
          edge.id === selectedComponent?.id && selectedComponent.type === "Edge"
      ),
    [edgeWithActive, selectedComponent]
  );

  // Control z-index of Nodes with cmd/ctl + ] or [

  useOnKeyDown({
    key: "[",
    options: {
      metaKey: true,
    },
    callback(e) {
      if (!selectedNode) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      const newNodes = nodes.map((node) => {
        const newzIndex = (node.zIndex ?? 0) === 0 ? 0 : (node.zIndex ?? 0) - 1;
        if (node.id === selectedNode.id) {
          return {
            ...node,
            zIndex: newzIndex,
            data: {
              ...node.data,
            },
          };
        }
        return node;
      });
      setNodes(newNodes);
      e.stopPropagation();
      e.preventDefault();
    },
  });

  useOnKeyDown({
    key: "Backspace",
    options: {
      metaKey: false,
    },
    callback(e) {
      if (!selectedNode) return;
      const newNodes = nodes
        .map((node) => {
          if (node.id === selectedNode.id) {
            return undefined;
          }
          return node;
        })
        .filter(NeitherNullNorUndefined);
      setNodes(newNodes);
      e.preventDefault();
      e.stopPropagation();
    },
  });

  useOnKeyDown({
    key: "]",
    options: {
      metaKey: true,
    },
    callback(e) {
      if (!selectedNode) {
        e.preventDefault();
        e.stopPropagation();
        return;
      }
      const newNodes = nodes.map((node) => {
        if (node.id === selectedNode.id) {
          const newzIndex =
            (node.zIndex ?? 0) === nodes.length + 1
              ? nodes.length + 1
              : (node.zIndex ?? 0) + 1;
          return {
            ...node,
            zIndex: newzIndex,
            data: {
              ...node.data,
            },
          };
        }
        return node;
      });
      setNodes(newNodes);
      e.stopPropagation();
      e.preventDefault();
    },
  });

  useOnKeyDown({
    key: "d",
    options: {
      metaKey: true,
    },
    callback(e) {
      if (!selectedNode) {
        return;
      }
      const newId = uuid();
      setNodes((nodes) => [
        ...nodes,
        {
          ...selectedNode,
          selected: false,
          position: {
            x: selectedNode.position.x + 50,
            y: selectedNode.position.y + 50,
          },
          data: {
            ...selectedNode.data,
            zIndex: nodes.length + 1,
            id: newId,
          },
          id: newId,
        },
      ]);
      setSelectedComponent({
        type: "Node",
        id: newId,
      });
      e.preventDefault();
      e.stopPropagation();
    },
  });

  useEffect(() => {
    if (!selectedNode && !selectedEdge) return;
    if (selectedNode) {
      const newNodes = nodes.map((node) => {
        if (node.id === selectedNode.id) {
          return {
            ...node,
            data: {
              ...node.data,
              textContent: val,
            },
          };
        }
        return node;
      });
      setNodes(newNodes);
      return;
    }
    if (selectedEdge) {
      const newEdges = edges.map((edge) => {
        if (edge.id === selectedEdge.id) {
          return {
            ...edge,
            data: {
              ...edge.data,
              textContent: val,
            },
          };
        }
        return edge;
      });
      setEdges(newEdges);
    }
  }, [val]);

  const editor = useBlockNote({
    onEditorContentChange: async (editor) => {
      const mdContent = await editor.blocksToMarkdown(editor.topLevelBlocks);

      setVal(mdContent);
    },
  });

  const onAdd = useCallback(
    (shape: NodeShapeType, type: NodeTypes = "box") => {
      const id = uuid();

      const newNode = getDefaultNodeProps({
        id,
        x: width / 2,
        y: height / 2,
        textContent: "New Node",
        backgroundColor:
          shape === "None" ? "transparent" : defaultNodeBackgroundColor,
        shape: shape,
        type,
        borderRadius: shape === "circle" ? 100 : 0,
        zIndex: nodes.length + 1,
      });
      setNodes((ns) => ns.concat(newNode));
    },
    [height, nodes.length, setNodes, width]
  );

  return (
    <div className=" w-screen h-screen" ref={containerRef}>
      <ReactFlow
        onNodeClick={async (e, node) => {
          setSelectedComponent({
            type: "Node",
            id: node.id,
          });

          const block = await editor.HTMLToBlocks(node.data.textContent);
          editor.replaceBlocks(editor.topLevelBlocks, block);
          e.preventDefault();
          e.stopPropagation();
        }}
        nodeTypes={definedNodeTypes}
        edgeTypes={definedEdgeTypes}
        nodes={nodesWithActive}
        edges={edgeWithActive}
        onNodesChange={(changes) => {
          for (const change of changes) {
            // Doesn't respond to select changes ( as it changes z-index) and we handle it ourself.
            if (change.type === "select") {
              return;
            }
          }
          onNodesChange(changes);
        }}
        onEdgeClick={async (_, edge) => {
          setSelectedComponent({
            type: "Edge",
            id: edge.id,
          });
          const block = await editor.HTMLToBlocks(edge.data.textContent ?? "");
          editor.replaceBlocks(editor.topLevelBlocks, block);
        }}
        onConnect={onConnect}
        onEdgesChange={onEdgesChanges}
      >
        <CreateShapesPanel onAdd={onAdd} />
        {(selectedEdge || selectedNode) && (
          <EditDetailPanel
            deselectComponent={() => {
              setSelectedComponent(null);
            }}
            selectedEdge={selectedEdge}
            editor={editor}
            onEdgeChange={(edge) => {
              const newEdges = edges.map((e) => (e.id === edge.id ? edge : e));
              setEdges(newEdges);
            }}
            edgesColorsPlate={[]}
            selectedNode={selectedNode}
            onNodeChange={(node) => {
              const newNodes = nodes.map((n) => (n.id === node.id ? node : n));
              setNodes(newNodes);
            }}
            colorsPlate={[]}
          />
        )}

        <OptionsPanel containerRef={containerRef} />

        <MiniMap
          nodeColor={(nodes) => {
            const foundNode = nodesWithActive.find(
              (node) => node.id === nodes.id
            );
            if (foundNode) {
              return foundNode.data.backgroundColor;
            }
            return defaultNodeBackgroundColor;
          }}
        />
        <Controls />
        <Background className="bg-gray-100 dark:bg-gray-800" />
      </ReactFlow>
    </div>
  );
}

export { Flow };
