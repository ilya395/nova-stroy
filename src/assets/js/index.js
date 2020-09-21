console.log('Hello, bro! This project work with Webpack!');
//
import 'normalize.css';
// import 'materialize-css';
import 'materialize-css/dist/css/materialize.min.css';
import 'materialize-css/dist/js/materialize.min';
import '../sass/style.scss';
import * as _ from 'lodash';
import tmpHeader from '../templates/includes/header.html';

const header = _.template(tmpHeader)();