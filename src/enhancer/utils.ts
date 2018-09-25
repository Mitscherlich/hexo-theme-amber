import TextUtil from './utils/TextUtil';
import ArrayUtil from './utils/ArrayUtil';

const install = () => {
  if (typeof String.prototype.toTitleCase === 'undefined') {
    String.prototype.toTitleCase = function() {
      return TextUtil.toTitleCase(this.toString());
    };
  }

  if (typeof Array.prototype.take === 'undefined') {
    Array.prototype.take = function(n) {
      return ArrayUtil.take(this, n);
    };
  }
};

export default { install };
