import { Select, Button, Table } from "antd";
import "./main-page.scss";
import { useSelector } from "react-redux";

const MainPage = ({ baseCurrency, onCurrencyChange, onRefreshRates }) => {
  const exchangeRates = useSelector((state) => state.mainPage.exchangeRates);
  const availableCurrencies = useSelector(
    (state) => state.mainPage.availableCurrencies
  );
  const currencyFullNames = useSelector(
    (state) => state.mainPage.currencyFullNames
  );

  const isDataLoaded = () => {
    return Object.keys(exchangeRates).length > 0; // Проверка наличия данных
  };

  const dataSource = [];

  for (const currency in exchangeRates) {
    dataSource.push({
      key: currency,
      currency: currency,
      fullName: currencyFullNames[currency],
      exchangeRate: (
        exchangeRates[currency] / exchangeRates[baseCurrency]
      ).toFixed(3),
    });
  }

  const columns = [
    {
      title: "Currency",
      dataIndex: "currency",
      key: "currency",
    },
    {
      title: "Currency Name",
      dataIndex: "fullName",
      key: "fullName",
    },

    {
      title: "Exchange Rate",
      dataIndex: "exchangeRate",
      key: "exchangeRate",
    },
  ];

  return (
    <div className="main-page">
      <div className="currency">
        <div className="currency__base">
          <span>Base Currency:</span>
          <Select
            value={baseCurrency}
            style={{ width: 120 }}
            onChange={onCurrencyChange}
          >
            {availableCurrencies.map((currency) => (
              <Select.Option key={currency} value={currency}>
                {currency}
              </Select.Option>
            ))}
          </Select>
        </div>
        <span className="currency__desc">
          Here you can select the base currency against which the rates of other
          currencies will be shown
        </span>
        <Button className="btn btn-refresh" onClick={onRefreshRates}>
          Refresh Rates
        </Button>
      </div>
      <div className="table">
        <Table
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          loading={!isDataLoaded()}
        />
      </div>
    </div>
  );
};

export default MainPage;
