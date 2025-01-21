import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet } from 'react-native';

let originalData = [];



const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f4f4f4',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginBottom: 16,
    },
    searchInput: {
        height: 40,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        marginBottom: 16,
    },
    list: {
        flexGrow: 1,
    },
    itemContainer: {
        backgroundColor: '#ffffff',
        borderRadius: 8,
        padding: 16,
        marginVertical: 8,
        marginHorizontal: 4,
        elevation: 3,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
    },
    itemText: {
        fontSize: 18,
        fontWeight: '500',
        color: '#000',
    },
});

const App = () => {
    const [mydata, setMyData] = useState([]);

    useEffect(() => {
        fetch("https://mysafeinfo.com/api/data?list=autocompanies&format=json&case=default")
            .then((response) => response.json())
            .then((myJson) => {
                if (originalData.length < 1) {
                    setMyData(myJson);
                    originalData = myJson;
                }
            });
    }, []);

    const FilterData = (text) => {
        if (text !== '') {
            let myFilteredData = originalData.filter((item) =>
                item.AutoManufacturer.toLowerCase().includes(text.toLowerCase())
            );
            setMyData(myFilteredData);
        } else {
            setMyData(originalData);
        }
    };

    const renderItem = ({ item }) => (
        <View style={styles.itemContainer}>
            <Text style={styles.itemText}>{item.AutoManufacturer}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" />
            <Text style={styles.title}>Automobile Manufacturers</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Search manufacturers..."
                placeholderTextColor="#999"
                onChangeText={(text) => FilterData(text)}
            />
            <FlatList
                data={mydata}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                contentContainerStyle={styles.list}
            />
        </View>
    );
};


export default App;
