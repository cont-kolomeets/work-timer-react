export async function sendGet(url: string) {
  const response = await fetch(url, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return {
    code: response.status,
    data: await response.json(),
  };
}

export async function sendPost(url: string, data: string | any) {
  return _postPatchJSON(url, data, "POST");
}

export async function sendPatch(url: string, data: string | any) {
  return _postPatchJSON(url, data, "PATCH");
}

async function _postPatchJSON(
  url: string,
  data: string | any,
  method: "POST" | "PATCH"
) {
  const response = await fetch(url, {
    method,
    headers: {
      "Content-Type": "application/json",
    },
    body:
      typeof data === "string"
        ? data
        : JSON.stringify(_removeUndefinedProperties(data || {})),
  });
  return {
    code: response.status,
    data: await response.json(),
  };
}

export async function sendDelete(url: string) {
  const response = await fetch(url, {
    method: "DELETE",
  });
  return {
    code: response.status,
    data: await response.json(),
  };
}

function _removeUndefinedProperties(obj: any): any {
  obj &&
    Object.keys(obj).forEach((key) => {
      if (obj[key] === undefined) {
        delete obj[key];
      }
    });
  return obj;
}
