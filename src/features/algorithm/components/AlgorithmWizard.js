import React, { Component, Fragment } from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { has } from '@/api/helpers';
import AppStyles from '@/config/styles';
import LottieView from 'lottie-react-native';
import DatePicker from 'react-native-datepicker';
import {
  Button,
  TextInput,
} from 'react-native-paper';
import {
  View,
  Platform,
  Keyboard,
  UIManager,
  StyleSheet,
  LayoutAnimation,
  KeyboardAvoidingView,
} from 'react-native';

import TypingText from './TypingText';
import { datepickerStyles } from './styles';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: AppStyles.colors.lightWhite,
  },
  svgContainer: {
    flex: 2,
    overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
  },
  wizardContainer: {
    flex: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  wizardText: {
    flex: 3,
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  wizardAction: {
    flex: 1,
    width: '100%',
    paddingVertical: 12,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
});

export default class AlgorithmWizard extends Component {
  constructor(props) {
    super(props);

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental
        && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  state = {
    index: 0,
    tempPlan: '',
    loading: true,
    cycleLength: null,
    periodLength: null,
    lastPeriodAt: null,
    progestogenPossible: false,
  }

  componentDidMount() {
    this.animationTimer = setTimeout(() => {
      this.setState({ loading: false }, () => this.typingText.play());
      LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    }, 3300);
  }

  componentWillUnmount() {
    clearTimeout(this.animationTimer);
  }

  data = [
    {
      text: `Hello, ${this.props.auth.name}!`,
      delay: 1000,
      next: () => {
        this.setState({ index: this.state.index + 1 });
      },
    },
    {
      text:
`${this.props.profile.religion_sect === 'CATHOLIC' ? 'We noticed you\'re Catholic, ' : ''}
Would you like to consider other family planning methods apart from the Natural types?`,
      delay: 500,
      actions: {
        type: 'bool',
        positive: 'Yes',
        negative: 'No',
        onNegative: () => this.setState({ index: this.state.index + 1 }),
        onPositive: () => this.setState({ index: this.data.findIndex(e => e.id === 'fpm') }),
      },
    },
    {
      text:
`The Natural Family Planning Methods include: Withdrawal method, and Fertile Period Monitor.
${this.props.profile.gender === 'MALE'
  ? `As a man the withdrawal method is the best contraceptive plan for you.
You should withdraw your penis from your partner's vagina and ejaculate outside the vagina.`
  : 'As a woman the Fertile Period Monitor is perfect for you.\n We will proceed to setting up your calendar.'}`,
      delay: 1000,
      next: () => {
        const { profile: { gender } } = this.props;
        if (gender === 'MALE') {
          return this.setState({
            index: this.data.findIndex(e => e.id === 'all-set'),
            tempPlan: 'WITHDRAWAL_METHOD',
          });
        }
        // We've already found the plan, but if we update it the
        // wizard ends. To bypass that we store it temporarily, to update later.
        return this.setState({
          index: this.state.index + 1,
          tempPlan: 'FERTILE_PERIOD_MONITOR',
        });
      },
    },
    {
      id: 'calendar-setup',
      text: 'What\'s the average number of days that make up your menstrual cycle?',
      delay: 500,
      actions: {
        type: 'input',
        keyboard: 'number-pad',
        confirmationText: 'Done',
        stateValue: 'cycleLength',
        label: 'Cycle Length',
        onConfirmation: () => {
          Keyboard.dismiss();
          this.setState({ index: this.state.index + 1 });
        },
      },
    },
    {
      text: 'How many days does each Menstrual Period last?',
      delay: 500,
      actions: {
        type: 'input',
        keyboard: 'number-pad',
        confirmationText: 'Done',
        stateValue: 'periodLength',
        label: 'Average Period Days',
        onConfirmation: () => {
          Keyboard.dismiss();
          this.setState({ index: this.state.index + 1 });
        },
      },
    },
    {
      text: 'When did your last Menstrual Period begin?',
      delay: 500,
      actions: {
        type: 'date',
        confirmationText: 'Done',
        stateValue: 'lastPeriodAt',
        maxDate: moment().format('YYYY-MM-DD'),
        minDate: moment().subtract(2, 'months').format('YYYY-MM-DD'),
        onConfirmation: () => {
          this.props.onChangePeriod({
            cycle_length: this.state.cycleLength,
            period_length: this.state.periodLength,
            last_period_started_at: this.state.lastPeriodAt,
          });
          this.setState({ index: this.state.index + 1 });
        },
      },
    },
    {
      id: 'all-set',
      text:
`All Set!
The Best Contraceptive Plan for you is set.
Hold on while we set up your space.`,
      delay: 1000,
      next: () => {
        this.props.onChangePlan(this.state.tempPlan);
      },
    },
    {
      id: 'fpm',
      text: 'Great, Let\'s find out what contraceptive plan is right for you.',
      delay: 1000,
      next: () => {
        const { profile: { gender } } = this.props;
        if (gender === 'MALE') {
          return this.setState({ index: this.state.index + 1 });
        }
        return this.setState({ index: this.data.findIndex(e => e.id === 'female-fpm') });
      },
    },
    {
      text: 'Are you looking for a temporary solution or a permanent one?',
      delay: 500,
      actions: {
        type: 'bool',
        positive: 'Temporary',
        negative: 'Permanent',
        onPositive: () => {
          this.setState({ index: this.state.index + 1 });
        },
        onNegative: () => {
          this.setState({ index: this.data.findIndex(e => e.id === 'permanent-male-fpm') });
        },
      },
    },
    {
      text:
`The temporary contraceptive method for men is condoms.
The pregnancy rate of condoms is 2% per year.
The best contraceptive plan for you is the use of condoms.`,
      delay: 1000,
      next: () => this.setState({
        index: this.data.findIndex(e => e.id === 'all-set'),
        tempPlan: 'MALE_BARRIER',
      }),
    },
    {
      id: 'permanent-male-fpm',
      text:
`The permanent contraceptive method for men is a Vasectomy.
Vasectomy is a surgical procedure for male sterilization or permanent birth control.
The best contraceptive plan for you is to get a Vasectomy.
This is a surgical procedure, therefore adequate counselling from a healthcare professional is required`,
      delay: 1500,
      textType: 'smaller',
      next: () => this.setState({
        index: this.data.findIndex(e => e.id === 'all-set'),
        tempPlan: 'MALE_VASECTOMY',
      }),
    },
    {
      id: 'combined-oral',
      text:
`The combined oral contraceptive pill, often referred to as the birth control pill or "the pill", is a type of birth control that is designed to be taken orally by women.
This is the best contaceptive plan for you.`,
      next: () => this.setState({
        index: this.data.findIndex(e => e.id === 'calendar-setup'),
        tempPlan: 'COMBINED_ORAL',
      }),
    },
    {
      id: 'female-fpm',
      text: 'Do you have any history of yellowness of the eyes or Liver/gall bladder problems?',
      delay: 250,
      actions: {
        type: 'bool',
        negative: 'No',
        positive: 'Yes',
        onNegative: () => this.setState({ index: this.state.index + 1 }),
        onPositive: () => this.setState({ index: this.data.findIndex(e => e.id === 'combined-oral') }),
      },
    },
    {
      text: 'Are you currently taking any medications for seizures?',
      delay: 250,
      actions: {
        type: 'bool',
        negative: 'No',
        positive: 'Yes',
        onNegative: () => this.setState({ index: this.state.index + 1 }),
        onPositive: () => this.setState({ index: this.data.findIndex(e => e.id === 'combined-oral') }),
      },
    },
    {
      text: 'Is there any history of breast cancer with you or in your family?',
      delay: 250,
      actions: {
        type: 'bool',
        negative: 'No',
        positive: 'Yes',
        onNegative: () => {
          if (this.props.profile.pregnancy_status) {
            return this.setState({ index: this.state.index + 1 });
          }
          return this.setState({
            progestogenPossible: true,
            index: this.state.index + 2,
          });
        },
        onPositive: () => this.setState({
          index: this.data.findIndex(e => e.id === 'combined-oral'),
        }),
      },
    },
    {
      text: 'Is your baby less than 6 weeks old?',
      delay: 250,
      actions: {
        type: 'bool',
        negative: 'No',
        positive: 'Yes',
        onNegative: () => this.setState({
          progestogenPossible: true,
          index: this.state.index + 1,
        }),
        onPositive: () => this.setState({
          index: this.data.findIndex(e => e.id === 'combined-oral'),
        }),
      },
    },
    {
      text:
`Combined Oral Contraceptive Pills stop eggs being made, so no egg is released from the ovary.
It is normally 92% effective, and side effects include: irregular menstruation and acne.
Progestogen-only pills work mainly by thickening the mucus in the cervix so sperm can’t travel through it.
It is typically 92% effective, and the side effect is irregular menstruation.`,
      delay: 2500,
      textType: 'smaller',
      next: () => this.setState({ index: this.state.index + 1 }),
    },
    {
      text: 'What type of contraception would you prefer',
      delay: 350,
      actions: {
        type: 'bool',
        positive: 'Combined Oral',
        negative: 'Progestogen-Only',
        onNegative: () => this.setState({
          index: this.data.findIndex(e => e.id === 'calendar-setup'),
          tempPlan: 'PROGESTOGEN_ONLY',
        }),
        onPositive: () => this.setState({ index: this.state.index + 1 }),
      },
    },
    {
      text: 'Are you hypertensive or diabetic?',
      delay: 250,
      actions: {
        type: 'bool',
        negative: 'No',
        positive: 'Yes',
        onNegative: () => this.setState({ index: this.state.index + 1 }),
        onPositive: () => this.setState({ index: this.data.findIndex(e => e.id === 'combined-oral') }),
      },
    },
    {
      text: 'Do you have migraines often?',
      delay: 250,
      actions: {
        type: 'bool',
        negative: 'No',
        positive: 'Yes',
        onNegative: () => this.setState({ index: this.state.index + 1 }),
        onPositive: () => this.setState({ index: this.data.findIndex(e => e.id === 'combined-oral') }),
      },
    },
    {
      text: 'Have you ever had a stroke or heart disease?',
      delay: 250,
      actions: {
        type: 'bool',
        negative: 'No',
        positive: 'Yes',
        onNegative: () => this.setState({ index: this.state.index + 1 }),
        onPositive: () => this.setState({ index: this.data.findIndex(e => e.id === 'combined-oral') }),
      },
    },
    {
      text: 'Are you taking rifampicin/rifabutin for tuberculosis?',
      delay: 250,
      actions: {
        type: 'bool',
        negative: 'No',
        positive: 'Yes',
        onNegative: () => this.setState({ index: this.state.index + 1 }),
        onPositive: () => this.setState({ index: this.data.findIndex(e => e.id === 'combined-oral') }),
      },
    },
    {
      text:
`The best contraceptive plans for you are the Combined Hormonal Contraceptives.
Would you prefer to take the pills or wear patches/vaginal-rings
The Patches/Vaginal-Rings are not readily availiable in Nigeria`,
      delay: 350,
      actions: {
        type: 'bool',
        positive: 'Pills',
        negative: 'Patches/Vaginal-Rings',
        onNegative: () => this.setState({
          index: this.data.findIndex(e => e.id === 'calendar-setup'),
          tempPlan: 'COMBINED_PATCHES',
        }),
        onPositive: () => this.setState({
          tempPlan: 'COMBINED_ORAL',
          iindex: this.data.findIndex(e => e.id === 'calendar-setup'),
        }),
      },
    },
  ]

  _handleNextItem = () => {
    const { index } = this.state;
    const active = this.data[index];
    if (!has.call(active, 'actions')) {
      active.next();
    }
  }

  _renderActions = () => {
    const { index } = this.state;
    const { actions } = this.data[index];

    switch (actions.type) {
      case 'bool':
        return (
          <Fragment>
            <Button
              mode="text"
              onPress={actions.onPositive}>
               {actions.positive}
            </Button>

            <Button
              mode="text"
              onPress={actions.onNegative}>
              {actions.negative}
            </Button>
          </Fragment>
        );

      case 'input':
        return (
          <Fragment>
            <TextInput
              dense={true}
              mode="outlined"
              label={actions.label}
              style={{ width: 200, justifyContent: 'center' }}
              keyboardType={actions.keyboard}
              value={this.state[actions.stateValue]}
              onChangeText={text => this.setState({ [actions.stateValue]: text })}
              />

            <Button
              mode="text"
              onPress={actions.onConfirmation}>
              {actions.confirmationText}
            </Button>
          </Fragment>
        );

      case 'date':
        return (
          <Fragment>
            <DatePicker
              mode="date"
              showIcon={false}
              format="YYYY-MM-DD"
              cancelBtnText="Cancel"
              style={{ width: 200 }}
              confirmBtnText="Confirm"
              minDate={actions.minDate}
              maxDate={actions.maxDate}
              date={this.state[actions.stateValue]}
              customStyles={{ ...datepickerStyles }}
              onDateChange={date => this.setState({ [actions.stateValue]: date })} />

            <Button
              mode="text"
              onPress={actions.onConfirmation}>
              {actions.confirmationText}
            </Button>
          </Fragment>
        );

      default:
        return (
          <View style={{ flex: 1, backgroundColor: AppStyles.colors.mateBlack }} />
        );
    }
  }

  render() {
    const { index, loading } = this.state;
    const active = this.data[index];
    if (loading) {
      return (
        <View
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: AppStyles.colors.lightWhite,
          }}>
          <LottieView
            loop
            autoPlay
            style={{ width: '90%' }}
            source={require('@/assets/animations/splash-primary.json')} />
        </View>
      );
    }

    return (
      <KeyboardAvoidingView
        behavior="position"
        style={styles.container}
        contentContainerStyle={styles.container}>
        <View style={styles.svgContainer}>
          <LottieView
            loop
            autoPlay
            style={{ width: '100%' }}
            source={require('@/assets/animations/animation.json')} />
        </View>
        <View style={styles.wizardContainer}>
          <View style={styles.wizardText}>
            <TypingText
              speed={50}
              type={active.textType}
              onComplete={this._handleNextItem}
              text={active.text}
              delay={active.delay}
              ref={(ref) => { this.typingText = ref; }} />
          </View>
            {
              has.call(this.data[index], 'actions') && (
                <View style={styles.wizardAction}>
                  { this._renderActions() }
                </View>
              )
            }
        </View>
      </KeyboardAvoidingView>
    );
  }
}

AlgorithmWizard.propTypes = {
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  onChangePlan: PropTypes.func.isRequired,
  onChangePeriod: PropTypes.func.isRequired,
};
