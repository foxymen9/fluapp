import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,  
} from 'react-native';

import PropTypes from 'prop-types';
import * as commonStyles from '@common/styles/commonStyles';
import globalStyle from '@common/styles/commonStyles';
import { styles } from './styles';


const imageLogo = require('@common/assets/imgs/ico_general_logo_icon.png');

export default class ConnectionItem extends Component {

  static propTypes = {
    avatar: PropTypes.number,
    name: PropTypes.string,
    phoneNumber: PropTypes.string,
    active: PropTypes.bool,
    onPress: PropTypes.func,
  }


  static defaultProps = {
    avatar: -1,
    name: '',
    phoneNumber: '',
    active: false,
    onPress: () => {},    
  }


  constructor(props) {
    super(props);
   
  }


  onPress() {
    if (this.props.onPress) {
      this.props.onPress();
    }
  }


  renderAvatar(avatar) {
    if (avatar != -1) {
      return (
        <Image source={avatar} style={styles.imageAvatar} resizeMode="contain" />
      );
    }

    const arrayName = this.props.name.split(" ");
    let twoName = "";
    if (arrayName.length > 0) {
      twoName = arrayName[0].charAt(0);
    }

    if (arrayName.length > 1) {
      twoName += arrayName[1].charAt(0);
    }

    twoName = twoName.toUpperCase();

    return (
      <View style={styles.nameAvatarContainer}>
        <Text style={styles.textAvatarName}>{twoName}</Text>
      </View>
    );
  }

  
  render() {
    const { avatar, name, phoneNumber, active } = this.props;

    return (
      <TouchableOpacity
        onPress={this.onPress.bind(this)}
        style={styles.activityItem}
      >
        { /*} {this.renderAvatar(avatar)}*/ }
        <View style={styles.mainContentContainer}>
          <View style={styles.textContainer}>
            <Text style={styles.textName}>{name}</Text>
            <Text style={styles.textNumber}>{phoneNumber}</Text>
          </View>
          {
            active ? <Image source={imageLogo} style={styles.imageActive} resizeMode="contain" /> : null
          }
        </View>
      </TouchableOpacity>
    );
  }
}