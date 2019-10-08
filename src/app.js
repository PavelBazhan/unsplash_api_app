import axios from 'axios';

import "./styles/normalize.css";
import "./styles/scss/index.scss";

import router from './router.js';

import header from './scripts/header.js';
import mainPage from './scripts/mainpage.js';
import collectionList from './scripts/collection-list.js';
import collectionPhotos from './scripts/collection-photos.js';
import photo from './scripts/photo.js';
collectionList.init();
collectionPhotos.init();

router.add('/', function () {
  mainPage.render();
});
router.add('/collections', function () {
  collectionList.render();
});
router.add('/collections/(:num)', function (num) {
  collectionPhotos.render(num);
});
router.add('/photos/{id}', function (id) {
  photo.render(id);
});

router.addUriListener();
router.check();










//console.log(connectPromise);
