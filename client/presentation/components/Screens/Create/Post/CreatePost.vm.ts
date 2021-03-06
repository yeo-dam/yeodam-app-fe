import { action, computed, flow, observable } from "mobx";
import PlaceEntity from "~data/entity/PlaceEntity";
import CreatePostDto from "~domain/dto/CreatePostDto";
import PlaceSearchDto from "~domain/dto/PlaceSearchDto";
import ImageFileModel from "~domain/model/ImageFileModel";
import PagerModel from "~domain/model/PagerModel";
import PlaceRepositoryImpl from "~domain/repository/PlaceRepository";
import PostRepositoryImpl from "~domain/repository/PostRepository";
import { ConstructorParameter } from "~domain/repository/Repository";
import BaseViewModel from "../../BaseViewModel";

export type PlaceList = Pick<PlaceEntity, "placeId" | "placeName" | "address">;

export default class CreatePostViewModel extends BaseViewModel {
  private static _Instance: CreatePostViewModel;
  private readonly _placeRepo: PlaceRepositoryImpl;
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
    this._placeRepo = PlaceRepositoryImpl.GetInstace({
      accessToken: args.accessToken,
    });

    this._postRepo = PostRepositoryImpl.GetInstace({
      accessToken: args.accessToken,
    });
  }

  @observable
  private _isLoading = observable.box<boolean>(false);

  @observable
  private _isUploadLoading = observable.box<boolean>(false);

  @observable
  private _isSearchLoading = observable.box<boolean>(false);

  @observable
  private _isError = observable.box<boolean>(false);

  @observable
  private _pager = observable.box<PagerModel>(undefined);

  @observable
  private _uploadedImages = observable.map<string, ImageFileModel>(undefined);

  @observable
  private _searchedList = observable.map<number, PlaceList>(undefined);

  @observable
  private _searchedWord = observable.box<string>(undefined);

  @observable
  private _selectedPlace = observable.box<PlaceList>(undefined);

  @observable
  private _isFront = observable.box<boolean>(true);

  @computed
  public get isLoading() {
    return this._isLoading.get();
  }

  @computed
  public get isUploadLoading() {
    return this._isUploadLoading.get();
  }

  @computed
  public get isSearchLoading() {
    return this._isSearchLoading.get();
  }

  @computed
  public get searchedWord() {
    return this._searchedWord.get();
  }

  @computed
  public get selectedPlace() {
    return this._selectedPlace.get();
  }

  @computed
  public get searchedList() {
    return [...this._searchedList.values()];
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
  setSearchWord(word: string) {
    if (word) {
      this._searchedWord.set(word);
    }
  }

  @action
  selectPlace(id: number) {
    const place = this._searchedList.get(id);
    if (place) {
      this._selectedPlace.set(place);
    }
  }

  @action
  createPost = flow(function* (
    this: CreatePostViewModel,
    dto: { body: CreatePostDto }
  ) {
    try {
      this._isUploadLoading.set(true);
      yield this._postRepo.createPost({
        body: dto.body,
      });
    } catch (error) {
      console.error(error);
      this._isError.set(true);
    } finally {
      this._isUploadLoading.set(false);
    }
  });

  @action
  uploadImages = flow(function* (
    this: CreatePostViewModel,
    dto: { body: FormData }
  ) {
    try {
      this._isUploadLoading.set(true);
      const res = yield this._postRepo.uploadImages({
        body: dto.body,
      });

      if (res) {
        this._uploadedImages.set(res[0].imageId, {
          id: res[0].imageId,
          url: res[0].uri,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      this._isUploadLoading.set(false);
    }
  });

  @action
  findPlaces = flow(function* (
    this: CreatePostViewModel,
    dto: {
      query: PlaceSearchDto;
    }
  ) {
    try {
      this._isSearchLoading.set(true);

      const searchInstances = yield this._placeRepo.findPlace({
        query: dto.query,
      });

      searchInstances.forEach((item: PlaceList) => {
        this._searchedList.set(item.placeId, item);
      });
    } catch (error) {
      throw error;
    } finally {
      this._isSearchLoading.set(false);
    }
  });
}
