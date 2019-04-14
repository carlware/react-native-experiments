import { Navigation } from "react-native-navigation";
import { Provider, ReduxProvider } from "react-redux";
import React from "react"

import AuthScreen from "./src/screens/Auth/Auth"
import SharePlaceScreen from "./src/screens/SharePlace/SharePlace"
import FindPlaceScreen from "./src/screens/FindPlace/FindPlace"
import PlaceDetailScreen from "./src/screens/PlaceDetail/PlaceDetail";
import SideDrawer from "./src/screens/SideDrawer/SideDrawer"
import configureStore from "./src/store/configureStore"
import hoistNonReactStatic from 'hoist-non-react-statics';

function wrap (SceneComp, store) {
    class WrappedComponent extends React.PureComponent {
        constructor(props) {
            super(props)
        }

        render() {
            return (
                    <Provider store={store}>
                    <SceneComp {...this.props}/>
                    </Provider>
            );
        }
    }
    hoistNonReactStatic(WrappedComponent, SceneComp);
    return WrappedComponent;
}

function sceneCreator (SceneComp, store) {
    return (props) => {
        return <Provider store={store}><SceneComp {...props}/></Provider>
    }
}

const store = configureStore()

// Register Screens
Navigation.registerComponent(
    "awesome-places.AuthScreen",
    () => wrap(AuthScreen, store)
)
Navigation.registerComponent(
    "awesome-places.SharePlaceScreen",
    () => wrap(SharePlaceScreen, store),
)
Navigation.registerComponent(
    "awesome-places.FindPlaceScreen",
    () => wrap(FindPlaceScreen, store),
)
Navigation.registerComponent(
    "awesome-places.PlaceDetailScreen",
    () => wrap(PlaceDetailScreen, store),
)
Navigation.registerComponent(
    "awesome-places.SideDrawer",
    () => SideDrawer
)

// Start a App
Navigation.setRoot({
    root: {
        stack: {
            id: 'AuthScreen',
            children: [{
                component: {
                    name: "awesome-places.AuthScreen",
                    options: {
                        topBar:{
                            visible: false
                        }
                    }
                }
            }]
        }
    }
})
