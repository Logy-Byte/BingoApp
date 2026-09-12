import { AppRegistry } from 'react-native';
import App from './App';

AppRegistry.registerComponent('BingoApp', () => App);
AppRegistry.runApplication('BingoApp', {
  rootTag: document.getElementById('root'),
});
