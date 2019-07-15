import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { passwordReset } from '../actions';
import PasswordResetComplete from '../components/PasswordResetComplete';

const actions = { passwordReset };

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(PasswordResetComplete);
