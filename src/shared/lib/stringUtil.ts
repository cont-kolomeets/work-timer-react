export function issueNumberFromLink(link: string): string {
  const number = link.match(/\d+$/)?.[0];
  return number ? "#" + number : link;
}
