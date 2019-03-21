package com.rongletech.wangu;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.react.rnspinkit.RNSpinkitPackage;
import com.wangu.BuildConfig;
import com.theweflex.react.WeChatPackage;
import com.beefe.picker.PickerViewPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.swmansion.gesturehandler.react.RNGestureHandlerPackage;
import com.tencent.bugly.crashreport.CrashReport;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import org.devio.rn.splashscreen.SplashScreenReactPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication {

  private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
              new SplashScreenReactPackage(),
            new RNSpinkitPackage(),
            new WeChatPackage(),
            new RNDeviceInfo(),
              new PickerViewPackage(),
            new RNGestureHandlerPackage()
      );
    }

    @Override
    protected String getJSMainModuleName() {
      return "index";
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    CrashReport.initCrashReport(getApplicationContext(), "9716ce5455", false);
    SoLoader.init(this, /* native exopackage */ false);
  }
}
