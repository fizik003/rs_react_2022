import React, { Component, ReactNode } from "react";
import Header from "../Header/Header";

interface LayoutInterface {
  children?: ReactNode;
  currentPage?: string;
}

export default class Layout extends Component<LayoutInterface> {
  render() {
    const { children, currentPage } = this.props;
    return (
      <>
        <Header currentPage={currentPage} />
        <main>{children}</main>
      </>
    );
  }
}
