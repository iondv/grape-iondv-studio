
import Submit from './Submit';
import Input from './Input';
import Search from './Search';

export default (editor, config = {}) => {

  Input(editor, config);
  Submit(editor, config);
  Search(editor, config);
}