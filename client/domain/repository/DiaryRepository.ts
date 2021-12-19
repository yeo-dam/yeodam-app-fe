import { plainToClass } from "class-transformer";
import PagerModel from "~domain/model/PagerModel";
import DiaryModel from "~domain/model/DiaryModel";
import Fetcher from "~domain/helper/Fetcher";
import PagerEntity from "~data/entity/PagerEntity";
import DiaryEntity from "~data/entity/DiaryEntity";
import { validate } from "class-validator";

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

  private constructor() {}

  public async getDiarylists(): Promise<[PagerModel, DiaryModel[]]> {
    const diaryLists = await Fetcher<PagerEntity<DiaryEntity>>("/diaries");
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

    const err = await validate(diaryInstances);
    if (err.length > 0) {
      throw err;
    }

    return [pagerModel, diaryInstances];
  }
}
