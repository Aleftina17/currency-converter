import axios from "axios";

const apiKey = "66d863547af743f9adec5934ecd5cd64";
const baseUrl = "https://openexchangerates.org/api/";

export const fetchExchangeRates = () => {
  const apiRatesUrl = `${baseUrl}latest.json?app_id=${apiKey}`;
  return axios.get(apiRatesUrl);
};

export const fetchCurrencyFullNames = () => {
  const apiNamesUrl = `${baseUrl}currencies.json?app_id=${apiKey}`;
  return axios.get(apiNamesUrl);
};

export const handleError = (error) => {
    console.error("Ошибка при запросе к API:", error);
  };