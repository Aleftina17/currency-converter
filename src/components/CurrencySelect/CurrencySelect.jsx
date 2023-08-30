import { Select } from "antd";

const CurrencySelect = ({ value, onChange, currencies, currencyFullNames }) => {

  //Фильтрация вариантов в выпадающем списке на основе введенного пользователем значения:
  //проверка совпадений как с аббревиатурой валюты, так и с их полными названиями (независимо от регистра)
  const filterOption = (inputValue, option) => {
    const currency = option.props.value;
    const fullName = currencyFullNames[currency];
    return (
      currency.toLowerCase().includes(inputValue.toLowerCase()) ||
      (fullName && fullName.toLowerCase().includes(inputValue.toLowerCase()))
    );
  };

  return (
    <Select
      showSearch
      value={value}
      style={{ width: 120 }}
      onChange={onChange}
      filterOption={filterOption}
    >
      {currencies.map((currency) => (
        <Select.Option key={currency} value={currency}>
          {currency}
        </Select.Option>
      ))}
    </Select>
  );
};

export default CurrencySelect;
