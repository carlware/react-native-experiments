import React, { Component } from 'react';
import { View, Text, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

import startMainTabs from '../MainTabs/startMainTabs';


class AuthScreen extends Component {
    loginHandler = () => {
        startMainTabs();
    }

    static options(props) {
        console.log("options Auth", props)
        return {
            topBar: {
                title: {
                    text: 'AuthScreen'
                }
            }
        }
    }

    render () {
        return (
            <View>
                <Text>Auth Screen</Text>
                <Button title="Login" onPress={this.loginHandler}/>
            </View>
        );
    }
}

export default AuthScreen;
