import "./App.css";
import Header from "./componnets/header";
import LeftPanelContainer from "./componnets/LeftPanelContainer";
import RightPanel from "./componnets/rightPanel";

function App() {
 
  return (
    <div className="flex flex-col min-h-screen bg-red-950">
      <Header />
      <main className="flex flex-grow w-full bg-slate-500">
        <LeftPanelContainer/>
        <RightPanel />
      </main>
    </div>
  );
}

export default App;
