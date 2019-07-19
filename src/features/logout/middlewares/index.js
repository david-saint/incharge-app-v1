import { AUTHBASE } from '@/navigation/screens';
import { createMiddleware } from '@/store/helpers';
import NavigationService from '@/navigation/service';

import { LOGOUT_SUCCESS } from '../actions';

const logout = createMiddleware([
  {
    // Redirect user to auth base on failure to fetch user and last login is more thatn 1 days.
    action: LOGOUT_SUCCESS,
    afterHandler: () => {
      NavigationService.navigate(AUTHBASE);
    },
  },
]);

export default logout;
