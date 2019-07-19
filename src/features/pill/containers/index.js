import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ContraceptionAlgorithmScreen from '../components';
import { userFetch } from '@/features/authentication/actions';
import {
  startPillReminder,
  updateReminderTime,
  cancelPillReminder,
} from '@/features/pill/actions';

const actions = {
  userFetch,
  startPillReminder,
  updateReminderTime,
  cancelPillReminder,
};

const mapStateToProps = state => ({
  auth: state.auth,
  reminder: state.reminder,
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ContraceptionAlgorithmScreen);
