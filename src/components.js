
import TreeMenu from './tree-menu';
import ListSearch from './list-search';
import ObjectList from './object-list';
import ObjectForm from './object-form';

export default (editor, config = {}) => {

  TreeMenu(editor, config);
  ListSearch(editor, config);
  ObjectList(editor, config);
  ObjectForm(editor, config);
}