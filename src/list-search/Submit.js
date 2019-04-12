
export default (editor, config = {}) => {

  const type = 'listSearchSubmit';
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
          type: 'content',
          label: Helper.L10n.translate('Text'),
        }],
      },

    },{
      'isComponent': el => el.classList && el.classList.contains('list-search-submit') ? {type} : null
    }),

    'view': baseType.view.extend({

    })
  });
}