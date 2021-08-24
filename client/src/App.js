import Routes from 'routes';
import store, { persistor } from 'redux/store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes />
        <ToastContainer />
      </PersistGate>
    </Provider>
  );
}

export default App;
