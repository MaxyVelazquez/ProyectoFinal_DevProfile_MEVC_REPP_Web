import { BrowserRouter, Routes, Route } from "react-router-dom";
import CVProvider from './context/CVContext';
import Navbar from "./components/Nabvar";
import Home from "./pages/home";
import About from "./pages/about";
import Dashboard from "./pages/dashboard";
import Editor from "./pages/editor";
import Preview from "./pages/preview";

function App(){
  return (
    <CVProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/preview" element={<Preview />} />
        </Routes>
      </BrowserRouter>
    </CVProvider>
  );
}

export default App;