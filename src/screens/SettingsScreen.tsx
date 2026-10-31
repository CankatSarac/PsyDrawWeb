import React from 'react';
import { View, StyleSheet, Text, Switch, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Settings</Text>
        
        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Icon name="bell" size={24} color="#FFB88E" />
            <Text style={styles.settingText}>Notifications</Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: '#FFB88E' }}
            thumbColor="#FFFFFF"
          />
        </View>

        <View style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Icon name="theme-light-dark" size={24} color="#FFB88E" />
            <Text style={styles.settingText}>Dark Mode</Text>
          </View>
          <Switch
            trackColor={{ false: '#767577', true: '#FFB88E' }}
            thumbColor="#FFFFFF"
          />
        </View>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Icon name="help-circle" size={24} color="#FFB88E" />
            <Text style={styles.settingText}>Help & Support</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingItem}>
          <View style={styles.settingInfo}>
            <Icon name="information" size={24} color="#FFB88E" />
            <Text style={styles.settingText}>About</Text>
          </View>
          <Icon name="chevron-right" size={24} color="#666" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FCEBD1',
    padding: 16,
  },
  section: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#333',
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  settingInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  settingText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
}); 