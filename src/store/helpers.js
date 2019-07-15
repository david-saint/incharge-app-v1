import { has } from '@/api/helpers';
import * as Immutable from 'immutable';

// Helper method for creating a middleware that handles the given set of actions
export function createMiddleware(handlers) {
  return ({ getState }) => next => (action) => {
    // If it's a thunk action do nothing.
    if (typeof action === 'function') {
      return next(action);
    }
    // Fin the actionHnadler for this action.
    const actionHandler = Immutable.List(handlers).find(h => h.action === action.type);
    // Execute custom middleware handler before the action is dispatched
    if (typeof actionHandler !== 'undefined' && has.call(actionHandler, 'beforeHandler')) {
      actionHandler.beforeHandler(getState(), action);
    }
    // Dispatch the action
    const result = next(action);
    // Execute custom middleware handler after the action is dispatched
    if (typeof actionHandler !== 'undefined' && has.call(actionHandler, 'afterHandler')) {
      actionHandler.afterHandler(getState(), action);
    }
    return result;
  };
}

export function log(m) { console.log(m); }
