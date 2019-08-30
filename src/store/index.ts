import { createStore } from 'redux';
import cloudStorageReducer from '../reducer/cloudStorage';

const store = createStore(cloudStorageReducer);

window.store = store;

export default store;
