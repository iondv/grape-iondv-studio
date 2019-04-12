
export default (editor, config = {}) => {

  const type = 'treeMenuItemToggle';
  const dc = editor.DomComponents;
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
      'isComponent': el => el.classList && el.classList.contains('tree-menu-item-toggle') ? {type} : null
    }),

    'view': baseType.view.extend({
      events: {
        click: 'onClick',
      },
      onClick (event) {
        $(this.el).closest('.tree-menu-item').toggleClass('opened');
      },
    })
  });
}