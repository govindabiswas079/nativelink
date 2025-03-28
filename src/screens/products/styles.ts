import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 16,
    },
    filterContainer: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      marginBottom: 10,
    },
    filterButton: {
      paddingVertical: 8,
      paddingHorizontal: 16,
      borderRadius: 8,
      backgroundColor: '#e0e0e0',
    },
    activeFilter: {
      backgroundColor: 'blue',
    },
    filterText: {
      fontSize: 12,
      fontWeight: 'bold',
      color: '#000',
    },
    listContainer: {
      paddingBottom: 16,
    },
    notificationItem: {
      padding: 12,
      marginBottom: 10,
      borderRadius: 8,
      backgroundColor: '#f8f9fa',
    },
    title: {
      fontSize: 15,
      fontWeight: 'bold',
    },
    description: {
      fontSize: 14,
      color: '#555',
    },
    date: {
      fontSize: 12,
      color: '#999',
      marginTop: 4,
    },
    unread: {
      backgroundColor: '#e3f2fd',
    },
    read: {
      backgroundColor: '#e0e0e0',
    },
  });
  export default styles;