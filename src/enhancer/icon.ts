import { VueConstructor } from 'vue';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fab } from '@fortawesome/free-brands-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fas } from '@fortawesome/free-solid-svg-icons';

// brands icons
library.add(fab);
// regular icons
library.add(far);
// solid icons
library.add(fas);

const install = (Vue: VueConstructor) => {
  Vue.component('fa-icon', FontAwesomeIcon);
};

export default { install };
