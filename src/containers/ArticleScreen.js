import {connect} from "react-redux";
import {compose, withState} from "recompose";

import ArticleScreen from "../screens/ArticleScreen";
import {bindActionCreators} from "redux";
import {NavigationActions} from "react-navigation";
import * as ArticleStateActions from "../reducers/article";

export default compose(
	connect(
		state => ({
			loading: state.article.loading,
			articleHtml: state.article.articleHtml,
		}),
		dispatch => ({
			navigate: bindActionCreators(NavigationActions.navigate, dispatch),
			articleStateActions: bindActionCreators(ArticleStateActions, dispatch),
		}),
	),
	withState("isExtended", "setIsExtended", false),
)(ArticleScreen);
