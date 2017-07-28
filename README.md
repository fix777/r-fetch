# r-fetch

[![npm version](https://img.shields.io/npm/v/r-fetch.svg?style=flat-square)](https://www.npmjs.org/package/r-fetch)
[![npm downloads](https://img.shields.io/npm/dm/r-fetch.svg?style=flat-square)](http://npm-stat.com/charts.html?package=r-fetch)

RFetch based on antd notification & axios.

## Installing

Using npm | yarn

```bash
$ npm install r-fetch
```

```bash
$ yarn add r-fetch
```

## Start Dev Server

```bash
$ yarn dev
```

## Usage

```jsx
import RFetch from "r-fetch";
import { RFetchConfigs } from "r-fetch/dist/r-fetch";
import "r-fetch/dist/index.css";

const getRFetchConfig = (ctx: App): RFetchConfigs => ({
  searchUsers: {
    requestConfig: { // Refer to https://github.com/mzabriskie/axios#request-config
      url: "https://api.github.com/search/users",
      params: {
        q: "fix777",
      },
    },
    callback: ctx.onSearchUsersEnd, // The callback will trigger with one parameter which is the repsonse from the API provider when API request finished.
    notificationConfig: {
      enabled: true, // Default as false
      success: {
        message: "Hey, Your Reqeust has been resolved.",
        description: "Ha lo ha!",
      },
    },
  },
});

class App extends React.Component<{}, AppState> {
  private rFetch: RFetch;

  constructor(props) {
    super(props);

    this.rFetch = new RFetch(getRFetchConfig(this));
  }

  componentDidMount() {
    this.rFetch.request("searchUsers");
  }

  public onSearchUsersEnd = (resp: any) => {
    const { items } = resp;
    console.log(items);
  }

  // ...
}
```

# License
MIT
