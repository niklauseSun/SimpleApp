import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { px } from '../utils'

class Cal_TitleCard extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
  }

  render() {
    const { cardTitle = "card", titleBgStyle, cardStyle, titleStyle, children } = this.props
    return <View style={[styles.container, titleBgStyle]}>
        <Text style={[styles.cardTitle, titleStyle]}>{cardTitle}</Text>
        <View style={[styles.cardContent, cardStyle]}>{children}</View>
      </View>;
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EAEA',
    flex: 1
  },
  cardTitle: {
    fontSize: px(36),
    color: '#fff',
    marginTop: px(6)
  },
  cardContent: {
    marginTop: px(32),
    backgroundColor: '#fff',
    borderRadius: px(8),
    flex: 1
  }
});

export default Cal_TitleCard
