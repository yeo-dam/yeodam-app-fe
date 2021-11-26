import { useLocalObservable } from "mobx-react-lite";
import React, { useContext } from "react";
import TabOneViewModel from "./TabOne/TabOne.vm";
import TabThreeViewModel from "./TabThree/TabThree.vm";
import TabTwoViewModel from "./TabTwo/TabTwo.vm";

const createViewModel = () => {
  return {
    tab: {
      tabOne: TabOneViewModel.GetInstance(),
      tabTwo: TabTwoViewModel.GetInstance(),
      tabThree: TabThreeViewModel.GetInstance(),
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
