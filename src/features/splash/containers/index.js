import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SplashScreen from '../components';
import { isValidUser, hasSetProfile } from '../selectors';
import { userFetch } from '@/features/authentication/actions';

const actions = { userFetch };

const mapStateToProps = state => ({
  token: state.auth.token,
  valid: isValidUser(state),
  profiled: hasSetProfile(state),
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SplashScreen);
