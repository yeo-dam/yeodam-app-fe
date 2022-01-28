import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import PagerEntity from "~data/entity/PagerEntity";
import UserEntity from "~data/entity/UserEntity";
import Fetcher from "helper/fetcher";
import PagerModel from "~domain/model/PagerModel/model";
import UserModel from "~domain/model/UserModel/model";
import BaseRepository, { ConstructorParameter } from "./Repository";

interface UserRepository {
  getUserlists(): Promise<[PagerModel, UserModel[]]>;
}

export default class UserRepositoryImpl
  extends BaseRepository
  implements UserRepository
{
  private static _Instance: UserRepositoryImpl;
  static GetInstace(args: ConstructorParameter) {
    if (!UserRepositoryImpl._Instance) {
      UserRepositoryImpl._Instance = new UserRepositoryImpl(args);
    }
    return UserRepositoryImpl._Instance;
  }

  private constructor(args: ConstructorParameter) {
    super(args);
  }

  public async getUserlists(): Promise<[PagerModel, UserModel[]]> {
    const userlistEntities = await Fetcher<PagerEntity<UserEntity>>("/users");
    const userListInstances = userlistEntities.items.map((post) =>
      plainToClass(UserModel, {
        ...post,
      })
    );

    const pagerModel = plainToClass(PagerModel, {
      count: userlistEntities.count,
      total: userlistEntities.total,
      limit: userlistEntities.limit,
      offset: userlistEntities.offset,
    });

    const err = await validate(userListInstances);
    if (err.length > 0) {
      throw err;
    }

    return [pagerModel, userListInstances];
  }
}
