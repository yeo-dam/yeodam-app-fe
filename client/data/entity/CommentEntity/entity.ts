export default interface Entity {
  id: string;
  content: string;
  user: {
    userId: string;
  };
  postId: {
    postId: string;
  };
}
