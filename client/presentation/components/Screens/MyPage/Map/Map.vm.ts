import MapRepositoryImpl from "domain/repository/MapRepository";
import { action, computed, flow, observable } from "mobx";
import { ConstructorParameter } from "~domain/repository/Repository";
import BaseViewModel from "../../BaseViewModel";

export default class MapViewModel extends BaseViewModel {
  private static _Instance: MapViewModel;
  private readonly _MapRepo: MapRepositoryImpl;

  static GetInstance(args: ConstructorParameter) {
    if (!MapViewModel._Instance) {
      MapViewModel._Instance = new MapViewModel(args);
    }
    return MapViewModel._Instance;
  }
  private constructor(args: ConstructorParameter) {
    super(args);
    if (args.accessToken) {
      this.setAccessToken(args.accessToken);
    }
    this._MapRepo = MapRepositoryImpl.GetInstace({
      accessToken: args.accessToken,
    });
  }

  @observable
  private _isLoading = observable.box<boolean>(false);

  @observable
  private _isError = observable.box<boolean>(false);

  @computed
  public get isLoading() {
    return this._isLoading.get();
  }

  @computed
  public get isError() {
    return this._isError.get();
  }

  @action
  load = flow(function* (this: MapViewModel) {
    this._isLoading.set(true);
    this._isLoading.set(false);
  });
}
