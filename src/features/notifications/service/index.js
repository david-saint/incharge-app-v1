import PushNotification from 'react-native-push-notification';

export default class NotificationService {
  constructor(onRegister, onNotification) {
    this.configure(onRegister, onNotification);

    this.lastId = 0;
  }

  configure = (onRegister, onNotification, gcm = '') => {
    PushNotification.configure({
      // (optional) Called when Token is generated (iOS and Android)
      onRegister, // this._onRegister.bind(this),

      // (required) Called when a remote or local notification is opened or received
      onNotification, // this._onNotification,

      // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
      senderID: gcm,

      // IOS ONLY (optional): default: all - Permissions to register.
      permissions: {
        alert: true,
        badge: true,
        sound: true,
      },

      // Should the initial notification be popped automatically
      // default: true
      popInitialNotification: true,

      /**
        * (optional) default: true
        * - Specified if permissions (ios) and token (android and ios) will requested or not,
        * - if not, you must call PushNotificationsHandler.requestPermissions() later
        */
      requestPermissions: true,
    });
  }

  scheduleNotification(date, { title, message }) {
    this.lastId += 1;
    PushNotification.localNotificationSchedule({
      date, // in 30 secs

      /* Android Only Properties */
      autoCancel: false, // (optional) default: true
      largeIcon: 'ic_launcher', // (optional) default: 'ic_launcher'
      smallIcon: 'ic_notification', // (optional) default: 'ic_notification' with fallback for 'ic_launcher'
      vibrate: true, // (optional) default: true
      vibration: 300, // vibration length in milliseconds, ignored if vibrate=false, default: 1000
      group: 'use_pills', // (optional) add group to message
      ongoing: false, // (optional) set whether this is an "ongoing" notification

      /* iOS only properties */
      alertAction: 'view', // (optional) default: view
      category: null, // (optional) default: null
      userInfo: null, // (optional) default: null (object containing additional notification data)

      /* iOS and Android properties */
      title, // (optional)
      message, // (required)
      playSound: true, // (optional) default: true
      soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
    });
  }

  checkPermission = cbk => PushNotification.checkPermissions(cbk)

  cancelAll = () => PushNotification.cancelAllLocalNotifications()
}
