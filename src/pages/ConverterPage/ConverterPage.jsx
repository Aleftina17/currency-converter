import CurrencySelect from "../../components/CurrencySelect/CurrencySelect";
import "./converter-page.scss";
import { Input, Button } from "antd";
import { RetweetOutlined } from "@ant-design/icons";
import { useState, useEffect } from "react";
import { currencySymbolMap } from "currency-symbol-map";

const ConverterPage = ({
  onCurrencyFromChange,
  onCurrencyToChange,
  currencyFullNames,
  availableCurrencies,
  currencyFrom,
  currencyTo,
  exchangeRates,
}) => {
  const [inputValueFrom, setInputValueFrom] = useState("");
  const [inputValueTo, setInputValueTo] = useState("");
  const [currencyFromSymbol, setCurrencyFromSymbol] = useState("");
  const [currencyToSymbol, setCurrencyToSymbol] = useState("");

  const convertValue = (value, fromCurrency, toCurrency) => {
    if (value !== "") {
      const convertedValue =
        (parseFloat(value) / exchangeRates[fromCurrency]) *
        exchangeRates[toCurrency];
      return convertedValue.toFixed(2).toString();
    }
    return "";
  };

  //вызывается при изменении инпута From, устанавливает новое значение для inputValueFrom и вызывает convertValue для inputValueTo
  const handleInputChangeFrom = (e) => {
    const value = e.target.value;
    setInputValueFrom(value);
    setInputValueTo(convertValue(value, currencyFrom, currencyTo));
  };

  //вызывается при изменении инпута To, устанавливает новое значение для inputValueTo, вызывает convertValue для inputValueFrom
  const handleInputChangeTo = (e) => {
    const value = e.target.value;
    setInputValueTo(value);
    setInputValueFrom(convertValue(value, currencyTo, currencyFrom));
  };

  //вызывается при изменении валюты в селекте currencyFrom, вызывает convertValue для inputValueTo
  const handleCurrencyFromChange = (value) => {
    onCurrencyFromChange(value);
    setInputValueTo(convertValue(inputValueFrom, value, currencyTo));
  };

  //вызывается при изменении валюты в селекте currencyTo, вызывает convertValue для inputValueFrom
  const handleCurrencyToChange = (value) => {
    onCurrencyToChange(value);
    setInputValueFrom(convertValue(inputValueTo, currencyFrom, value));
  };

  const handleSwapClick = () => {
    // Меняем currencyFrom и currencyTo местами
    const tempCurrency = currencyFrom;
    onCurrencyFromChange(currencyTo);
    onCurrencyToChange(tempCurrency);

    // Обновляем символы валют
    setCurrencyFromSymbol(currencySymbolMap[currencyTo]);
    setCurrencyToSymbol(currencySymbolMap[currencyFrom]);

    // Перерасчитываем inputValueTo
    setInputValueTo(convertValue(inputValueFrom, currencyTo, currencyFrom));
  };

  useEffect(() => {
    if (currencyFrom) {
      setCurrencyFromSymbol(currencySymbolMap[currencyFrom]);
    }
    if (currencyTo) {
      setCurrencyToSymbol(currencySymbolMap[currencyTo]);
    }
  }, [currencyFrom, currencyTo]);

  return (
    <div className="converter-page">
      <div className="converter-page__desc">
        Easily convert between different currencies using the exchange rates
        provided.
        <br />
        Enter the amount in the 'From' field, select the currencies, and watch
        the values update in real-time.
      </div>
      <div className="converter-page__content">
        <div className="converter-page__section">
          <div className="select">
        <span>From</span>
          <CurrencySelect
            value={currencyFrom}
            onChange={handleCurrencyFromChange}
            currencies={availableCurrencies}
            currencyFullNames={currencyFullNames}
          />
          </div>
          <div className="input-wrapper">
            <div className="currency-symbol" id="currencyFromSymbol">
              {currencyFromSymbol}
            </div>
            <Input
              size="large"
              value={inputValueFrom}
              onChange={handleInputChangeFrom}
              type="number"
              placeholder="Enter the amount"
              bordered={false}
            />
          </div>
        </div>

        <Button onClick={handleSwapClick} type="primary" size="large">
          <RetweetOutlined style={{ fontSize: "28px" }} />
        </Button>

        <div className="converter-page__section">
        <div className="select"> 
          <span>To</span>
          <CurrencySelect
            value={currencyTo}
            onChange={handleCurrencyToChange}
            currencies={availableCurrencies}
            currencyFullNames={currencyFullNames}
          />
          </div>
          <div className="input-wrapper">
            <div className="currency-symbol" id="currencyToSymbol">
              {currencyToSymbol}
            </div>
            <Input
              size="large"
              value={inputValueTo}
              onChange={handleInputChangeTo}
              type="number"
              placeholder="Enter the amount"
              bordered={false}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConverterPage;
