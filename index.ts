import unfetch from "isomorphic-unfetch";

// TODO use unfetch.IsomorphicResponse?
export interface TypedResponse<T> extends Response {
  json<P = T>(): Promise<P>;
}

export function fetch<T>(input: RequestInfo, options?: RequestInit): Promise<TypedResponse<T>> {
  return unfetch(input, options).then(memoize);
}

// an unforgivable sin? … perhaps, but we'll see
function memoize<T>(response: TypedResponse<T>) {
  response.json = () => response.clone().json();
  response.text = () => response.clone().text();

  return response;
}
