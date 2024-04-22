import React from 'react';
import { View, PanResponder, Animated } from 'react-native';

const DraggableBlock = ({ children }) => {
  const pan = React.useRef(new Animated.ValueXY()).current;

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (event, gestureState) => {
      // Разрешаем перемещение только при вертикальном жесте
      return Math.abs(gestureState.dy) > Math.abs(gestureState.dx) && Math.abs(gestureState.dy) > 5;
    },
    onPanResponderGrant: () => {
      pan.setOffset({
        x: pan.x._value,
        y: pan.y._value,
      });
      pan.setValue({ x: 0, y: 0 });
    },
    onPanResponderMove: Animated.event(
      [
        null,
        { dy: pan.y }
      ],
      { useNativeDriver: false }
    ),
    onPanResponderRelease: () => {
      pan.flattenOffset();
    },
  });

  return (
    <Animated.View
      style={{
        transform: [{ translateY: pan.y }],
      }}
      {...panResponder.panHandlers}
    >
      {children}
    </Animated.View>
  );
};

export default DraggableBlock;
