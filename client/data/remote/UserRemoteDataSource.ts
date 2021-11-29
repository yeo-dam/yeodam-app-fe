import PagerEntity from "data/entity/PagerEntity";
import UserEntity from "data/entity/UserEntity";
import Fetcher from "./Fetcher";
import RemoteDataSource from "./RemoteDataSource";

export default class UserRemoteDataSource extends RemoteDataSource {
  private static _Instance: UserRemoteDataSource;
  static GetInstace() {
    if (!UserRemoteDataSource._Instance) {
      UserRemoteDataSource._Instance = new UserRemoteDataSource();
    }
    return UserRemoteDataSource._Instance;
  }

  constructor() {
    super();
  }

  public GetUsers(): Promise<[boolean, PagerEntity<UserEntity[]>]> {
    return Fetcher<PagerEntity<UserEntity[]>>("/users");
  }
}
