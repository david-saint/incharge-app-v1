import { PROFILING } from '@/navigation/screens';
import { createMiddleware } from '@/store/helpers';
import NavigationService from '@/navigation/service';

import { LOGIN_SUCCESS } from '../actions';

const loggedIn = createMiddleware([
  {
    // Redirect user to index page on successful TODO delete
    action: LOGIN_SUCCESS,
    afterHandler: () => {
      NavigationService.navigate(PROFILING);
    },
  },
]);

export default loggedIn;
