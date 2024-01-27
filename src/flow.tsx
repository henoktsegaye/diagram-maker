// pages/index.tsx
import { useEffect, useState } from "react";
import { Flow } from "./chart/Flow";

const useWindowSize = () => {
  const [size, setSize] = useState([0, 0]);
  useEffect(() => {
    const updateSize = () => {
      setSize([window.innerWidth, window.innerHeight]);
    };
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
};

const FlowChart = () => {
  const [width, height] = useWindowSize();

  return (
    <div className="h-screen">
      <div className="   mx-auto  h-5/6 ">
        {width !== 0 && height !== 0 && <Flow width={width} height={height} />}
      </div>
    </div>
  );
};

export default FlowChart;
