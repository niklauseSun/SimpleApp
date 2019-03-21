import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";
import {
  HomeContainer,

  MyContainer,
  EditPassword,

  DataContainer,
  Login,
  Logout,
  ForgotPassword,
  BindLogin,

  CalculatePage,
  CalculateResult,
} from "../containers";
import { Image } from "react-native";
import React from "react";
import { px } from "../utils";

const TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeContainer,
      navigationOptions: {
        title: "首页",
        tabBarIcon: ({ focused, tintColor }) => {
          if (focused) {
            return (
              <Image source={require("../assets/tabs/tab_shouye_s.png")} />
            );
          } else {
            return <Image source={require("../assets/tabs/tab_shouye.png")} />;
          }
        }
      }
    },
    DataContainer: {
      screen: DataContainer,
      navigationOptions: {
        title: "数据",
        tabBarIcon: ({ focused }) => {
          if (focused) {
            return <Image source={require("../assets/tabs/tab_shuju_s.png")} />;
          } else {
            return <Image source={require("../assets/tabs/tab_shuju.png")} />;
          }
        }
      }
    },
    My: {
      screen: MyContainer,
      navigationOptions: {
        title: "我的",
        tabBarIcon: ({ focused }) => {
          if (focused) {
            return (
              <Image style={{ width: px(40), height: px(40), resizeMode: 'contain' }} source={require("../assets/tabs/tab_wo_s.png")} />
            );
          } else {
            return <Image source={require("../assets/tabs/tab_wo.png")} />;
          }
        }
      }
    }
  },
  {
    tabBarOptions: {
      activeTintColor: "#fff", // 文字和图片选中颜色
      inactiveTintColor: "#939393", // 文字和图片未选中颜色
      showIcon: true,
      style: {
        backgroundColor: "#123D70",

      },
      indicatorStyle: {
        height: 0 // 如TabBar下面显示有一条线，可以设高度为0后隐藏
      },
      labelStyle: {
        fontSize: 12, // 文字大小
        paddingTop: 0,
        marginTop: 0
      },
      tabStyle: {
        marginTop: 5,
        height: 45
      }
    }
  }
);

const stackNavigator = createStackNavigator({
  TabNavigator: {
    screen: TabNavigator,
    navigationOptions: {
      header: null
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
      header: null
    }
  },
  CalculatePage: {
    screen: CalculatePage,
    navigationOptions: {
      header: null
    }
  },
  EditPassword: {
    screen: EditPassword,
    navigationOptions: {
      header: null
    }
  },
  Logout: {
    screen: Logout,
    navigationOptions: {
      header: null
    }
  },
  CalculateResult: {
    screen: CalculateResult,
    navigationOptions: {
      header: null
    }
  },
  ForgotPassword: {
    screen: ForgotPassword,
    navigationOptions: {
      header: null
    }
  },
  BindLogin: {
    screen: BindLogin,
    navigationOptions: {
      header: null
    }
  }
});



// const AppNavigator = createStackNavigator({
//   Home: {
//     screen: TabNavigator,
//     navigationOptions: {
//       header: null,
//     }
//   },
//   Settings: TestContainer
// });


export default stackNavigator;
