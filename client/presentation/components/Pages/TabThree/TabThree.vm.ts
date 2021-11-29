import { GetPostsAPI } from "Api";
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
  load = flow(function* (this: TabThreeViewModel) {
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
