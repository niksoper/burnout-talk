import axios from "axios";
import { ApiClient, IFetcher } from "./client-api";
import { getStore } from "../redux/store";

// TODO: proper config
//declare const APP_CONFIG: any;

const APP_CONFIG = {
  apiBaseUrl: "http://api-careful.rocketmakers.net"
};

export type DataStatus = "loading" | "loaded" | "error";

export interface IData<T> {
  status?: DataStatus;
  data?: T;
  error?: any;
}

const fetcher: IFetcher = {
  async request<T>(url: string, verb: string, contentType: string, body?: any): Promise<T> {
    const headers = {};

    let s = getStore().getState();
    if (s.user.token) {
      headers["Authorization"] = `Bearer ${s.user.token}`;
    }

    const response = await axios({ baseURL: APP_CONFIG.apiBaseUrl, method: verb, url, headers, data: body });
    const { data, status, statusText } = response;

    if (400 <= status && status < 600) {
      if (status < 500) {
        throw new Error(`${status} ${statusText} error`);
      } else {
        throw new Error(`${status} ${statusText} error`);
      }
    }

    // TODO: return something like this
    // const r = { data, status, response };

    return data;
  },

  buildQueryString(query?: any): string {
    return Object.keys(query)
      .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(query[k])}`)
      .join("&");
  }
};

export const api = new ApiClient(fetcher);
