import React, { Component } from "react";
import { Link } from "react-router-dom";

interface IHeader {
  currentPage?: string;
}

export default class Header extends Component<IHeader> {
  render() {
    const { currentPage = "currentPage" } = this.props;
    return (
      <header className="container mx-auto flex  bg-gray-300 p-4">
        <div className="font-bold font-sans text-3xl">LOGO</div>
        <div className="flex items-center ml-auto mr-8">
          You On: {currentPage} Page Now
        </div>
        <div className="flex items-center">
          <ul className="flex space-x-4 font-bold">
            <li>
              <Link to="/">Main Page</Link>
            </li>
            <li>
              <Link to="/aboutus">About Us</Link>
            </li>
            <li>
              <Link to="/form">Form</Link>
            </li>
          </ul>
        </div>
      </header>
    );
  }
}
