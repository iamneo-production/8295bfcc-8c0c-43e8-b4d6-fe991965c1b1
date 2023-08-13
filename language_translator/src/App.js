import Translate from "./components/Translate";

import { BrowserRouter, Route, Routes } from "react-router-dom";




import SpecificLanguage from "./components/SpecificLanguage";

import Languages from "./components/Languages";

import "./App.css";

import "semantic-ui-css/semantic.min.css";




function App() {

  return (

    <BrowserRouter>

      <Routes>

        <Route path="/languages" element={<Languages />} />

        <Route path="/" element={<Translate />} />

        <Route path="/languages/:langCode" element={<SpecificLanguage />} />

      </Routes>

    </BrowserRouter>

  );

}
export default App;
