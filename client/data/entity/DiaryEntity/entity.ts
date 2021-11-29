import PostEntity from "../PostEntity";

export default interface Entity {
  Id: string;
  title: string;
  posts: PostEntity[];
  createAt: Date;
  updatedAt?: Date;
}
