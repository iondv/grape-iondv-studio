
export default (editor, config = {}) => {

  const type = 'treeMenuItem';
  const dc = editor.DomComponents;
  const studio = config.studio;
  const baseType = dc.getType('default');

  dc.addType(type, {
    'model': baseType.model.extend({
      defaults: {
        ...baseType.model.prototype.defaults,
        draggable: false,
        droppable: false,
        copyable: false,
      },

    },{
      'isComponent': el => el.classList && el.classList.contains('tree-menu-item') ? {type} : null
    }),

    'view': baseType.view.extend({

    })
  });
}