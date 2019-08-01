
import React from 'react';
import {
  ActivityIndicator,
  FlatList
} from 'react-native';
import { ThemedText, ThemedView, ThemeConstants } from './App'


export class DetailsScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isLoading: true, noResults: true }
  }

  static navigationOptions = ({ screenProps }) => {
    let currentTheme = ThemeConstants[screenProps.theme];
    return {
      title: 'Git repos',
      headerTintColor: currentTheme.fontColor,
      headerStyle: { backgroundColor: currentTheme.backgroundColor },
    };
  };

  componentDidMount() {
    let navigation = this.props.navigation;
    let params = navigation.state.params.fullUrl;

    return fetch(params)
      .then((response) => response.json())
      .then((responseJson) => {

        if (responseJson.length > 0) {
          responseJson.sort((a, b) => (a.stargazers_count < b.stargazers_count) ? 1 : -1)
          this.setState({
            isLoading: false,
            noResults: false,
            dataSource: responseJson,
          }, function () { });

        }
        else {
          this.setState({ noResults: true, isLoading: false })
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }


  render() {

    let { isLoading, noResults } = this.state;

    if (isLoading) {
      return (
        <ThemedView style={{ flex: 1, padding: 20 }}>
          <ActivityIndicator />
        </ThemedView>
      )
    }
    if (!isLoading && noResults) {
      return (
        <ThemedView style={{ flex: 1, paddingTop: 20 }}>
          <ThemedText> No results </ThemedText>
        </ThemedView>
      )
    }
    return (
      <ThemedView style={{ flex: 1, paddingTop: 20 }}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({ item }) => this.renderItem(item)}
        />
      </ThemedView>
    );
  }

  renderItem = (item) => {
    let { description, full_name, stargazers_count } = item
    return (
      <ThemedText>{description}, {full_name}, {stargazers_count}</ThemedText>
    )
  }
}
