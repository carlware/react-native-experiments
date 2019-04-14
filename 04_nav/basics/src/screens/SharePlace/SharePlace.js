import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { connect } from 'react-redux';
import { Navigation } from "react-native-navigation";

import PlaceInput from '../../components/PlaceInput/PlaceInput';
import { addPlace } from '../../store/actions/index';

class SharePlaceScreen extends Component {
    constructor(props) {
        super(props)
        Navigation.events().bindComponent(this)
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

    placeAddedHandler = placeName => {
        this.props.onAddPlace(placeName);
    }

    render () {
        return (
            <View>
                <PlaceInput onPlaceAdded={this.placeAddedHandler}/>
            </View>
        );
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddPlace: (placeName) => dispatch(addPlace(placeName))
    };
};

export default connect(null, mapDispatchToProps)(SharePlaceScreen);
