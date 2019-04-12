
export default (editor, config = {}) => {

  const type = 'treeMenuItemTitle';
  const dc = editor.DomComponents;
  const baseType = dc.getType('link');

  dc.addType(type, {
    'model': baseType.model.extend({
      defaults: {
        ...baseType.model.prototype.defaults,
        draggable: false,
        droppable: false,
      },

    },{
      'isComponent': el => el.classList && el.classList.contains('tree-menu-item-title') ? {type} : null
    }),

    'view': baseType.view.extend({
      events: {
        click: 'onClick',
      },
      onClick (event) {
        $(this.el).closest('.tree-menu-item').addClass('opened');
      },
    })
  });
}