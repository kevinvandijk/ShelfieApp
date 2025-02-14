package com.shelfie;

import android.app.Application;

import com.facebook.react.ReactApplication;
import com.RNFetchBlob.RNFetchBlobPackage;
import com.rnimmersive.RNImmersivePackage;
import com.github.yamill.orientation.OrientationPackage;
import com.BV.LinearGradient.LinearGradientPackage;
import com.corbt.keepawake.KCKeepAwakePackage;
import com.googlecast.GoogleCastPackage;
import com.oblador.keychain.KeychainPackage;
import com.oblador.vectoricons.VectorIconsPackage;
import com.react.rnspinkit.RNSpinkitPackage;
import com.brentvatne.react.ReactVideoPackage;
import com.learnium.RNDeviceInfo.RNDeviceInfo;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;

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
            new RNFetchBlobPackage(),
            new RNImmersivePackage(),
            new OrientationPackage(),
            new LinearGradientPackage(),
            new KCKeepAwakePackage(),
            new GoogleCastPackage(),
            new KeychainPackage(),
            new VectorIconsPackage(),
            new RNSpinkitPackage(),
            new ReactVideoPackage(),
            new RNDeviceInfo()
      );
    }
  };

  @Override
  public ReactNativeHost getReactNativeHost() {
    return mReactNativeHost;
  }

  @Override
  public void onCreate() {
    super.onCreate();
    SoLoader.init(this, /* native exopackage */ false);
  }
}
