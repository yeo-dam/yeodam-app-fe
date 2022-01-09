import { useLocalObservable } from "mobx-react-lite";
import React, { useContext } from "react";
import MainViewModel from "./Main/Main.vm";
import MyPageViewModel from "./MyPage/MyPage.vm";
import CreateViewModel from "./Create/Create.vm";
import SearchViewModel from "./Main/Search/Search.vm";
import CommentViewModel from "./Main/Comment/Comment.vm";
import LikeViewModel from "./MyPage/Likes/Likes.vm";
import MapViewModel from "./MyPage/Map/Map.vm";
import SettingViewModel from "./MyPage/Setting/Setting.vm";
import ProfileEditViewModel from "./MyPage/Setting/ProfileEdit/ProfileEdit.vm";
import EventViewModel from "./MyPage/Setting/Event/Event.vm";
import NoticeViewModel from "./MyPage/Setting/Notice/Notice.vm";
import NotificationViewModel from "./MyPage/Setting/Notification/Notification.vm";
import PolicyViewModel from "./MyPage/Setting/Policy/Policy.vm";
import UserViewModel from "./MyPage/Users/UserList.vm";
import PostViewModel from "./Create/Post/Post.vm";
import StoryViewModel from "./Create/Story/Story.vm";

const createViewModel = () => {
  return {
    tab: {
      Main: MainViewModel.GetInstance(),
      Search: SearchViewModel.GetInstance(),
      Comment: CommentViewModel.GetInstance(),
      Create: CreateViewModel.GetInstance(),
      Post: PostViewModel.GetInstance(),
      Story: StoryViewModel.GetInstance(),
      MyPage: MyPageViewModel.GetInstance(),
      Likes: LikeViewModel.GetInstance(),
      Map: MapViewModel.GetInstance(),
      User: UserViewModel.GetInstance(),
      Setting: SettingViewModel.GetInstance(),
      Event: EventViewModel.GetInstance(),
      Notice: NoticeViewModel.GetInstance(),
      Notification: NotificationViewModel.GetInstance(),
      Policy: PolicyViewModel.GetInstance(),
      ProfileEdit: ProfileEditViewModel.GetInstance(),
    },
  };
};

export type RootViewModel = ReturnType<typeof createViewModel>;
const vmCtx = React.createContext<RootViewModel | null>(null);

const ViewModelProvider: React.FunctionComponent = ({ children }) => {
  const store = useLocalObservable(() => createViewModel());
  return <vmCtx.Provider value={store}>{children}</vmCtx.Provider>;
};

export const getRootViewModel = function <Selection>(
  dataSelector: (rootVm: RootViewModel) => Selection
) {
  return (function <ContextData, Store>(
    context: React.Context<ContextData>,
    storeSelector: (contextData: ContextData) => Store,
    dataSelectorFunc: (store: Store) => Selection
  ) {
    const value = useContext(context);
    if (!value) {
      throw new Error("useStore must be used within a StoreProvider");
    }
    const store = storeSelector(value);
    return dataSelectorFunc(store);
  })(vmCtx, (contextData) => contextData!, dataSelector);
};

export default ViewModelProvider;
