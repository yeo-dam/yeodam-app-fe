type FetchMethod = "GET" | "POST" | "PATCH" | "DELETE" | "PUT";
type AnyObject = {
  [key: string]: any;
};

export type FetcherRequest = Pick<RequestInit, "body"> & {
  method?: FetchMethod;
  accessToken?: string;
  querystring?: AnyObject;
  pagination?: {
    page: number | undefined;
    limit: number | undefined;
  };
};

const Fetcher = async <T>(
  url: string,
  options?: FetcherRequest
): Promise<T> => {
  const mergedOpt: RequestInit = { method: "GET" };

  if (options?.method !== undefined) {
    mergedOpt.method = options.method;
  }

  // 바디 체크
  if (options?.body !== undefined && options?.body instanceof FormData) {
    mergedOpt.headers = {
      "Content-type": "multipart/form-data; charset=UTF-8",
      Expires: "-1",
      Pragma: "no-cache",
    };
  } else {
    mergedOpt.headers = {
      "Content-type": "application/json; charset=UTF-8",
      Expires: "-1",
      Pragma: "no-cache",
    };
  }
  // 바디 체크[E]
  if (options?.body !== undefined) {
    mergedOpt.body = options?.body;
  }

  const requestUrl = `${process.env.HOSTNAME}:${process.env.PORTNUMBER}${url}`;

  console.log("Input >>>> ", requestUrl);

  const response = await fetch(requestUrl, mergedOpt);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`${data.err.message}`);
  } else {
    console.log("Output >>>>>> ", data);
  }

  return data;
};

export default Fetcher;
