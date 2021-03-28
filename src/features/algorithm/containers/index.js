import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ContraceptionAlgorithmScreen from '../components';
import { userFetch } from '@/features/authentication/actions';
import {
  getAlgo,
  setPlan,
  startAlgorithm,
  setPeriodCalculatorDetails,
} from '@/features/algorithm/actions';

const actions = {
  getAlgo,
  setPlan,
  userFetch,
  startAlgorithm,
  setPeriodCalculatorDetails,
};

const mapStateToProps = state => ({
  auth: state.auth,
  profile: state.profile,
  algorithm: state.algorithm,
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ContraceptionAlgorithmScreen);
