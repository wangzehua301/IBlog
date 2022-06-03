//抹平浏览器差异的样式库文件，原理就是样式覆盖
import React from 'react';
import ReactDOM from 'react-dom';
import Home from './container/Home';

import 'normalize.css';
import './style.scss'

ReactDOM.render(
    <Home />,
  document.getElementById('root')
);


