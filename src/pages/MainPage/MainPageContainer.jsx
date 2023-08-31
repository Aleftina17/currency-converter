import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { setBaseCurrency, setExchangeRates } from "../../redux/currencyReducer";
import MainPage from "./MainPage";
import axios from "axios";
import {
  loadExchangeRates,
  loadCurrencyFullNames,
} from "./../../redux/currencyReducer";
import { getUserCoordinates, getCountryByCoordinates } from "../../geolocation";
import { getCountry } from "country-currency-map";

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

  useEffect(() => {
    getUserCoordinates()
      .then((coordinates) => {
        const { latitude, longitude } = coordinates;
        return getCountryByCoordinates(latitude, longitude);
      })
      .then((country) => {
        console.log("Country:", country); // значение страны для отладки
        return getCountry(country);
      })
      .then((countryInfo) => {
        const currency = countryInfo.currency;
        dispatch(setBaseCurrency(currency));
      })
      .catch((error) => {
        console.log("Error getting user's base currency:", error);
      });
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
