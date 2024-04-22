import React from 'react';
import { Svg, Path , Circle} from 'react-native-svg';

export default Search = (props) => {
  return (
    <Svg width={props.size} height={props.size} viewBox="0 0 60 60" fill='none' xmlns="http://www.w3.org/2000/svg" style={props.style} >
      <Circle cx="30" cy="30" r="30" fill={props.color} />
      <Path d="M27.6667 36.3333C33.5577 36.3333 38.3333 31.5577 38.3333 25.6667C38.3333 19.7756 33.5577 15 27.6667 15C21.7756 15 17 19.7756 17 25.6667C17 31.5577 21.7756 36.3333 27.6667 36.3333Z" stroke="white" strokeWidth={props.strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
      <Path d="M45 43L35 33" stroke="white" strokeWidth={props.strokeWidth} strokeLinecap="round" strokeLinejoin="round"/>
    </Svg>
  );
}