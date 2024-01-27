import { Flow } from "./chart/Flow";
import "@blocknote/core/style.css";
import { HideDotsProvider } from "./contexts/hideDots";

function App() {
  return (
    <HideDotsProvider>
      <Flow width={window.innerWidth} height={window.innerHeight} />
    </HideDotsProvider>
  );
}

export default App;
