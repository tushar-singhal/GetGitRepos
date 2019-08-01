
import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { ThemedButton, ThemedView, ThemedTextInput, ThemeConstants, ThemedText } from './App'

export class HomeScreen extends React.Component {

  constructor(props) {
    super(props);
    this.state = { inputValue: "" }
  }

  static navigationOptions = ({ screenProps }) => {
    let currentTheme = ThemeConstants[screenProps.theme];
    return {
      title: 'Home',
      headerTintColor: currentTheme.fontColor,
      headerStyle: { backgroundColor: currentTheme.backgroundColor },
    };
  };

  render() {
    return (

      <ThemedView style={styles.containerStyle}>
        <ThemedText style={styles.heading}>Find git repo with maximum stars</ThemedText>
        <ThemedTextInput style={styles.textInput}
          onChangeText={this.onChangeText}
        />
        <ThemedButton
          title="Go to Details"
          onPress={this.onPress}
        />
      </ThemedView>
    );
  }
  onChangeText = (input) => {
    this.setState({ inputValue: input })
  };
  onPress = () => {
    let username = this.state.inputValue;
    if (username !== "") {
      this.creatGitUrl(username)
    }
  }
  formatQueryParams(params) {
    const queryItems = Object.keys(params)
      .map(key => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
    return queryItems.join('&');
  }

  creatGitUrl(username) {
    const baseUrl = `https://api.github.com/users/${username}/repos`;
    const params = {
      type: 'all',
      sort: 'created',
      direction: 'desc',
    };

    const queryString = this.formatQueryParams(params)
    const fullUrl = baseUrl + '?' + queryString
    this.props.navigation.navigate({ routeName: 'Details', params: { fullUrl } })
  }
}
const styles = StyleSheet.create({
  containerStyle: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  textInput: {
    height: 48,
    width: 150,
    fontSize: 16,
    borderRadius: 4,
    borderColor: 'black',
    borderWidth: 1,
    marginBottom: 20
  },
  heading: { margin: 20, fontSize: 20 }
});
