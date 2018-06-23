import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
} from 'react-native';

import PropTypes from 'prop-types';
import { styles } from './styles';

const greenTickImage = require('@common/assets/imgs/green_tick.png');
const greyTickImage = require('@common/assets/imgs/gray_tick.png');


export default class SymptomItem extends Component {

  static propTypes = {
    avatar: PropTypes.number,
    name: PropTypes.string,
    active: PropTypes.bool,
    onPress: PropTypes.func,
  }


  static defaultProps = {
    name: '',
    active: false,
    onPress: () => {},    
  }


  constructor(props) {
    super(props);
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
    const { avatar, name, active } = this.props;

    return (
      <View style={styles.activityItem} >
        { avatar ? this.renderAvatar(avatar) : null}
        <View style={styles.mainContentContainer}>
          <View style={styles.textContainer}>
          {
            active ? 
            <Text style={styles.textActive}>{name}</Text>
            :
            <Text style={styles.textInactive}>{name}</Text>
          }
          </View>
          {
            active ? 
            <Image source={greenTickImage} style={styles.imageTick} resizeMode="contain" /> 
            : 
            <Image source={greyTickImage} style={styles.imageTick} resizeMode="contain" /> 
          }
        </View>
      </View>
    );
  }
}