
import React from 'react';
import {
  Svg,
  Circle,
  Ellipse,
  G,
  LinearGradient,
  RadialGradient,
  Line,
  Path,
  Polygon,
  Polyline,
  Rect,
  Symbol,
  Text,
  Use,
  Defs,
  Stop
} from 'react-native-svg';

export default function TripLineSVG(props) {
  return (
    <Svg height="60" width="6" fill="none" viewBox="0 0 6 60">
    	<Path d="M3 8V52.2012" stroke="url(#paint0_linear)" strokeDasharray="3" strokeLinecap="square" strokeWidth="0.5"/>
    	<Path d="M2.76596 5.61194C4.29355 5.61194 5.53191 4.35566 5.53191 2.80597C5.53191 1.25628 4.29355 0 2.76596 0C1.23836 0 0 1.25628 0 2.80597C0 4.35566 1.23836 5.61194 2.76596 5.61194Z" fill="#A9A9B0" fillRule="evenodd"/>
    	<Path d="M2.76596 59.6119C4.29355 59.6119 5.53191 58.3557 5.53191 56.806C5.53191 55.2563 4.29355 54 2.76596 54C1.23836 54 0 55.2563 0 56.806C0 58.3557 1.23836 59.6119 2.76596 59.6119Z" fill="#B95FA1" fillRule="evenodd"/>
    	<Defs/>
    </Svg>
  );
}
