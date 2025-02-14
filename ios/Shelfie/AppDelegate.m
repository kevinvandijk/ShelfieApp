/**
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 */

#import "AppDelegate.h"
//#import "CodePush.h"
#import "Orientation.h" // <--- import
#import <React/RCTBundleURLProvider.h>
#import <React/RCTRootView.h>
#import <BuddyBuildSDK/BuddyBuildSDK.h>
#import "MediaPlayer/MPVolumeView.h"
#import <AVFoundation/AVFoundation.h>

@implementation AppDelegate

- (BOOL)application:(UIApplication *)application didFinishLaunchingWithOptions:(NSDictionary *)launchOptions
{
  [BuddyBuildSDK setup];
  
  NSURL *jsCodeLocation;

  
//#ifdef DEBUG
    jsCodeLocation = [[RCTBundleURLProvider sharedSettings] jsBundleURLForBundleRoot:@"index.ios" fallbackResource:nil];
//#else
//    jsCodeLocation = [CodePush bundleURL];
//#endif

  RCTRootView *rootView = [[RCTRootView alloc] initWithBundleURL:jsCodeLocation
                                                      moduleName:@"Shelfie"
                                               initialProperties:nil
                                                   launchOptions:launchOptions];
  rootView.backgroundColor = [[UIColor alloc] initWithRed:1.0f green:1.0f blue:1.0f alpha:1];
//  rootView.backgroundColor = [UIColor blackColor];

  self.window = [[UIWindow alloc] initWithFrame:[UIScreen mainScreen].bounds];
  UIViewController *rootViewController = [UIViewController new];
  rootViewController.view = rootView;
  
  // Hide the volume icon when changing volume
  MPVolumeView *volumeView = [[MPVolumeView alloc] initWithFrame: CGRectZero];
  [self.window addSubview: volumeView];
  
  // Ignore the silent switch, do nothing if it fails
  NSError *error = nil;
  [[AVAudioSession sharedInstance]
    setCategory:AVAudioSessionCategoryPlayback
    error:&error];
  
  self.window.rootViewController = rootViewController;
  [self.window makeKeyAndVisible];
  return YES;
}

- (UIInterfaceOrientationMask)application:(UIApplication *)application supportedInterfaceOrientationsForWindow:(UIWindow *)window {
  return [Orientation getOrientation];
}

@end
