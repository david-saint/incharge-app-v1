import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { login } from '../actions';
import AuthenticationLogin from '../components';

const actions = { login };

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationLogin);
