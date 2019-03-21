import React, { Component } from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import { px } from '../utils'
const Spinner = require('react-native-spinkit');
import RootSiblings from 'rn-root-siblings';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

export default class SpinnerLoadView {
  static _siblingArray = [null, null, null, null, null, null];

  static get siblingArray() {
    return this._siblingArray;
  }

  static set siblingArray(value) {
    this._siblingArray = value;
  }

  static show = (text = '正在加载') => {
    if (SpinnerLoadView._siblingArray[0]) {
      return;
    }
    //let backgroundColor = 'rgba(0,0,0,0)';

    this.loaderSibling = new RootSiblings(
      <View style={[styles.container, { width: screenWidth, height: screenHeight }]}>
        <View style={{ width: px(300), height: px(300), alignItems: 'center', justifyContent: 'center', backgroundColor: '#000', borderRadius: px(30), opacity: 0.7 }}>
          <Spinner type="Wave" color={'#123D70'} />
        </View>
      </View>
    );
    SpinnerLoadView._siblingArray[0] = this.loaderSibling;
  };

  static hide = () => {
    SpinnerLoadView._hideSibling(0);
  };
  static _hideSibling = (index) => {
    if (SpinnerLoadView._siblingArray[index]) {
      SpinnerLoadView._siblingArray[index].destroy();
      SpinnerLoadView._siblingArray[index] = null;
    }
  };
}

// export class SpinnerLoadView extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {};
//   }

//   componentDidMount() {
//   }

//   render() {
//     return <View style={[styles.container, { width: screenWidth, height: screenHeight }]}>
//       <View style={{ width: px(300), height: px(300), alignItems: 'center', justifyContent: 'center', backgroundColor: '#eaeaea', borderRadius: px(30) }}>
//         <Spinner type="Wave" />
//       </View>
//     </View>;
//   }

// }

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    zIndex: 100,
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent'
  }
});

