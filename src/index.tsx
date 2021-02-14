import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Mock from '@/mock';
import '@/theme/global.scss';
console.log('mockjs version:', Mock.version);

ReactDOM.render(<App />, document.querySelector('#root'));
