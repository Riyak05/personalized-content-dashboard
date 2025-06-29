"use client";
import { Provider } from "react-redux";
import { store } from "../features/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../features/store";

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
