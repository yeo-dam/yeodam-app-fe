import { action, computed, flow, observable } from "mobx";
import PostRepositoryImpl from "~domain/repository/PostRepository";
import { ConstructorParameter } from "~domain/repository/Repository";
import BaseViewModel from "../../BaseViewModel";

export default class CreatePostViewModel extends BaseViewModel {
  private static _Instance: CreatePostViewModel;
  private readonly _postRepo: PostRepositoryImpl;

  static GetInstance(args: ConstructorParameter) {
    if (!CreatePostViewModel._Instance) {
      CreatePostViewModel._Instance = new CreatePostViewModel(args);
    }
    return CreatePostViewModel._Instance;
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
  private _uploadedImages = observable.box<any[]>();

  @observable
  private _isFront = observable.box<boolean>(true);

  @computed
  public get isLoading() {
    return this._isLoading.get();
  }

  @computed
  public get isError() {
    return this._isError.get();
  }

  @computed
  public get uploadedImages() {
    return this._uploadedImages.get();
  }

  @computed
  public get isFront() {
    return this._isFront.get();
  }

  @action
  setFront(bool: boolean) {
    this._isFront.set(bool);
  }

  @action
  createPost = flow(function* (this: CreatePostViewModel) {
    try {
      this._isLoading.set(true);
      yield this._postRepo.createPost();
    } catch (error) {
      console.error(error);
      this._isError.set(true);
    } finally {
      this._isLoading.set(false);
    }
  });

  @action
  uploadImages = flow(function* (this: CreatePostViewModel, data: any) {
    try {
      this._isLoading.set(true);
      const res = yield this._postRepo.uploadImages(data);
      if (res.success) {
        this._uploadedImages.set(data);
      }
    } catch (error) {
      console.error(error);
      this._isError.set(true);
    } finally {
      this._isLoading.set(false);
    }
  });
}
