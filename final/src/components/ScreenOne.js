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
import { TextInput } from "react-native-gesture-handler";

const OneMoon = ({ zone, sunrise, sunset, moonrise, moonset, moon_phase }) => {
  return (
    <View
      style={{
        padding: 4,
        color: "#fff",
        alignItems: "center"
      }}
    >
      <Text style={styles.text}>Time zone: {zone}</Text>
      <Text style={styles.text}>Sun Rise: {sunrise}</Text>
      <Text style={styles.text}>Sun Set: {sunset}</Text>
      <Text style={styles.text}>Moon Rise: {moonrise}</Text>
      <Text style={styles.text}>Moon Set: {moonset}</Text>
      <Text style={styles.text}>Moon Phase: {moon_phase}</Text>
    </View>
  );
};

export default class MoonStuff extends Component {
  static navigationOptions = {
    headerTitle: "Moon Moon"
  };
  constructor(props) {
    super(props);
    this.state = {
      location: 84111,
      moon: {
        zone: "",
        sunrise: "",
        sunset: "",
        moonrise: "",
        moonset: "",
        moon_phase: ""
      }
    };
  }

  getData() {
    let url = `http://api.worldweatheronline.com/premium/v1/astronomy.ashx?key=9d0c365a343d46419cc20240192608&q=${this.state.location}&format=json`;

    fetch(url, {
      method: "GET"
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        this.setState({ moon: json.data.time_zone });
      });
    console.log(this.state.location);
  }

  componentDidMount() {
    this.getData();
  }

  render() {
    let moon_holder = [];
    for (let i = 0; i < this.state.moon.length; i++) {
      moon_holder.push(
        <OneMoon
          key={i}
          zone={this.state.moon[i].zone}
          sunrise={this.state.moon[i].sunrise}
          sunset={this.state.moon[i].sunset}
          moonrise={this.state.moon[i].moonrise}
          moonset={this.state.moon[i].moonset}
          moon_phase={this.state.moon[i].moon_phase}
        />
      ); 
    }
    return (
      <ImageBackground
        source={require("C:/Users/amybu/Documents/MobileAppDev/final/src/components/images/moreStars.jpg")}
        style={{ width: 380, height: 620 }}
      >
        <ScrollView style={styles.inputText}>
          <Text
            style={[
              styles.text,
              { fontFamily: "Zapfino", fontSize: 30, color: "#c3eaeb" }
            ]}
          >
            Moon Phase
          </Text>
          {moon_holder}
          <TextInput
            keyboardType={"numeric"}
            placeholderTextColor="#fff"
            placeholder="Enter Zipcode Here"
            style={[
              styles.text,
              {
                borderRadius: 4,
                borderWidth: 3,
                borderColor: "#d6d7da",
                alignItems: "center",
                color: "#fff",
                marginTop: 30
              }
            ]}
            onChangeText={location => this.setState({ location })}
          />
          <Button
            title="Go"
            color="#c0d1f0"
            onPress={() => {
              this.getData();
              console.log(this.state.location);
            }}
          />

          <Text style={{ marginTop: 10, marginBottom: 20 }} />
          <Button
            color="#c0d1f0"
            title="Go to Home"
            onPress={() => this.props.navigation.navigate("Home")}
          />
          <Button
            color="#c0d1f0"
            title="Go back"
            onPress={() => this.props.navigation.goBack()}
          />
          <Button
            color="#c0d1f0"
            title="Go to Weather"
            onPress={() => this.props.navigation.navigate("S2")}
          />
          <Text style={{ paddingBottom: 30 }} />
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
    alignItems: "center",
    fontFamily: "Didot-Bold",
    fontSize: 18,
    color: "#fff",
    padding: 2
  }
});
