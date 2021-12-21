import { useLocalObservable } from "mobx-react-lite";
import React, { useContext } from "react";
import MainViewModel from "./Main/Main.vm";
import MyPageViewModel from "./MyPage/MyPage.vm";
import CreateViewModel from "./Create/Create.vm";

const createViewModel = () => {
  return {
    tab: {
      Main: MainViewModel.GetInstance(),
      Create: CreateViewModel.GetInstance(),
      MyPage: MyPageViewModel.GetInstance(),
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
