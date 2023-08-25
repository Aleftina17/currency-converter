import React from "react";
import "./app.scss";
import { BrowserRouter, Routes, Route, NavLink } from "react-router-dom";
import ConverterPage from "./pages/ConverterPage/ConverterPage";
import MainPageContainer from "./pages/MainPage/MainPageContainer";

const App = () => {
  return (
    <BrowserRouter>
      <div className="app">
        <nav>
          <ul>
            <li>
              <NavLink to="/rates"><h1>Live Rates</h1></NavLink>
            </li>
            <li>
              <NavLink to="/converter"><h1>Currency Converter</h1></NavLink>
            </li>
          </ul>
        </nav>
        <Routes>
          <Route path="/rates" element={<MainPageContainer />} />
          <Route path="/converter" element={<ConverterPage />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;
