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
import { connect } from 'react-redux';

import { Actions, ActionConst } from 'react-native-router-flux';
import { Dropdown } from 'react-native-material-dropdown';

import * as commonStyles from '@common/styles/commonStyles';
import globalStyle from '@common/styles/commonStyles';
import * as commonStrings from '@common/styles/commonStrings';
import { styles } from './styles';
import * as types from '@redux/actionTypes';
import {
  getRequests,
  createNewRequest,
} from '@redux/request/actions';
import Spinner from '@common/components/spinner';

import ClickableSymptomItem from '@components/clickableSymptomItem';
const backImage = require('@common/assets/imgs/ico_nav_back_white.png');


class NewRequest extends Component {
  
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

  
  static renderTitle(props) {
    return (
      <Text style={styles.textTitle}>New request</Text>
    );
  }


  constructor(props) {
    super(props);

    let symptomList = [];
    var keys = Object.keys(commonStrings.AllSymtoms);
    keys.forEach(element => {
      let symptom = {};
      symptom.active = false;
      symptom.name = commonStrings.AllSymtoms[element];
      symptomList.push(symptom);
    });

    this.state = {
      symptomList: symptomList,
      loading: false,
    };
  }

  componentDidMount() {
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.status.type === types.CREATE_NEW_REQUEST_REQUEST) {
      this.setState({ loading: true });
    } else if (this.props.status.type === types.CREATE_NEW_REQUEST_REQUEST && nextProps.status.type === types.CREATE_NEW_REQUEST_SUCCESS) {
      this.setState({ loading: false });
      Actions.pop();
      this.props.getRequests(this.props.user.account.Id);   
    } else if (this.props.status.type === types.CREATE_NEW_REQUEST_REQUEST && nextProps.status.type === types.CREATE_NEW_REQUEST_FAILED) {
      this.setState({ loading: false });
    } 
  }

  onReset() {
    let { symptomList } = this.state;
    symptomList.forEach(element => {
      element.active = false;
    });
    
    this.setState({symptomList});
	}

  onSubmit() {
    let symptoms = {};
    var keys = Object.keys(commonStrings.AllSymtoms);
    keys.map((element, index) => {
      symptoms[element] = this.state.symptomList[index].active;
    });
    const data = {
      ...symptoms,
      AccountId: this.props.user.account.Id,
    }
    this.props.createNewRequest(data);
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
    const { 
      symptomList,
    } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content'/>
        <Spinner visible={this.state.loading} currentScreen='NewRequest'/>
        <ScrollView style={styles.mainContentContainer}>
          {/* <View style={styles.textWrapper}>
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
          /> */}
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


const mapStateToProps = ({ status, user, request }) => {
  return {
    status,
    user,
    request,
  }
};


const mapDispatchToProps = {
  getRequests,
  createNewRequest,
};


export default connect(mapStateToProps, mapDispatchToProps)(NewRequest);
