import PagerModel from "domain/model/PagerModel";
import PostModel from "domain/model/PostModel/model";
import { action, computed, flow, observable } from "mobx";
import BaseViewModel from "../../BaseViewModel";

export default class ThisViewModel extends BaseViewModel {
  private static _Instance: ThisViewModel;

  static GetInstance() {
    if (!ThisViewModel._Instance) {
      ThisViewModel._Instance = new ThisViewModel();
    }
    return ThisViewModel._Instance;
  }
  private constructor() {
    super();
  }

  @observable
  private _isLoading = observable.box<boolean>(false);

  @observable
  private _isError = observable.box<boolean>(false);

  @observable
  private _pager = observable.box<PagerModel>(undefined);

  @observable
  private _posts = observable.box<PostModel[]>(undefined);

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

  @computed
  public get pager() {
    return this._pager.get();
  }

  @action
  load = flow(function* (this: ThisViewModel) {
    this._isLoading.set(true);
    this._isLoading.set(false);
  });
}