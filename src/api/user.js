import axios from './index'

export const getUserInfo = ({ userId }) => {
  return axios.request({
    url: "/getUserInfo",
    methods: "post",
    data: {
      userId: userId
    }
  });
} 