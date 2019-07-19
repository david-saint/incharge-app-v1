import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SettingsScreen from '../components';
import { logout } from '@/features/logout/actions';

const actions = { logout };

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
