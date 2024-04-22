import React from 'react';
import { Svg, Path } from 'react-native-svg';

export default Favorite = ({color}) => {

  return (
 
  <Svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
  <Path d="M13.12 20.8101C12.78 20.9301 12.22 20.9301 11.88 20.8101C8.98 19.8201 2.5 15.6901 2.5 8.6901C2.5 5.6001 4.99 3.1001 8.06 3.1001C9.88 3.1001 11.49 3.9801 12.5 5.3401C13.51 3.9801 15.13 3.1001 16.94 3.1001C20.01 3.1001 22.5 5.6001 22.5 8.6901C22.5 15.6901 16.02 19.8201 13.12 20.8101Z" stroke={color} stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
  </Svg>
  
  );
}


