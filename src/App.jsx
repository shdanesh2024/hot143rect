import "./App.css";
import Header from "./componnets/header";
import LeftPanel from "./componnets/leftPanel";
import RightPanel from "./componnets/rightPanel";

function App() {
 
  return (
    <div className="flex flex-col min-h-screen bg-red-950">
      <Header />
      <main className="flex flex-grow w-full bg-slate-500">
        <LeftPanel/>
        <RightPanel />
      </main>
    </div>
  );
}

export default App;
