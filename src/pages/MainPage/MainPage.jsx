import { Button, Table } from "antd";
import "./main-page.scss";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import CurrencySelect from "../../components/CurrencySelect/CurrencySelect";

const MainPage = ({ baseCurrency, onCurrencyChange, onRefreshRates }) => {
  const exchangeRates = useSelector((state) => state.mainPage.exchangeRates);
  const availableCurrencies = useSelector(
    (state) => state.mainPage.availableCurrencies
  );
  const currencyFullNames = useSelector(
    (state) => state.mainPage.currencyFullNames
  );

  const [searchQuery, setSearchQuery] = useState("");
  const dataSource = [];
  const [filteredData, setFilteredData] = useState(dataSource);

  useEffect(() => {
    const query = searchQuery.toLowerCase();

    const filteredData = dataSource.filter((item) => {
      const currency = item.currency.toLowerCase();
      const fullName = (item.fullName || "").toLowerCase();

      return currency.includes(query) || fullName.includes(query);
    });

    setFilteredData(filteredData);
  }, [dataSource, searchQuery]);

  // Проверка наличия данных
  const isDataLoaded = () => {
    return Object.keys(exchangeRates).length > 0;
  };

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

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

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
          <CurrencySelect
            value={baseCurrency}
            onChange={onCurrencyChange}
            currencies={availableCurrencies}
            currencyFullNames={currencyFullNames}
          />
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
        <div className="search">
          <input
            type="text"
            placeholder="Search currency..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
        <Table
          dataSource={filteredData}
          columns={columns}
          pagination={false}
          loading={!isDataLoaded()}
        />
      </div>
    </div>
  );
};

export default MainPage;
