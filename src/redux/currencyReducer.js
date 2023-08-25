const SET_BASE_CURRENCY = "SET_BASE_CURRENCY";
const SET_EXCHANGE_RATES = "SET_EXCHANGE_RATES";
const SET_AVAILABLE_CURRENCIES = "SET_AVAILABLE_CURRENCIES";
const SET_CURRENCY_FULL_NAMES = "SET_CURRENCY_FULL_NAMES";

const initialState = {
  baseCurrency: "USD",
  exchangeRates: {},
  availableCurrencies: [],
  currencyFullNames: {},
};

const currencyReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BASE_CURRENCY:
      return { ...state, baseCurrency: action.payload };
    case SET_EXCHANGE_RATES:
      return { ...state, exchangeRates: action.payload };
    case SET_AVAILABLE_CURRENCIES:
      return { ...state, availableCurrencies: action.payload };
    case SET_CURRENCY_FULL_NAMES:
      return { ...state, currencyFullNames: action.payload };
    default:
      return state;
  }
};


export const setBaseCurrency = (currency) => {
  return {
    type: SET_BASE_CURRENCY,
    payload: currency,
  };
};

export const setExchangeRates = (rates) => {
  return {
    type: SET_EXCHANGE_RATES,
    payload: rates,
  };
};

export const setAvailableCurrencies = (currencies) => {
  return {
    type: SET_AVAILABLE_CURRENCIES,
    payload: currencies,
  };
};

export const setCurrencyFullNames = (names) => {
  return {
    type: SET_CURRENCY_FULL_NAMES,
    payload: names,
  };
};

export default currencyReducer;
