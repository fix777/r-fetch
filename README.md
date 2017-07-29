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
    // Refer to https://github.com/mzabriskie/axios#request-config
    requestConfig: {
      url: "https://api.github.com/search/users",
      params: {
        q: "fix777",
      },
    },
    // The callback will trigger with one parameter 
    // which is the repsonse from the API provider when API request finished.
    callback: ctx.onSearchUsersEnd,
    notificationConfig: {
      enabled: true,
      success: {
        enabled: true,
        args: {
          message: "Hey, Your Reqeust has been resolved.",
          description: "A lo ha!",
        },
      },
      error: {
        enabled: true,
      }
    },
  },
});

interface AppState {
  collapsed: boolean;
  users: any[];
}

class App extends React.Component<{}, AppState> {
  private rFetch: RFetch;

  constructor(props) {
    super(props);

    this.rFetch = new RFetch(getRFetchConfig(this));
    this.state = {
      collapsed: false,
      users: [],
    };
  }

  componentDidMount() {
    this.rFetch.request(
      "searchUsers",
      {
        // params: {
        //   q: "wesbos",
        // },
      },
      (resp: any) => console.log(resp, "hahaha...")
    );
  }

  public onSearchUsersEnd = (resp: any) => {
    const { items } = resp;
    this.setState({ users: items });
  }

  // ...
}
```

# License
MIT
