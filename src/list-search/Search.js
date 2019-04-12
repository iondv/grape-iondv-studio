
import htmlHelper from '../helpers/html';

export default (editor, config = {}) => {

  const type = 'listSearch';
  const dc = editor.DomComponents;
  const baseType = dc.getType('default');

  dc.addType(type, {
    'model': baseType.model.extend({
      defaults: {
        ...baseType.model.prototype.defaults,
        draggable: true,
        droppable: false,
        traits: [{
          type: 'input',
          label: Helper.L10n.translate('Placeholder'),
          name: 'placeholder'
        }],
      },
      init () {
        this.addClass('list-search');
      },
    },{
      'isComponent': el => el.classList && el.classList.contains('list-search') ? {type} : null
    }),
    'view': baseType.view.extend({
      init() {
        let components = this.model.components();
        if (!components.length) {
          components.add('<input type="text" class="list-search-input">');
          let text = Helper.L10n.translate('Search');
          components.add(`<button type="button" class="list-search-submit">${text}</button>`);
        }
      },
    })
  });
}