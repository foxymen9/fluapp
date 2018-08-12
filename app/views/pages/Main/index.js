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
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import * as commonStrings from '@common/styles/commonStrings';
import { styles } from './styles';
import * as types from '@redux/actionTypes';
import { 
  getRequests,
} from '@redux/request/actions';
import {
  resetAuth2Info,
  resetUserInfo,
} from '@redux/user/actions';

import ConnectionItem from '@components/connectionItem';

const inviteConnectionImage = require('@common/assets/imgs/ico_add_invite.png');
// const ico_nav_logout = require('@common/assets/imgs/ico_nav_logout.png');
// const ico_nav_other_appsettings = require('@common/assets/imgs/ico_nav_other_appsettings.png');


class Main extends Component {

  static renderLeftButton(props) {
    return (
      <TouchableOpacity 
        style={styles.buttonWrapper}
        activeOpacity={0.7}
        onPress={() => props.onLeft()}
      >
        <Ionicons name="md-settings" size={28} style={styles.iconNav} color={'#fff'} />
      </TouchableOpacity>
    );
  }


  static renderRightButton(props) {
    return (
      <TouchableOpacity
        onPress={() => props.onRight()}
        activeOpacity={0.7}
        style={styles.buttonWrapper}
      >
        <MaterialCommunityIcons name="logout" size={25} style={styles.iconNav} color={'#fff'} />
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
    } else if (this.props.status.type === types.GET_REQUESTS_REQUEST && nextProps.status.type === types.GET_REQUESTS_SUCCESS) {
      const requests = nextProps.request.requests.records;
      let activeRquests = [];
      let completedRequests = [];
      requests.forEach((request) => {
        if (request.Status === 'New') {
          activeRquests.push({
            ...request,
            name: 'Case ' + request.CaseNumber,
          });
        } else {
          completedRequests.push({
            ...request,
            name: 'Case ' + request.CaseNumber,
          });
        }
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
    this.props.resetAuth2Info();
    this.props.resetUserInfo();
    Actions.popTo('Login');
  }


  onNewRequest() {
    Actions.NewRequest();
  }


  onSelectItem(item, index, section) {
    Actions.RequestDetail({selectedRequest: item});
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
  resetAuth2Info,
  resetUserInfo,
};


export default connect(mapStateToProps, mapDispatchToProps)(Main);
