import { sendDelete, sendGet, sendPatch, sendPost } from "./fetchUtil";

const API_URL = "https://work-timer-backend.onrender.com/api/";
//const API_URL = "http://localhost:5000/api/";

export class RemoteClient {
  token: string | null = null;

  async sendGet<T = any>(url: string): Promise<T> {
    const { data } = await sendGet(this._enrichUrl(url));
    return data;
  }

  async sendPost<T = any>(url: string, inData: any): Promise<T> {
    const { data } = await sendPost(this._enrichUrl(url), inData);
    return data;
  }

  async sendPatch<T = any>(url: string, inData: any): Promise<T> {
    const { data } = await sendPatch(this._enrichUrl(url), inData);
    return data;
  }

  async sendDelete<T = any>(url: string): Promise<T> {
    const { data } = await sendDelete(this._enrichUrl(url));
    return data;
  }

  private _enrichUrl(url: string): string {
    url += url.includes("?") ? "" : "?";
    this.token &&
      (url +=
        (url.indexOf("?") < url.length - 1 ? "&" : "") + "token=" + this.token);
    return API_URL + url;
  }
}
