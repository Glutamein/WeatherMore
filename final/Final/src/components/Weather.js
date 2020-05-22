import React, { Component } from "react";
import {
  View,
  Text,
  Picker,
  Button,
  StyleSheet,
  ScrollView,
  ImageBackground
} from "react-native";

const OneArticle = ({
  zone,
  sunrise,
  sunset,
  moonrise,
  moonset,
  moon_phase
}) => {
  return (
    <View
      style={{
        borderBottomColor: "#000",
        borderBottomWidth: 4,
        padding: 4,
        color: "#fff",
        alignItems: "center"
      }}
    >
      <Text style={{ color: "#fff", padding: 2 }}>Time zone: {zone}</Text>
      <Text style={{ color: "#fff", padding: 2 }}>Sun Rise: {sunrise}</Text>
      <Text style={{ color: "#fff", padding: 2 }}>Sun Set: {sunset}</Text>
      <Text style={{ color: "#fff", padding: 2 }}>Moon Rise: {moonrise}</Text>
      <Text style={{ color: "#fff", padding: 2 }}>Moon Set: {moonset}</Text>
      <Text style={{ color: "#fff", padding: 2 }}>Moon Phase: {moon_phase}</Text>
    </View>
  );
};

export default class Constellation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: "Salt Lake City"
    };
  }

  getData() {
        let url  = `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=9d0c365a343d46419cc20240192608&q=${this.state.location}&format=json&num_of_days=5`;

    fetch(url, {
      method: "GET"
    })
      .then(response => response.json())
      .then(json => {
        this.setState({ gif: json.data});
      });
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    return (
      <ImageBackground
        source={require("C:/Users/amybu/Documents/MobileAppDev/final/src/components/images/moreStars.jpg")}
        style={{ width: 400, height: 620 }}
      >
        <ScrollView style={styles.inputText}>
          <Text
            style={[
              styles.text,
              { fontFamily: "Zapfino", fontSize: 30, color: "#f50c46" }
            ]}
          >
            Moon stuff
          </Text>
          <OneArticle></OneArticle>
          <Button
            title="Go to Home"
            onPress={() => this.props.navigation.navigate("Home")}
          />
          <Button
            title="Go back"
            onPress={() => this.props.navigation.goBack()}
          />
          <Button
            title="Go to Star Facts"
            onPress={() => this.props.navigation.navigate("S2")}
          />
          <Text />
        </ScrollView>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  inputText: {
    color: "#97aabf",
    padding: 10
  },
  text: {
    textAlign: "center",
    padding: 7,
    paddingBottom: 10,
    alignItems: "center"
  }
});
