import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ContraceptionAlgorithmScreen from '../components';
import { userFetch } from '@/features/authentication/actions';

const actions = { userFetch };

const mapStateToProps = state => ({
  auth: state.auth,
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ContraceptionAlgorithmScreen);
