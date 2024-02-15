type SupportedUrl =
  | "WorkTimerServer/GetSavedState"
  | "WorkTimerServer/PostSavedState"
  | "WorkTimerServer/GetTasks"
  | "WorkTimerServer/PostTasks";

/**
 * Makes requests to our fake REST API.
 */
export async function request<R>(
  url: SupportedUrl,
  params?: { data?: any; f: "json" }
): Promise<R> {
  const Server = (await import("../lib/Server")).Server;
  if (url === "WorkTimerServer/GetSavedState") {
    return Server.getState() as R;
  }
  if (url === "WorkTimerServer/PostSavedState") {
    return Server.postState(params?.data) as R;
  }
  if (url === "WorkTimerServer/GetTasks") {
    return Server.getTasks(params?.data) as R;
  }
  if (url === "WorkTimerServer/PostTasks") {
    return Server.postTasks(params?.data) as R;
  }

  throw new Error("API method is not supported");
}
