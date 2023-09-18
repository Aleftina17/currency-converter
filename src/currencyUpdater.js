import { useDispatch } from 'react-redux';
import { loadExchangeRates } from './redux/currencyReducer'

const CurrencyUpdater = () => {
  const dispatch = useDispatch();

  const updateExchangeRates = () => {
    dispatch(loadExchangeRates());
  };
  setInterval(updateExchangeRates, 300000);

  return null;
};

export default CurrencyUpdater;
