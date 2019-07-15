import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { register } from '../actions';
import AuthenticationRegister from '../components';

const actions = { register };

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationRegister);
