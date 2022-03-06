import React, { Component } from 'react';
import {
    Dimensions,
    Image,
    ScrollView,
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View,
    FlatList,
    StatusBar, 
} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { Avatar, Button, Card, Title, Paragraph, Surface } from 'react-native-paper';
import { SearchBar } from 'react-native-elements';
import SearchHeader from 'react-native-search-header';

import colors from '../utils/colors';
import Images from '../images';

const products = require('../data/products.json');
const { width, height } = Dimensions.get('window');

class ProductScreen extends Component {

    constructor(Props) {
        super(Props);
        this.searchHeaderRef = React.createRef();
    }

    state = {
        products: products,
        filteredProducts: products,
    }

    _renderProducts = () => {
        return (
            <FlatList
                itemDimension={130}
                data={this.state.filteredProducts}
                renderItem={this._renderProductItem}
                ListEmptyComponent={this._renderListEmptyComponent}
            />
        );
    }

    _getProductImage = (image) => {
        return image ? Images.products[image] : Images.products.default;
    }

    _searchProducts = (keyword) => {
        const allProducts = this.state.products;
        let filteredProducts = allProducts.filter(prod => {
            if (prod.display_name.indexOf(keyword) > -1
                || prod.brand.indexOf(keyword) > -1
                || prod.category.indexOf(keyword) > -1) {
                    return true;
                }
        });
        if (filteredProducts.length > 0) {
            this.setState({
                filteredProducts
            });
        }
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
                        marginVertical: 10,
                        width: width * 0.9,
                        // marginHorizontal: 10,
                    }}
                >
                    <TouchableOpacity 
                        onPress={() => {
                            this.props.navigation.navigate('ProductDetail', {
                                id: item.id,
                                name: item.display_name
                            });
                        }}
                        style={{
                            width: '100%',
                        }}
                    >
                        <View style={{
                            flexDirection: 'row',
                        }}>
                                <View style={{
                                    backgroundColor: 'white',
                                    flex: 4,
                                    height: height * 0.2,
                                    width: '100%',
                                }}>
                                    <Image source={image} style={{
                                        height: '100%',
                                        resizeMode: 'cover',
                                        width: '100%',
                                    }} />
                                </View>
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
                                    color: "gray",
                                    fontSize: 12,
                                }}>
                                    {'Brand: ' + item.brand}
                                </Text>
                                <Text style={{
                                    color: colors.primary,
                                    fontSize: 14,
                                    fontWeight: 'bold',
                                    marginTop: 20,
                                }}>
                                    {'₱ ' + item.price.toFixed(2)}
                                </Text>
                            </View>
                        </View>
                    </TouchableOpacity>
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
                    {'Nothing to display here.'}
                </Text>
            </View>
        )
    }

    render() {
        const self = this;
        return (
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View>
                    {/* <Loader loading={this.state.isLoading} /> */}
                    <StatusBar barStyle = 'light-content' />
                    {/* <View style = { styles.status }/> */}
                    <View style = { styles.header }>
                        <Button
                            title = 'Search'
                            color = '#f5fcff'
                            onPress = {() => this.searchHeaderRef.current.show()}
                        />
                    </View>
                    <SearchHeader
                        ref = { this.searchHeaderRef }
                        placeholder = 'Search...'
                        placeholderColor = 'gray'
                        dropShadowed = { false }
                        autoFocus = { false }
                        visibleInitially = { true }
                        persistent = { true }
                        enableSuggestion = { true }
                        entryAnimation = 'from-left-side'
                        // topOffset = { 36 }
                        iconColor = 'gray'
                        iconImageComponents = {[{
                            name: 'hide',
                            customStyle: {
                                tintColor: 'red'
                            }
                        }, {
                            name: 'pin',
                            customStyle: {
                                tintColor: 'red'
                            }
                        }]}
                        onClear = {() => {
                            self.setState({
                                filteredProducts: products
                            })
                        }}
                        onEnteringSearch = {(event) => {
                            self._searchProducts(event.nativeEvent.text);
                        }}
                        onSearch = {(event) => {
                            self._searchProducts(event.nativeEvent.text);
                        }}
                        style = {{
                            header: {
                                height: 38,
                                marginTop: 9,
                                marginHorizontal: 9,
                                borderRadius: 19,
                                backgroundColor: '#fdfdfd'
                            },
                            input: {
                                fontSize: 16,
                                margin: 0,
                                padding: 0,
                                borderRadius: 0,
                                backgroundColor: 'transparent'
                            }
                        }}
                    />
                    {this._renderProducts()}
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        backgroundColor: '#f5fcff'
    },
    status: {
        // zIndex: 10,
        // elevation: 2,
        width: width,
        height: 36,
        backgroundColor: colors.primary
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: width,
        height: 59,
        padding: 6,
        backgroundColor: colors.primary
    },
    label: {
        flexGrow: 1,
        fontSize: 18,
        fontWeight: '600',
        textAlign: 'right',
        paddingRight: 50,
        marginVertical: 8,
        paddingVertical: 3,
        color: '#f5fcff',
        backgroundColor: 'transparent'
    },
    button: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 280,
        height: 40,
        marginTop: 40,
        borderRadius: 2,
        backgroundColor: '#ff5722'
    }
});

export default ProductScreen;