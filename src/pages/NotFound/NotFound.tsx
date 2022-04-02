import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class NotFound extends Component {
  render() {
    return (
      <div className="min-h-screen flex justify-center items-center flex-col">
        <p className="text-2xl">Oops, something went wrong :(</p>
        <p>
          Go to
          <Link className="text-blue-500 font-bold underline" to="/">
            main
          </Link>
          page
        </p>
      </div>
    );
  }
}
