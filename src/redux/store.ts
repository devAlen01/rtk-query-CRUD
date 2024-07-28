import { configureStore } from "@reduxjs/toolkit";
import { crudApi } from "./api/crudApi";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
  reducer: {
    [crudApi.reducerPath]: crudApi.reducer,
  },
  middleware: (getDefaultMidleware) =>
    getDefaultMidleware().concat(crudApi.middleware),
});

export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
