import NotificationService from '@/features/notifications/service';

export const START_PILL_REMINDER = 'start-pill-reminder';
export const UPDATE_REMINDER_TIME = 'update-reminder-time';
export const CANCEL_PILL_REMINDER = 'cancel-pill-reminder';

export function startPillReminder() {
  return {
    type: START_PILL_REMINDER,
    payload: {},
  };
}

export function updateReminderTime(time) {
  NotificationService.cancelAll();
  NotificationService.scheduleNotification(
    time,
    { title: 'Pill Reminder', message: 'Don\'t forget to take your pills' },
  );

  return {
    type: UPDATE_REMINDER_TIME,
    payload: { time },
  };
}

export function cancelPillReminder() {
  NotificationService.cancelAll();
  return {
    type: CANCEL_PILL_REMINDER,
    payload: {},
  };
}
