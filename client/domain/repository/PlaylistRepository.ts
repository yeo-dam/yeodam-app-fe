import { plainToClass } from "class-transformer";
import PlaylistRemoteDataSource from "data/remote/PlaylistRemoteDataSource";
import PagerModel from "domain/model/PagerModel/model";
import PlaylistModel from "domain/model/PlaylistModel";

interface PlaylistRepository {
  getPlaylists(): Promise<[PagerModel, PlaylistModel[]]>;
}

export default class PlaylistRepositoryImpl implements PlaylistRepository {
  private static _Instance: PlaylistRepositoryImpl;
  static GetInstace() {
    if (!PlaylistRepositoryImpl._Instance) {
      PlaylistRepositoryImpl._Instance = new PlaylistRepositoryImpl();
    }
    return PlaylistRepositoryImpl._Instance;
  }

  private readonly _remote = PlaylistRemoteDataSource.GetInstace();
  private constructor() {}

  public async getPlaylists(): Promise<[PagerModel, PlaylistModel[]]> {
    const playLists = await this._remote.GetPlaylists();
    const playlistInstances = playLists.items.map((post) =>
      plainToClass(PlaylistModel, {
        ...post,
      })
    );

    const pagerModel = plainToClass(PagerModel, {
      count: playLists.count,
      total: playLists.total,
      limit: playLists.limit,
      offset: playLists.offset,
    });

    return [pagerModel, playlistInstances];
  }
}
