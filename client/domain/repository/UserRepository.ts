import { plainToClass } from "class-transformer";
import UserRemoteDataSource from "data/remote/UserRemoteDataSource";
import PagerModel from "domain/model/PagerModel/model";
import UserModel from "domain/model/UserModel/model";

interface UserRepository {
  getUserlists(): Promise<[PagerModel, UserModel[]]>;
}

export default class UserRepositoryImpl implements UserRepository {
  private static _Instance: UserRepositoryImpl;
  static GetInstace() {
    if (!UserRepositoryImpl._Instance) {
      UserRepositoryImpl._Instance = new UserRepositoryImpl();
    }
    return UserRepositoryImpl._Instance;
  }

  private readonly _remote = UserRemoteDataSource.GetInstace();
  private constructor() {}

  public async getUserlists(): Promise<[PagerModel, UserModel[]]> {
    const userList = await this._remote.GetUsers();
    const userListInstances = userList.items.map((post) =>
      plainToClass(UserModel, {
        ...post,
      })
    );

    const pagerModel = plainToClass(PagerModel, {
      count: userList.count,
      total: userList.total,
      limit: userList.limit,
      offset: userList.offset,
    });

    return [pagerModel, userListInstances];
  }
}
