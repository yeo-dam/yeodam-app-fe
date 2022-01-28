import { useLocalObservable } from "mobx-react-lite";
import React, { PropsWithChildren, useContext } from "react";
import MainViewModel from "./Main/Main.vm";
import MyPageViewModel from "./MyPage/MyPage.vm";
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
import DecodedIdTokenModel from "~domain/model/DecodedIdTokenModel";

export type InitialData = {
  auth?: {
    decodedIdToken: DecodedIdTokenModel;
    accessToken: string;
    refreshToken: string;
  };
};

const createViewModel = ({ auth }: InitialData) => {
  return {
    tab: {
      Main: MainViewModel.GetInstance({ accessToken: auth?.accessToken }),
      Search: SearchViewModel.GetInstance({ accessToken: auth?.accessToken }),
      Comment: CommentViewModel.GetInstance({ accessToken: auth?.accessToken }),
      Post: PostViewModel.GetInstance({ accessToken: auth?.accessToken }),
      MyPage: MyPageViewModel.GetInstance({ accessToken: auth?.accessToken }),
      Likes: LikeViewModel.GetInstance({ accessToken: auth?.accessToken }),
      Map: MapViewModel.GetInstance({ accessToken: auth?.accessToken }),
      User: UserViewModel.GetInstance({ accessToken: auth?.accessToken }),
      Setting: SettingViewModel.GetInstance({ accessToken: auth?.accessToken }),
      Event: EventViewModel.GetInstance({ accessToken: auth?.accessToken }),
      Notice: NoticeViewModel.GetInstance({ accessToken: auth?.accessToken }),
      Notification: NotificationViewModel.GetInstance({
        accessToken: auth?.accessToken,
      }),
      Policy: PolicyViewModel.GetInstance({ accessToken: auth?.accessToken }),
      ProfileEdit: ProfileEditViewModel.GetInstance({
        accessToken: auth?.accessToken,
      }),
    },
    auth,
  };
};

export type RootViewModel = ReturnType<typeof createViewModel>;
const vmCtx = React.createContext<RootViewModel | null>(null);

const ViewModelProvider: React.FunctionComponent<
  PropsWithChildren<InitialData>
> = ({ auth, children }) => {
  const store = useLocalObservable(() => createViewModel({ auth }));
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
