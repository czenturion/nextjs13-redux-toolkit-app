import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "./features/counterSlice";
import { charactersApi } from "./services/charactersApi";
import { setupListeners } from "@reduxjs/toolkit/query";

export const store = configureStore({
    reducer: {
        counterReducer,
        [charactersApi.reducerPath]: charactersApi.reducer,
    },
    devTools: process.env.NODE_ENV !== "production",
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({}).concat([charactersApi.middleware]),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
