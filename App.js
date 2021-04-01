import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Modal, TextInput, FlatList, ScrollView, Alert } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import Icon from 'react-native-vector-icons/Entypo';
import Icons from 'react-native-vector-icons/Ionicons';
import Iconss from 'react-native-vector-icons/MaterialIcons';
import DropDownItem from 'react-native-drop-down-item';

const App = () => {
  const [foodArray, setFoodArray] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  useEffect(() => {
    fetch('https://api.jsonbin.io/b/5fce7e1e2946d2126fff85f0',
      {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => setFoodArray(data.categories))
      .catch(err => console.log(err));
  }, []);
  const searchApplication = () => {
    if (searchTerm == "") {
      console.log("PLEASE ENTER THE ITEM..........")
    }
    else if (foodArray.map(val => val.category.subcategories.map(val1 => val1.subCategoryname == searchTerm))) {
      setSearchTerm(searchTerm);
    }
    else if (foodArray.map(val => val.category.subcategories.map(val1 => val1.items.map(val2 => val2 == searchTerm)))) {
      setSearchTerm(searchTerm)
    }
  };
  return (
    <View>
      <View style={styles.approvedFoodListView}>
        <Text style={styles.approvedFoodListText}>Approved Food List</Text>
      </View>
      <TouchableOpacity onPress={() => { setIsVisible(true) }}>
        <Image
          source={require('./image.png')}
          style={styles.imageView}
        />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={false}
        visible={isVisible}
        onRequestClose={() => setIsVisible(false)}
      >
        <ScrollView nestedScrollEnabled>
          <Icon
            name="cross"
            size={35}
            color="#000000"
            style={styles.crossSign}
            onPress={() => setIsVisible(false)}
          />
          <Text style={styles.approvedFoodListText1}>Approved Food List</Text>
          <View style={styles.textView}>
            <Icons
              name="search"
              size={22}
              color="#000000"
              style={styles.searchIconView}
            />
            <TextInput
              value={searchTerm}
              onChangeText={val => setSearchTerm(val)}
              editable={true}
              keyboardType="default"
              placeholder="Try searching fat, sauces names....."
              style={styles.textInputStyle}
              onSubmitEditing={() => searchApplication()}
            />
          </View>
          {foodArray ? foodArray.map((param, i) => {
            return (
              <DropDownItem
                key={i}
                contentVisible={false}
                header={
                  <View style={styles.boxView}>
                    <View style={{ width: 50, height: 50, backgroundColor: param.category.colorCode, borderRadius: 5 }}>
                      <Image
                        source={{ uri: param.category.imagePath }}
                        style={{ width: 40, height: 40 }}
                      />
                    </View>
                    <Text style={{
                      color: param.category.colorCode,
                      fontSize: responsiveFontSize(1.8),
                      fontStyle: 'normal',
                      fontWeight: 'bold',
                      textAlign: 'left',
                      paddingLeft: 5
                    }}>{param.category.categoryName}</Text>
                    {param.category.servingSize ? (
                      <Text style={{
                        color: 'black',
                        fontSize: responsiveFontSize(1.8),
                        fontStyle: 'normal',
                        fontWeight: '600',
                        textAlign: 'left',
                        paddingLeft: 5
                      }}>({param.category.servingSize})</Text>
                    ) : null}
                  </View>
                }
              >
                {searchTerm ? (
                  <View>
                    <Text>{searchTerm}</Text>
                  </View>
                ) : (
                  <View style={styles.subCategoryView}>
                    {param.category.subcategories.map(item => <Text style={{ fontSize: responsiveFontSize(2.2), color: param.category.colorCode, marginVertical: 3, borderBottomWidth: 1, borderBottomColor: '#D3D3D3' }}>{item.subCategoryname}</Text>)}
                    {param.category.subcategories.map(item => item.items.map(val => <Text style={{ fontSize: responsiveFontSize(1.7), color: 'black', marginVertical: 3, borderBottomWidth: 1, borderBottomColor: '#D3D3D3' }}>{val}</Text>))}
                  </View>
                )
                }
              </DropDownItem>
            );
          }) : null}
        </ScrollView>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  imageView: {
    width: responsiveWidth(50),
    height: responsiveHeight(25),
    alignSelf: 'center',
    marginTop: 200,
    borderRadius: 10
  },
  approvedFoodListView: {
    alignSelf: 'center',
    marginTop: 25,
    width: responsiveWidth(65),
    height: responsiveHeight(5),
    borderWidth: 1,
    borderColor: 'red',
    elevation: 5,
    backgroundColor: 'white',
    borderRadius: 5
  },
  approvedFoodListText: {
    fontSize: responsiveFontSize(2.5),
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center'
  },
  crossSign: {
    marginTop: 25,
    marginLeft: 25
  },
  approvedFoodListText1: {
    fontSize: responsiveFontSize(3),
    fontStyle: 'normal',
    fontWeight: 'bold',
    color: 'black',
    textAlign: 'left',
    marginLeft: 25,
    marginTop: 20
  },
  textInputStyle: {
    textAlign: 'left',
    fontStyle: 'normal',
    fontWeight: '500',
    paddingLeft: 15,
    color: 'black'
  },
  textView: {
    borderWidth: 1,
    borderColor: 'white',
    borderRadius: 5,
    width: responsiveWidth(75),
    height: responsiveHeight(6),
    alignSelf: 'center',
    marginTop: 20,
    backgroundColor: '#ADD8E6',
    flexDirection: 'row'
  },
  searchIconView: {
    marginTop: 8,
    marginLeft: 8
  },
  boxView: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    width: responsiveWidth(85),
    height: responsiveHeight(10),
    alignSelf: 'center',
    marginVertical: 7,
    backgroundColor: 'white',
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: 10,
    paddingRight: 5,
    marginTop: 5
  },
  rightView: {
    alignSelf: 'center'
  },
  subCategoryView: {
    borderWidth: 1,
    borderColor: 'black',
    borderRadius: 5,
    width: responsiveWidth(85),
    height: responsiveHeight(235),
    marginVertical: 7,
    backgroundColor: 'white',
    paddingLeft: 15,
    paddingRight: 5,
    marginTop: 5,
    marginLeft: 20
  }
});

export default App;