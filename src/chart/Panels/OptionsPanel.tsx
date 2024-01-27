import { SettingsOutlined } from "@mui/icons-material";
import { Button } from "@mui/material";
import { Panel } from "reactflow";
import { toPng } from "html-to-image";
import { useState } from "react";

type Props = {
  containerRef: React.RefObject<HTMLDivElement>;
};

function downloadImage(dataUrl: string) {
  const a = document.createElement("a");

  a.setAttribute("download", "reactflow.png");
  a.setAttribute("href", dataUrl);
  a.click();
}

export const OptionsPanel = ({ containerRef }: Props) => {
    const [isFullScreen, setIsFullScreen] = useState(false);

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

  return (
    <Panel className="panel" position="top-right">
      <div className="p-3 grid gap-2 grid-cols-1 ">
        <Button variant="outlined" size="small" onClick={onClick}>
          Download
        </Button>
        <Button
          variant="outlined"
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
        <Button
          startIcon={<SettingsOutlined />}
          variant="outlined"
          size="small"
          onClick={onClick}
        >
          Settings
        </Button>
      </div>
    </Panel>
  );
};
