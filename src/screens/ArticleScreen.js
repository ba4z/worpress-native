import React from "react";
import {
	StyleSheet,
	View,
	WebView,
	Text
} from "react-native";

import {Fonts, Colors} from "../constants";

export default class ArticleScreen extends React.Component {

	constructor(props) {
		super(props);
		this.props.articleStateActions.loadArticle(props.navigation.state.params.article.guid.rendered);
		this.props.navigation.setParams({title: props.navigation.state.params.article.title.rendered});
	}

	onLoadError(err) {
		console.log("Error during page load:");
		console.log(err);
	}

	render() {
		const article = this.props.articleHtml;
		if(!article) {
			return  (
				<View></View>
			);
		}
		return (
			<View style={styles.container}>
				<WebView
					allowsInlineMediaPlayback={true}
					scalesPageToFit={true}
					originWhitelist={["*"]}
					onError={this.onLoadError}
					renderError={this.onLoadError}
					startInLoadingState={true}
					source={{html: article, baseUrl: "https://fitnessforus.com"}}/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	bgImage: {
		flex: 1,
		marginHorizontal: -20,
	},
	section: {
		flex: 1,
		paddingHorizontal: 20,
		justifyContent: "center",
		alignItems: "center",
	},
	sectionLarge: {
		flex: 2,
		justifyContent: "space-around",
	},
	sectionHeader: {
		marginBottom: 8,
	},
	priceContainer: {
		alignItems: "center",
	},
	description: {
		padding: 15,
		lineHeight: 25,
	},
	titleDescription: {
		color: "#19e7f7",
		textAlign: "center",
		fontFamily: Fonts.primaryRegular,
		fontSize: 15,
	},
	title: {
		marginTop: 30,
	},
	price: {
		marginBottom: 5,
	},
	priceLink: {
		borderBottomWidth: 1,
		borderBottomColor: Colors.primary,
	},
});
