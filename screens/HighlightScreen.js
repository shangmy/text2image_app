import React, {useState} from "react";
import {ActivityIndicator, Button, Image, StyleSheet, Text, TextInput, View} from 'react-native';

import { RectButton, ScrollView } from 'react-native-gesture-handler';
import url from "../constants/url";
import RNPickerSelect from "react-native-picker-select";

const InputDescriptionWithHighlight = ({}) => {
  const [description, setDescription] = useState('');
  const [dataset, setDataset] = useState('COCO');
  const [highlight, setHighlight] = useState('');
  const [imageBlock, setImageBlock] = useState(<Text style={styles.homeText}> </Text>);

  const handleButtonClick = async () => {

    setImageBlock(<ActivityIndicator size="large" color="#A4A4A4" />);
    if (description === '') {
      setImageBlock(<Text style={styles.homeText}> </Text>);
      return;
    }
    let possibleImageUrl = await getImageUrl();
    // console.log(possibleImageUrl);
    setImageBlock(<View><Image source={{uri: possibleImageUrl}} style={styles.generatedImage}/></View>);

  };

  const getImageUrl = async () => {
    try {
      let prefix = await getRequestImageJson();
      // console.log(prefix);
      // console.log(generatedImage);
      return url.imagePrefix + prefix["image_url"];
    } catch (e) {
      console.error(e);
    }
  };

  const getRequestImageJson = async () => {
    try {
      let urlRequest = url.urlPrefix + "dataset=" + dataset + "&sentence=" + description + "&highlight=" + highlight;
      // console.log(urlRequest);
      const response = await fetch(urlRequest);
      // console.log(json);
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  };


  const cleanTextButtonClick = () => {
    setDescription("");
    setHighlight("");
    setImageBlock(<Text style={styles.homeText}> </Text>);
  };

  return (
      <View style={styles.screenContainer}>
        <RNPickerSelect
            placeholder={{
              label: 'Select a dataset, default: COCO',
              value: 'COCO',
            }}
            onValueChange={(value) => setDataset(value)}
            items={[
              { label: 'Dataset: COCO', value: 'COCO', key: 'COCO' },
              { label: 'Dataset: CUB Birds', value: 'CUB', key: 'Bird' },
            ]}
        />
        <TextInput
            style={styles.inputText}
            value={description}
            placeholder="Input image description here."
            placeholderTextColor='#A4A4A4'
            keyboardType='default'
            onChangeText={inputContent => setDescription(inputContent)}
        />
        <TextInput
            style={styles.highlightText}
            value={highlight}
            placeholder="Input highlight word here."
            placeholderTextColor='#A4A4A4'
            keyboardType='default'
            onChangeText={content => setHighlight(content)}
        />
        <View style={styles.buttonOutContainer}>
          <View style={styles.buttonContainer}>
            <Button onPress={() => handleButtonClick()} title="Highlight" color="#663300"/>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={() => cleanTextButtonClick()} title="Clear" color="#663300"/>
          </View>
        </View>

        {imageBlock}
      </View>
  );
};



export default function HighlightScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <View style={styles.screenContainer}>
        <Text style={styles.screenText}>Describe the image you want to generate and enter the part you want to highlight.</Text>
      </View>
      <InputDescriptionWithHighlight/>
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
  },
  contentContainer: {
    paddingTop: 15,
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
  inputText: {
    margin: 10,
    padding: 0,
    width: 350,
    height: 200,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 18,
    color: '#000000',
    paddingLeft: 10,
    backgroundColor: '#FFFFFF',
    textAlign: 'left',
    textAlignVertical: 'top',
  },
  highlightText: {
    margin: 10,
    padding: 0,
    width: 350,
    height: 50,
    borderColor: 'black',
    borderWidth: 1,
    borderRadius: 5,
    fontSize: 18,
    color: '#000000',
    paddingLeft: 10,
    backgroundColor: '#FFFFFF',
    textAlign: 'left',
    textAlignVertical: 'top',
  },
  // homeButtonText: {
  //   fontSize:15,
  //   color:'white',
  //   fontWeight:'bold'
  // },
  // homeButton :{
  //   width:width-32,
  //   height:35,
  //   borderRadius: 20,
  //   alignSelf:'center',
  //   backgroundColor:'skyblue',
  //   marginTop:20,
  //   justifyContent:'center',
  //   alignItems:'center'
  // },
  generatedImage: {
    width: 250,
    height: 250,
  },
  buttonOutContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    flex: 1,
  }
});
