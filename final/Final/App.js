import React from "react";
import { Button, View, Text, Image, ImageBackground } from "react-native";
import { createAppContainer, createStackNavigator } from "react-navigation";
import ScreenOne from "./src/components/ScreenOne";
import ScreenTwo from "./src/components/ScreenTwo";

class LogoTitle extends React.Component {
  render() {
    return (
      <Image
        source={require("C:/Users/amybu/Documents/MobileAppDev/final/src/components/images/star.png")}
        style={{ width: 30, height: 30 }}
      />
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    headerTitle: <LogoTitle />,
    headerRight: (
      <Button
        onPress={() => alert("This is a button!")}
        title="Info"
        color="#fff"
      />
    )
  };
  render() {
    return (
      <ImageBackground
        source={require("C:/Users/amybu/Documents/MobileAppDev/final/src/components/images/starrySky.jpg")}
        style={{ width: 400, height: 650 }}
      >
        <View
          style={{
            flex: 1,
            alignItems: "center",
            justifyContent: "center"
          }}
        >
          <Text
            style={{
              fontSize: 40,
              color: "#f50c46",
              fontFamily: "Copperplate"
            }}
          >
            Weathre More
          </Text>
        
            <Button
              title="Moon Stuff"
              color='#fff'
              onPress={() => this.props.navigation.navigate("S1")}
            />
          
            <Button
              title="Weather"
              color='#fff'
              onPress={() => this.props.navigation.navigate("S2")}
            />
        
        </View>
      </ImageBackground>
    );
  }
}

const RootStack = createStackNavigator(
  {
    Home: {
      screen: HomeScreen
    },
    S1: {
      screen: ScreenOne
    },
    S2: {
      screen: ScreenTwo
    }
  },
  {
    initialRouteName: "Home",
    defaultNavigationOptions: {
      headerStyle: {
        backgroundColor: "#170e75"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        fontWeight: "bold"
      }
    }
  }
);

const AppContainer = createAppContainer(RootStack);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
