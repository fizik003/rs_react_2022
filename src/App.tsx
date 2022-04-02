import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { AboutUs, Main, NotFound } from "./pages";

export default class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/aboutus" element={<AboutUs />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    );
  }
}
