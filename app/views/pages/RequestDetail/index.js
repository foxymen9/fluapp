import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  SectionList,
  ScrollView,
} from 'react-native';
import { Actions } from 'react-native-router-flux';

import * as commonStrings from '@common/styles/commonStrings';
import { styles } from './styles';

import SymptomItem from '@components/symptomItem';

const backImage = require('@common/assets/imgs/ico_nav_back_white.png');


export default class RequestDetail extends Component {
  
  static renderLeftButton(props) {
    return (
      <TouchableOpacity 
        style={styles.buttonWrapper}
        onPress={() => Actions.popTo('Main')}
      >
        <Image source={backImage} style={styles.imageClose} resizeMode="contain" />
      </TouchableOpacity>
    );
  }

  static renderRightButton(props) {
    return (
      <View />
    );
  }

  
  static renderTitle(props) {
    return (
      <Text style={styles.textTitle}>Request detail</Text>
    );
  }


  constructor(props) {
    super(props);

    let symptomList = [];
    commonStrings.symptomArray.forEach(element => {
      let symptom = {};
      symptom.active = false;
      symptom.name = element;
      symptomList.push(symptom);
    });

    this.state = {
      symptomList: symptomList
    };
  }


  componentDidMount() {
    Actions.refresh({onRight: this.onReset.bind(this)})
  }


  onReset() {
    let { symptomList } = this.state;
    symptomList.forEach(element => {
      element.active = false;
    });
    
    this.setState({symptomList});
	}


  onSubmit() {
  }

  
  renderSectionHeader(section) {
    return(
      <View style={styles.sectionHeaderContainer}>
        <Text style={styles.textSectionHeaderTitle}>{section.key}</Text>
      </View>
    );
  }

  renderItem(item, index, section) {
    return (
      <SymptomItem 
        {...item} 
      />
    );
  }

  render() {
    const { symptomList } = this.state;
    const { selectedRequest } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content'/>
        <ScrollView>
          <View style={styles.mainContentContainer}>
            <View style={styles.textWrapper}>
              <Text style={styles.textPoint}>Requested to: </Text>
              <Text style={styles.textName}>Dr.{selectedRequest.name}</Text>
            </View>
            <View style={styles.textWrapper}>
              <Text style={styles.textPoint}>Status:</Text>
              <Text style={styles.textName}>{selectedRequest.status}</Text>
            </View>
            <View style={styles.textWrapper}>
              <Text style={styles.textPoint}>Recommendation: </Text>
              <Text style={styles.textName}>FluApp</Text>
            </View>
            <SectionList
              showsVerticalScrollIndicator={false}
              keyExtractor={(item, index) => index}
              renderSectionHeader={({section}) => this.renderSectionHeader(section)}          
              renderItem={({item, index, section}) => this.renderItem(item, index, section)}
              sections={[
                {
                  key: 'Symptoms',
                  data: symptomList,
                },
              ]}
            />
          </View>
          { /*<TouchableHighlight
            style={[globalStyle.buttonGreenWrapper, globalStyle.buttonBottom]}
            onPress={this.onSubmit.bind(this)}
            underlayColor={commonStyles.greenActiveBackgroundColor}
          >
            <Text style={globalStyle.buttonText}></Text>
          </TouchableHighlight>*/ }
        </ScrollView>
      </View>
    );
  }
}
