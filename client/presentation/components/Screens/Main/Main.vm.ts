import PagerModel from "domain/model/PagerModel";
import PostModel from "domain/model/PostModel/model";
import PostRepositoryImpl from "domain/repository/PostRepository";
import { action, computed, flow, observable } from "mobx";
import { ConstructorParameter } from "~domain/repository/Repository";
import BaseViewModel from "../BaseViewModel";

export default class MainViewModel extends BaseViewModel {
  private static _Instance: MainViewModel;
  private readonly _postRepo: PostRepositoryImpl;

  static GetInstance(args: ConstructorParameter) {
    if (!MainViewModel._Instance) {
      MainViewModel._Instance = new MainViewModel(args);
    }
    return MainViewModel._Instance;
  }
  private constructor(args: ConstructorParameter) {
    super(args);
    if (args.accessToken) {
      this.setAccessToken(args.accessToken);
    }
    this._postRepo = PostRepositoryImpl.GetInstace({
      accessToken: args.accessToken,
    });
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
  load = flow(function* (this: MainViewModel) {
    this._isLoading.set(true);

    const [pager, posts] = yield this._postRepo.find();

    this._posts.set(posts);
    this._pager.set(pager);

    this._isLoading.set(false);
  });

  @action
  downloadImage() {}

  @action
  share() {}
}
