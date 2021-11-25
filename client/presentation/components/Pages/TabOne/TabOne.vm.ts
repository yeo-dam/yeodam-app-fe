import { action, computed, flow, observable } from "mobx";
import BaseViewModel from "../BaseViewModel";

export default class TabOneViewModel extends BaseViewModel {
  private static _Instance: TabOneViewModel;
  static GetInstance() {
    if (!TabOneViewModel._Instance) {
      TabOneViewModel._Instance = new TabOneViewModel();
    }
    return TabOneViewModel._Instance;
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
  load = flow(function* (this: TabOneViewModel) {
    this._isLoading.set(true);
    this._isLoading.set(false);
  });
}
