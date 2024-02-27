export function issueNumberFromLink(link: string): string {
  return link.match(/\d+$/)?.[0] || "";
}
