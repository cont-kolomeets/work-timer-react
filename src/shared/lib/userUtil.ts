export function getLoggedInUser(): string {
  return window.location.href.includes("demo=true") ? "demo" : "alex";
}
