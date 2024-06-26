
# Currency Converter

This currency converter application is built using React and Redux. It allows users to convert between different currencies using real-time exchange rates fetched from an external API. Users can select a base currency, enter an amount to convert, and view the converted amount instantly.
## Features

- Convert between various currencies using real-time exchange rates
- Select base currency and target currency for conversion
- Automatic refreshing of exchange rates every 5 minutes
- Geolocation-based automatic selection of base currency on first load
## Tech Stack

React, Redux, Ant Design, Axios, Node.js, Open Exchange Rates API


## Installation

Clone the repository:

```bash
  git clone https://github.com/Aleftina17/currency-converter.git
```

Install dependencies:
    
```bash
  npm install
```

Start the app:
    
```bash
  npm start
```


## Redux State Management

The application uses Redux for state management. The main reducer (currencyReducer.js) handles actions related to setting base currency, exchange rates, available currencies, and more.
## API Integration

The application fetches exchange rates and currency names from the Open Exchange Rates API using Axios (api.js). Error handling for API requests is implemented to ensure smooth user experience.
## Geolocation Integration

The geolocation.js file contains functions for retrieving user coordinates and determining the country based on these coordinates to automatically set the base currency on initial load.
