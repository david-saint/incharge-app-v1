import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppStyles from '@/config/styles';
import {
  View,
  StatusBar,
  LayoutAnimation,
  KeyboardAvoidingView,
} from 'react-native';
import Animated from 'react-native-reanimated';
import SetupSVG from '@/components/svg/SetupSVG';
import CourtingSVG from '@/components/svg/CourtingSVG';
import ProfileDataSVG from '@/components/svg/ProfileDataSVG';

import styles from './styles';
import Cover from './Cover.jsx';
import Content from './Content.jsx';
import BasicDataForm from './forms/BasicDataForm.jsx';
import MoreInformationForm from './forms/MoreInformationForm.jsx';
import SexInformationForm from './forms/SexInformationForm.jsx';


const { Value } = Animated;

export default class ProfilingScreens extends Component {
  y = new Value(0);

  state = {
    activeIndex: 0,
  }

  componentDidMount() {
    this.props.getEducationLevels();
    this.props.getContraceptionReasons();
  }

  setScrollRef = (ref) => {
    this.scrollRef = ref;
  }

  animateStateChange = () => {
    // Scroll to top.
    this.scrollRef.getNode().scrollTo({ y: 0, animated: true });
    // Animate the changes
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }

  incrementActive = () => {
    const { activeIndex } = this.state;

    this.setState({
      activeIndex: activeIndex + 1,
    });

    this.animateStateChange();
  }

  decrementActive = () => {
    const { activeIndex } = this.state;

    this.setState({
      activeIndex: activeIndex > 0 ? activeIndex - 1 : 0,
    });

    this.animateStateChange();
  }

  getActiveColor = () => {
    const { activeIndex } = this.state;
    switch (activeIndex) {
      case 0:
        return AppStyles.colors.primaryColor;

      case 1:
        return AppStyles.colors.accentColor;

      case 2:
        return AppStyles.colors.secondAccentColor;

      default:
        return AppStyles.colors.primaryColor;
    }
  }

  getActiveTitle = () => {
    const { activeIndex } = this.state;

    switch (activeIndex) {
      case 0:
        return 'Basic Details';

      case 1:
        return 'More Information';

      case 2:
        return 'Sexual Information';

      default:
        return 'Basic Details';
    }
  }

  rederCoverChild = () => {
    const { activeIndex } = this.state;

    switch (activeIndex) {
      case 0:
        return <SetupSVG />;

      case 1:
        return <ProfileDataSVG />;

      case 2:
        return <CourtingSVG />;

      default:
        return <SetupSVG />;
    }
  }

  renderContentChild = () => {
    const { activeIndex } = this.state;
    const { levels, reasons } = this.props.profile;
    const { auth: { token }, profile } = this.props;
    const mapped = levels.map(c => ({ key: c.id, label: c.name, value: c.id }));
    const reasonsmapped = reasons.map(c => ({ key: c.id, label: c.value, value: c.id }));

    switch (activeIndex) {
      case 0:
        return (
          <BasicDataForm
            onNextSuccess={this.incrementActive}
            onNext={this.props.storeBasicProfileData} />
        );

      case 1:
        return (
          <MoreInformationForm
            levels={mapped}
            onNextSuccess={this.incrementActive}
            onNext={this.props.storeMoreInformationData} />
        );

      case 2:
        return (
          <SexInformationForm
            token={token}
            profile={profile}
            reasons={reasonsmapped}
            onNextSuccess={this.props.setProfile}
            onNext={this.props.storeSexInformationData} />
        );

      default:
        return <BasicDataForm onNext={this.props.storeBasicProfileData} />;
    }
  }

  render() {
    const { y, setScrollRef } = this;
    return (
      <View style={[styles.container, { backgroundColor: AppStyles.colors.white }]}>
        <StatusBar backgroundColor={this.getActiveColor()} barStyle="light-content" />
        <Cover
          { ...{ y } }
          color={this.getActiveColor()}>
          {this.rederCoverChild()}
        </Cover>
        <Content
          { ...{ y, setScrollRef } }
          title={this.getActiveTitle()}
          color={this.getActiveColor()}>
          <KeyboardAvoidingView
            behavior="height">
            {this.renderContentChild()}
          </KeyboardAvoidingView>
        </Content>
      </View>
    );
  }
}

ProfilingScreens.propTypes = {
  profile: PropTypes.object,
  setProfile: PropTypes.func,
  navigation: PropTypes.object,
  getEducationLevels: PropTypes.func,
  storeBasicProfileData: PropTypes.func,
  getContraceptionReasons: PropTypes.func,
  storeSexInformationData: PropTypes.func,
  storeMoreInformationData: PropTypes.func,
};
