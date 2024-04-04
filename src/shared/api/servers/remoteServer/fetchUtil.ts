export async function getJSON(url: string) {
  try {
    const response = await fetch(url, {
      method: "GET", // or "PUT"
      headers: {
        "Content-Type": "application/json",
      },
    });
    const result = await response.json();
    console.log("Success:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
    return null;
  }
}

export async function postJSON(url: string, data: string | any) {
  return _postPutJSON(url, data, "POST");
}

export async function putJSON(url: string, data: string | any) {
  return _postPutJSON(url, data, "PUT");
}

async function _postPutJSON(
  url: string,
  data: string | any,
  method: "POST" | "PUT"
) {
  try {
    const response = await fetch(url, {
      method,
      headers: {
        "Content-Type": "application/json",
      },
      body:
        typeof data === "string"
          ? data
          : JSON.stringify(_removeUndefinedProperties(data)),
    });
    const result = await response.json();
    console.log("Success:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
}

export async function fetchDelete(url: string) {
  try {
    const response = await fetch(url, {
      method: "DELETE",
    });
    const result = await response.json();
    console.log("Success:", result);
    return result;
  } catch (error) {
    console.error("Error:", error);
  }
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
