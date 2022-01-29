import BaseRepository, { ConstructorParameter } from "./Repository";

interface CommentRepository {}

export default class CommentRepositoryImpl
  extends BaseRepository
  implements CommentRepository
{
  private static _Instance: CommentRepositoryImpl;
  static GetInstace(args: ConstructorParameter) {
    if (!CommentRepositoryImpl._Instance) {
      CommentRepositoryImpl._Instance = new CommentRepositoryImpl(args);
    }
    return CommentRepositoryImpl._Instance;
  }

  private constructor(args: ConstructorParameter) {
    super(args);
  }

  async find() {}
}
