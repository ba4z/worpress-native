
// Initial state
import {removeMenuAndFooter} from "../../lib/htmlParser";

const initialState = {
	loading: true,
	articleHtml: false,
};

// Actions
const ARTICLE_START_DATA_LOADING = "ArticleState/START_DATA_LOADING";
const ARTICLE_DATA_LOADED = "ArticleState/DATA_LOADED";


// Action creators
function startDataLoading() {
	return {
		type: ARTICLE_START_DATA_LOADING,
		articleHtml: false
	};
}

function dataLoaded(articleHtml) {
	return {
		type: ARTICLE_DATA_LOADED,
		articleHtml,
	};
}


export function loadArticle(articleUrl) {
	return (dispatch) => {
		dispatch(startDataLoading());
		console.log(articleUrl);
		return fetch(articleUrl)
			.then(resp =>{ return resp.text()})
			.then(resp => {
				console.log("article loaded");
				dispatch(dataLoaded(removeMenuAndFooter(resp)));
			});
	};
}

// Reducer
export default function ArticleReducer(state = initialState, action = {}) {
	switch (action.type) {
		case ARTICLE_START_DATA_LOADING:
			return Object.assign({}, state, {
				loading: true,
				articleHtml: false
			});
		case ARTICLE_DATA_LOADED:
			return Object.assign({}, state, {
				loading: false,
				articleHtml: action.articleHtml,
			});
		default:
			return state;
	}
}
