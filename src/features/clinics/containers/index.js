import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import MapScreens from '../components';
import { updateReminderTime } from '@/features/pill/actions';
import { userFetch } from '@/features/authentication/actions';

const actions = { userFetch, updateReminderTime };

const mapStateToProps = state => ({
  auth: state.auth,
  reminder: state.reminder,
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(MapScreens);
