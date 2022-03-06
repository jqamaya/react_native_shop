import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    Text, 
    TouchableOpacity, 
    View,
    FlatList,
    RefreshControl, 
} from 'react-native';
import { Surface } from 'react-native-paper';
import Counter from "react-native-counters";
import AntIcon from 'react-native-vector-icons/AntDesign';

import colors from '../utils/colors';
import Images from '../images';
import AsyncStorage from '@react-native-async-storage/async-storage';

const products = require('../data/products.json');
const { width, height } = Dimensions.get('window');

class CartScreen extends Component {

    constructor(Props) {
        super(Props);
    }

    state = {
        cartProducts: [],
        cart: [],
        total: 0,
        refreshing: false,
    }

    async componentDidMount() {
        // await AsyncStorage.clear()
        this._getCart();
    }

    _getCart = async () => {
        let cart = await AsyncStorage.getItem('cart');
        let cartArray = []
        if (cart != null) {
            cartArray = JSON.parse(cart);
        }
        this.setState({
            cart: cartArray
        })
        this._getProducts();
    }

    _getProducts = () => {
        let { cart } = this.state;
        let cartProducts = [], total = 0;
        cart.forEach(cartItem => {
            const product = products.find(product => {
                return product.id == cartItem.id;
            });
            if (product) {
                product.quantity = cartItem.quantity;
                product.totalPrice = cartItem.quantity * product.price;
                total += product.totalPrice;
                cartProducts.push(product);
            }
        });
        this.setState({
            cartProducts,
            total,
            refreshing: false
        }, () => {})
    }

    _onRefresh = () => {
        this.setState({
            refreshing: true
        }, () => {
            this._getCart();
        })
    }

    _renderProducts = () => {
        return (
            <FlatList
                data={this.state.cartProducts}
                renderItem={this._renderProductItem}
                ListEmptyComponent={this._renderListEmptyComponent}
                refreshControl={
                    <RefreshControl
                        colors={["#9Bd35A", "#689F38"]}
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh} 
                    />
                }
            />
        );
    }

    _getProductImage = (image) => {
        return image ? Images.products[image] : Images.products.default;
    }

    onChange(number, type) {
        // console.log('quantity: ', number);
    }

    _renderProductItem = ({item, index}) => {
        let image = this._getProductImage(item.image);
        return (
            <View style={{
                flex: 1
            }}>
                <Surface
                    style={{
                        alignSelf: 'center',
                        justifyContent: 'center',
                        elevation: 2,
                        borderRadius: 5,
                        marginBottom: 10,
                        width: width,
                    }}
                >
                    <View style={{
                        flexDirection: 'row',
                    }}>
                        <TouchableOpacity 
                            style={{
                                width: '100%',
                                flex: 2,
                            }}
                            onPress={() => {
                                this.props.navigation.navigate('ProductDetail', {
                                    id: item.id,
                                    name: item.display_name
                                });
                            }}
                        >
                            <View style={{
                                backgroundColor: 'white',
                                height: height * 0.2,
                            }}>
                                <Image source={image} style={{
                                    height: '100%',
                                    resizeMode: 'cover',
                                    width: '100%',
                                }} />
                            </View>
                        </TouchableOpacity>
                        <View style={{
                            flex: 6,
                            padding: 10,
                        }}>
                            <Text style={{
                                marginTop: 10,
                                color: "black",
                                fontSize: 16,
                                fontWeight: 'bold',
                            }}>
                                {item.display_name}
                            </Text>
                            <Text style={{
                                color: colors.primary,
                                fontSize: 14,
                                fontWeight: 'bold',
                            }}>
                                {'₱ ' + item.totalPrice.toFixed(2)}
                            </Text>
                            <View style={{
                                marginTop: 10,
                            }}>
                                <Counter 
                                    start={item.quantity} 
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
                        </View>
                        <TouchableOpacity style={{
                            flex: 1,
                            padding: 10,
                            alignItems: 'center',
                            alignContent: 'center',
                            justifyContent: 'center',
                            backgroundColor: '#FC4F4F'
                        }}
                            onPress={() => {

                            }}
                        >
                            <AntIcon style={[{ color: 'white' }]} size={25} name={'delete'} />
                        </TouchableOpacity>
                    </View>
                </Surface>
            </View>
        )
    }

    _renderListEmptyComponent = () => {
        return (
            // !this.state.isLoading && 
            <View style={{ 
                padding: 20,
                alignSelf: 'center',
                flex: 1,
                justifyContent: 'center',
            }}>
                <Text style={{ 
                    textAlign: 'center',
                    color: 'black',
                    fontWeight: 'bold',
                }}>
                    {'Your cart is empty'}
                </Text>
            </View>
        )
    }
    _renderTotalSection = () => {
        return (
            <View style={{
                paddingTop: 10,
            }}>
                <View style={{
                    flexDirection: 'row',
                    paddingHorizontal: 20,
                }}>
                    <Text style={{
                        flex: 1,
                        color: colors.black,
                        fontSize: 20,
                        fontWeight: 'bold',
                    }}>
                        {'TOTAL:'}
                    </Text>
                    <Text style={{
                        color: 'black',
                        flex: 1,
                        fontSize: 20,
                        fontWeight: 'bold',
                        textAlign: 'right',
                    }}>
                        {'₱ ' + this.state.total.toFixed(2)}
                    </Text>
                </View>
                <View style={{
                    alignItems: 'center',
                    alignContent: 'center',
                    justifyContent: 'center',
                    marginTop: 15,
                }}>
                    <TouchableOpacity style={{
                            backgroundColor: colors.primary,
                            padding: 15,
                            borderRadius: 30,
                            width: width * 0.8,
                        }}>
                        <Text style={{
                            color: colors.white,
                            textAlign: 'center',
                        }}>
                            {'CHECKOUT'}
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }

    render() {
        return (
            <View style={{
                flexDirection: 'column',
                flex: 1,
            }}>
                <View style={{
                    flex: 9
                }}>
                    {this._renderProducts()}
                </View>
                <View style={{
                    flex: 2,
                    backgroundColor: colors.white,
                }}>
                {this._renderTotalSection()}
                </View>
            </View>
        )
    }
}

export default CartScreen;