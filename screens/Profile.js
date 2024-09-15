import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, Linking, Share } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';  
import ContactThumbnail from '../components/ContactThumbnail';
import DetailListItem from '../components/DetailListItem';
import colors from '../utility/colors';

const Profile = ({ route }) => {
  const { contact } = route.params;
  const { avatar, name, email, phone, cell } = contact;

  const handlePressMessage = () => {
    const smsUrl = `sms:${phone}`;
    Linking.canOpenURL(smsUrl)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Lỗi', `Không thể gửi tin nhắn cho ${phone}`);
        } else {
          Linking.openURL(smsUrl);
        }
      })
      .catch((err) => console.error('LỖI SMS:', err));
  };

  const handlePressCall = () => {
    const telUrl = `tel:${phone}`;
    Linking.canOpenURL(telUrl)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Lỗi', `Không thể gọi số này`);
        } else {
          Linking.openURL(telUrl);
        }
      })
      .catch((err) => console.error('LỖI GỌI:', err));
  };

  const handlePressVideo = () => {
    const facetimeUrl = `facetime:${phone}`;
    Linking.canOpenURL(facetimeUrl)
      .then((supported) => {
        if (!supported) {
          Alert.alert('Lỗi', `Không thể facetime`);
        } else {
          Linking.openURL(facetimeUrl);
        }
      })
      .catch((err) => console.log('Error making video call:', err));
  };

  const handlePressShare = () => {
    const message = `Contact Details:\n\nName: ${name}\nPhone: ${phone}\nEmail: ${email}`;
    
    Share.share({
      message: message,
      title: `Share contact: ${name}`
    })
    .then((result) => {
      if (result.action === Share.sharedAction) {
        if (result.activityType) {
          console.log(`Shared via ${result.activityType}`);
        } else {
          console.log('Shared successfully');
        }
      } else if (result.action === Share.dismissedAction) {
        console.log('Share dismissed');
      }
    })
    .catch((error) => console.error('Error sharing contact:', error));
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.avatarSection}>
          <ContactThumbnail avatar={avatar} name={name} phone={phone} />         
          <View style={styles.actionContainer}>
          <TouchableOpacity style={styles.actionButton} onPress={handlePressMessage}>
              <Icon name="chatbubble" size={25} color={'#fffffe'} />
              <Text style={styles.actionText}>Message</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.actionButton} onPress={handlePressCall}>
              <Icon name="call" size={25} color={'#fffffe'} />
              <Text style={styles.actionText}>Call</Text>
            </TouchableOpacity>           
            <TouchableOpacity style={styles.actionButton} onPress={handlePressVideo}>
              <Icon name="videocam" size={25} color={'#fffffe'} />
              <Text style={styles.actionText}>Video</Text>
            </TouchableOpacity>
          </View>
        </View>        
        <View style={styles.detailsSection}>
          <DetailListItem icon="mail" title="Email" subtitle={email} />
          <DetailListItem icon="phone" title="Work" subtitle={phone} />
          <DetailListItem icon="smartphone" title="Personal" subtitle={cell} />
        </View>


        <TouchableOpacity style={styles.shareButton} onPress={handlePressShare}>
          <Text style={styles.shareText}>Chia sẻ liên hệ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e1e2e3',
  },  
  content: {
    flex: 1,
    padding: 20,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  detailsSection: {
    flex: 1,
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 10,
    maxHeight: 250,
    marginBottom: 20, // Khoảng cách giữa phần thông tin và nút chia sẻ
  },
  actionContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
  },
  actionButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#5f6c7b',
      borderRadius: 10,
      padding: 10,
      margin: 7,
  },
  
  actionText: {
    color: '#fffffe',
    fontSize: 16,
    padding: 3,
  },
  shareButton: {
    backgroundColor: '#e1e2e3',
    borderRadius: 10,
    padding: 10,
    justifyContent: 'center',
    alignItems: 'left',
  },
  shareText: {
    color: '#3da9fc',
    fontSize: 16,
  },
});

export default Profile;
