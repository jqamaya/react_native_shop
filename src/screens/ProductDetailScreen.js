import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    ImageBackground,
    KeyboardAvoidingView,
    ScrollView,
    StyleSheet, 
    Text, 
    TextInput,
    TouchableOpacity, 
    View,
    SafeAreaView,
    ActivityIndicator, 
} from 'react-native';
import { Surface } from 'react-native-paper';
import Counter from "react-native-counters";
import FlashMessage, { showMessage } from "react-native-flash-message";

import AsyncStorage from '@react-native-async-storage/async-storage';

import Images from '../images';

const products = require('../data/products.json');
const { width, height } = Dimensions.get('window');

class ProductDetailScreen extends Component {

    constructor(Props) {
        super(Props);
    }

    state = {
        product: null,
        quantity: 1,
    }
    componentDidMount() {
        let id = this.props.route.params.id;
        this.setState({
            product: this._getProductDetail(id) ?? null
        });
        
    }
    _getProductDetail = (id) => {
        return products.find(product => {
            return product.id == id;
        });
    }

    _getProductImage = (image) => {
        return image ? Images.products[image] : Images.products.default;
    }

    onChange(number, type) {
        console.log(number, type) // 1, + or -
        this.setState({
            quantity: number
        });
    }

    _renderImage = (product) => {
        return (
            <Surface
                style={{
                    alignSelf: 'center',
                    justifyContent: 'center',
                    elevation: 2,
                    borderRadius: 5,
                    marginVertical: 10,
                    width: width * 0.9,
                    height: width * 0.8,
                }}
            >
                <Image
                    source={this._getProductImage(product.image)} 
                    style={{
                        alignSelf: 'center',
                        height: '100%',
                        resizeMode: 'cover',
                        width: '100%',
                    }}
                />
            </Surface>
        )
    }

    _renderNamePrice = (product) => {
        return (
            <View style={{
                flexDirection: 'row',
            }}>
                <Text style={{
                    flex: 7,
                    alignSelf: 'center',
                    marginTop: 10,
                    color: "black",
                    fontSize: 18,
                    fontWeight: 'bold',
                    textAlign: 'left',
                }}>
                    {product.display_name}
                </Text>
                <Text style={{
                    flex: 3,
                    alignSelf: 'flex-end',
                    marginTop: 10,
                    color: "#FF6200",
                    fontSize: 18,
                    fontWeight: 'bold',
                    textAlign: 'right',
                    textAlignVertical: 'center',
                }}>
                    {'₱' + product.price.toFixed(2)}
                </Text>
            </View>
        );
    }

    _addToCart = async (id) => {
        let cart = await AsyncStorage.getItem('cart');
        let cartArray = [];
        let existingItemIdx = -1;
        if (cart != null) {
            cartArray = JSON.parse(cart);
            existingItemIdx = cartArray.findIndex(item => {
                return id == item.id;
            });
        }
        if (existingItemIdx >= 0) {
            cartArray[existingItemIdx].quantity += this.state.quantity
        } else {
            cartArray.push({
                id,
                quantity: this.state.quantity
            });
        }
        await AsyncStorage.setItem('cart', JSON.stringify(cartArray))
    }

    _renderAddSection = (product) => {
        return (
            <View style={{
                // flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: 10,
                width: '100%',
            }}>
                <View style={{
                    alignContent: 'center',
                    alignSelf: 'center',
                    justifyContent: 'center',
                }}>
                    <Counter 
                        start={1} 
                        min={1}
                        onChange={this.onChange.bind(this)} 
                        buttonStyle={{
                            // borderRadius: 200,
                            borderColor: '#FDB777',
                            padding: 1,
                        }}
                        buttonTextStyle={{
                            color: '#FDB777',
                        }}
                        countTextStyle={{
                            color: '#FDB777',
                        }}
                    />
                </View>
                <TouchableOpacity style={{
                    alignContent: 'center',
                    borderRadius: 30,
                    paddingVertical: 15,
                    paddingHorizontal: 30,
                    backgroundColor: '#FFA500',
                    marginTop: 10,
                    marginLeft: 15,
                    width: width * 0.5,
                    }}
                    onPress={async () => {
                        this._addToCart(product.id);
                        showMessage({
                            message: "Added to cart",
                            type: "success",
                        });
                    }}
                >
                    <Text style={{
                        color: 'white',
                        textAlign: 'center',
                    }}>
                        {'ADD TO CART'}
                    </Text>
                </TouchableOpacity>
            </View>
        );
    }

    _renderDescription = (product) => {
        return (
            <View style={{
                marginTop: 10,
            }}>
                <Text style={{
                    color: 'black',
                    fontSize: 18,
                    fontWeight: 'bold',
                }}>
                    {'Details'}
                </Text> 
                <Text style={{
                    color: 'black',
                    textAlign: 'justify',
                }}>
                    {"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."}
                </Text>
            </View>
        )
    }

    render() {
        const { product } = this.state;
        if (product === null) {
            return (
                <View>
                    <Text>
                        {'Sorry, this product is no longer available.'}
                    </Text>
                </View>
            )
        }
        return (
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View style={{
                    padding: 10,
                    paddingBottom: 10,
                }}>
                    { this._renderImage(product) }
                    <View style={{
                        paddingHorizontal: 20
                    }}>
                        { this._renderNamePrice(product) }
                        { this._renderDescription(product) }
                        { this._renderAddSection(product) }
                    </View>
                </View>
                <FlashMessage position="bottom" />
            </ScrollView>
        )
    }
}

export default ProductDetailScreen;