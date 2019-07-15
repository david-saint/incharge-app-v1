import { createMiddleware } from '@/store/helpers';
import NavigationService from '@/navigation/service';
import { AUTHPASSWORDSUCCESS } from '@/navigation/screens';

import { PASSWORD_SUCCESS } from '../actions';

const paswordreset = createMiddleware([
  {
    // Redirect user to index page on successful TODO delete
    action: PASSWORD_SUCCESS,
    afterHandler: () => {
      NavigationService.navigate(AUTHPASSWORDSUCCESS);
    },
  },
]);

export default paswordreset;
