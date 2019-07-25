import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  getFaqGroups,
  getFaqGroupContent,
} from '@/features/faq/actions';
import ContraceptionAlgorithmScreen from '../components';
import { userFetch } from '@/features/authentication/actions';

const actions = { userFetch, getFaqGroups, getFaqGroupContent };

const mapStateToProps = state => ({
  faq: state.faq,
  auth: state.auth,
});

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ContraceptionAlgorithmScreen);
