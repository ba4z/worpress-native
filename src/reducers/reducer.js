// @flow
import {combineReducers} from "redux";
import NavigationStateReducer from "./navigation";
import CalendarReducer from "./calendar";
import GridReducer from "./grid";
import HomeReducer from "./home";

// ## Generator Reducer Imports
import GalleryReducer from "./gallery";
import AuthReducer from "./auth";
import ArticleReducer from "./article";

export default combineReducers({
	navigation: NavigationStateReducer,
	calendar: CalendarReducer,
	grid: GridReducer,
	home: HomeReducer,
	article: ArticleReducer,

	// ## Generator Reducers
	gallery: GalleryReducer,
	auth: AuthReducer,
});
