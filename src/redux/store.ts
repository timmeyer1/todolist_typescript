import { configureStore } from "@reduxjs/toolkit";
import noteReducer from "./note/noteSlice";

const store = configureStore({
    reducer: {
        // todo ici les reducers
        note: noteReducer
    }
})

export default store;

// 1. définir le Rootstate pour utiliser les selecteurs
export type RootState = ReturnType<typeof store.getState>;

// 2. Définir le type AppDispatch pour utiliser les actions asynchrones
export type AppDispatch = typeof store.dispatch;