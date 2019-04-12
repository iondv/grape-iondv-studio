
import Menu from './Menu';
import Item from './Item';
import ItemChildren from './ItemChildren';
import ItemHead from './ItemHead';
import ItemTitle from './ItemTitle';
import ItemToggle from './ItemToggle';

export default (editor, config = {}) => {

  Item(editor, config);
  ItemChildren(editor, config);
  ItemHead(editor, config);
  ItemTitle(editor, config);
  ItemToggle(editor, config);
  Menu(editor, config);
}