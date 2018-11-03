import React from "react";
import {LinearGradient, Video} from "expo";
import {
	StyleSheet,
	View,
	Linking,
	ImageBackground, ScrollView, Animated, Dimensions, Image
} from "react-native";
import {Fonts, Colors} from "../constants";
import {Text, Title} from "../components/StyledText";
import Carousel, {Pagination} from "react-native-snap-carousel";
import {Button} from "../components";

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

	state = {
		anim: new Animated.Value(0),
	};

	constructor(props) {
		super(props);
		// this.props.homeStateAction.loadHomePage();
	}

	fadeIn(delay, from = 0) {
		const {anim} = this.state;
		return {
			opacity: anim.interpolate({
				inputRange: [delay, Math.min(delay + 500, 3000)],
				outputRange: [0, 1],
				extrapolate: "clamp",
			}),
			transform: [{
				translateY: anim.interpolate({
					inputRange: [delay, Math.min(delay + 500, 3000)],
					outputRange: [from, 0],
					extrapolate: "clamp",
				}),
			}],
		};
	}


	// https://github.com/expo/videoplayer
	// https://github.com/archriss/react-native-snap-carousel#usage


	_renderItem({item, index}) {
		const shouldPlay = index === this.props.activeSlide;
		return (
			<View style={styles.slide} key={index}>

				<Video
					source={{uri: item.illustration}}
					rate={0.9}
					isMuted={true}
					style={styles.video}
					resizeMode="cover"
					shouldPlay={shouldPlay}
					isLooping
				/>

				<View style={{backgroundColor: "white", padding: 20}}>
					<Text style={styles.subtitle}>{item.title}</Text>
					<Button
						style={styles.demoButton}
						primary
						caption="Watch Now"
						onPress={this.buttonClicked}
					/>
				</View>
			</View>
		);
	}

	render() {
		const entries = [
			{
				title: "Beautiful and dramatic Antelope Canyon",
				subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
				illustration: "https://player.vimeo.com/external/249951185.m3u8?s=6a94b3e4fd42d5640045b398a8bf2a9d34f96bad&oauth2_token_id=1133776774"
			},
			{
				title: "Earlier this morning, NYC",
				subtitle: "Lorem ipsum dolor sit amet",
				illustration: "https://player.vimeo.com/external/249198343.m3u8?s=283633ceabb3ce87fd0f61ee7645edce9f3f1a25&oauth2_token_id=1133776774"
			},
			{
				title: "White Pocket Sunset",
				subtitle: "Lorem ipsum dolor sit amet et nuncat ",
				illustration: "https://player.vimeo.com/external/249198149.m3u8?s=31ba98e2077c71408cd9f20a4b2dc81f1f3a557c&oauth2_token_id=1133776774"
			},
			{
				title: "Acrocorinth, Greece",
				subtitle: "Lorem ipsum dolor sit amet et nuncat mergitur",
				illustration: "https://player.vimeo.com/external/249950889.m3u8?s=2f0164e65276f1f74bd2dedca93623c6daede2fb&oauth2_token_id=1133776774"
			},
			{
				title: "The lone tree, majestic landscape of New Zealand",
				subtitle: "Lorem ipsum dolor sit amet",
				illustration: "https://player.vimeo.com/external/249198149.m3u8?s=31ba98e2077c71408cd9f20a4b2dc81f1f3a557c&oauth2_token_id=1133776774"
			},
		];
		console.log(this.props.activeSlide);
		return (
			<ScrollView>
				<View style={{flex: 1, paddingTop: 25}}>

					<View style={{alignItems: "center", justifyContent: "center"}}>
						<Image
							resizeMode="contain"
							style={styles.logo}
							source={{uri: "https://fitnessforus.com/wp-content/uploads/2018/02/FFU-Logo-Final-basic-full.png"}}
						/>
					</View>


					<Text style={styles.title}>Fitness Guide</Text>

					<Carousel
						ref={(c) => {
							this._carousel = c;
						}}
						// layout={'stack'}
						data={entries}
						renderItem={({item, index}) => this._renderItem({item, index})}
						sliderWidth={Dimensions.get("window").width}
						itemWidth={Dimensions.get("window").width - 75}
						containerCustomStyle={{marginBottom: 25}}
						onSnapToItem={(index) => this.props.homeStateAction.updateSlide(index)}
					/>

					<Text style={styles.title}>Moment with Monique</Text>
				</View>
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
		color: Colors.primary,
		fontFamily: Fonts.primaryBold,
		fontSize: 25,
		paddingBottom: 10,
		marginLeft: 40
	},
	subtitle: {
		color: Colors.primary,
		fontFamily: Fonts.primaryBold,
		fontSize: 17,
		paddingBottom: 10
	},
	price: {
		marginBottom: 5,
	},
	priceLink: {
		borderBottomWidth: 1,
		borderBottomColor: Colors.primary,
	},
	logo: {
		height: 100,
		width: "90%"
	},
	slide: {
		borderRadius: 10,
		backgroundColor: "white",
		overflow: "hidden"
	},
	imageContainer: {
		backgroundColor: "white",
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
	},
	image: {
		resizeMode: "cover",
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
	},
	video: {
		width: "100%",
		height: 250,
	},
	paginationContainer: {
		flex: 1,
		backgroundColor: "white"
	}
});
