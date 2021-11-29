import PagerEntity from "data/entity/PagerEntity";
import PostEntity from "data/entity/PostEntity";
import Fetcher from "./Fetcher";
import RemoteDataSource from "./RemoteDataSource";

export default class PostRemoteDataSource extends RemoteDataSource {
  private static _Instance: PostRemoteDataSource;
  static GetInstace() {
    if (!PostRemoteDataSource._Instance) {
      PostRemoteDataSource._Instance = new PostRemoteDataSource();
    }
    return PostRemoteDataSource._Instance;
  }

  constructor() {
    super();
  }

  public GetPosts(): Promise<[boolean, PagerEntity<PostEntity[]>]> {
    return Fetcher<PagerEntity<PostEntity[]>>("/posts");
  }
}
