/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { Component, Props } from "react";
import { cardsMock } from "mocks";
import { mortiService } from "sevices";
import { Info, Persone } from "interfaces";
import { Spinner } from "components";
import Layout from "../../components/Layout/Layout";
import { SearchInput, CardsList } from "./components";

interface IMainState {
  searchValue: string;
  persones: Persone[];
  loading: boolean;
}

export default class Main extends Component<unknown, IMainState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      searchValue: "",
      persones: [],
      loading: true,
    };
  }

  async componentDidMount() {
    if (localStorage.getItem("searchValue")) {
      this.setState({
        searchValue: localStorage.getItem("searchValue") as string,
      });
    }

    const persones = (await mortiService.getCharacters()).data.results;
    console.log(persones[0]);

    setTimeout(() => {
      this.setState({
        persones,
        loading: false,
      });
    }, 1000);
  }

  componentWillUnmount() {
    const { searchValue } = this.state;
    localStorage.setItem("searchValue", searchValue);
  }

  changeValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: e.currentTarget.value });
  };

  render() {
    const { persones, searchValue, loading } = this.state;
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
            {loading && (
              <Spinner className="flex justify-center items-center h-96" />
            )}
            {!loading && <CardsList items={persones} />}
          </div>
        </div>
      </Layout>
    );
  }
}
