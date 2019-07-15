import { createStackNavigator } from 'react-navigation';

import * as screens from '../screens';
import AuthenticationLogin from '@/features/login/containers';
import AuthenticationRegister from '@/features/register/containers';
import AuthenticationBase from '@/features/authentication/containers';
import AuthenticationPasswordReset from '@/features/password_reset/containers';
import AuthenticationPasswordSuccess from '@/features/password_reset/containers/completed';

const AuthenticationStack = createStackNavigator(
  {
    [screens.AUTHBASE]: {
      screen: AuthenticationBase,
    },
    [screens.AUTHREGISTER]: {
      screen: AuthenticationRegister,
    },
    [screens.AUTHLOGIN]: {
      screen: AuthenticationLogin,
    },
    [screens.AUTHPASSWORD]: {
      screen: AuthenticationPasswordReset,
    },
    [screens.AUTHPASSWORDSUCCESS]: {
      screen: AuthenticationPasswordSuccess,
    },
  },
  {
    initialRouteName: screens.AUTHBASE,
  },
);

export default AuthenticationStack;
