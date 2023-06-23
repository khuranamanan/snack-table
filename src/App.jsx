import SnacksTable from "./component/SnackTable";
import { snacks } from "./data/data";

function App() {
  return (
    <div className="container mx-auto flex flex-col gap-2 py-4">
      <h1 className="text-3xl font-bold mb-4">Snack Table</h1>
      <SnacksTable snacks={snacks} />
    </div>
  );
}

export default App;
