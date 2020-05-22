import React, { Component } from "react";
import {
  View,
  Text,
  Picker,
  Button,
  StyleSheet,
  ScrollView,
  ImageBackground,
  TextInput
} from "react-native";

const OneTree = ({
  observation_time,
  temp_C,
  temp_F,
  uvIndex,
  windspeedMiles,
  FeelsLikeC,
  FeelsLikeF,
  humidity
}) => {
  return (
    <View
      style={{
        borderBottomColor: "#000",
        borderBottomWidth: 4,
        padding: 4,
        alignItems: "center"
      }}
    >
      <Text style={styles.text}>Time: {observation_time}</Text>
      <Text style={styles.text}>Temp in Celsius: {temp_C} &#176;C</Text>
      <Text style={styles.text}>Feels like: {FeelsLikeC} &#176;C</Text>
      <Text style={styles.text}>Temp in Fahrenheit: {temp_F} &#176;F</Text>
      <Text style={styles.text}>Feels like: {FeelsLikeF} &#176;F</Text>
      <Text style={styles.text}>UV Index: {uvIndex}</Text>
      <Text style={styles.text}>Wind mph: {windspeedMiles}</Text>
      <Text style={styles.text}>Humidity: {humidity}% </Text>
    </View>
  );
};

const AllDay = ({ date, maxtempC, mintempC, maxtempF, mintempF, sunHour }) => {
  return (
    <View
      style={{
        borderBottomColor: "#000",
        borderBottomWidth: 4,
        padding: 4,
        alignItems: "center"
      }}
    >
      <Text style={styles.text}>Date: {date}</Text>
      <Text style={styles.text}>High: {maxtempC}&#176;C</Text>
      <Text style={styles.text}>Low: {mintempC}&#176;C</Text>
      <Text style={styles.text}>High: {maxtempF}&#176;F</Text>
      <Text style={styles.text}>Low: {mintempF}&#176;F</Text>
      <Text style={styles.text}>Hours Of Sun: {sunHour}</Text>
    </View>
  );
};

export default class Weather extends Component {
  static navigationOptions = {
    headerTitle: "Woosh"
  };
  constructor(props) {
    super(props);
    this.state = {
      location: 84111,
      tree: {
        observation_time: "",
        temp_C: "",
        temp_F: "",
        uvIndex: "",
        windspeedMiles: "",
        FeelsLikeC: "",
        FeelsLikeF: "",
        humidity: ""
      },

      allDay: {
        date: "",
        maxtempC: "",
        mintempC: "",
        maxtempF: "",
        mintempF: "",
        sunHour: ""
      }
    };
  }

  getData() {
    let url = `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=9d0c365a343d46419cc20240192608&q=${this.state.location}&format=json&num_of_days=5`;

    fetch(url, {
      method: "GET"
    })
      .then(response => response.json())
      .then(json => {
        this.setState({ tree: json.data.current_condition });
      });
  }

  getData2() {
    let url = `http://api.worldweatheronline.com/premium/v1/weather.ashx?key=9d0c365a343d46419cc20240192608&q=${this.state.location}&format=json&num_of_days=5`;

    fetch(url, {
      method: "GET"
    })
      .then(response => response.json())
      .then(json => {
        this.setState({ allDay: json.data.weather });
      });
  }

  componentDidMount() {
    this.getData();
    this.getData2();
  }

  render() {
    let tree_holder = [];
    for (let i = 0; i < this.state.tree.length; i++) {
      tree_holder.push(
        <OneTree
          key={i}
          observation_time={this.state.tree[i].observation_time}
          temp_C={this.state.tree[i].temp_C}
          FeelsLikeC={this.state.tree[i].FeelsLikeC}
          temp_F={this.state.tree[i].temp_F}
          FeelsLikeF={this.state.tree[i].FeelsLikeF}
          uvIndex={this.state.tree[i].uvIndex}
          windspeedMiles={this.state.tree[i].windspeedMiles}
          humidity={this.state.tree[i].humidity}
        />
      );
    }

    let allDay_holder = [];
    for (let j = 0; j < this.state.allDay.length; j++) {
      allDay_holder.push(
        <AllDay
          key={j}
          date={this.state.allDay[j].date}
          maxtempC={this.state.allDay[j].maxtempC}
          mintempC={this.state.allDay[j].mintempC}
          maxtempF={this.state.allDay[j].maxtempF}
          mintempF={this.state.allDay[j].mintempF}
          sunHour={this.state.allDay[j].sunHour}
        />
      );
    }
    return (
      <ImageBackground
        source={require("C:/Users/amybu/Documents/MobileAppDev/final/src/components/images/sky.jpg")}
        style={{ width: 380, height: 620 }}
      >
        <ScrollView style={styles.inputText}>
          <Text
            style={[
              styles.text,
              { fontFamily: "Menlo", fontSize: 30, color: "#c3eaeb" }
            ]}
          >
            Weather
          </Text>
          <TextInput
            keyboardType={"numeric"}
            style={[
              styles.text,
              {
                borderRadius: 4,
                borderWidth: 3,
                borderColor: "#d6d7da",
                alignItems: "center",
                color: "#fff",
                marginBottom: 10
              }
            ]}
            placeholder="Enter a zipcode"
            onChangeText={location => this.setState({ location })}
          />
          <Button
            title="Fetch Weather"
            color="#002569"
            onPress={() => {
              this.getData();
              this.getData2();
            }}
          />
          <Text style={[styles.text, { color: "#065970", fontSize: 30 }]}>
            Current Weather
          </Text>
          {tree_holder}
          <Text style={[styles.text, { color: "#065970", fontSize: 30 }]}>
            Five Day Forcast
          </Text>
          {allDay_holder}

          <Button
            title="Fetch Weather"
            color="#002569"
            onPress={() => {
              this.getData();
              this.getData2();
            }}
          />

          <Button
            title="Go to Home"
            color="#002569"
            onPress={() => this.props.navigation.navigate("Home")}
          />
          <Button
            title="Go back"
            color="#002569"
            onPress={() => this.props.navigation.goBack()}
          />
          <Button
            title="Go to Moon Phase"
            color="#002569"
            onPress={() => this.props.navigation.navigate("S1")}
          />
          <Text style={{ marginBottom: 30 }} />
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
    fontFamily: "Menlo",
    fontSize: 18
  }
});
