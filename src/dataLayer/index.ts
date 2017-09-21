import RFetch, { RFetchConfigs } from "./../utils";
import "./../utils/index.css";

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
