import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import SettingsScreen from '../components';

const actions = {};

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(SettingsScreen);
