import * as React from 'react';
import {ActivityIndicator, Button, Image, StyleSheet, Text, TextInput, View} from 'react-native';

import { RectButton, ScrollView } from 'react-native-gesture-handler';


export default function HighlightScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.screenContainer}>
        <Text style={styles.screenText}>Describe the image you want to generate and enter the part you want to highlight.</Text>
      </View>
      {/*<OptionButton*/}
      {/*  icon="md-school"*/}
      {/*  label="Read the Expo documentation"*/}
      {/*  onPress={() => WebBrowser.openBrowserAsync('https://docs.expo.io')}*/}
      {/*/>*/}

      {/*<OptionButton*/}
      {/*  icon="md-compass"*/}
      {/*  label="Read the React Navigation documentation"*/}
      {/*  onPress={() => WebBrowser.openBrowserAsync('https://reactnavigation.org')}*/}
      {/*/>*/}

      {/*<OptionButton*/}
      {/*  icon="ios-chatboxes"*/}
      {/*  label="Ask a question on the forums"*/}
      {/*  onPress={() => WebBrowser.openBrowserAsync('https://forums.expo.io')}*/}
      {/*  isLastOption*/}
      {/*/>*/}
    </ScrollView>
  );
}

// function OptionButton({ icon, label, onPress, isLastOption }) {
//   return (
//     <RectButton style={[styles.option, isLastOption && styles.lastOption]} onPress={onPress}>
//       <View style={{ flexDirection: 'row' }}>
//         <View style={styles.optionIconContainer}>
//           <Ionicons name={icon} size={22} color="rgba(0,0,0,0.35)" />
//         </View>
//         <View style={styles.optionTextContainer}>
//           <Text style={styles.optionText}>{label}</Text>
//         </View>
//       </View>
//     </RectButton>
//   );
// }

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
  },
  optionIconContainer: {
    marginRight: 12,
  },
  option: {
    backgroundColor: '#fdfdfd',
    paddingHorizontal: 15,
    paddingVertical: 15,
    borderWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: 0,
    borderColor: '#ededed',
  },
  lastOption: {
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  optionText: {
    fontSize: 15,
    alignSelf: 'flex-start',
    marginTop: 1,
  },
  screenContainer: {
    alignItems: 'center',
    marginHorizontal: 30,
  },
  screenText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'left',
  },
});
