import {wrapHtml, cleanHtml} from "../../lib/htmlParser";

// Initial state
const initialState = {
	loading: true,
	data: {},
};

// Actions
const HOME_START_DATA_LOADING = "HomeState/START_DATA_LOADING";
const HOME_DATA_LOADED = "HomeState/DATA_LOADED";


// Action creators
function startDataLoading() {
	return {
		type: HOME_START_DATA_LOADING,
	};
}

function dataLoaded(data) {
	return {
		type: HOME_DATA_LOADED,
		data,
	};
}

export function loadHomePage() {
	return (dispatch) => {
		dispatch(startDataLoading());
		console.log("loading: https://fitnessforus.com/wp-json/wp/v2/pages/98?_embed");
		return fetch("https://fitnessforus.com/wp-json/wp/v2/pages/98?_embed")
			.then(response => response.json())
			.then(homepage => {
				homepage.title.clean = cleanHtml(`<p>${homepage.title.rendered}</p>`);
				homepage.content.webView = wrapHtml(homepage.content.rendered);

				homepage.content.webView = homepage.content.webView.replace(/\]/gmi, ">");
				homepage.content.webView = homepage.content.webView.replace(/\[/gmi, "<");
				homepage.content.webView = homepage.content.webView.replace(/&#8221;/gmi, "\"");
				homepage.content.webView = homepage.content.webView.replace(/&#8243;/gmi, "\"");

				console.log(`Loaded: ${homepage.title.clean}`);
				dispatch(dataLoaded(homepage));
			});
	};
}


// Reducer
export default function HomeStateReducer(state = initialState, action = {}) {
	switch (action.type) {
		case HOME_START_DATA_LOADING:
			return Object.assign({}, state, {
				loading: true,
			});
		case HOME_DATA_LOADED:
			return Object.assign({}, state, {
				loading: false,
				data: action.data,
			});
		default:
			return state;
	}
}
