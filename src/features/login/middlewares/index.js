import moment from 'moment';
import { MAPSCREEN, PROFILING } from '@/navigation/screens';
import { createMiddleware } from '@/store/helpers';
import NavigationService from '@/navigation/service';

import { LOGIN_SUCCESS } from '../actions';

const loggedIn = createMiddleware([
  {
    // Redirect user to index page on successful TODO delete
    action: LOGIN_SUCCESS,
    afterHandler: (state) => {
      const { profile } = state;
      if (moment(profile.last_fetched).isAfter(moment('1995-12-25').add(1, 'day'))) {
        return NavigationService.navigate(MAPSCREEN);
      }
      return NavigationService.navigate(PROFILING);
    },
  },
]);

export default loggedIn;
