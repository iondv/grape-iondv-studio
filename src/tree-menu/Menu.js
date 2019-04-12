
export default (editor, config = {}) => {

  const type = 'treeMenu';
  const dc = editor.DomComponents;
  const studio = config.studio;
  const baseType = dc.getType('default');

  dc.addType(type, {
    'model': baseType.model.extend({
      defaults: {
        ...baseType.model.prototype.defaults,
        draggable: true,
        droppable: false
      },
      init () {
        this.addClass('tree-menu');
      },
    },{
      'isComponent': el => el.classList && el.classList.contains('tree-menu') ? {type} : null
    }),
    'view': baseType.view.extend({
      init() {
        let app = studio.getActiveApp();
        let components = this.model.components();
        if (!components.length && app) {
          components.add(renderMenu(studio.getActiveInterface(), app.navSections));
        }
      },
    })
  });
}

function renderMenu (activeInterface, sections) {
  return sections.map(renderMenuSection.bind(this, activeInterface)).join('');
}

function renderMenuSection (activeInterface, section) {
  return renderMenuItem(activeInterface, section);
}

function renderMenuItem (activeInterface, item) {
  let children = renderMenuChildren(activeInterface, item.items);
  let hasChildren = children ? ' has-children' : '';
  let url = getItemUrl(item, activeInterface);
  return `<div class="tree-menu-item ${hasChildren}">
    <div class="tree-menu-item-head">
      <a class="tree-menu-item-title" href="${url}">${item.getTitle()}</a>
      <i class="tree-menu-item-toggle"></i>
    </div>
    <div class="tree-menu-children">${children}</div>
  </div>`;
}

function renderMenuChildren (activeInterface, items) {
  return items.map(renderMenuItem.bind(this, activeInterface)).join('');
}

function getItemUrl (item, activeInterface) {
  if (item instanceof Studio.NavItemModel) {
    let url = item.getUrl();
    if (url) {
      return url;
    }
    let face = item.getInterface() || activeInterface;
    if (face) {
      url = `${face.getUrl()}?n=${item.getFullName()}`;
      let cls = item.getClass();
      return cls ? `${url}&cls=${cls.getName()}` : url;
    }
  }
  return 'javascript:void(0)';
}