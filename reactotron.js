import Reactotron from 'reactotron-react-native';

Reactotron
  .configure({
    name: 'InCharge',
  }) // controls connection & communication settings
  .useReactNative() // add all built-in react native plugins
  .connect(); // let's connect!
