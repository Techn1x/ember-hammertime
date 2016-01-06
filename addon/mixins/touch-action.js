import Ember from 'ember';

const {
  computed,
  Mixin,
  Handlebars
} = Ember;

const {
  SafeString
} = Handlebars;

export default Mixin.create({
  attributeBindings: ['touchActionStyle:style'],
  touchActionStyle: computed(function () {
    // we apply if click is present
    let applyStyle = this.click;

    if (!applyStyle) {
      // we apply if tagName
      const tagName = this.get('tagName');
      const type = this.get('type');

      let isFocusable = ['select', 'button', 'input', 'a', 'textarea'].indexOf(tagName) !== -1;

      if (isFocusable) {
        if (tagName === 'input') {
          isFocusable = ['button', 'submit', 'text', 'file'].indexOf(type) !== -1;
        }
      }

      applyStyle = isFocusable;
    }

    return new SafeString(applyStyle ? 'touch-action: manipulation; -ms-touch-action: manipulation;' : '');
  })
});
