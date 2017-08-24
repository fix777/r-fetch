import React from "react";
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
const { SubMenu } = Menu;

import "./style/app.css";

// import RFetch, { RFetchConfigs } from "./utils";

import RFetch, { RFetchConfigs }  from "./../dist";
import "./../dist/index.css";

const getRFetchConfig = (): RFetchConfigs => ({
  searchUsers: {
    requestConfig: {
      url: "https://api.github.com/search/users",
      params: {
        q: "fix777",
      },
    },
    notificationConfig: {
      onPreError: ({ data }: any) => ({
        message: "Hey, Your Reqeust has been rejected.",
        description: data.message,
      }),
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

    this.rFetch = new RFetch(getRFetchConfig());
    this.state = {
      collapsed: false,
      users: [],
    };
  }

  componentDidMount() {
    // this.rFetch.request("searchUsers")
    // .then(console.log)
    // .catch(e => {
    //   console.warn(e);
    //   debugger;
    // });
    this.handleResponse();
  }

  handleResponse = async () => {
    try {
      const { data } = await this.rFetch.request("searchUsers");
      const { items } = data;
      console.log("resp data: ", data);
      this.setState({ users: items });
    } catch (e) {
      // debugger;
      console.log(e.response);
    }
  }

  private onCollapse = (collapsed) => {
    console.log(collapsed);
    this.setState({ collapsed });
  }

  public render() {
    const { collapsed, users } = this.state;

    return (
      <Layout
        style={{
          height: "100vh",
        }}
      >
        <Sider
          collapsible
          collapsed={collapsed}
          onCollapse={this.onCollapse}
        >
          <div className="logo" />
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="pie-chart" />
              <span>Option 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <Icon type="desktop" />
              <span>Option 2</span>
            </Menu.Item>
            <SubMenu
              key="sub1"
              title={<span><Icon type="user" /><span>User</span></span>}
            >
              <Menu.Item key="3">Tom</Menu.Item>
              <Menu.Item key="4">Bill</Menu.Item>
              <Menu.Item key="5">Alex</Menu.Item>
            </SubMenu>
            <SubMenu
              key="sub2"
              title={<span><Icon type="team" /><span>Team</span></span>}
            >
              <Menu.Item key="6">Team 1</Menu.Item>
              <Menu.Item key="8">Team 2</Menu.Item>
            </SubMenu>
            <Menu.Item key="8">
              <Icon type="file" />
              <span>File</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 0 }} />
          <Content style={{ margin: '0 16px' }}>
            <Breadcrumb style={{ margin: '12px 0' }}>
              <Breadcrumb.Item>User</Breadcrumb.Item>
              <Breadcrumb.Item>fix777</Breadcrumb.Item>
            </Breadcrumb>
            <div style={{ padding: 24, background: '#fff', minHeight: "calc(100vh - 178px)" }}>
              <img className="avatar" src={!!users.length ? users[0].avatar_url : "#"} alt="Hey, man. Here is your avatar." />
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}

export default App;
