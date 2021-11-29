interface TagRepository {}

export default class TagRepositoryImpl implements TagRepository {
  private static _Instance: TagRepositoryImpl;
  static GetInstace() {
    if (!TagRepositoryImpl._Instance) {
      TagRepositoryImpl._Instance = new TagRepositoryImpl();
    }
    return TagRepositoryImpl._Instance;
  }

  private constructor() {}
}
