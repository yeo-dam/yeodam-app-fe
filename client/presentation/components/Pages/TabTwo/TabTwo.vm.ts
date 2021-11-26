import { GetPostsAPI } from "Api";
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

  @observable
  private _isError = observable.box<boolean>(false);

  @observable
  private _posts =
    observable.box<{ id: number; title: string; description: string }[]>(
      undefined
    );

  @computed
  public get isLoading() {
    return this._isLoading.get();
  }

  @computed
  public get isError() {
    return this._isError.get();
  }

  @computed
  public get posts() {
    return this._posts.get();
  }

  @action
  load = flow(function* (this: TabTwoViewModel) {
    this._isLoading.set(true);

    const [isApiError, data] = yield GetPostsAPI();

    if (!isApiError) {
      this._posts.set(data);
    } else {
      this._isError.set(true);
    }

    this._isLoading.set(false);
  });
}
