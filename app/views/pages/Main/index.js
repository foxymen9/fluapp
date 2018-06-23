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

import ConnectionItem from '@components/connectionItem';

const inviteConnectionImage = require('@common/assets/imgs/ico_add_invite.png');

const ico_nav_logout = require('@common/assets/imgs/ico_nav_logout.png');
const ico_nav_other_appsettings = require('@common/assets/imgs/ico_nav_other_appsettings.png');

const ico_avatar_allan = require('@common/assets/imgs/avatars/ico_avatar_allan.png');
const ico_avatar_04 = require('@common/assets/imgs/avatars/ico_avatar_04.png');
const ico_avatar_05 = require('@common/assets/imgs/avatars/ico_avatar_05.png');
const ico_avatar_lisa = require('@common/assets/imgs/avatars/ico_avatar_lisa.png');
const ico_avatar_07 = require('@common/assets/imgs/avatars/ico_avatar_07.png');

const ico_avatar_james_lovett = require('@common/assets/imgs/avatars/ico_avatar_james_lovett.png');

const recentConnections = [
  {
    avatar: ico_avatar_lisa,
    name: 'Lisa Chu',
    phoneNumber: 'lisachu@gmail.com',
    amount: '',
    active: false,
    status: commonStrings.TestRequestReceived,
  },
  {
    avatar: ico_avatar_james_lovett,
    name: 'James Lovett',
    phoneNumber: 'james_lovett@gmail.com',
    amount: '',
    active: false,
    status: commonStrings.DriverEnrouteToPatient,
  },
  {
    avatar: ico_avatar_07,
    name: 'Ty',
    phoneNumber: 'ty@cloudadvisory.io',
    amount: '',
    active: false,
    status: commonStrings.DriverEnrouteToLab,
  },
];

const friendsConections = [
  {
    avatar: ico_avatar_05,
    name: 'Stephen Brown',
    phoneNumber: 'orrin.swift@yahoo.com',
    amount: '',
    active: false,
    status: commonStrings.TestRequestReceived,
  },
  {
    avatar: ico_avatar_04,
    name: 'Micheal Burton',
    phoneNumber: 'chinooklover@hotmail.com',
    amount: '',
    active: false,
    status: commonStrings.DriverEnrouteToPatient,
  },
  {
    avatar: ico_avatar_allan,
    name: 'Lisa Allan',
    phoneNumber: 'lisa.allan@alexis.ca',
    amount: '',
    active: false,
    status: commonStrings.DriverEnrouteToLab,
  },
];


export default class Main extends Component {

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
  }

  componentDidMount() {
    Actions.refresh({onLeft: this.onProfile.bind(this)})
    Actions.refresh({onRight: this.onLogout.bind(this)})
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
                data: recentConnections,
              },
              {
                key: commonStrings.CompletedRequests,
                data: friendsConections,
              },
            ]}
          />
        </ScrollView>
      </View>
    );
  }
}
