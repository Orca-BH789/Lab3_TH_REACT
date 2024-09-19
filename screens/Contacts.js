import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  useColorScheme, // Import thêm hook để lấy chế độ sáng/tối
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { fetchContactsLoading, fetchContactsSuccess, fetchContactsError } from '../Create_store';
import { useDispatch, useSelector } from 'react-redux';
import ContactListItem from '../components/ContactListItem';
import { fetchContacts } from '../utility/api';

const keyExtractor = ({ phone }) => phone;

const Contacts = ({ navigation }) => {

  const { contacts, loading, error } = useSelector((state) => state);
  
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');


  const colorScheme = useColorScheme(); 

  useEffect(() => {
    dispatch(fetchContactsLoading());
    fetchContacts()
      .then((contacts) => {
        dispatch(fetchContactsSuccess(contacts));
      })
      .catch((e) => {
        dispatch(fetchContactsError());
      });
  }, []);


  const filteredContacts = contacts.filter((contact) =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const renderContact = ({ item }) => {
    const { name, avatar, phone } = item;
    return (
      <ContactListItem
        name={name}
        avatar={avatar}
        phone={phone}
        onPress={() => navigation.navigate('Profile', { contact: item })}
      />
    );
  };

  
  const contactsSorted = filteredContacts.slice().sort((a, b) => a.name.localeCompare(b.name));


  const themeStyles = colorScheme === 'dark' ? styles.dark : styles.light;

  return (
    <View style={[styles.container, themeStyles.container]}>
     
      {/* <View style={themeStyles.header}>
        <TouchableOpacity>
          <Text style={themeStyles.editText}></Text>
        </TouchableOpacity>
        <Text style={themeStyles.title}>Danh bạ</Text>
        <TouchableOpacity>
          <Ionicons name="add" size={24} color={colorScheme === 'dark' ? '#3da9fc' : 'black'}  />
        </TouchableOpacity>
      </View> */}

   
      <View style={themeStyles.searchBar}>
        <Ionicons name="search" size={20} color="gray" />
        <TextInput
          style={themeStyles.searchInput}
          placeholder="Tìm kiếm trong danh bạ"
          placeholderTextColor={colorScheme === 'dark' ? 'gray' : 'darkgray'}
          value={searchTerm}
          onChangeText={setSearchTerm}
        />
      </View>

      <View style={themeStyles.listContainer}>
        {loading && <ActivityIndicator size="large" />}
        {error && <Text style={themeStyles.errorText}>Lỗi tải danh bạ...</Text>}
        {!loading && !error && (
          <FlatList
            data={contactsSorted}
            keyExtractor={keyExtractor}
            renderItem={renderContact}
          />
        )}
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  dark: {
    container: {
      backgroundColor: 'black',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      backgroundColor: 'black',
    },
    editText: {
      color: '#3da9fc',
      fontSize: 15,
    },
    title: {
      color: 'white',
      fontSize: 18,
      fontWeight: 'bold',
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#1C1C1C',
      paddingHorizontal: 10,
      paddingVertical: 8,
      margin: 10,
      borderRadius: 5,
    },
    searchInput: {
      marginLeft: 10,
      color: 'white',
      fontSize: 16,
      flex: 1,
    },
    listContainer: {
      flex: 1,
      backgroundColor: 'black',
    },
    errorText: {
      color: 'red',
      fontSize: 16,
      textAlign: 'center',
    },
  },
  light: {
    container: {
      backgroundColor: 'white',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: 15,
      backgroundColor: 'white',
    },
    editText: {
      color: '#3da9fc',
      fontSize: 18,
    },
    title: {
      color: 'black',
      fontSize: 18,
      fontWeight: 'bold',
    },
    searchBar: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#f0f0f0',
      paddingHorizontal: 10,
      paddingVertical: 8,
      margin: 10,
      borderRadius: 5,
    },
    searchInput: {
      marginLeft: 10,
      color: 'black',
      fontSize: 16,
      flex: 1,
    },
    listContainer: {
      flex: 1,
      backgroundColor: 'white',
    },
    errorText: {
      color: 'red',
      fontSize: 16,
      textAlign: 'center',
    },
  },
});

export default Contacts;
