import login from '@/features/login/middlewares';
import logout from '@/features/logout/middlewares';
import profiling from '@/features/profiling/middlewares';
import passwordreset from '@/features/password_reset/middlewares';
import auth from '@/features/authentication/middlewares/authCheck';

export default [
  auth,
  login,
  logout,
  profiling,
  passwordreset,
];
