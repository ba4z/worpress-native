/* eslint-disable no-underscore-dangle,import/no-unresolved,react/prop-types */
import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {StackNavigator} from "react-navigation";
import MainTabNavigator from "./MainTabNavigator";
import GalleryScreen from "../containers/GalleryScreen";
import AvailableInFullVersion from "../screens/AvailableInFullVersion";
import {Colors, Fonts} from "../constants";
import ArticleScreen from "../containers/ArticleScreen";
import CalendarScreen from "../containers/CalendarScreen";

const RootStackNavigator = StackNavigator(
	{
		Main: {
			screen: MainTabNavigator,
		},
		Profile: {
			screen: AvailableInFullVersion,
			navigationOptions: {
				header: null,
			}
		},
		Gallery: {
			screen: GalleryScreen,
			navigationOptions: {
				title: "Gallery",
			}
		},
		Article: {
			screen: ArticleScreen,
			navigationOptions: {},
		},
		Calendar: {
			screen: CalendarScreen,
			navigationOptions: {
				title: "Calendar",
			}
		},
	},
	{
		navigationOptions: ({navigation}) => ({
			title: (typeof navigation.state.params === "object" && navigation.state.params.title)
				? navigation.state.params.title : "",
			headerStyle: {
				backgroundColor: "#577AD9",
			},
			headerTitleStyle: {
				color: Colors.white,
				fontFamily: Fonts.primaryRegular,
			},
			headerTintColor: "#222222",
			headerLeft: props => (
				<TouchableOpacity
					onPress={props.onPress}
					style={{
						paddingLeft: 25,
					}}
				>
					<Image
						source={require("../../assets/images/icons/arrow-back.png")}
						resizeMode="contain"
						style={{
							height: 20,
						}}
					/>
				</TouchableOpacity>
			),
		}),
	},
);


export default RootStackNavigator;
