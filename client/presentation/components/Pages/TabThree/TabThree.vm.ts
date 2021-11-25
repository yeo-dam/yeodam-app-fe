import { action, computed, flow, observable } from "mobx";
import BaseViewModel from "../BaseViewModel";

export default class TabThreeViewModel extends BaseViewModel {
  private static _Instance: TabThreeViewModel;
  static GetInstance() {
    if (!TabThreeViewModel._Instance) {
      TabThreeViewModel._Instance = new TabThreeViewModel();
    }
    return TabThreeViewModel._Instance;
  }
  private constructor() {
    super();
  }

  @observable
  private _isLoading = observable.box<boolean>(false);

  @computed
  public get isLoading() {
    return this._isLoading.get();
  }

  @action
  load = flow(function* (this: TabThreeViewModel, id: string) {
    this._isLoading.set(true);
    this._isLoading.set(false);
  });
}
