import React from "react";
import "./app.scss";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import MainPageContainer from "./pages/MainPage/MainPageContainer";
import ConverterPageContainer from "./pages/ConverterPage/ConverterPageContainer";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <nav>
          <ul>
            <li>
              <NavLink to="/currency-converter"><h1>Live Rates</h1></NavLink>
            </li>
            <li>
              <NavLink to="/converter"><h1>Currency Converter</h1></NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/currency-converter" element={<MainPageContainer />} />
          <Route path="/converter" element={<ConverterPageContainer />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
