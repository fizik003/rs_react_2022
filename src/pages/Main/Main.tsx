/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component, Props } from "react";
import { cardsMock } from "mocks";
import Layout from "../../components/Layout/Layout";
import { SearchInput, CardsList } from "./components";

interface IMainState {
  searchValue: string;
}

export default class Main extends Component<unknown, IMainState> {
  constructor(props: unknown) {
    super(props);
    this.state = { searchValue: "" };
  }

  componentDidMount() {
    if (localStorage.getItem("searchValue")) {
      this.setState({
        searchValue: localStorage.getItem("searchValue") as string,
      });
    }
  }

  componentWillUnmount() {
    const { searchValue } = this.state;
    localStorage.setItem("searchValue", searchValue);
  }

  changeValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: e.currentTarget.value });
  };

  render() {
    const { searchValue } = this.state;
    return (
      <Layout currentPage="Main">
        <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
          <div className="flex  justify-center mb-4 ">
            <SearchInput
              searchValue={searchValue}
              changeValueHandler={this.changeValueHandler}
              className="w-1/2 border-2 p-2 bg-white rounded-full"
            />
          </div>
          <div>
            <CardsList cards={cardsMock} />
          </div>
        </div>
      </Layout>
    );
  }
}
