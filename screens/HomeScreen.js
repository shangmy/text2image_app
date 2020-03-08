import React, {useState} from "react";
import {ActivityIndicator, Button, Dimensions, Image, StyleSheet, Text, TextInput, View} from 'react-native';
import {ScrollView} from 'react-native-gesture-handler';
import {MonoText} from '../components/StyledText';
import url from "../constants/url";
import RNPickerSelect from 'react-native-picker-select';


const width = Dimensions.get('window').width;
const InputDescription = ({}) => {
  const [description, setDescription] = useState('');
  const [dataset, setDataset] = useState('COCO');
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
      let urlRequest = url.urlPrefix + "dataset=" + dataset + "&sentence=" + description;
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
    setImageBlock(<Text style={styles.homeText}> </Text>);
  };

  return (
      <View style={styles.homeContainer}>
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
        <View style={styles.buttonOutContainer}>
          <View style={styles.buttonContainer}>
            <Button onPress={() => handleButtonClick()} title="Generate" color="#663300"/>
          </View>
          <View style={styles.buttonContainer}>
            <Button onPress={() => cleanTextButtonClick()} title="Clear" color="#663300"/>
          </View>
        </View>

        {imageBlock}
      </View>
  );
};


export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.welcomeContainer}>
          <Image
            source={require('../assets/images/generation.png')}
            style={styles.welcomeImage}
          />
        </View>

        <View style={styles.homeContainer}>
          <Text style={styles.homeText}>Describe the image you want in the input box!</Text>

          <View style={[styles.textHighlightContainer, styles.homeScreenFilename]}>
            <MonoText>e.g. This bird has a yellow back and rump, gray outer rectrices, and a light gray breast.</MonoText>
          </View>

        </View>
        <InputDescription/>

      </ScrollView>

    </View>
  );
}

HomeScreen.navigationOptions = {
  header: null,
};



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 80,
    height: 60,
    resizeMode: 'contain',
    marginLeft: -10,
  },
  homeContainer: {
    alignItems: 'center',
    marginHorizontal: 30,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  textHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  homeText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
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
