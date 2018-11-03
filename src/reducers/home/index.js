import {wrapHtml, cleanHtml} from "../../lib/htmlParser";

// Initial state
const initialState = {
	loading: true,
	lessonsLoading: true,
	posts: [],
	lessons: [],
	activeSlide: 0
};

// Actions
const HOME_START_DATA_LOADING = "HomeState/START_DATA_LOADING";
const HOME_START_LESSONS_LOADING = "HomeState/START_LESSONS_LOADING";
const HOME_DATA_LOADED = "HomeState/DATA_LOADED";
const HOME_LESSONS_LOADED = "HomeState/LESSONS_LOADED";
const HOME_SLIDE_CHANGE = "HomeState/SLIDE_CHANGED";


// Action creators
function startDataLoading() {
	return {
		type: HOME_START_DATA_LOADING,
	};
}

function dataLoaded(posts) {
	return {
		type: HOME_DATA_LOADED,
		posts,
	};
}


function startLessonLoading() {
	return {
		type: HOME_START_LESSONS_LOADING,
	};
}

function lessonsLoaded(lessons) {
	return {
		type: HOME_LESSONS_LOADED,
		lessons,
	};
}

function slideChanged(i) {
	return {
		type: HOME_SLIDE_CHANGE,
		activeSlide: i,
	};
}

export function loadLessons() {
	return (dispatch) => {
		dispatch(startLessonLoading());
		console.log("loading: http://fitnessforus.com/app/lessons.json");
		return fetch("http://fitnessforus.com/app/lessons.json")
			.then(response => response.json())
			.then(data => {
				console.log(`Loaded lessons`);
				dispatch(lessonsLoaded(data.lessons));
			});
	};
}

export function loadHomePage() {
	return (dispatch) => {
		dispatch(startDataLoading());
		console.log("loading: https://fitnessforus.com/wp-json/wp/v2/posts?_embed");
		return fetch("https://fitnessforus.com/wp-json/wp/v2/posts?_embed")
			.then(response => response.json())
			.then(posts => {
				console.log("Loaded posts");
				posts.forEach(post => {
					post.title.rendered = cleanHtml(`<p>${post.title.rendered}</p>`);
					post.excerpt.rendered = cleanHtml(post.excerpt.rendered);
				});
				dispatch(dataLoaded(posts));
			});
	};
}

export function updateSlide(slideIndex) {
	return (dispatch) => {
		return dispatch(slideChanged(slideIndex));
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
				posts: action.posts,
			});
		case HOME_START_LESSONS_LOADING:
			return Object.assign({}, state, {
				lessonsLoading: true,
				lessons: []
			});
		case HOME_LESSONS_LOADED:
			return Object.assign({}, state, {
				lessonsLoading: false,
				lessons: action.lessons,
			});
		case HOME_SLIDE_CHANGE:
			return Object.assign({}, state, {
				loading: false,
				activeSlide: action.activeSlide
			});
		default:
			return state;
	}
}
