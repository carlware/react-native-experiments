import React, { Component } from "react";
import { View, Text } from "react-native";
import { connect } from "react-redux";
import { Navigation } from "react-native-navigation";
import PlaceList from "../../components/PlaceList/PlaceList";

class FindPlaceScreen extends React.Component {
    constructor(props) {
        super(props);
        Navigation.events().bindComponent(this)
    }

    static options() {
        return {
            topBar: {
                title: {
                    text: 'FindPlaceScreen',
                },
            }
        }
    }

    navigationButtonPressed({ buttonId }) {
        Navigation.mergeOptions("app.Drawer", {
            sideMenu: {
                left: {
                    visible: true,
                },
            },
        })
    }

    itemSelectedHandler = key => {
        const selPlace = this.props.places.find(place => {
            return place.key === key;
        });
        this.props.navigator.push({
            screen: "awesome-places.PlaceDetailScreen",
            title: selPlace.name,
            passProps: {
                selectedPlace: selPlace
            }
        });
    };

    render() {
        return (
            <View>
                <PlaceList
                    places={this.props.places}
                    onItemSelected={this.itemSelectedHandler}
                />
            </View>
        );
    }
}

const mapStateToProps = state => {
    return {
        places: state.places.places
    };
};

import hoistNonReactStatic from 'hoist-non-react-statics';
/* export default FindPlaceScreen */
export default connect(mapStateToProps)(FindPlaceScreen);
/* export default hoistNonReactStatic(connect(mapStateToProps)(FindPlaceScreen), FindPlaceScreen); */
