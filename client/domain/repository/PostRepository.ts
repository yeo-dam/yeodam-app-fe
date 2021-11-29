import { plainToClass } from "class-transformer";
import PostRemoteDataSource from "data/remote/PostRemoteDataSource";
import PagerModel from "domain/model/PagerModel";
import PostModel from "domain/model/PostModel";

interface PostRepository {
  getPostlists(): Promise<[PagerModel, PostModel[]]>;
}

export default class PostRepositoryImpl implements PostRepository {
  private static _Instance: PostRepositoryImpl;
  static GetInstace() {
    if (!PostRepositoryImpl._Instance) {
      PostRepositoryImpl._Instance = new PostRepositoryImpl();
    }
    return PostRepositoryImpl._Instance;
  }

  private readonly _remote = PostRemoteDataSource.GetInstace();
  private constructor() {}

  public async getPostlists(): Promise<[PagerModel, PostModel[]]> {
    const postLists = await this._remote.GetPosts();
    const postInstances = postLists.items.map((post) =>
      plainToClass(PostModel, {
        ...post,
      })
    );

    const pagerModel = plainToClass(PagerModel, {
      count: postLists.count,
      total: postLists.total,
      limit: postLists.limit,
      offset: postLists.offset,
    });

    return [pagerModel, postInstances];
  }
}
