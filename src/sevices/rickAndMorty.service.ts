import axios from "axios";
import { Info, Persone } from "interfaces";

interface CharacterResponseInterface {
  info: Info;
  results: Persone[];
}

class MortiService {
  private api = "https://rickandmortyapi.com/api/";

  getCharacters = async () => {
    const resource = `${this.api}character`;
    return axios.get<CharacterResponseInterface>(resource);
  };
}

export const mortiService = new MortiService();
