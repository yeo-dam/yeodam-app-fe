export const GetPostsAPI = () => {
  let isApiError = false;
  let data: any = undefined;

  return fetch("http://127.0.0.1:3001/posts")
    .then(async (res) => {
      if (res.ok) {
        isApiError = false;
        data = await res.json();
      } else {
        throw new Error("Network Error Occured!!");
      }
      return [isApiError, data];
    })
    .catch((err) => {
      console.log(err);
      isApiError = true;
      return [isApiError, data];
    });
};
