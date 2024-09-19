import React from 'react';
import { Provider } from 'react-redux';
import TabNavigator from '../../contact-list/2/Routers';
import store from '../../Create_store';

const App = () => (
  <Provider store={store}>
    <TabNavigator />
  </Provider>
);

export default App;
