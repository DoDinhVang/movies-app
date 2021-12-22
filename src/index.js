import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './i18n'
import App from './App';
import { Provider } from 'react-redux'
import reportWebVitals from './reportWebVitals';
import { store } from './redux/configstore';
import 'antd/dist/antd.css'
import { DOMAIN } from './utilities/settings/config';


// cấu hình real time (websocket với signalr)
import * as signalR from '@aspnet/signalr'


// kết nối với sever và lắng nghe sự kiện từ sever
export const connecting = new signalR.HubConnectionBuilder()
  .withUrl(`${DOMAIN}/DatVeHub`)
  .configureLogging(signalR.LogLevel.Information)
  .build();;

connecting.start().then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root')
  );
}).catch(error => console.log(error))



reportWebVitals();
