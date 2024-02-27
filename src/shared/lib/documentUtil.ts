export function updateDocumentHeader(isRunning: boolean): void {
  document.title = isRunning ? "Running" : "Paused";
}
