import React, { Component } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import TitleItem from "./TitleItem";
import { px, NumberToChinese } from "../utils";
import { AssetImages } from "../constants"


class MedicineResultCell extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isSelect: false
    };
  }

  componentDidMount() {
  }

  render() {
    const { index, selectIndex, changeSelectIndex, data } = this.props
    return <View style={styles.container}>
      <View style={styles.rowTitleView}>
        <Text style={styles.rowTitle}>方案{this.numberToCh(index + 1)}</Text>
        <View style={styles.tagContainer}>
          {data.BestSolution ? <View style={styles.tag}>
            <Text style={styles.tagTitle}>最优</Text>
          </View>: null}
        </View>
        <TouchableOpacity onPress={() => {
          changeSelectIndex(index)
        }} style={styles.selectButton}>
          <Image style={styles.selectBgImage} source={index === selectIndex ? AssetImages.ICON_SELECT : AssetImages.ICON_UN_SELECT} />
        </TouchableOpacity>
      </View>
      <View>
        <View style={styles.itemRow}>
          <TitleItem style={styles.titleItem} title="剂量" subTitle={data.Dose} param="mg" />
          <TitleItem style={styles.titleItem} title="给药频率" subTitle={`Q${data.Tau}h`} param="" />
          <TitleItem style={styles.titleItem} title="输注时间" subTitle={data.ti} param="hrs" />
        </View>
        <View style={[styles.itemRow, { marginBottom: px(63) }]}>
          <TitleItem style={styles.titleItem} title="预测谷浓度" subTitle={data.Cmin} param="mg/L" />
          <TitleItem style={styles.titleItem} title="峰浓度" subTitle={data.Cmax} param="mg/L" />
          <TitleItem style={styles.titleItem} title="AUC₀₋₂₄/MIC" subTitle={data['AUC24/MIC']} param="" />
        </View>
      </View>
    </View>;
  }

  numberToCh(num) {
    return NumberToChinese(num)
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    width: px(686),
    borderRadius: px(8),
  },
  itemRow: {
    flexDirection: "row",
    marginTop: px(48)
  },
  titleItem: {
    flex: 1,
    marginLeft: px(32),
  },
  rowTitleView: {
    marginTop: px(64),
    marginBottom: px(8),
    flexDirection: "row",
    alignItems: "center"
  },
  rowTitle: {
    fontSize: px(32),
    marginLeft: px(32),
    color: '#333'
  },
  tagContainer: {
    flex: 1
  },
  tag: {
    backgroundColor: "#FF7733",
    width: px(56),
    height: px(32),
    borderRadius: px(6),
    marginLeft: px(16),
    alignItems: "center",
    justifyContent: "center"
  },
  tagTitle: {
    fontSize: px(20),
    color: "#fff"
  },
  selectButton: {
    width: px(32),
    height: px(32),
    marginRight: px(32)
  },
  selectBgImage: {
    height: px(32),
    width: px(32)
  }
});

export default MedicineResultCell;
