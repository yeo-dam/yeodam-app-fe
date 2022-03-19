import { action, computed, flow, observable } from "mobx";
import CreatePostDto from "~domain/dto/CreatePostDto";
import PostRepositoryImpl from "~domain/repository/PostRepository";
import { ConstructorParameter } from "~domain/repository/Repository";
import BaseViewModel from "../../BaseViewModel";

type ImageType = {
  id: string;
  url: string;
};
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
  private _uploadedImages = observable.map<string, ImageType>([]);

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
    return [...this._uploadedImages.values()];
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
  createPost = flow(function* (
    this: CreatePostViewModel,
    dto: { body: CreatePostDto }
  ) {
    try {
      this._isLoading.set(true);
      yield this._postRepo.createPost({
        body: dto.body,
      });
    } catch (error) {
      console.error(error);
      this._isError.set(true);
    } finally {
      this._isLoading.set(false);
    }
  });

  @action
  uploadImages = flow(function* (
    this: CreatePostViewModel,
    dto: { body: FormData }
  ) {
    try {
      this._isLoading.set(true);
      const res = yield this._postRepo.uploadImages({
        body: dto.body,
      });

      console.log(`TCL ~ [CreatePost.vm.ts] ~ line ~ 97 ~ res`, res);

      if (res) {
        this._uploadedImages.set(res[0].id, res[0]);
      }
    } catch (error) {
      console.error(error);
      this._isError.set(true);
    } finally {
      this._isLoading.set(false);
    }
  });
}
