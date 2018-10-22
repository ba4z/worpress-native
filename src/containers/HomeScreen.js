import {connect} from "react-redux";
import {compose} from "recompose";

import HomeView from "../screens/HomeScreen";
import {bindActionCreators} from "redux";
import {NavigationActions} from "react-navigation";
import * as HomeStateActions from "../reducers/home";

export default compose(
	connect(
		state => ({
			data: state.home.data,
		}),
		dispatch => ({
			navigate: bindActionCreators(NavigationActions.navigate, dispatch),
			homeStateAction: bindActionCreators(HomeStateActions, dispatch),
		}),
	),
)(HomeView);
