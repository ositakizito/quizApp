import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/home";
import Question from "./components/question";
import Congrat from "./components/congrat";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
       <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/question" element={<Question/>}/>
        <Route path="/congrat" element={<Congrat/>}/>
       </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
