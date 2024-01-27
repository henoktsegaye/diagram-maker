import { CloseOutlined } from "@mui/icons-material";
import { Button, IconButton, Popover } from "@mui/material";
import { useState } from "react";
import { ChromePicker } from "react-color";
import * as Color from "color";

type Props = {
  color: string;
  onChange: (color: string) => void;
};
export const ColorPicker = ({ color, onChange }: Props) => {
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div>
      <Button
        variant="outlined"
        size="small"
        aria-describedby={id}
        onClick={handleClick}
        startIcon={<div style={{ background: color, width: 20, height: 20 }} />}
      >
        {color}
      </Button>
      <Popover id={id} open={open} anchorEl={anchorEl} onClose={handleClose}>
        <div className="pt-10 pb-2 px-2">
          <IconButton
            size="small"
            sx={{
              position: "absolute",
              top: 1,
              right: 1,
            }}
            onClick={handleClose}
          >
            <CloseOutlined fontSize="small" />
          </IconButton>

          <ChromePicker
            styles={{
              default: {
                picker: {
                  boxShadow: "none",
                  border: 0,
                },
              },
            }}
            color={color}
            onChange={(color) => {
              const colorInHexa = Color({
                r: color.rgb.r,
                g: color.rgb.g,
                b: color.rgb.b,
              })
                .alpha(color.rgb.a ?? 1)
                .hexa()
                .toString();
              onChange(colorInHexa);
            }}
          />
        </div>
      </Popover>
    </div>
  );
};
