import { SavedState } from "../data/interfaces";

type SupportedUrl =
  | "WorkTimerServer/GetSavedState"
  | "WorkTimerServer/PutSavedState";

/**
 * Makes requests to our fake REST API.
 */
export async function request<D, R>(
  url: SupportedUrl,
  params: { data?: D; f: "json" }
): Promise<R> {
  const Server = (await import("../server/Server")).default;
  if (url === "WorkTimerServer/GetSavedState") {
    return Server.getSavedState() as R;
  }
  if (url === "WorkTimerServer/PutSavedState") {
    return Server.putSavedState(params.data as SavedState) as R;
  }
  throw new Error("API method is not supported");
}
