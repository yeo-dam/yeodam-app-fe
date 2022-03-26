import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import ListEntity from "~data/entity/ListEntity";
import PostEntity from "~data/entity/PostEntity";
import PagerModel from "~domain/model/PagerModel";
import PostModel from "~domain/model/PostModel";
import BaseRepository, { ConstructorParameter } from "./Repository";
import { isDevelopmentMode } from "utils/detectMode";
import { genPostMockObject } from "~domain/model/PostModel/mock";
import FindDto from "~domain/dto/FindPostDto";
import CreatePostDto from "~domain/dto/CreatePostDto";

export default class PostRepositoryImpl extends BaseRepository {
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
  async find(dto: { query: FindDto }): Promise<[PagerModel, PostModel[]]> {
    if (isDevelopmentMode) {
      const limitNum = Number(dto.query.limit);
      const offsetNum = Number(dto.query.offset);
      const mockArr = new Array(100);

      for (let index = offsetNum; index < 16; index++) {
        mockArr[index] = genPostMockObject();
      }

      const mockPostList: ListEntity<PostEntity> = {
        items: [...mockArr.slice(offsetNum, offsetNum + limitNum)],
        count: 4,
        total: 100,
        limit: limitNum,
        offset: offsetNum,
      };

      const postInstances = mockPostList.items.map((post) =>
        plainToClass<PostModel, PostEntity>(PostModel, { ...post })
      );

      const pagerInstance = plainToClass(PagerModel, {
        count: mockPostList.count,
        total: mockPostList.total,
        limit: mockPostList.limit,
        offset: mockPostList.offset,
      });

      postInstances.forEach(async (item) => {
        const postError = await validate(item);
        if (postError.length > 0) {
          throw postError;
        }
      });

      return [pagerInstance, postInstances];
    } else {
      const postlistEntities = await this._remote._fetcher<
        ListEntity<PostEntity>
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
    }
  }

  async createPost(dto: { body: CreatePostDto }) {
    try {
      await this._remote._fetcher("/post/new", {
        method: "PUT",
        body: JSON.stringify(dto.body),
      });
    } catch (err) {
      throw err;
    }
  }

  async uploadImages(dto: { body: FormData }) {
    try {
      return await this._remote._fetcher("/image/upload/multiple", {
        method: "POST",
        body: dto.body,
      });
    } catch (error) {
      throw error;
    }
  }

  async findPostById() {}

  async updatePost() {}

  async deletePost() {}
}
