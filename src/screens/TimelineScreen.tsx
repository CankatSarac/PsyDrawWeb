import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Image, TouchableOpacity, Text } from 'react-native';
import { CameraRoll } from '@react-native-camera-roll/camera-roll';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

interface Photo {
  uri: string;
  width: number;
  height: number;
}

interface CameraRollEdge {
  node: {
    image: Photo;
  };
}

export default function TimelineScreen() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    try {
      const { edges } = await CameraRoll.getPhotos({
        first: 20,
        assetType: 'Photos',
      });
      setPhotos(edges.map((edge: CameraRollEdge) => edge.node.image));
      setLoading(false);
    } catch (error) {
      console.error('Error loading photos:', error);
      setLoading(false);
    }
  };

  const renderItem = ({ item }: { item: Photo }) => (
    <TouchableOpacity style={styles.imageContainer}>
      <Image source={{ uri: item.uri }} style={styles.image} />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={photos}
        renderItem={renderItem}
        keyExtractor={(item: Photo, index: number) => index.toString()}
        numColumns={3}
        contentContainerStyle={styles.list}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCEBD1',
  },
  list: {
    padding: 4,
  },
  imageContainer: {
    flex: 1,
    margin: 4,
    aspectRatio: 1,
  },
  image: {
    flex: 1,
    borderRadius: 8,
  },
}); 