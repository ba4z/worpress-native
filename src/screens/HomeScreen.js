import React from "react";
import HTML from "react-native-render-html";
import {
	StyleSheet,
	View,
	Linking,
	ImageBackground, ScrollView, Animated, Dimensions
} from "react-native";
import {Fonts, Colors} from "../constants";
import {Text, Title} from "../components/StyledText";

import {renderers} from "../lib/htmlParser";

const rnsUrl = "https://fitnessforus.com";
const handleClick = () => {
	Linking.canOpenURL(rnsUrl).then(supported => {
		if(supported) {
			Linking.openURL(rnsUrl);
		} else {
			console.log("Don't know how to open URI: " + rnsUrl);
		}
	});
};

export default class HomeScreen extends React.Component {

	constructor(props) {
		super(props);
		this.props.homeStateAction.loadHomePage();
	}

	render() {

		const homepage = this.props.data;
		return (
			<ScrollView style={{flex: 1, backgroundColor: "white"}}>
				<HTML html={homepage.content.webView} imagesMaxWidth={Dimensions.get("window").width}
				      renderers={renderers}/>
			</ScrollView>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: "space-around",
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
		paddingTop: 20
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
	logo: {
		height: 200,
		width: "90%"
	},
});
