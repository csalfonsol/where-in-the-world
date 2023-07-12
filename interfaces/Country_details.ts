import { CountryData } from "./Country";

export interface CountryDetails extends CountryData {
  nativeName: string;
  subregion: string;
  topLevelDomain: string[];
  languages: { iso639_1: string; iso639_2: string; name: string; nativeName: string }[];
  currencies: { code: string; name: string; symbol: string }[];
  borders: string[];
}
