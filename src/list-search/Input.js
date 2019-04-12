
export default (editor, config = {}) => {

  const type = 'listSearchInput';
  const dc = editor.DomComponents;
  const baseType = dc.getType('link');

  dc.addType(type, {
    'model': baseType.model.extend({
      defaults: {
        ...baseType.model.prototype.defaults,
        draggable: true,
        droppable: false,
        copyable: false,
        traits: [{
          type: 'input',
          name: 'placeholder',
          label: Helper.L10n.translate('Text'),
        }],
      },
    },{
      'isComponent': el => el.classList && el.classList.contains('list-search-input') ? {type} : null
    }),

    'view': baseType.view.extend({

    })
  });
}