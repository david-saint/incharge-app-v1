import { MAPSCREEN } from '@/navigation/screens';
import { createMiddleware } from '@/store/helpers';
import NavigationService from '@/navigation/service';

import { SET_PROFILING_SUCCESS } from '../actions';

const authCheck = createMiddleware([
  {
    // Redirect user to auth base on failure to fetch user and last login is more thatn 1 days.
    action: SET_PROFILING_SUCCESS,
    beforeHandler: () => console.log('SHOULD NAVIGATE'),
    afterHandler: () => NavigationService.navigate(MAPSCREEN),
  },
]);

export default authCheck;
