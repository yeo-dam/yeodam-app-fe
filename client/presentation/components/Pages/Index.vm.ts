import { useLocalObservable } from "mobx-react-lite";
import React from "react";
import TabOneViewModel from "./TabOne/TabOne.vm";
import TabThreeViewModel from "./TabThree/TabThree.vm";
import TabTwoViewModel from "./TabTwo/TabTwo.vm";

export type InitialData = {};

const createViewModel = (_initialData: InitialData) => {
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

// TODO : vmCtx 왜 안되는지 Context API 학습하면서 알아 볼 것.
const ViewModelProvider: React.FunctionComponent<{ initialData: InitialData }> =
  ({ children, initialData }) => {
    const store = useLocalObservable(() => createViewModel(initialData));
    return <vmCtx.Provider value={store}>{children}</vmCtx.Provider>;
  };
