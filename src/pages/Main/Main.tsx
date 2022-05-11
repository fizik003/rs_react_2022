import React, { Component } from "react";
import { mortiService } from "sevices";
import { Persone } from "interfaces";
import { Spinner } from "components";
import Layout from "../../components/Layout/Layout";
import { SearchInput, CardsList, PersoneDetailDialog } from "./components";

interface IMainState {
  searchValue: string;
  persones: Persone[];
  loading: boolean;
  isDetailDialogOpen: boolean;
  selectedCaracters: number;
}

export default class Main extends Component<unknown, IMainState> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      searchValue: "",
      persones: [],
      loading: true,
      isDetailDialogOpen: false,
      selectedCaracters: 0,
    };
  }

  async componentDidMount() {
    const persones = (await mortiService.getCharacters()).data.results;

    setTimeout(() => {
      this.setState({
        persones,
        loading: false,
      });
    }, 1000);
  }

  changeValueHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchValue: e.currentTarget.value });
  };

  clickCardHandler = (id: number) => {
    this.setState({
      selectedCaracters: id,
      isDetailDialogOpen: true,
    });
  };

  closeDetailDialog = () => {
    this.setState({
      isDetailDialogOpen: false,
    });
  };

  searchHandler = async (searchValue: string) => {
    this.setState({ loading: true });
    const characters = await (
      await mortiService.getCharactersByValue(searchValue)
    ).data.results;
    setTimeout(() => {
      this.setState({ loading: false, persones: characters });
    }, 1000);
  };

  render() {
    const {
      persones,
      searchValue,
      loading,
      isDetailDialogOpen,
      selectedCaracters,
    } = this.state;
    return (
      <>
        <Layout currentPage="Main">
          <div className="container mx-auto p-4 bg-gray-50 min-h-screen">
            <div className="flex  justify-center mb-4 ">
              <SearchInput
                searchValue={searchValue}
                changeValueHandler={this.changeValueHandler}
                className="w-1/2 border-2 p-2 bg-white rounded-full"
                onSearch={() => this.searchHandler(searchValue)}
              />
            </div>
            <div>
              {loading && (
                <Spinner className="flex justify-center items-center h-96" />
              )}
              {!loading && (
                <CardsList
                  items={persones}
                  onCardClick={this.clickCardHandler}
                />
              )}
            </div>
          </div>
        </Layout>
        {isDetailDialogOpen && (
          <PersoneDetailDialog
            persone={persones[selectedCaracters]}
            onClose={this.closeDetailDialog}
          />
        )}
      </>
    );
  }
}
