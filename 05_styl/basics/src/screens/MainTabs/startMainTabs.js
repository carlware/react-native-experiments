import { Navigation } from 'react-native-navigation';
import Icon from 'react-native-vector-icons/Ionicons';

const startTabs = () => {
    Promise.all([
        Icon.getImageSource("md-map", 30),
        Icon.getImageSource("ios-share-alt", 30),
        Icon.getImageSource("ios-menu", 30)
    ]).then(sources => {
        Navigation.setRoot({
            root: {
                topBar: {
                    rightButtons: [
                        {
                            id: 'myDynamicButton',
                            text: 'My Button'
                        }
                    ]
                },
                sideMenu: {
                    left: {
                        component: {
                            id: "app.Drawer",
                            name: "awesome-places.SideDrawer"
                        }
                    },
                center: {
                    bottomTabs: {
                        children: [{
                            stack: {
                                id: "1",
                                children: [{
                                    component: {
                                        id: "FindPlaceScreen",
                                        name: "awesome-places.FindPlaceScreen",
                                        options: {
                                            topBar: {
                                                leftButtons: [
                                                    {
                                                        id: 'buttonOne',
                                                        icon: sources[2]
                                                    }
                                                ]
                                            }
                                        },
                                    }
                                }],
                                options: {
                                    bottomTab: {
                                        text: "Find Place",
                                        title: "Find Place",
                                        icon: sources[0],
                                    }
                                }
                            }
                        }, {
                            stack: {
                                id: "2",
                                children: [{
                                    component: {
                                        id: "SharePlaceScreen",
                                        name: "awesome-places.SharePlaceScreen",
                                        options: {
                                            topBar: {
                                                title: {
                                                    text: "SharePlaceScreen"
                                                },
                                                leftButtons: [
                                                    {
                                                        id: 'buttonOne',
                                                        icon: sources[2]
                                                    }
                                                ]
                                            }
                                        },
                                    }
                                }],
                                options: {
                                    bottomTab: {
                                        text: "Share Place",
                                        title: "Share Place",
                                        icon: sources[1],
                                    }
                                }
                            }
                        }]
                    }
                }
                },
            },
            // tabs: [
            //     {
            //         navigatorButtons: {
            //             leftButtons: [
            //                 {
            //                     icon: sources[2],
            //                     title: "Menu",
            //                     id: "sideDrawerToggle"
            //                 }
            //             ]
            //         }
            //     },
            //     {
            //         label: "Share Place",
            //         title: "Share Place",
            //         icon: sources[1],
            //         navigatorButtons: {
            //             leftButtons: [
            //                 {
            //                     icon: sources[2],
            //                     title: "Menu",
            //                     id: "sideDrawerToggle"
            //                 }
            //             ]
            //         }
            //     }
            // ],
            // drawer: {
            //     left: {
            //         screen: "awesome-places.SideDrawer"
            //     }
            // }
        });
    });
}

export default startTabs;
