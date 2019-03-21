import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  LayoutAnimation,
  Image
} from "react-native";
import { px } from '../utils'
import { AssetImages } from "../constants";
import  LineView  from "./LineView";

class ExpandItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isExpand: false
    };
  }

  componentDidMount() {
  }

  render() {
    const contentHeight = this.state.isExpand ? px(112): 0
    const { title = "目标浓度范围", content, expandAction, expandView, expandStyle } = this.props;
    return <View style={styles.container}>
        <View style={styles.header}>
          <Text style={[styles.title]}>{title}</Text>
          <View style={styles.contentView}>{content}</View>
          <TouchableOpacity
            style={{ height: '100%', alignItems: 'center', justifyContent: 'center'}}
            activeOpacity={0.7} onPress={() => {
              this.setState({ isExpand: !this.state.isExpand });
              LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut)
            }}>
            <Image style={styles.icon} source={AssetImages.ICON_ARROW_DOWN}/>
          </TouchableOpacity>
        </View>
        {this.state.isExpand ? <View style={{ width: '100%'}}><LineView />
          <View style={[styles.content, { height: contentHeight }, expandStyle]}>
            {expandView}
        </View></View> : null}
      </View>;
  }

  test() { }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    flexDirection: 'column',
    alignItems: 'center',
    // height: px(112),
    borderRadius: px(8),
  },
  header: {
    width: '100%',
    height: px(112),
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 100
  },
  title: {
    fontSize: px(32),
    color: '#333333',
    flex: 1,
    marginLeft: px(32)
  },
  icon: {
    width: px(22),
    height: px(12),
    marginRight: px(32),
    marginLeft: px(16)
  },
  contentView: {
    flex: 1,
  },
  content: {
    width: '100%'
  },
  expandButton: {
    marginRight: px(32),
    marginLeft: px(32),
  }
});

export default ExpandItem;
