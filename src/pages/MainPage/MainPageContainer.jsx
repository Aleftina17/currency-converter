import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {
  setBaseCurrency,
  setExchangeRates,
  setCurrencyFullNames,
  setAvailableCurrencies, 
} from "../../redux/currencyReducer";
import MainPage from "./MainPage";
import axios from "axios";
import { loadExchangeRates, loadCurrencyFullNames } from './../../redux/currencyReducer'

const MainPageContainer = () => {
  const apiKey = "66d863547af743f9adec5934ecd5cd64";
  const baseUrl = "https://openexchangerates.org/api/";

  const apiRatesUrl = `${baseUrl}latest.json?app_id=${apiKey}`;
  const apiNamesUrl = `${baseUrl}currencies.json?app_id=${apiKey}`;

  const baseCurrency = useSelector((state) => state.mainPage.baseCurrency);

  const dispatch = useDispatch();

  const handleCurrencyChange = (value) => {
    dispatch(setBaseCurrency(value));
  };

  const handleError = (error) => {
    console.error("Ошибка при запросе к API:", error);
  };

  const handleRefreshRates = () => {
    axios
      .get(apiRatesUrl)
      .then((response) => {
        const data = response.data;
        const exchangeRates = data.rates;
        dispatch(setExchangeRates(exchangeRates));
      })
      .catch((error) => {
        handleError(error);
      });
  };

  useEffect(() => {
    dispatch(loadExchangeRates());
    dispatch(loadCurrencyFullNames());
  }, [dispatch]);

  return (
    <MainPage
      baseCurrency={baseCurrency}
      onCurrencyChange={handleCurrencyChange}
      onRefreshRates={handleRefreshRates}
    />
  );
};

export default MainPageContainer;
