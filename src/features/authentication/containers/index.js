import { connect } from 'react-redux';
import AuthenticationBase from '../components';

const mapStateToProps = ({ auth }) => ({ auth });

const mapDispatchToProps = () => ({});

export default connect(mapStateToProps, mapDispatchToProps)(AuthenticationBase);
