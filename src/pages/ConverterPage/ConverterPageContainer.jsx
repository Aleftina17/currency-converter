import ConverterPage from "./ConverterPage";
import { useDispatch, useSelector } from "react-redux";
import { setCurrencyFrom, setCurrencyTo } from "../../redux/currencyReducer";
import {
  loadExchangeRates,
  loadCurrencyFullNames,
} from "./../../redux/currencyReducer";
import { useEffect } from "react";

const ConverterPageContainer = () => {
  const dispatch = useDispatch();

  const exchangeRates = useSelector((state) => state.mainPage.exchangeRates);

  const currencyFullNames = useSelector(
    (state) => state.mainPage.currencyFullNames
  );
  const availableCurrencies = useSelector(
    (state) => state.mainPage.availableCurrencies
  );
  const currencyFrom = useSelector((state) => state.mainPage.currencyFrom);
  const currencyTo = useSelector((state) => state.mainPage.currencyTo);

  const handleCurrencyFromChange = (value) => {
    dispatch(setCurrencyFrom(value));
  };

  const handleCurrencyToChange = (value) => {
    dispatch(setCurrencyTo(value));
  };

  useEffect(() => {
    dispatch(loadExchangeRates());
    dispatch(loadCurrencyFullNames());
  }, [dispatch]);

  return (
    <ConverterPage
      onCurrencyFromChange={handleCurrencyFromChange}
      onCurrencyToChange={handleCurrencyToChange}
      currencyFullNames={currencyFullNames}
      availableCurrencies={availableCurrencies}
      currencyFrom={currencyFrom}
      currencyTo={currencyTo}
      exchangeRates={exchangeRates}
    />
  );
};

export default ConverterPageContainer;
