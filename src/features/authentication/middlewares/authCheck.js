import moment from 'moment';
import { AUTHBASE } from '@/navigation/screens';
import { createMiddleware } from '@/store/helpers';
import NavigationService from '@/navigation/service';

import { USERFETCH_FAILED } from '../actions';

const authCheck = createMiddleware([
  {
    // Redirect user to auth base on failure to fetch user and last login is more thatn 1 days.
    action: USERFETCH_FAILED,
    beforeHandler: (state) => {
      const { auth: { id, lastLogin } } = state;
      // If the user hasn't logged in before or logged out.
      if (id < 1) {
        NavigationService.navigate(AUTHBASE);
      }
      // If it's been 2 days since the user used the app
      if (moment().isAfter(moment(lastLogin).add(2, 'days'))) {
        NavigationService.navigate(AUTHBASE);
      }
    },
  },
]);

export default authCheck;
