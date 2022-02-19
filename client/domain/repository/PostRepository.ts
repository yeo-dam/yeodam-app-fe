import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import PagerEntity from "~data/entity/PagerEntity";
import PostEntity from "~data/entity/PostEntity";
import PagerModel from "~domain/model/PagerModel";
import PostModel from "~domain/model/PostModel";
import BaseRepository, { ConstructorParameter } from "./Repository";
import { isDevelopmentMode } from "utils/detectMode";
import { genPostMockInstance } from "~domain/model/PostModel/mock";

interface PostRepository {
  find(): Promise<[PagerModel, PostModel[]]>;
}

export default class PostRepositoryImpl
  extends BaseRepository
  implements PostRepository
{
  private static _Instance: PostRepositoryImpl;

  static GetInstace(args: ConstructorParameter) {
    if (!PostRepositoryImpl._Instance) {
      PostRepositoryImpl._Instance = new PostRepositoryImpl(args);
    }
    return PostRepositoryImpl._Instance;
  }

  private constructor(args: ConstructorParameter) {
    super(args);
  }

  // TODO : 다양한 쿼리 추가되어야 함
  /** 전체 Post 목록 불러오기 (필요 없을 수 있음) **/
  async find(): Promise<[PagerModel, PostModel[]]> {
    // async find(): Promise<any> {
    // if (isDevelopmentMode) {
    //   return [[] as any, [genPostMockInstance(), genPostMockInstance()]];
    // } else {
    const postlistEntities = await this._remote._fetcher<
      PagerEntity<PostEntity>
    >("/posts");

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
    // }
  }

  /** 유저 ID로 Post 불러오기 **/
  async createPost() {}

  async uploadImages(data: any) {
    try {
      console.log("이미지 데이터가 전송됩니다", data);
      return { success: true };
    } catch (error) {
      throw new Error("Error occured during network request");
    }
  }

  async findPostById() {}

  async updatePost() {}

  async deletePost() {}
}
