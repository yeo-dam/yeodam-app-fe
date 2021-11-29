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
  console.log("Input >>>> ", url);

  const requestUrl = `${process.env.HOSTNAME} +':'${process.env.PORTNUMBER} + ${url}`;
  const response = await fetch(requestUrl, options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(`${data.err.message}`);
  } else {
    console.log("Output >>>>>> ", data);
  }

  return data;
};

export default Fetcher;
