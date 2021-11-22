export const GetPostsAPI = () => {
  let isApiLoading = true;
  let isApiError = false;
  let data: any = undefined;

  return fetch("http://localhost:3001/posts")
    .then(async (res) => {
      if (res.ok) {
        isApiLoading = false;
        isApiError = false;
        data = await res.json();
      } else {
        throw new Error("unexpected Error Occured!!");
      }
      return [isApiLoading, isApiError, data];
    })
    .catch((err) => {
      console.log(err);
      isApiError = true;
      isApiLoading = false;
      return [isApiLoading, isApiError, data];
    });
};
