/////////////////////////////////////////////////
//      THIS FILE SHOULD BE CODE GENERATED     //
//      ONLY HERE AS A SAMPLE, DONT USE IT     //
/////////////////////////////////////////////////

export interface IFetcher {
  request<T>(url: string, verb: string, contentType: string, body?: any): Promise<T>;
  buildQueryString?(query?: any): string;
  requestValidate?(routeUniqueName: string, paramValues: { body?: any; params?: any; query?: any }): Promise<void>;
}

export class Qs {
  private static buildQueryStringValue(value: any, key: string) {
    return value;
  }

  static buildQueryString(query?: any) {
    if (!query) {
      return "";
    }

    const qs = Object.keys(query)
      .map(k => {
        return `${k}=${Qs.buildQueryStringValue(query[k], k)}`;
      })
      .join("&");

    return qs.length ? `?${qs}` : "";
  }
}

function optionalParam(parameter, key: string) {
  return parameter && parameter[key] ? `/${parameter[key]}` : "";
}

export class ApiClient {
  constructor(private fetcher: IFetcher) {}
}
