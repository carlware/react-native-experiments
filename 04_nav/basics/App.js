import { Navigation } from "react-native-navigation";
import { Provider, ReduxProvider } from "react-redux";
// import React from "react"

import AuthScreen from "./src/screens/Auth/Auth"
import SharePlaceScreen from "./src/screens/SharePlace/SharePlace"
import FindPlaceScreen from "./src/screens/FindPlace/FindPlace"
import PlaceDetailScreen from "./src/screens/PlaceDetail/PlaceDetail";
import SideDrawer from "./src/screens/SideDrawer/SideDrawer"
import configureStore from "./src/store/configureStore"


import * as React from 'react';
import { ComponentProvider } from 'react-native'
import * as  _ from 'lodash';
import { polyfill } from 'react-lifecycles-compat'
import hoistNonReactStatics from 'hoist-non-react-statics'


export class ComponentWrapper {
  wrap(
      componentName,
      OriginalComponentGenerator,
      store,
      componentEventsObserver,
    ReduxProvider,
    reduxStore
  ) {
    const GeneratedComponentClass = OriginalComponentGenerator()
      const concreteComponentProvider = OriginalComponentGenerator()
    class WrappedComponent extends React.Component {
      static getDerivedStateFromProps(nextProps, prevState) {
        return {
          allProps: _.merge({}, nextProps, store.getPropsForId(prevState.componentId))
        }
      }

      constructor(props) {
        super(props);
          console.log(props)
        this._assertComponentId();
        this.state = {
          componentId: props.componentId,
          allProps: {}
        };
      }

      componentWillUnmount() {
        store.cleanId(this.state.componentId);
        componentEventsObserver.unmounted(this.state.componentId);
      }

      render() {
        return (
          <GeneratedComponentClass
            {...this.state.allProps}
            componentId={this.state.componentId}
          />
        );
      }

      _assertComponentId() {
        if (!this.props.componentId) {
          throw new Error(`Component ${componentName} does not have a componentId!`);
        }
      }
    }

    polyfill(WrappedComponent);
    hoistNonReactStatics(WrappedComponent, concreteComponentProvider());
    return ReduxProvider ? this.wrapWithRedux(WrappedComponent, ReduxProvider, reduxStore) : WrappedComponent;
  }

  wrapWithRedux(WrappedComponent, ReduxProvider, reduxStore) {
    class ReduxWrapper extends React.Component {
      render() {
        return (
          <ReduxProvider store={reduxStore}>
            <WrappedComponent {...this.props} />
          </ReduxProvider>
        );
      }
    }
    hoistNonReactStatics(ReduxWrapper, WrappedComponent);
    return ReduxWrapper;
  }
}
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
        // WrappedComponent.options = SceneComp.options
    // console.log(SceneComp.options)
    hoistNonReactStatic(WrappedComponent, SceneComp);
    console.log(WrappedComponent.options)
        return WrappedComponent;
}

function sceneCreator (SceneComp, store) {
    return (props) => {
        console.log("scene creator", props)
        const Wrap = wrap(SceneComp, store, props)
        // return <Provider store={store}><SceneComp {...props}/></Provider>
        return (<Wrap/>)
    }
}

const store = configureStore();
// const AuthScreenStatic = sceneCreator(AuthScreen, store)

// Register Screens
// const uut = new ComponentWrapper();
// const FindPlaceStatic = uut.wrap("FindPlaceScreen", () => FindPlaceScreen, store)
Navigation.registerComponent(
  "awesome-places.AuthScreen",
    () => wrap(AuthScreen, store)
);
Navigation.registerComponent(
  "awesome-places.SharePlaceScreen",
    () => wrap(SharePlaceScreen, store),
);
Navigation.registerComponent(
  "awesome-places.FindPlaceScreen",
    () => wrap(FindPlaceScreen, store),
);
Navigation.registerComponent(
  "awesome-places.PlaceDetailScreen",
    () => wrap(PlaceDetailScreen, store),
);
Navigation.registerComponent(
  "awesome-places.SideDrawer",
  () => SideDrawer
);

// Start a App
Navigation.setRoot({
    root: {
        stack: {
            id: 'AuthScreen',
            children: [{
                component: {
                    name: "awesome-places.AuthScreen",
                    // options: {
                    //     topBar:{
                    //         title: {
                    //             text: "Login"
                    //         },
                    //         // visible: false
                    //     }
                    // }
                }
            }]
        }
    }
})
