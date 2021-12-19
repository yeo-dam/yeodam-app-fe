import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import PagerEntity from "~data/entity/PagerEntity";
import PostEntity from "~data/entity/PostEntity";
import Fetcher from "~domain/helper/fetcher";
import PagerModel from "~domain/model/PagerModel";
import PostModel from "~domain/model/PostModel";

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

  private constructor() {}

  public async getPostlists(): Promise<[PagerModel, PostModel[]]> {
    const postlistEntities = await Fetcher<PagerEntity<PostEntity>>("/posts");

    const postInstances = postlistEntities.items.map((post) =>
      plainToClass<PostModel, PostEntity>(PostModel, { ...post })
    );

    const pagerInstance = plainToClass(PagerModel, {
      count: postlistEntities.count,
      total: postlistEntities.total,
      limit: postlistEntities.limit,
      offset: postlistEntities.offset,
    });

    postInstances.forEach(async (item) => {
      const postError = await validate(item);
      if (postError.length > 0) {
        throw postError;
      }
    });

    const pagerErrors = await validate(pagerInstance);
    if (pagerErrors.length > 0) {
      throw pagerErrors;
    }

    return [pagerInstance, postInstances];
  }
}
