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
import ThemeContext from './App'

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

