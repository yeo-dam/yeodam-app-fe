import Fetcher from "data/remote/Fetcher";

export const GetPostsAPI = () => {
  return Fetcher(`/posts`);
};
