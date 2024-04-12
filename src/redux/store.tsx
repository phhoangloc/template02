import { configureStore } from "@reduxjs/toolkit";

import ThemeReducer from "./reducer/ThemeReduce";
import UserReducer from "./reducer/UserReduce";
import RefreshReducer from "./reducer/RefreshReduce";
import MenuReducer from "./reducer/MenuReduce";
import AlertReducer from "./reducer/alertReducer";
import NoticeReducer from "./reducer/noticeReducer";
const store = configureStore({
    reducer: {
        theme: ThemeReducer.reducer,
        user: UserReducer.reducer,
        menu: MenuReducer.reducer,
        refresh: RefreshReducer.reducer,
        alert: AlertReducer.reducer,
        notice: NoticeReducer.reducer,
    }
})

export default store