import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
  setProfile,
  getEducationLevels,
  storeBasicProfileData,
  getContraceptionReasons,
  storeSexInformationData,
  storeMoreInformationData,
} from '../actions';
import ProfilingScreens from '../components';


const actions = {
  setProfile,
  getEducationLevels,
  storeBasicProfileData,
  getContraceptionReasons,
  storeSexInformationData,
  storeMoreInformationData,
};

const mapStateToProps = ({ auth, profile }) => ({ auth, profile });

const mapDispatchToProps = dispatch => bindActionCreators(actions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(ProfilingScreens);
