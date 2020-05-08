export default interface LogEntry {
  label: string;
  hash: string;
  timestamp: string;
  arrow: string;
  type: string;
  jsonString?: string;
  json: () => any;
}
