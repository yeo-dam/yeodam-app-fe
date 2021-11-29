export default interface Entity {
  id: string;
  content: string;
  user: {
    id: string;
  };
  post: {
    id: string;
  };
}
