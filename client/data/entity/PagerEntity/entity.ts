export default interface Entity<T> {
  item: T[];
  total: number;
  count: number;
  limit: number;
  offset: number;
}
