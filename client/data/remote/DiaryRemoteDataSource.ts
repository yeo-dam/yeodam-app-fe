import DiaryEntity from "data/entity/DiaryEntity";
import PagerEntity from "data/entity/PagerEntity";
import Fetcher from "./Fetcher";
import RemoteDataSource from "./RemoteDataSource";

export default class DiaryRemoteDataSource extends RemoteDataSource {
  private static _Instance: DiaryRemoteDataSource;
  static GetInstace() {
    if (!DiaryRemoteDataSource._Instance) {
      DiaryRemoteDataSource._Instance = new DiaryRemoteDataSource();
    }
    return DiaryRemoteDataSource._Instance;
  }

  constructor() {
    super();
  }

  public GetDiaries(): Promise<PagerEntity<DiaryEntity>> {
    return Fetcher<PagerEntity<DiaryEntity>>("/diaries");
  }
}
