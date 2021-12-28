/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  ArrowBottom,
  ArrowLeft,
  ArrowRight,
  ArrowTop,
} from 'multiplatformicon-react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 16,
  },
  iconWrapper: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  icon: {
    padding: 8,
  },
});

const App: () => React$Node = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <View style={styles.container}>
            <Text style={styles.title}>MultiPlatformIcon</Text>
            <View style={styles.iconWrapper}>
              <View style={styles.icon}>
                <ArrowBottom />
              </View>
              <View style={styles.icon}>
                <ArrowLeft />
              </View>
              <View style={styles.icon}>
                <ArrowRight />
              </View>
              <View style={styles.icon}>
                <ArrowTop />
              </View>
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

export default App;
