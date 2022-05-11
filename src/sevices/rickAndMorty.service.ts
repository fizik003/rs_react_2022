import axios from "axios";
import { Info, Persone } from "interfaces";

interface CharacterResponseInterface {
  info: Info;
  results: Persone[];
}

class MortiService {
  private api = "https://rickandmortyapi.com/api/";

  getCharacters = async () => {
    const link = `${this.api}character`;
    return axios.get<CharacterResponseInterface>(link);
  };

  getCharactersByValue = async (searchValue: string) => {
    const link = `${this.api}character/?name=${searchValue}`;
    return axios.get<CharacterResponseInterface>(link);
  };
}

export const mortiService = new MortiService();
