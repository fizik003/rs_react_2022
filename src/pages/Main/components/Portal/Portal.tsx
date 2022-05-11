import React, { Component } from "react";
import ReactDOM from "react-dom";

interface PortalProps {
  children: React.ReactNode;
}

export default class Portal extends Component<PortalProps, unknown> {
  el: HTMLDivElement;

  constructor(props: PortalProps) {
    super(props);
    this.el = document.createElement("div");
  }

  componentDidMount() {
    document.body.appendChild(this.el);
  }

  componentWillUnmount() {
    document.body.removeChild(this.el);
  }

  render() {
    const { children } = this.props;
    return ReactDOM.createPortal(children, this.el);
  }
}
