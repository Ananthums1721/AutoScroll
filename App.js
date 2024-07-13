import React, {useRef, useState, useEffect} from 'react';
import {FlatList, View, Text, StyleSheet} from 'react-native';

const data = Array.from({length: 20}, (_, i) => `Item ${i + 1}`);

const App = () => {
  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(prevIndex => {
        const nextIndex = prevIndex + 1;
        if (nextIndex >= data.length) {
          flatListRef.current.scrollToOffset({offset: 0, animated: true});
          return 0;
        } else {
          flatListRef.current.scrollToIndex({index: nextIndex, animated: true});
          return nextIndex;
        }
      });
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <FlatList
      ref={flatListRef}
      data={data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={({item}) => (
        <View style={styles.item}>
          <Text style={styles.text}>{item}</Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  item: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  text: {
    fontSize: 18,
  },
});

export default App;
