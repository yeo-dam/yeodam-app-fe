import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import PagerEntity from "~data/entity/PagerEntity";
import PlaylistEntity from "~data/entity/PlaylistEntity";
import Fetcher from "~domain/helper/fetcher";
import PagerModel from "~domain/model/PagerModel/model";
import PlaylistModel from "~domain/model/PlaylistModel";

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

  private constructor() {}

  public async getPlaylists(): Promise<[PagerModel, PlaylistModel[]]> {
    const playlistEntities = await Fetcher<PagerEntity<PlaylistEntity>>(
      "/playlists"
    );
    const playlistInstances = playlistEntities.items.map((post) =>
      plainToClass(PlaylistModel, {
        ...post,
      })
    );

    const pagerModel = plainToClass(PagerModel, {
      count: playlistEntities.count,
      total: playlistEntities.total,
      limit: playlistEntities.limit,
      offset: playlistEntities.offset,
    });

    const err = await validate(playlistInstances);
    if (err.length > 0) {
      throw err;
    }

    return [pagerModel, playlistInstances];
  }
}
