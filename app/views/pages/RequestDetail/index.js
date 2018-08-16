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
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import * as commonStrings from '@common/styles/commonStrings';
import { styles } from './styles';
import * as types from '@redux/actionTypes';

import SymptomItem from '@components/symptomItem';

const backImage = require('@common/assets/imgs/ico_nav_back_white.png');


class RequestDetail extends Component {
  
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
    var keys = Object.keys(commonStrings.AllSymtoms);
    keys.forEach(element => {
      let symptom = {};
      symptom.active = this.props.selectedRequest[element];
      symptom.name = commonStrings.AllSymtoms[element];
      symptomList.push(symptom);
    });

    this.state = {
      symptomList: symptomList
    };
  }


  componentDidMount() {
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
    const { selectedRequest, request } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content'/>
        <ScrollView>
          <View style={styles.mainContentContainer}>
            {/* <View style={styles.textWrapper}>
              <Text style={styles.textPoint}>Requested to: </Text>
              <Text style={styles.textName}>{request.doctor.Name}</Text>
            </View> */}
            <View style={styles.textWrapper}>
              <Text style={styles.textPoint}>Status:</Text>
              <Text style={styles.textName}>{selectedRequest.Status}</Text>
            </View>
            {/* <View style={styles.textWrapper}>
              <Text style={styles.textPoint}>Recommendation: </Text>
              <Text style={styles.textName}>FluApp</Text>
            </View> */}
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
        </ScrollView>
      </View>
    );
  }
}


const mapStateToProps = ({ status, request }) => {
  return {
    status,
    request,
  }
};


const mapDispatchToProps = {
};


export default connect(mapStateToProps, mapDispatchToProps)(RequestDetail);
