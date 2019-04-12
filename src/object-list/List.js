
import htmlHelper from '../helpers/html';

export default (editor, config = {}) => {

  const type = 'objectList';
  const dc = editor.DomComponents;
  const modal = editor.Modal;
  const studio = config.studio;
  const baseType = dc.getType('default');

  dc.addType(type, {
    'model': baseType.model.extend({
      defaults: {
        ...baseType.model.prototype.defaults,
        draggable: true,
        droppable: false,
        copyable: false,
        /*
        traits: [{
          type: 'select',
          label: Helper.L10n.translate('Class'),
          name: 'class',
          options: [],
        }],//*/
      },
      init () {
        this.addClass('object-list');
        /*
        this.app = studio.getActiveApp();
        let classTrait = this.get('traits').where({name: 'class'})[0];
        if (classTrait) {
          classTrait.set('options', [{value:'val1',name:'name1'}]);
          editor.TraitManager.getTraitsViewer().render();
        }*/
      }
    },{
      'isComponent': el => el.classList && el.classList.contains('object-list') ? {type} : null
    }),
    'view': baseType.view.extend({
      init() {
        let components = this.model.components();
        if (!components.length) {
          this.listenTo(this.model, 'active', this.openModal);
        }
      },

      openModal() {
        let app = studio.getActiveApp();
        let content = htmlHelper.getClassSelect(app);
        let btns = htmlHelper.getButton({
          'text': Helper.L10n.translate('Create'),
          'css': 'btn-success btn-submit'
        });
        content += htmlHelper.wrapFormFooter(btns);
        let form = htmlHelper.createForm({content});
        let $form = $(form);
        $form.find('.btn-submit').click(event => {
          let cls = app.getClassByName($form.find('[name="class"]').val());
          if (cls) {
            this.createList(cls);
            modal.close();
          }
        });
        let title = Helper.L10n.translate('New object list');
        modal.setTitle(title).setContent(form).open();
        Helper.select2($form.find('select'));
      },

      createList (cls) {
        let components = this.model.components();
        let view = cls.getListView();
        let params = {
          attrs: []
        };
        let thead = '';
        let tbody = '';
        view.attrs.forEach(attr => {
          params.attrs.push({
            'name': attr.getName()
          });
          thead += `<th name="${attr.getName()}"><div>${attr.getTitle()}</div></th>`;
          tbody += `<td><div>${attr.getTypeTitle()}</div></td>`;
        });
        this.model.setAttributes({
          'data-class': cls.getName(),
          'data-url': '#objectListUrl',
          'data-params': JSON.stringify(params)
        });
        components.add(`<table class="table"><thead><tr>${thead}</tr></thead><tbody><tr>${tbody}</tr></tbody></table>`);
        //this.render()
      }
    })
  });
}