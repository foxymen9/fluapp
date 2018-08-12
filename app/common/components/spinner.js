import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  ActivityIndicator,
  Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Modal from "react-native-modal";

const SIZES = ['small', 'normal', 'large'];
const animationTiming = 300;

class Spinner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: this.props.visible,// || (this.props.status && this.props.status.spinning),
    };
  }

  static propTypes = {
    visible: PropTypes.bool,
    status: PropTypes.object,
    cancelable: PropTypes.bool,
    animationIn: PropTypes.string,
    animationOut: PropTypes.string,
    color: PropTypes.string,
    size: PropTypes.oneOf(SIZES),
    overlayColor: PropTypes.string,
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
  };

  static defaultProps = {
    visible: false,
    status: {},
    cancelable: false,
    animationIn: 'zoomInDown',
    animationOut: 'zoomOutUp',
    color: 'white',
    size: 'large', // 'normal',
    overlayColor: 'rgba(0, 0, 0, 0.05)',
    onSuccess: () => {},
    onError: () => {},
  };

  componentWillReceiveProps(nextProps) {
    const { 
      visible,
      status,
    } = nextProps;
    const isVisible =  visible;// || (status && status.spinning);
    this.setState({ 
      visible: isVisible,
    });

    if (!isVisible) {
      if (status && status.error && (Object.keys(this.props.status.error).length === 0) && (Object.keys(status.error).length > 0)) {
        this.showError(status.error);
        return;
      } else if (status && status.success && (Object.keys(this.props.status.success).length === 0) && (Object.keys(status.success).length > 0)) {
        this.showSuccess(status.success);
        return;
      } else {
        if ((this.props.status.spinning === true) && (nextProps.status.spinning === false)) {
          if (this.props.onSuccess) {
            this.props.onSuccess();
          }
        }
      }
    }
  }

  showError(errors) {
    if (errors === null) {
      return;
    }
    
    if (Array.isArray(errors)) {
      errors = errors[0];
    }

    if (Object.keys(errors).length) {
      const errorKeys = Object.keys(errors)
      if (errorKeys.length > 0) {
        const message = errors['error_description'] || errors['message'];
        setTimeout(() => {
          Alert.alert('Error', message, 
          [
            {
              text: 'Close', 
              onPress: () => {
                if (this.props.onError) {
                  this.props.onError();
                }
              }
            },
          ]);
        }, animationTiming);
      }
    } else if (errors !== '') {
      setTimeout(() => {
        Alert.alert('Error', errors, 
        [
          {
            text: 'Close', 
            onPress: () => {
              if (this.props.onError) {
                this.props.onError();
              }
            }
          },
        ]);
      }, animationTiming);
    }
  };

  showSuccess(success) {
    setTimeout(() => {
      Alert.alert('Success', success.message, [
        {
          text: 'OK', 
          onPress: () => {
            if (this.props.onSuccess) {
              this.props.onSuccess();
            }
          }
        },
      ]);
    }, animationTiming);
  }

  close() {
    this.setState({ visible: false });
  }

  handleOnRequestClose() {
    if (this.props.cancelable) {
      this.close();
    }
  }

  renderDefaultContent() {
    return (
      <ActivityIndicator
        style={{ flex: 1 }}
        color={this.props.color}
        size={this.props.size}
      />
    );
  }

  onModalShow() {
  }

  onModalHide() {
  }

  render() {
    if (!this.state.visible)
      return null;
    const {
      animationIn,
      animationOut,
    } = this.props;

    return (
      <Modal
        style={styles.modal}
        isVisible={this.state.visible}
        animationIn={animationIn}
        animationInTiming={animationTiming}
        animationOutTiming={animationTiming}
        animationOut={animationOut}
        onBackButtonPress={() => this.handleOnRequestClose()}
        onModalShow={() => this.onModalShow()}
        onModalHide={() => this.onModalHide()}
        supportedOrientations={['portrait', 'landscape']}
      >
        <View style={[styles.container, { backgroundColor: this.props.overlayColor }]}>
          {this.props.children ? this.props.children : this.renderDefaultContent()}
        </View>
      </Modal>
    );
  }
}


const mapStateToProps = ({ status }) => {
  return {
    status,
  }
};


const mapDispatchToProps = {
}

export default connect(mapStateToProps, mapDispatchToProps)(Spinner);


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modal: {
    margin: 0,
  },
});
