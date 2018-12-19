import { VueConstructor } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import {
  faAngleLeft,
  faBook,
  faBookmark,
  faCalendar,
  faClock,
  faLink,
  faRss,
  faSearch,
  faTag,
  faUserEdit,
} from '@fortawesome/free-solid-svg-icons';
import {
  faFacebook,
  faGithubAlt,
  faSafari,
  faTwitter,
  faWeibo,
} from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';

library.add(faAngleLeft, faBook, faBookmark, faCalendar, faClock, faLink, faRss, faSearch, faTag, faUserEdit);
library.add(faFacebook, faGithubAlt, faSafari, faTwitter, faWeibo);

const install = (Vue: VueConstructor) => {
  Vue.component('fa-icon', FontAwesomeIcon);
};

export default { install };
