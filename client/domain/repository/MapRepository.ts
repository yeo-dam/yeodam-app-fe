import BaseRepository, { ConstructorParameter } from "./Repository";

interface MapRepository {}

export default class MapRepositoryImpl
  extends BaseRepository
  implements MapRepository
{
  private static _Instance: MapRepositoryImpl;
  static GetInstace(args: ConstructorParameter) {
    if (!MapRepositoryImpl._Instance) {
      MapRepositoryImpl._Instance = new MapRepositoryImpl(args);
    }
    return MapRepositoryImpl._Instance;
  }

  private constructor(args: ConstructorParameter) {
    super(args);
  }
}
