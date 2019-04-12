import loadComponents from './components';
import loadBlocks from './blocks';

export default grapesjs.plugins.add('grapesjs-studio', (editor, config = {}) => {

  const options = {
    ...config
  };

  loadComponents(editor, options);
  loadBlocks(editor, options);
});
