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
import Carousel, {ParallaxImage} from "react-native-snap-carousel";
import {Button} from "../components";
import {getFeaturedMedia, removeMenu} from "../lib/htmlParser";

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
	}

	componentDidMount() {
		this.props.homeStateAction.loadLessons();
		this.props.homeStateAction.loadHomePage();
	}

	viewLesson(item) {
		// console.log(item);
		// this.props.navigate({routeName: "Article"});
	}

	viewArticle(article) {
		this.props.navigate({routeName: "Article", params: {article}});
	}

	// https://github.com/expo/videoplayer
	// https://github.com/archriss/react-native-snap-carousel#usage


	_renderLessonSlide({item, index}) {
		const shouldPlay = index === this.props.activeSlide;
		return (
			<View style={styles.slide} key={index}>

				<Video
					source={{uri: item.public.videoUrl}}
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
						onPress={() => this.viewLesson(item)}
					/>
				</View>
			</View>
		);
	}

	_renderBlogSlide({item, index}, parallaxProps) {

		return (
			<View style={styles.slide} key={index}>

				<ParallaxImage
					source={{uri: getFeaturedMedia(item, "medium_large")}}
					containerStyle={styles.imageContainer}
					style={styles.image}
					parallaxFactor={0.4}
					{...parallaxProps}
				/>


				<View style={{backgroundColor: "white", padding: 20}}>
					<Text style={styles.subtitle}>{item.title.rendered}</Text>
					<Text numberOfLines={3} style={{marginBottom: 10}}>{item.excerpt.rendered}</Text>
					<Button
						style={styles.demoButton}
						primary
						caption="Read More"
						onPress={() => this.viewArticle(item)}
					/>
				</View>
			</View>
		);
	}

	render() {

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
							this._lessonCarousel = c;
						}}
						data={this.props.lessons}
						renderItem={({item, index}) => this._renderLessonSlide({item, index})}
						sliderWidth={Dimensions.get("window").width}
						itemWidth={Dimensions.get("window").width - 75}
						containerCustomStyle={{marginBottom: 25}}
						onSnapToItem={(index) => this.props.homeStateAction.updateSlide(index)}
					/>

					<Text style={styles.title}>Moment with Monique</Text>

					{this.props.posts && this.props.posts.length > 0 && (
						<Carousel
							ref={(c) => {
								this._postsCarousel = c;
							}}
							data={this.props.posts}
							renderItem={({item, index}, parallaxProps) => this._renderBlogSlide({item, index}, parallaxProps)}
							sliderWidth={Dimensions.get("window").width}
							itemWidth={Dimensions.get("window").width - 75}
							containerCustomStyle={{marginBottom: 25}}
							hasParallaxImages={true}
						/>)}
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
		height: 200,
		width: 300
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
