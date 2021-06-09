import React, { PureComponent } from 'react';
import { Provider } from 'react-redux';
import { store } from 'configurations/redux/store';
import ApplicationRouter from 'configurations/routing/ApplicationRouter';
import 'antd/dist/antd.css';

class App extends PureComponent {
  render() {
    return (
      <Provider store={store}>
        <ApplicationRouter />
      </Provider>
    );
  }
}

export default App;
