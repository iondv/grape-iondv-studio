
export default (editor, config = {}) => {

  const bm = editor.BlockManager;
  const dc = editor.DomComponents;
  const category = config.category || 'Meta blocks';

  bm.add('treeMenu', {
    label: 'Navigation',
    attributes: {
      'title': 'Tree menu',
      'class': 'fa fa-ellipsis-v'
    },
    category,
    content: {
      type: 'treeMenu'
    },
    ...config.treeMenu.block
  });

  bm.add('listSearch', {
    label: 'List search',
    attributes: {
      'class': 'fa fa-search',
      'title': 'List search',
    },
    category,
    content: {
      type: 'listSearch'
    },
    ...config.listSearch.block
  });

  bm.add('objectList', {
    label: 'Object list',
    attributes: {
      'title': 'Object list',
      'class': 'fa fa-list'
    },
    category,
    content: {
      type: 'objectList',
      activeOnRender: true
    },
    ...config.objectList.block
  });


  bm.add('objectForm', {
    label: 'Object form',
    attributes: {
      'class': 'fa fa-edit',
      'title': 'Object form',
    },
    category,
    content: {
      type: 'objectForm',
      activeOnRender: true
    },
    ...config.objectForm.block
  });
}
