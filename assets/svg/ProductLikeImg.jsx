
import React from 'react';
import { Svg, Path,Circle} from 'react-native-svg';

const ProductLikeImg = (props) => {
  return (
   
  <Svg width={props.width} height={props.height} viewBox="0 0 30 30" fill={props.color} xmlns="http://www.w3.org/2000/svg">
  <Circle cx="15" cy="15" r="15" fill="#14151F"/>
  <Path d="M14.9993 21C17.4611 20.0142 19.2427 18.3314 20.2037 16.6275C21.15 14.9305 21.283 13.2407 20.4403 12.2267C19.6788 11.3184 18.6882 10.9734 17.6828 11.0016C16.6774 11.0297 15.7016 11.4452 14.9993 12.0296C14.297 11.4452 13.3212 11.0297 12.3158 11.0016C11.3104 10.9734 10.3198 11.3184 9.5584 12.2267C8.71565 13.2407 8.84872 14.9305 9.80975 16.6275C10.756 18.3314 12.5376 20.0142 14.9993 21Z" fill="white"/>
  </Svg>
  );
}

export default ProductLikeImg;
