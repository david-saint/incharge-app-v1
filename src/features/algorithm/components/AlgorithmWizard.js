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
	nuData: []
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
data = this.props.algorithm.algo;

filterConditionalFactor = (factor) => {
	let profile = this.props.profile;
	for (const property in profile) {
		if(property == factor){
			return profile[property];
		}
	}
}

processConditional(active){
	
	switch (active.conditionalOperator) {
		case '=':
			if(this.filterConditionalFactor(active.conditionalFactor) == active.conditionalValue){
				return active.onPositive;
			} else {
				return active.onNegative;
			}
		case '!=':
			if(this.filterConditionalFactor(active.conditionalFactor) != active.conditionalValue){
				return active.onPositive;
			} else {
				return active.onNegative;
			}
		case '>':
			if(this.filterConditionalFactor(active.conditionalFactor) > active.conditionalValue){
				return active.onPositive;
			} else {
				return active.onNegative;
			}
		case '<':
			if(this.filterConditionalFactor(active.conditionalFactor) < active.conditionalValue){
				return active.onPositive;
			} else {
				return active.onNegative;
			}
		case '>=':
			if(this.filterConditionalFactor(active.conditionalFactor) >= active.conditionalValue){
				return active.onPositive;
			} else {
				return active.onNegative;
			}
		case '<=':
			if(this.filterConditionalFactor(active.conditionalFactor) <= active.conditionalValue){
				return active.onPositive;
			} else {
				return active.onNegative;
			}
		default:
			
	}
}
_handleNextItem = () => {
	const { index } = this.state;
	const active = this.data[index];	
	
	if(active.actionType == null && active.text != 'Empty') {	
		if(active.nextMove == null && active.onPositive == null && active.onNegative == null){//END of Algo
			
			this.props.onChangePlan(this.state.tempPlan);
		} else {
			if(active.tempPlan != null){
				this.setState({tempPlan: active.tempPlan});
			}
			const nextActive = this.data[active.nextMove];
		
			if(nextActive.text == 'Empty'){
				let nuActive = this.processConditional(nextActive);
				this.setState({ index: this.data.findIndex(e => e.id == nuActive) })
			} else {
				
				this.setState({ index: this.data.findIndex(e => e.id == active.nextMove) });
			}
		} 		
	} else if(active.actionType == null && active.text == 'End'){
		
	}
}

_onNegativeAction = (onNegative, tempPlanDirN) => {
	let nuStep = this.data[onNegative];
	if(tempPlanDirN != null){
		this.setState({tempPlan: tempPlanDirN});
	}

	if(nuStep.text == 'Empty'){
		
		let nuActive = this.processConditional(nuStep);
		this.setState({ index: this.data.findIndex(e => e.id == nuActive) });
	} else {
		this.setState({ index: this.data.findIndex(e => e.id == onNegative) });
	}
}

_onPositiveAction = (onPositive, tempPlanDirP) => {
	let nuStep = this.data[onPositive];
	if(tempPlanDirP != null){
		this.setState({tempPlan: tempPlanDirP});
	}

	if(nuStep.text == 'Empty'){
		
		let nuActive = this.processConditional(nuStep);
		this.setState({ index: this.data.findIndex(e => e.id == nuActive) });
	} else {
		this.setState({ index: this.data.findIndex(e => e.id == onPositive) });
	}
}

_onInputDone = (onPositive) => {
	this.setState({ index: this.data.findIndex(e => e.id == onPositive) });
}

_onDateDone = (onPositive) => {
	this.props.onChangePeriod({
					cycle_length: this.state.cycleLength,
					period_length: this.state.periodLength,
					last_period_started_at: this.state.lastPeriodAt,
				});
	this.setState({ index: this.data.findIndex(e => e.id == onPositive) });
}

_renderActions = () => {
	const { index } = this.state;
	const activ = this.data[index];
	
	switch (activ.actionType) {
		case 'bool':
			return (
				<Fragment>
					<Button mode="text" onPress={() => this._onPositiveAction(activ.onPositive, activ.tempPlanDirP)}>
						{activ.positive}
					</Button>

					<Button mode="text" onPress={() => this._onNegativeAction(activ.onNegative, activ.tempPlanDirN)}>
						{activ.negative}
					</Button>
				</Fragment>
			);

		case 'input':
			return (
				<Fragment>
					<TextInput
					dense={true}
					mode="outlined"
					label={activ.label}
					style={{ width: 200, justifyContent: 'center' }}
					keyboardType='number-pad'
					value={this.state[activ.stateValue]}
					onChangeText={text => this.setState({ [activ.stateValue]: text })}/>

					<Button mode="text" onPress={() => this._onInputDone(activ.nextMove)}>
						Done
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
						// minDate={moment().format('YYYY-MM-DD')}
						// maxDate={moment().subtract(2, 'months').format('YYYY-MM-DD')}
						date={this.state[activ.stateValue]}
						customStyles={{ ...datepickerStyles }}
						onDateChange={date => this.setState({ [activ.stateValue]: date })} />

					<Button mode="text" onPress={() => this._onDateDone(activ.nextMove)}>
						Done
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
					has.call(this.data[index], 'actionType') && (
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
