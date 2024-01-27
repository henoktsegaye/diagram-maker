export const isColorDark = (color: string) => {
    const rgb = color.replace(/^#/, "").match(/.{2}/g);
    if (rgb) {
      const [r, g, b] = rgb.map((x) => parseInt(x, 16));
      return r * 0.299 + g * 0.587 + b * 0.114 < 186;
    }
    return false;
  };
