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
import { getRequests } from '@redux/request/actions';

import ConnectionItem from '@components/connectionItem';

const inviteConnectionImage = require('@common/assets/imgs/ico_add_invite.png');

const ico_nav_logout = require('@common/assets/imgs/ico_nav_logout.png');
const ico_nav_other_appsettings = require('@common/assets/imgs/ico_nav_other_appsettings.png');


class Main extends Component {

  static renderLeftButton(props) {
    return (
      <TouchableOpacity 
        style={styles.buttonWrapper}
        onPress={() => props.onLeft()}
      >
        <Image source={ico_nav_other_appsettings} style={styles.imageAvatar} resizeMode="contain" />
      </TouchableOpacity>
    );
  }


  static renderRightButton(props) {
    return (
      <TouchableOpacity
        onPress={() => props.onRight()}
        style={styles.buttonWrapper}
      >
        <Image source={ico_nav_logout} style={styles.imageAvatar} resizeMode="contain" />
      </TouchableOpacity>
    );
  }

  
  static renderTitle(props) {
    return (
      <Text style={styles.textTitle}>My requests</Text>
    );
  }
  

  constructor(props) {
    super(props);

    this.state = {
      activeRquests: [],
      completedRequests: [],
    }
  }

  componentDidMount() {
    Actions.refresh({onLeft: this.onProfile.bind(this)});
    Actions.refresh({onRight: this.onLogout.bind(this)});
    this.props.getRequests();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.status.type === types.GET_DOCTORS_REQUEST && nextProps.status.type === types.GET_DOCTORS_SUCCESS) {
      const doctors = nextProps.request.doctors.records;
      let doctorData = [];
      doctors.forEach((doctor) => {
        doctorData.push({
          value: doctor.Name,
        });
      });
      this.setState({
        doctorData,
        doctorName: doctorData[0].value,
      });
    }

    if (this.props.status.type === types.GET_REQUESTS_REQUEST && nextProps.status.type === types.GET_REQUESTS_SUCCESS) {
      const requests = nextProps.request.requests.records;
      let activeRquests = [];
      let completedRequests = [];
      requests.forEach((request) => {
        if (request.Status === 'New') {
          activeRquests.push({
            avatar: -1,
            name: 'Case ' + request.CaseNumber,
            phoneNumber: '',
            amount: '',
            active: false,
            status: request.Status,
            accountId: request.AccountId,
          });
        } else {
          completedRequests.push({
            avatar: -1,
            name: 'Case ' + request.CaseNumber,
            phoneNumber: '',
            amount: '',
            active: false,
            status: request.Status,
            accountId: request.AccountId,
          });
        }
        console.log('AccountID : ', request.AccountId);
      });
      this.setState({
        activeRquests,
        completedRequests,
      });
    }
  }

  onProfile() {
    Actions.Profile();
  }


  onLogout() {
    Actions.popTo('Login');
  }

  onNewRequest() {
    Actions.NewRequest();
  }


  onSelectItem(item, index, section) {
    const param = {
      name: item.name,
      phoneNumber: item.phoneNumber,
      amount: item.active ? item.amount : 0,
      status: item.status,
      accountId: item.accountId,
    };
    Actions.RequestDetail({selectedRequest: param});
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
      <ConnectionItem 
        {...item} 
        onPress={() => this.onSelectItem(item, index, section)}
      />
    );
  }


  render() {
    return (
      <View style={styles.container}>
        <StatusBar barStyle='light-content' />
        <ScrollView style={styles.mainContentContainer}>
          <TouchableOpacity onPress={this.onNewRequest.bind(this)} style={styles.inviteContainer}>
            <Image source={inviteConnectionImage} style={styles.imageInviteConnection} resizeMode="contain" />
            <Text style={styles.textDescription}>Add new request</Text>
          </TouchableOpacity>
          <SectionList
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index}
            renderSectionHeader={({section}) => this.renderSectionHeader(section)}          
            renderItem={({item, index, section}) => this.renderItem(item, index, section)}
            sections={[
              {
                key: commonStrings.ActiveRequests,
                data: this.state.activeRquests,
              },
              {
                key: commonStrings.CompletedRequests,
                data: this.state.completedRequests,
              },
            ]}
          />
        </ScrollView>
      </View>
    );
  }
}


const mapStateToProps = ({ status, request, doctors }) => {
  return {
    status,
    request,
    doctors,
  }
};


const mapDispatchToProps = {
  getRequests,
};


export default connect(mapStateToProps, mapDispatchToProps)(Main);
