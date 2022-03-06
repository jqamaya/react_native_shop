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
    FlatList, 
} from 'react-native';
import { FlatGrid } from 'react-native-super-grid';
import { Avatar, Button, Card, Title, Paragraph, Surface } from 'react-native-paper';
import { SearchBar } from 'react-native-elements';

import colors from '../utils/colors';
import Images from '../images';

const products = require('../data/products.json');
const { width, height } = Dimensions.get('window');

class ProductScreen extends Component {

    constructor(Props) {
        super(Props);
    }

    state = {
        products: products
    }

    _renderProducts = () => {
        return (
            <FlatList
                itemDimension={130}
                data={this.state.products}
                renderItem={this._renderProductItem}
                ListEmptyComponent={this._renderListEmptyComponent}
            />
        );
    }

    _getProductImage = (image) => {
        return image ? Images.products[image] : Images.products.default;
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

    // _renderFooter = () => {
    //     let { currentPage, lastPage, products } = this.state;
    //     let endData = currentPage == lastPage;
    //     if (endData && products.length > 0) {
    //         return (
    //             <View style={{width: '100%', paddingVertical: 15}}>
    //                 <Text style={styles.listFilter}>
    //                     {I18n.t('EndList')}
    //                 </Text>
    //             </View>
    //         );
    //     }
    //     return (
    //         this.state.isLoading && 
    //         <ActivityIndicator
    //             size="small"
    //         />
    //     );
    // }
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
        return (
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <View>
                    {/* <Loader loading={this.state.isLoading} /> */}
                    {/* <Carousel
                        data={this.state.banners}
                        renderItem={this._renderBanner}
                        // autoplay={true}
                        sliderWidth={width}
                        itemWidth={width}
                        layout={'default'}
                        loop={true}
                        containerCustomStyle={{ flex: 1 }}
                        slideStyle={{ flex: 1 }}
                        onSnapToItem={(index) => this.setState({ currentBannerIndex: index })}
                    />
                    {this._bannerPagination()}
                    {this._renderHeader()} */}
                    {/* <ErrorMessage 
                        errorMessage={this.state.errorMessage}
                        onClose={() => { this.setState({ errorMessage: '' }) }}
                    />
                    <SuccessMessage
                        message={this.state.successMessage}
                        onClose={() => { this.setState({ successMessage: '' }) }}
                    /> */}
                    {this._renderProducts()}
                </View>
            </ScrollView>
        )
    }
}

export default ProductScreen;