import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { passwordReset } from '../actions';
import AuthenticationPasswordReset from '../components';

const actions = { passwordReset };

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationPasswordReset);
