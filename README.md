# r-fetch

[![npm version](https://img.shields.io/npm/v/r-fetch.svg?style=flat-square)](https://www.npmjs.org/package/r-fetch)
[![npm downloads](https://img.shields.io/npm/dm/r-fetch.svg?style=flat-square)](http://npm-stat.com/charts.html?package=r-fetch)

## Introduction

RFetch based on antd notification & axios.

## Installation

Use npm
```bash
$ npm install r-fetch
```

Use yarn
```bash
$ yarn add r-fetch
```

## Demo
To run the demo on your local server, please do as follows.
```bash
$ yarn dev
```
Then open http://localhost:8080/

## Usage

```jsx
// src/dataLayer/index.ts

import RFetch, { RFetchConfigs } from "r-fetch";
import "r-fetch/dist/index.css";

const configs: RFetchConfigs = {
  searchUsers: {
    requestConfig: {
      url: "https://api.github.com/search/users",
      params: {
        q: "fix777",
      },
    },
    notificationConfig: {
      showBtn: {
        show: "error",
        errorText: "I got it.",
      },
      onPreError: ({ data }: any) => ({
        message: "Hey, Your Reqeust has been rejected.",
        description: String(data.message).repeat(100),
        // duration: 2,
      }),
    },
  },
};

const dataProvider = new RFetch(configs);

export default dataProvider;

```

```jsx
// src/app.tsx

import dataProvider from "./dataLayer";

interface Params {
  q?: string;
}

const asyncFetch = (callback: (data: any) => void) => async (
  params?: Params
) => {
  const options: AxiosRequestConfig = {};
  if (params) {
    options.params = params; // Method: GET
  }
  const { data }: AxiosResponse = await dataProvider.request(
    "searchUsers",
    options
  );
  callback(data);
};

interface AppState {
  collapsed: boolean;
  users: any[];
}

class App extends React.Component<{}, AppState> {
  state: AppState = {
    collapsed: false,
    users: [],
  };

  componentWillMount() {
    asyncFetch(this.receiveUsers)();
  }

  receiveUsers = (data: any) => {
    const { items } = data;
    this.setState({ users: items });
  };

  // ...
}
```

# License
MIT
