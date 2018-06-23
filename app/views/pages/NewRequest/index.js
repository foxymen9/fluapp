import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  StatusBar,
  ScrollView,
  SectionList,
} from 'react-native';

import { Actions } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';

import * as commonStyles from '@common/styles/commonStyles';
import globalStyle from '@common/styles/commonStyles';
import * as commonStrings from '@common/styles/commonStrings';
import { styles } from './styles';

import ClickableSymptomItem from '@components/clickableSymptomItem';

const backImage = require('@common/assets/imgs/ico_nav_back_white.png');

const doctorData = [
  { value: 'Ty' },
  { value: 'Lisa Chu' },
  { value: 'Michael Devellano' },
  { value: 'Petro Lysenko' },
];


export default class NewRequest extends Component {
  
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
      <TouchableOpacity
        onPress={() => props.onRight()}
        style={styles.buttonWrapper}
      >
        <Text style={styles.textBarItem}>Reset</Text>
      </TouchableOpacity>
    );
  }

  
  static renderTitle(props) {
    return (
      <Text style={styles.textTitle}>New request</Text>
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
      symptomList: symptomList,
      doctorName: 'Ty',
    };
    // this.onReset();
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
    Actions.pop();
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
      <ClickableSymptomItem 
        {...item} 
        onPress={() => this.onSelectItem(item, index)}
      />
    );
  }

  onSelectItem(item, index) {
    let { symptomList} = this.state;
    symptomList[index].active = !symptomList[index].active;
    this.setState({symptomList});
  }

  render() {
    const { symptomList, doctorName } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content'/>
        <ScrollView style={styles.mainContentContainer}>
          <View style={styles.textWrapper}>
            <Text style={styles.textPoint}>Request to: </Text>
          </View>
          <Dropdown
            value={doctorName}
            label='Select a doctor'
            data={doctorData}
            fontSize={15}
            labelFontSize={13}
            fontWeight={'600'}
            titleTextStyle={globalStyle.tfTitleStyle}
            labelTextStyle={globalStyle.tfLabelStyle}
            affixTextStyle={globalStyle.tfAffixStyle}
            onChangeText={(value) => this.setState({doctorName: value})}
          />
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
        </ScrollView>
        <TouchableHighlight
          style={[globalStyle.buttonGreenWrapper, globalStyle.buttonBottom]}
          onPress={this.onSubmit.bind(this)}
          underlayColor={commonStyles.greenActiveBackgroundColor}
        >
          <Text style={globalStyle.buttonText}>Submit</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
