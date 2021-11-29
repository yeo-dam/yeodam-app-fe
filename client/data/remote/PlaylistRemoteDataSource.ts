import PagerEntity from "data/entity/PagerEntity";
import PlaylistEntity from "data/entity/PlaylistEntity";
import Fetcher from "./Fetcher";
import RemoteDataSource from "./RemoteDataSource";

export default class PlaylistRemoteDataSource extends RemoteDataSource {
  private static _Instance: PlaylistRemoteDataSource;
  static GetInstace() {
    if (!PlaylistRemoteDataSource._Instance) {
      PlaylistRemoteDataSource._Instance = new PlaylistRemoteDataSource();
    }
    return PlaylistRemoteDataSource._Instance;
  }

  constructor() {
    super();
  }

  public GetPlaylists(): Promise<PagerEntity<PlaylistEntity>> {
    return Fetcher<PagerEntity<PlaylistEntity>>("/playlists");
  }
}
