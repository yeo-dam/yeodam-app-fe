import { action, computed, flow, observable } from "mobx";
import BaseViewModel from "../BaseViewModel";

export default class TabTwoViewModel extends BaseViewModel {
  private static _Instance: TabTwoViewModel;
  static GetInstance() {
    if (!TabTwoViewModel._Instance) {
      TabTwoViewModel._Instance = new TabTwoViewModel();
    }
    return TabTwoViewModel._Instance;
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
  load = flow(function* (this: TabTwoViewModel, id: string) {
    this._isLoading.set(true);
    this._isLoading.set(false);
  });
}
