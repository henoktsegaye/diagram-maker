import { useCallback, useMemo, useState, useRef } from "react";
import ReactFlow, {
  Connection,
  Node,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  Panel,
  MarkerType,
} from "reactflow";
import Button from "@mui/material/Button";
import { TextUpdaterNode } from "./Box";
import { toPng } from "html-to-image";
import Input from "@mui/material/Input";
import { initialEdges } from "./constant";

type Props = {
  width: number;
  height: number;
};
export type Values = {
  id: string;
  color: string;
  tags?: string[];
  value: string;
  shape: "circle" | "square" | "rectangle" | "diamond" | "triangle";
  active?: boolean;
  width?: number;
  height?: number;
};

const definedNodeTypes = { textUpdater: TextUpdaterNode };

function downloadImage(dataUrl: string) {
  const a = document.createElement("a");

  a.setAttribute("download", "reactflow.png");
  a.setAttribute("href", dataUrl);
  a.click();
}

function Flow({ width, height }: Props) {
  const initialNodes = [
    {
      id: "node-1",
      type: "textUpdater",
      position: { x: width / 2, y: height / 10 },
      data: {
        id: "node-1",
        color: "#F0C6C6",
        tags: ["creative", "innovative"],
        value: "IDEAS",
        shape: "rectangle",
        width: 200,
        height: 120,
      },
    },
    {
      id: "node-2",
      type: "textUpdater",
      position: { x: width / 2.5, y: height / 3 },
      data: {
        id: "node-2",
        color: "#9ce29d",
        tags: ["realistic", "practical", "concrete"],
        value: "Experiments",
        shape: "rectangle",
        width: 200,
        height: 120,
      },
    },
    {
      id: "node-3",
      type: "textUpdater",
      position: { x: width / 2, y: height / 1.7 },
      data: {
        id: "node-3",
        color: "#B9D0FD",
        tags: ["analytical", "logical", "scientific"],
        value: "Evaluation",
        shape: "rectangle",
        width: 200,
        height: 120,
      },
    },
  ] as Node<Values>[];
  const [selectedNodeId, setSelectedNodeId] = useState("");
  const [selectedEdgeId, setSelectedEdgeId] = useState("");
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [nodes, setNodes, onNodesChange] = useNodesState<Values>(initialNodes);
  const [edges, setEdges, onEdgesChanges] = useEdgesState(initialEdges);

  /**
   * ref to container
   */
  const containerRef = useRef<HTMLDivElement>(null);
  const onConnect = useCallback(
    (connection: Connection) => {
      const newEdge = addEdge(
        {
          ...connection,
          markerEnd: {
            type: MarkerType.ArrowClosed,
          },
          markerStart: undefined,
          labelStyle: {
            fontSize: 12,
            fontWeight: 700,
          },
        },
        edges
      );
      setEdges((es) => es.concat(newEdge));
    },
    [edges, setEdges]
  );

  const onClick = () => {
    if (!containerRef.current) return;
    toPng(containerRef.current, {
      filter: (node) => {
        // we don't want to add the minimap and the controls to the image
        if (
          node?.classList?.contains("react-flow__minimap") ||
          node?.classList?.contains("react-flow__controls") ||
          node?.classList?.contains("panel") ||
          node?.classList?.contains("react-flow__panel")
        ) {
          return false;
        }

        return true;
      },
    }).then(downloadImage);
  };

  const nodesWithActive = useMemo(
    () =>
      nodes.map((node) => {
        if (node.id === selectedNodeId) {
          return {
            ...node,
            style: {
              ...node.style,
              fontSize: 12,
            },
            data: {
              ...node.data,
              active: true,
            },
          };
        }
        return {
          ...node,
          data: {
            ...node.data,
            active: false,
          },
        };
      }),
    [nodes, selectedNodeId]
  );

  const edgeWithActive = useMemo(
    () =>
      edges.map((edge) => {
        if (selectedEdgeId === edge.id) {
          return {
            ...edge,
            style: {
              ...edge.style,
              strokeDasharray: "5,5",
              strokeWidth: 6,
            },
          };
        }
        return {
          ...edge,
          style: {
            ...edge.style,
            strokeDasharray: "0",
            strokeWidth: 2,
          },
        };
      }),
    [edges, selectedEdgeId]
  );

  const selectedNode = useMemo(
    () => nodesWithActive.find((node) => node.id === selectedNodeId),
    [nodesWithActive, selectedNodeId]
  );

  const selectedEdge = useMemo(
    () => edgeWithActive.find((edge) => edge.id === selectedEdgeId),
    [edgeWithActive, selectedEdgeId]
  );

  const onAdd = useCallback(() => {
    const newNode = {
      id: `node-${nodes.length + 1}`,
      type: "textUpdater",
      position: { x: width / 2, y: height / 2 },
      data: {
        id: `node-${nodes.length + 1}`,
        value: "New Node",
        color: "#000000",
        shape: "rectangle" as const,
        width: 200,
        height: 120,
      },
    };
    setNodes((ns) => ns.concat(newNode));
  }, [height, nodes.length, setNodes, width]);

  return (
    <div className=" w-screen h-screen" ref={containerRef}>
      <ReactFlow
        onNodeClick={(event, node) => {
          setSelectedEdgeId("");
          setSelectedNodeId(node.id);
        }}
        nodeTypes={definedNodeTypes}
        nodes={nodesWithActive}
        edges={edgeWithActive}
        onNodesChange={onNodesChange}
        onEdgeClick={(event, edge) => {
          setSelectedNodeId("");
          setSelectedEdgeId(edge.id);
        }}
        onConnect={onConnect}
        onEdgesChange={onEdgesChanges}
      >
        <Panel
          className="panel p-4 rounded-lg shadow-lg bg-white dark:bg-black"
          position="top-left"
        >
          <Button variant="contained" size="small" onClick={onAdd}>
            Add
          </Button>

          <div className="flex flex-col gap-2">
            {selectedEdgeId !== "" && selectedEdge && (
              <div className="bg-transparent p-2 w-60">
                <div className="flex justify-end mb-5">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => setSelectedEdgeId("")}
                  >
                    Close
                  </Button>
                </div>
                <div className="grid grid-cols-1 gap-3 ">
                  <p className="mb-0 mt-2"> Name: </p>
                  <Input
                    size="small"
                    type="text"
                    placeholder="name"
                    value={selectedEdge?.label || ""}
                    onChange={(e) => {
                      const newEdge = {
                        ...selectedEdge,
                        label: e.target.value,
                        data: {
                          ...selectedEdge.data,
                          label: e.target.value,
                        },
                      };
                      setEdges((es) =>
                        es.map((edge) =>
                          edge.id === selectedEdge.id ? newEdge : edge
                        )
                      );
                    }}
                  />
                  <p className="mb-0 mt-2"> Color: </p>

                  <input
                    type="color"
                    className="p-1 border rounded bg-transparent border-gray-400 dark:border-gray-700 "
                    value={selectedEdge?.style?.stroke}
                    onChange={(e) => {
                      const newEdge = {
                        ...selectedEdge,
                        markerEnd: {
                          type: MarkerType.ArrowClosed,
                          color: e.target.value,
                        },
                        style: {
                          ...selectedEdge.style,
                          stroke: e.target.value,
                        },
                      };
                      setEdges((es) =>
                        es.map((edge) =>
                          edge.id === selectedEdge.id ? newEdge : edge
                        )
                      );
                    }}
                  />
                </div>
              </div>
            )}

            {selectedNodeId !== "" && selectedNode && (
              <div className="bg-transparent p-2 w-60 ">
                {/**
                 * close button
                 */}
                <div className="flex justify-end mb-5">
                  <Button
                    variant="text"
                    size="small"
                    onClick={() => setSelectedNodeId("")}
                  >
                    Close
                  </Button>
                </div>

                <div className="grid grid-cols-1 gap-3 ">
                  <p className="mb-0 mt-2"> Name: </p>

                  <input
                    type="text"
                    className="p-2 rounded border bg-transparent border-gray-400 dark:text-gray-200 dark:border-gray-700 "
                    placeholder="name"
                    value={selectedNode.data.value}
                    onChange={(e) => {
                      const newNodes = nodes.map((node) => {
                        if (node.id === selectedNode.id) {
                          return {
                            ...node,
                            data: {
                              ...node.data,
                              value: e.target.value,
                            },
                          };
                        }
                        return node;
                      });
                      setNodes(newNodes);
                    }}
                  />
                  <p className="mb-0 mt-2"> Height: </p>

                  <input
                    type="number"
                    className="p-2 rounded border bg-transparent border-gray-400 dark:text-gray-200 dark:border-gray-700 "
                    placeholder="height"
                    value={selectedNode.data.height || "40"}
                    onChange={(e) => {
                      const newNodes = nodes.map((node) => {
                        if (node.id === selectedNode.id) {
                          return {
                            ...node,
                            data: {
                              ...node.data,
                              height: Number(e.target.value),
                            },
                          };
                        }
                        return node;
                      });
                      setNodes(newNodes);
                    }}
                  />
                  <p className="mb-0 mt-2"> Width: </p>
                  <input
                    type="number"
                    className="p-2 rounded border bg-transparent border-gray-400 dark:text-gray-200 dark:border-gray-700 "
                    placeholder="width"
                    value={selectedNode.data.width || "40"}
                    onChange={(e) => {
                      const newNodes = nodes.map((node) => {
                        if (node.id === selectedNode.id) {
                          return {
                            ...node,
                            data: {
                              ...node.data,
                              width: Number(e.target.value),
                            },
                          };
                        }
                        return node;
                      });
                      setNodes(newNodes);
                    }}
                  />
                  <p className="mb-0 mt-2"> Tags: </p>

                  <input
                    type="text"
                    className="p-2 border rounded bg-transparent border-gray-400 dark:text-gray-200 dark:border-gray-700 "
                    placeholder="tags"
                    onChange={(e) => {
                      const newNodes = nodes.map((node) => {
                        if (node.id === selectedNode.id) {
                          return {
                            ...node,
                            data: {
                              ...node.data,
                              tags:
                                e.target.value !== ""
                                  ? e.target.value.trim().split(",")
                                  : [],
                            },
                          };
                        }
                        return node;
                      });
                      setNodes(newNodes);
                    }}
                    value={selectedNode.data?.tags?.join(",") || ""}
                  />
                  <p className="mb-0 mt-2"> Shape: </p>

                  <select
                    className="p-2 border rounded bg-transparent border-gray-400 dark:text-gray-200 dark:border-gray-700 "
                    value={selectedNode.data.shape}
                    onChange={(e) => {
                      const newNodes = nodes.map((node) => {
                        if (node.id === selectedNode.id) {
                          return {
                            ...node,
                            data: {
                              ...node.data,
                              shape: e.target.value as Values["shape"],
                            },
                          };
                        }
                        return node;
                      });
                      setNodes(newNodes);
                    }}
                  >
                    <option value="rectangle">rectangle</option>
                    <option value="circle">circle</option>
                    <option value="diamond">diamond</option>
                  </select>
                  <p className="mb-0 mt-2"> Color: </p>

                  <input
                    type="color"
                    className="p-1 border rounded bg-transparent border-gray-400 dark:border-gray-700 "
                    value={selectedNode.data.color}
                    onChange={(e) => {
                      const newNodes = nodes.map((node) => {
                        if (node.id === selectedNode.id) {
                          return {
                            ...node,
                            data: {
                              ...node.data,
                              color: e.target.value,
                            },
                          };
                        }
                        return node;
                      });
                      setNodes(newNodes);
                    }}
                  />
                </div>
              </div>
            )}
          </div>
        </Panel>
        <Panel className="panel" position="top-right">
          <div className="p-3 grid gap-2 grid-cols-1 ">
            <Button variant="text" size="small" onClick={onClick}>
              {" "}
              Download{" "}
            </Button>
            <Button
              variant="text"
              size="small"
              onClick={() => {
                if (!containerRef.current) return;
                if (isFullScreen) {
                  document.exitFullscreen();
                } else {
                  containerRef.current.requestFullscreen();
                }
                setIsFullScreen(!isFullScreen);
              }}
            >
              {isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
            </Button>
          </div>
        </Panel>
        <MiniMap
          nodeColor={(nodes) => {
            const foundNode = nodesWithActive.find(
              (node) => node.id === nodes.id
            );
            if (foundNode) {
              return foundNode.data.color;
            }
            return "#eee";
          }}
        />
        <Controls />
        <Background className="bg-gray-100 dark:bg-gray-800" />
      </ReactFlow>
    </div>
  );
}

export { Flow };
