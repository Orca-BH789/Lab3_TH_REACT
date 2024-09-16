import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View,Image } from 'react-native';
import ContactThumbnail from '../components/ContactThumbnail';
import colors from '../utility/colors';
import { fetchUserContact } from '../utility/api';

const User = () => {
  const [state, setState] = useState({
    user: null,
    loading: true,
    error: null,
  });

  useEffect(() => {
    const loadUserContact = async () => {
      try {
        const contact = await fetchUserContact();
        setState({
          user: contact,
          loading: false,
          error: null,
        });
      } catch (e) {
        setState({
          user: null,
          loading: false,
          error: 'Failed to load user contact',
        });
      }
    };

    loadUserContact();
  }, []);

  const { user, loading, error } = state;

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text style={styles.errorText}>{error}</Text>;
  if (!user) return null;

  return (
    <View style={styles.container}>      
      <View style={styles.avatarContainer}>
      <Image source={{ uri: user.avatar }} style={styles.avatar} />
      </View>
      <View style={styles.infoContainer}>
        <InfoItem label="Name" value={user.name} />
        <InfoItem label="Email" value={user.email} />
        <InfoItem label="Phone" value={user.phone} />       
      </View>
    </View>
  );
};

const InfoItem = ({ label, value }) => (
  <View style={styles.infoItem}>
    <Text style={styles.label}>{label}</Text>
    <Text style={styles.value}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    marginTop:50,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
    width: '90%',
    maxWidth: 400,
    alignSelf: 'center',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 50,
  },
  avatar: {
    width: 180,
    height: 180,
    borderRadius: 100,
  },
  infoContainer: {
    width: '100%',
   
  },
  infoItem: {
    marginBottom: 15,
  
    
  },
  label: {
    fontSize: 16,
    color: '#666',
    marginBottom: 5,
    fontWeight: 'bold',
  },
  value: {
    fontSize: 18,
    color: '#333',
    backgroundColor:'#fafafa'
  },
  errorText: {
    color: 'red',
    textAlign: 'center',
  },
});

export default User;
