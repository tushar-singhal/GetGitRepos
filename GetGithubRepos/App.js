/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {
  StatusBar,
  View,
  TouchableOpacity,
  Text,
  TextInput,
  Button
} from 'react-native';
import { createAppContainer, createStackNavigator, StackActions, NavigationActions } from 'react-navigation';
import { HomeScreen } from './HomeScreen';
import { DetailsScreen } from './DetailsScreen';

const ThemeContext = React.createContext(null);
export const ThemeConstants = {
  light: {
    backgroundColor: '#fff',
    fontColor: '#000',
    borderColor: 'black'
  },
  dark: {
    backgroundColor: '#000',
    fontColor: '#fff',
    borderColor: 'red'
  },
};

export default class App extends React.Component {

  state = {
    theme: 'light'
  };

  toggleTheme = () => {
    let theme = this.state.theme === 'light' ? 'dark' : 'light'
    this.setState({ theme })
  };


  render() {
    return (
      <ThemeContext.Provider
        value={{ theme: this.state.theme, toggleTheme: this.toggleTheme }}>
        <StatusBar barStyle="dark-content" />

        <Button
          title="toggle"
          onPress={this.toggleTheme}
          style={{ height: 320, width: 40, marginTop: 50 }}
        />
        <Button
          title="toggle"
          onPress={this.toggleTheme}
          style={{ height: 320, width: 40, paddingTop: 50 }}
        />
        <AppContainer screenProps={{ theme: this.state.theme }} />
      </ThemeContext.Provider>
    );
  }
};


const AppNavigator = createStackNavigator(
  {
    Home: HomeScreen,
    Details: DetailsScreen
  },
  {
    initialRouteName: "Home"
  }
);

const AppContainer = createAppContainer(AppNavigator);


export class ThemedButton extends React.Component {
  render() {
    let { title, ...props } = this.props;
    return (

      <ThemeContext.Consumer>
        {({ theme }) => (
          <TouchableOpacity {...props} style={{ borderColor: ThemeConstants[theme].borderColor, borderWidth: 1, padding: 10 }}>
            <Text style={{ color: ThemeConstants[theme].fontColor, borderColor: ThemeConstants[theme].borderColor }}>
              {title}
            </Text>
          </TouchableOpacity>
        )}
      </ThemeContext.Consumer>
    );
  }
}

export class ThemedView extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <View
            {...this.props}
            style={[
              this.props.style,
              { backgroundColor: ThemeConstants[theme].backgroundColor },
            ]}
          />
        )}
      </ThemeContext.Consumer>
    );
  }
}

export class ThemedTextInput extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <TextInput
            {...this.props}
            style={[
              this.props.style,
              {
                backgroundColor: ThemeConstants[theme].backgroundColor,
                borderColor: ThemeConstants[theme].borderColor,
                color: ThemeConstants[theme].fontColor
              },
            ]}
          />
        )}
      </ThemeContext.Consumer>
    );
  }
}

export class ThemedText extends React.Component {
  render() {
    return (
      <ThemeContext.Consumer>
        {({ theme }) => (
          <Text
            {...this.props}
            style={[
              this.props.style,
              { backgroundColor: ThemeConstants[theme].backgroundColor, color: ThemeConstants[theme].fontColor },
            ]}
          />
        )}
      </ThemeContext.Consumer>
    );
  }
}