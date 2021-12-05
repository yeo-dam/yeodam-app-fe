import { GetPostsAPI } from "Api";
import PagerModel from "domain/model/PagerModel";
import PostRepositoryImpl from "domain/repository/PostRepository";
import { action, computed, flow, observable } from "mobx";
import BaseViewModel from "../BaseViewModel";

export default class TabTwoViewModel extends BaseViewModel {
  private static _Instance: TabTwoViewModel;
  private readonly _PostUserCase = PostRepositoryImpl.GetInstace();

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
  private _pager = observable.box<PagerModel>(undefined);

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

    const [pager, posts] = yield this._PostUserCase.getPostlists();

    this._posts.set(posts);
    this._pager.set(pager);

    this._isLoading.set(false);
  });
}
