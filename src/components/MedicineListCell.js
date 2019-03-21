import React, { Component } from "react";
import { View, Text, StyleSheet } from "react-native";
import { px } from '../utils'
import LineView from './LineView'
import TitleItem from './TitleItem'
class MedicineListCell extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { data, isVersion = true } = this.props
    return (
      <View style={styles.itemView}>
        <View style={styles.itemHeader}>
          <Text style={styles.itemTitle}>{data.DateTime}</Text>
        </View>

        {this.mainInfoView(data.CalcType)}
        <LineView />
        {isVersion ? <View style={styles.paramView}>
          <View style={styles.paramHeader}>
            <Text style={styles.paramTitle}>PK参数</Text>
          </View>
          {this.renderPkView(data.CalcType)}
        </View>: null}
        
        {this.contentView(data.CalcType)}
      </View>
    );
  }

  mainInfoView(type) {
    const { data } = this.props
    switch(type) {
      case 0:
        return <View style={styles.itemMainInfo}>
          <View style={styles.itemInfoRow}>
            <Text style={styles.itemInfoTitle}>年龄</Text>
            <Text style={styles.itemInfoSubTitle}>{data.Age}岁</Text>
            <Text style={[styles.itemInfoTitle, styles.flexTwo]}>
              血肌酐
            </Text>
            <Text style={[styles.itemInfoSubTitle, styles.flexTwo]}>{data.Scr}{data.ScrUnit}</Text>
          </View>
          <View style={styles.itemInfoRow}>
            <Text style={styles.itemInfoTitle}>性别</Text>
            <Text style={styles.itemInfoSubTitle}>{data.Female ? '女' : '男'}</Text>
            <Text style={[styles.itemInfoTitle, styles.flexTwo]}>
              目标谷浓度范围
            </Text>
            <Text style={[styles.itemInfoSubTitle, styles.flexTwo]}>{data.ExpectCminLow}-{data.ExpectCminUpper}mg/L</Text>
          </View>
          <View style={styles.itemInfoRow}>
            <Text style={styles.itemInfoTitle}>身高</Text>
            <Text style={styles.itemInfoSubTitle}>{data.Height}m</Text>
            <Text style={[styles.itemInfoTitle, styles.flexTwo]}>
              MIC
            </Text>
            <Text style={[styles.itemInfoSubTitle, styles.flexTwo]}>{data.MIC}mg/L</Text>
          </View>
          <View style={styles.itemInfoRow}>
            <Text style={styles.itemInfoTitle}>体重</Text>
            <Text style={styles.itemInfoSubTitle}>{data.Weight}kg</Text>
            <Text style={[styles.itemInfoTitle, styles.flexTwo]}>
              输注速率
            </Text>
            <Text style={[styles.itemInfoSubTitle, styles.flexTwo]}>{data.Rate}mg/h</Text>
          </View>
        </View>;
      case 1:
        return (
          <View style={styles.itemMainInfo}>
            <View style={styles.itemInfoRow}>
              <Text style={styles.itemInfoTitle}>剂量</Text>
              <Text style={styles.itemInfoSubTitle}>{data.PDose}mg</Text>
            </View>
            <View style={styles.itemInfoRow}>
              <Text style={styles.itemInfoTitle}>给药间隔</Text>
              <Text style={styles.itemInfoSubTitle}>{data.PTau}hrs</Text>
            </View>
            <View style={styles.itemInfoRow}>
              <Text style={styles.itemInfoTitle}>输注时间</Text>
              <Text style={styles.itemInfoSubTitle}>{data.Pti}hrs</Text>
            </View>
            <View style={styles.itemInfoRow}>
              <Text style={styles.itemInfoTitle}>测定谷浓度</Text>
              <Text style={styles.itemInfoSubTitle}>{data.PCmin}mg/L</Text>
            </View>
            <View style={styles.itemInfoRow}>
              <Text style={styles.itemInfoTitle}>目标谷浓度范围</Text>
              <Text style={styles.itemInfoSubTitle}>{data.ExpectCminLow}-{data.ExpectCminUpper}mg/L</Text>
            </View>
            <View style={styles.itemInfoRow}>
              <Text style={styles.itemInfoTitle}>MIC</Text>
              <Text style={styles.itemInfoSubTitle}>{data.MIC}mg/L</Text>
            </View>
            <View style={styles.itemInfoRow}>
              <Text style={styles.itemInfoTitle}>输注速率</Text>
              <Text style={styles.itemInfoSubTitle}>{data.Rate}mg/h</Text>
            </View>
          </View>
        )
      case 3:
        return <View style={styles.itemMainInfo}>
          <View style={styles.itemInfoRow}>
            <Text style={styles.itemInfoTitle}>年龄</Text>
            <Text style={styles.itemInfoSubTitle}>{data.Age}岁</Text>
            <Text style={[styles.itemInfoTitle, styles.flexTwo]}>
              血肌酐
            </Text>
            <Text style={[styles.itemInfoSubTitle, styles.flexTwo]}>{data.Scr}{data.ScrUnit}</Text>
          </View>
          <View style={styles.itemInfoRow}>
            <Text style={styles.itemInfoTitle}>性别</Text>
            <Text style={styles.itemInfoSubTitle}>{data.Female ? '女' : '男'}</Text>
            <Text style={[styles.itemInfoTitle, styles.flexTwo]}>
              MIC
            </Text>
            <Text style={[styles.itemInfoSubTitle, styles.flexTwo]}>{data.MIC}mg/L</Text>
          </View>
          <View style={styles.itemInfoRow}>
            <Text style={styles.itemInfoTitle}>身高</Text>
            <Text style={styles.itemInfoSubTitle}>{data.Height}m</Text>
            <Text style={[styles.itemInfoTitle, styles.flexTwo]}>
              剂量
            </Text>
            <Text style={[styles.itemInfoSubTitle, styles.flexTwo]}>{data.Dose}mg</Text>
          </View>
          <View style={styles.itemInfoRow}>
            <Text style={styles.itemInfoTitle}>体重</Text>
            <Text style={styles.itemInfoSubTitle}>{data.Weight}kg</Text>
            <Text style={[styles.itemInfoTitle, styles.flexTwo]}>
              给药间隔
            </Text>
            <Text style={[styles.itemInfoSubTitle, styles.flexTwo]}>{data.Tau}hrs</Text>
          </View>
          <View style={styles.itemInfoRow}>
            <Text style={styles.itemInfoTitle}></Text>
            <Text style={styles.itemInfoSubTitle}></Text>
            <Text style={[styles.itemInfoTitle, styles.flexTwo]}>
              输注时间
            </Text>
            <Text style={[styles.itemInfoSubTitle, styles.flexTwo]}>{data.ti}hrs</Text>
          </View>
        </View>;
      case 2:
        return (
          <View style={styles.itemMainInfo}>
            <View style={styles.itemInfoRow}>
              <Text style={styles.itemInfoTitle}>剂量</Text>
              <Text style={styles.itemInfoSubTitle}>{data.PDose}mg</Text>
            </View>
            <View style={styles.itemInfoRow}>
              <Text style={styles.itemInfoTitle}>给药间隔</Text>
              <Text style={styles.itemInfoSubTitle}>{data.PTau}hrs</Text>
            </View>
            <View style={styles.itemInfoRow}>
              <Text style={styles.itemInfoTitle}>输注时间</Text>
              <Text style={styles.itemInfoSubTitle}>{data.Pti}hrs</Text>
            </View>
            <View style={styles.itemInfoRow}>
              <Text style={styles.itemInfoTitle}>测定谷浓度</Text>
              <Text style={styles.itemInfoSubTitle}>{data.PCmin}mg/L</Text>
            </View>
            <View style={styles.itemInfoRow}>
              <Text style={styles.itemInfoTitle}></Text>
              <Text style={styles.itemInfoSubTitle}></Text>
            </View>
            <View style={styles.itemInfoRow}>
              <Text style={styles.itemInfoTitle}>MIC</Text>
              <Text style={styles.itemInfoSubTitle}>{data.MIC}mg/L</Text>
            </View>
            <View style={styles.itemInfoRow}>
              <Text style={styles.itemInfoTitle}>剂量</Text>
              <Text style={styles.itemInfoSubTitle}>{data.PDose}mg</Text>
            </View>
            <View style={styles.itemInfoRow}>
              <Text style={styles.itemInfoTitle}>给药间隔</Text>
              <Text style={styles.itemInfoSubTitle}>{data.Tau}hrs</Text>
            </View>
            <View style={styles.itemInfoRow}>
              <Text style={styles.itemInfoTitle}>输注时间</Text>
              <Text style={styles.itemInfoSubTitle}>{data.ti}hrs</Text>
            </View>
          </View>
        )
    }
  }

  renderPkView(type) {
    const { data } = this.props
    switch(type) {
      case 0:
      case 3:
        return <View>
          <View style={styles.itemRow}>
            <TitleItem
              style={styles.titleItem}
              title="表观分布容积"
              subTitle={data.V}
              param="L"
            />
            <TitleItem
              style={styles.titleItem}
              title="清除常数"
              subTitle={data.K}
              param="1/h"
            />
            <TitleItem
              style={[styles.titleItem, { marginRight: px(24) }]}
              title="肌酐清除率"
              subTitle={data.CrCl}
              param="mL/min"
            />
          </View>
          <View style={[styles.itemRow]}>
            <TitleItem
              style={styles.titleItem}
              title="万古霉素清除率"
              subTitle={data.CL}
              param="L/h"
            />
            <TitleItem
              style={styles.titleItem}
              title="半衰期"
              subTitle={data.t1_2}
              param="hrs"
            />
            <TitleItem
              style={styles.titleItem}
              title=""
              subTitle=""
              param=""
            />
          </View>
        </View>
      case 1:
      case 2:
        return <View>
          <View style={styles.itemRow}>
            <TitleItem
              style={styles.titleItem}
              title="表观分布容积"
              subTitle={data.V}
              param="L"
            />
            <TitleItem
              style={styles.titleItem}
              title="清除常数"
              subTitle={data.K}
              param="1/h"
            />
            <TitleItem
              style={[styles.titleItem, { marginLeft: px(0), marginRight: px(24) }]}
              title="万古霉素清除率"
              subTitle={data.CL}
              param="L/h"
            />
          </View>
          <View style={styles.itemRow}>
            <TitleItem
              style={styles.titleItem}
              title="半衰期"
              subTitle={data.t1_2}
              param="hrs"
            />
            <TitleItem
              style={styles.titleItem}
              title="AUC₀₋₂₄/MIC"
              subTitle={data['AUC0-24/MIC']}
              param=""
            />
            <TitleItem
              style={styles.titleItem}
              title=""
              subTitle=""
              param=""
            />
          </View>
        </View>
    }
  }

  contentView(type) {
    const { data, isVersion = true } = this.props
    if (!isVersion) return null
    switch(type) {
      case 0:
      case 1:
        return <View style={styles.programView}>
          <View style={styles.programHeader}>
            <Text style={styles.programTitle}>给药方案</Text>
          </View>
          <View>
            <View style={styles.itemRow}>
              <TitleItem
                style={styles.titleItem}
                title="剂量"
                subTitle={data.Dose}
                param="mg"
              />
              <TitleItem
                style={styles.titleItem}
                title="给药频率"
                subTitle={`Q${data.Tau}h`}
                param=""
              />
              <TitleItem
                style={styles.titleItem}
                title="输注时间"
                subTitle={data.ti}
                param="hrs"
              />
            </View>
            <View style={[styles.itemRow, { marginBottom: px(48) }]}>
              <TitleItem
                style={styles.titleItem}
                title="预测谷浓度"
                subTitle={data.Cmin}
                param="mg/L"
              />
              <TitleItem
                style={styles.titleItem}
                title="峰浓度"
                subTitle={data.Cmax}
                param="mg/L"
              />
              <TitleItem
                style={styles.titleItem}
                title="AUC₀₋₂₄/MIC"
                subTitle={data['AUC24/MIC']}
                param=""
              />
            </View>
          </View>
        </View>
      case 2:
      case 3:
        return <View style={styles.programView}>
          <View style={styles.programHeader}>
            <Text style={styles.programTitle}>浓度预测</Text>
          </View>
          <View>
            <View style={[styles.itemRow, { marginBottom: px(48) }]}>
              <TitleItem
                style={styles.titleItem}
                title="谷浓度"
                subTitle={data.Cmin}
                param="mg/L"
              />
              <TitleItem
                style={styles.titleItem}
                title="峰浓度"
                subTitle={data.Cmax}
                param="mg/L"
              />
              <TitleItem
                style={styles.titleItem}
                title="AUC₀₋₂₄/MIC"
                subTitle={data['AUC24/MIC']}
                param=""
              />
            </View>
          </View>
        </View>
    }
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    alignItems: 'center',
    justifyContent: 'center'
  },
  itemView: {
    backgroundColor: "#fff",
    width: px(686),
    borderRadius: px(8),
    marginBottom: px(32)
  },
  itemHeader: {
    justifyContent: "center",
    marginTop: px(48),
    marginBottom: px(40)
  },
  itemTitle: {
    fontSize: px(36),
    color: '#333',
    marginLeft: px(32)
  },
  paramHeader: {
    marginTop: px(64),
    marginBottom: px(8),
    justifyContent: "center"
  },
  paramTitle: {
    color: "#333",
    fontSize: px(32),
    marginLeft: px(32)
  },
  programView: {
  },
  programHeader: {
    justifyContent: "center",
    marginTop: px(88)
  },
  programTitle: {
    color: "#333",
    fontSize: px(32),
    marginLeft: px(32)
  },
  itemMainInfo: {
    paddingBottom: px(63)
  },
  paramView: {
  },
  itemInfoRow: {
    flexDirection: "row",
    marginTop: px(24),
    alignItems: "center"
  },
  itemInfoTitle: {
    flex: 1,
    fontSize: px(28),
    color: "#999",
    marginLeft: px(24)
  },
  itemInfoSubTitle: {
    flex: 1,
    fontSize: px(28),
    color: "#666"
  },
  itemRow: {
    flexDirection: "row",
    marginTop: px(40)
  },
  titleItem: {
    flex: 1,
    marginLeft: px(32)
  },
  flexTwo: {
    flex: 3,
  }
});

export default MedicineListCell;
