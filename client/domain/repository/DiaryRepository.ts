import { plainToClass } from "class-transformer";
import DiaryRemoteDataSource from "data/remote/DiaryRemoteDataSource";
import PagerModel from "domain/model/PagerModel";
import DiaryModel from "domain/model/DiaryModel";

interface DiaryRepository {
  getDiarylists(): Promise<[PagerModel, DiaryModel[]]>;
}

export default class DiaryRepositoryImpl implements DiaryRepository {
  private static _Instance: DiaryRepositoryImpl;
  static GetInstace() {
    if (!DiaryRepositoryImpl._Instance) {
      DiaryRepositoryImpl._Instance = new DiaryRepositoryImpl();
    }
    return DiaryRepositoryImpl._Instance;
  }

  private readonly _remote = DiaryRemoteDataSource.GetInstace();
  private constructor() {}

  public async getDiarylists(): Promise<[PagerModel, DiaryModel[]]> {
    const diaryLists = await this._remote.GetDiaries();
    const diaryInstances = diaryLists.items.map((post) =>
      plainToClass(DiaryModel, {
        ...post,
      })
    );

    const pagerModel = plainToClass(PagerModel, {
      count: diaryLists.count,
      total: diaryLists.total,
      limit: diaryLists.limit,
      offset: diaryLists.offset,
    });
    return [pagerModel, diaryInstances];
  }
}
