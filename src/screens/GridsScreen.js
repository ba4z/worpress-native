import React from "react";
import {
	StyleSheet,
	View,
	Platform,
	Text,
	FlatList,
	TouchableOpacity,
	ImageBackground,
	Image,
	Dimensions,
} from "react-native";
import {Colors, Fonts} from "../constants";
import Moment from "moment";
import {RadioGroup, GridRow} from "../components";

const dateFormat = "MMM Do, YYYY";

export default class GridsScreen extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			selectedTabIndex: 0,
		};

		this._openArticle = this._openArticle.bind(this);
		this.renderRowOne = this.renderRowOne.bind(this);
		this.renderRowTwo = this.renderRowTwo.bind(this);
		this.renderRowThree = this.renderRowThree.bind(this);
	}

	componentDidMount() {
		this.props.gridStateActions.loadData();
	}

	_getRenderItemFunction() {
		return [this.renderRowOne, this.renderRowTwo, this.renderRowThree][this.props.tabIndex];
	}

	_openArticle(article) {
		this.props.navigate({routeName: "Article", params: {article}});
	}

	renderRowOne(rowData) {
		const cellViews = rowData.item.map(item => (
			<TouchableOpacity
				key={item.id}
				onPress={() => this._openArticle(item)}
			>
				<View style={styles.itemOneContainer}>
					<View style={styles.itemOneImageContainer}>
						<Image
							style={styles.itemOneImage}
							source={{uri: item._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url}}
						/>
					</View>
					<View style={styles.itemOneContent}>
						<Text style={styles.itemOneTitle} numberOfLines={1}>{item.title.clean}</Text>
						<Text style={styles.itemOneSubTitle} styleName="collapsible"
						      numberOfLines={3}>{item.excerpt.clean}</Text>
					</View>
				</View>
			</TouchableOpacity>
		));
		return (
			<View
				key={rowData.item[0].id}
				style={styles.itemOneRow}>
				{cellViews}
			</View>
		);
	}

	renderRowTwo({item}) {
		return (
			<TouchableOpacity
				key={item.id}
				style={styles.itemTwoContainer}
				onPress={() => this._openArticle(item)}
			>
				<View style={styles.itemTwoContent}>
					<Image
						style={styles.itemTwoImage}
						source={{uri: item._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url}}
					/>
					<View style={styles.itemTwoOverlay}/>
					<Text style={styles.itemTwoTitle}>{item.title.clean}</Text>
					<Text style={styles.itemTwoSubTitle} numberOfLines={2}>{item.excerpt.clean}</Text>
					<Text style={styles.itemTwoPrice}>{Moment(item.date).format(dateFormat)}</Text>
				</View>
			</TouchableOpacity>
		);
	}

	renderRowThree({item}) {
		return (
			<TouchableOpacity
				key={item.id}
				style={styles.itemThreeContainer}
				onPress={() => this._openArticle(item)}
			>
				<View style={styles.itemThreeSubContainer}>
					<Image
						source={{uri: item._embedded["wp:featuredmedia"][0].media_details.sizes.medium.source_url}}
						style={styles.itemThreeImage}
					/>
					<View style={styles.itemThreeContent}>
						<Text style={styles.itemThreeTitle} numberOfLines={1}>{item.title.clean}</Text>
						<Text style={styles.itemThreeSubtitle} numberOfLines={2}>{item.excerpt.clean}</Text>
						<View style={styles.itemThreeMetaContainer}>
							{item.badge && (
								<View
									style={[styles.badge, item.badge === "NEW" && {backgroundColor: Colors.green}]}
								>
									<Text style={{fontSize: 10, color: Colors.white}}
									      styleName="bright">{item.badge}</Text>
								</View>
							)}
							<Text style={styles.itemThreePrice}>{Moment(item.date).format(dateFormat)}</Text>
						</View>
					</View>
				</View>
				<View style={styles.itemThreeHr}/>
			</TouchableOpacity>
		);
	}

	render() {
		const groupedData = this.props.tabIndex === 0 ?
			GridRow.groupByRows(this.props.data, 2) : this.props.data;

		console.log(typeof groupedData);

		return (
			<View style={styles.container}>
				<View style={{height: 50}}>
					<RadioGroup
						selectedIndex={this.props.tabIndex}
						items={this.props.tabs}
						onChange={this.props.gridStateActions.switchTab}
						underline
					/>
				</View>

				{groupedData && (

					<FlatList
						key={item => item.id || item[0] && item[0].id}
						style={{backgroundColor: Colors.white, paddingHorizontal: 15,}}
						data={groupedData}
						renderItem={this._getRenderItemFunction()}
						onRefresh={this.props.gridStateActions.loadData}
						refreshing={!this.props.data || this.props.data.length === 0 }
					/>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.white,
	},
	tabsContainer: {
		alignSelf: "stretch",
		marginTop: 30,
	},
	itemOneContainer: {
		flex: 1,
		width: (Dimensions.get("window").width / 2 - 40),
	},
	itemOneImageContainer: {
		borderRadius: 3,
		overflow: "hidden",
	},
	itemOneImage: {
		height: 200,
		width: (Dimensions.get("window").width / 2 - 40),
	},
	itemOneTitle: {
		fontFamily: Fonts.primaryRegular,
		fontSize: 15,
	},
	itemOneSubTitle: {
		fontFamily: Fonts.primaryRegular,
		fontSize: 13,
		color: "#B2B2B2",
		marginVertical: 3,
	},
	itemOnePrice: {
		fontFamily: Fonts.primaryRegular,
		fontSize: 15,
	},
	itemOneRow: {
		flexDirection: "row",
		justifyContent: "space-around",
		marginTop: 10,
	},
	itemOneContent: {
		marginTop: 5,
		marginBottom: 10,
	},
	itemTwoContainer: {
		paddingBottom: 10,
		backgroundColor: "white",
		marginVertical: 5,
	},
	itemTwoContent: {
		padding: 20,
		position: "relative",
		marginHorizontal: Platform.OS === "ios" ? -15 : 0,
		height: 150,
		justifyContent: "space-between"
	},
	itemTwoTitle: {
		color: Colors.white,
		fontFamily: Fonts.primaryBold,
		fontSize: 20,
	},
	itemTwoSubTitle: {
		color: Colors.white,
		fontFamily: Fonts.primaryRegular,
		fontSize: 15,
		marginVertical: 5,
	},
	itemTwoPrice: {
		color: Colors.white,
		fontFamily: Fonts.primaryBold,
		fontSize: 12,
	},
	itemTwoImage: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
	},
	itemTwoOverlay: {
		position: "absolute",
		left: 0,
		right: 0,
		top: 0,
		bottom: 0,
		backgroundColor: "#6271da",
		opacity: 0.5,
	},
	itemThreeContainer: {
		backgroundColor: "white",
	},
	itemThreeSubContainer: {
		flexDirection: "row",
		paddingVertical: 10,
	},
	itemThreeImage: {
		height: 100,
		width: 100,
	},
	itemThreeContent: {
		flex: 1,
		paddingLeft: 15,
		justifyContent: "space-between"
	},
	itemThreeBrand: {
		fontFamily: Fonts.primaryRegular,
		fontSize: 14,
		color: "#617ae1",
	},
	itemThreeTitle: {
		fontFamily: Fonts.primaryBold,
		fontSize: 16,
		color: "#5F5F5F",
	},
	itemThreeSubtitle: {
		fontFamily: Fonts.primaryRegular,
		fontSize: 12,
		color: "#a4a4a4",
	},
	itemThreeMetaContainer: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	itemThreePrice: {
		fontFamily: Fonts.primaryRegular,
		fontSize: 15,
		color: "#5f5f5f",
		textAlign: "right",
	},
	itemThreeHr: {
		flex: 1,
		height: 1,
		backgroundColor: "#e3e3e3",
		marginRight: -15,
	},
	badge: {
		backgroundColor: Colors.secondary,
		borderRadius: 10,
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
});
