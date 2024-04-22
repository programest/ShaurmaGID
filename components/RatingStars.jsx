import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { AirbnbRating, Rating } from 'react-native-ratings';

const RatingStars = ({ rating }) => {
  return (
    <View style={styles.container}>
      <AirbnbRating
        disabled={true}
        maxStars={1}
        size={20}
        count={1}
        startingValue={1}
        fullStarColor="#FFD700"
        emptyStarColor="#D3D3D3"
        showRating={false}

      />
      <Text style={styles.ratingText}>{rating.toFixed(1)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    fontWeight: '900',
    marginLeft: 5,
    fontSize: 16,
  },
});

export default RatingStars;
