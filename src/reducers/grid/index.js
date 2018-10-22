import {wrapHtml, cleanHtml} from "../../lib/htmlParser";


// Initial state
const initialState = {
	tabIndex: 0,
	tabs: ["Grid", "List 1", "List 2"],
	loading: true,
	data: [],
};

// Actions
const SWITCH_TAB = "GridState/SWITCH_TAB";
const START_DATA_LOADING = "GridState/START_DATA_LOADING";
const DATA_LOADED = "GridState/DATA_LOADED";

// Action creators
function switchGridTab(index) {
	return {
		type: SWITCH_TAB,
		payload: index,
	};
}

function startDataLoading() {
	return {
		type: START_DATA_LOADING,
	};
}

function dataLoaded(data) {
	return {
		type: DATA_LOADED,
		data,
	};
}

export function switchTab(index) {
	return (dispatch) => {
		dispatch(switchGridTab(index));
	};
}

export function loadData() {
	return (dispatch) => {
		dispatch(startDataLoading());
		return fetch("https://fitnessforus.com/wp-json/wp/v2/posts?_embed")
			.then(response => response.json())
			.then(json => {
				// process articles
				json.map(item => {
					item.title.clean = cleanHtml(`<p>${item.title.rendered}</p>`);
					item.excerpt.clean = cleanHtml(item.excerpt.rendered);
					item.content.webView = wrapHtml(item.content.rendered);
					return item;
				});
				dispatch(dataLoaded(json));
			});
	};
}


// Reducer
export default function GridStateReducer(state = initialState, action = {}) {
	switch (action.type) {
		case SWITCH_TAB:
			return Object.assign({}, state, {
				tabIndex: action.payload,
			});
		case START_DATA_LOADING:
			return Object.assign({}, state, {
				loading: true,
			});
		case DATA_LOADED:
			return Object.assign({}, state, {
				loading: false,
				data: action.data,
			});
		default:
			return state;
	}
}
