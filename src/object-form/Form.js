
import htmlHelper from '../helpers/html';

export default (editor, config = {}) => {

  const type = 'objectForm';
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
        copyable: false
      },
      init () {
        this.addClass('object-form');
      }
    },{
      'isComponent': el => el.classList && el.classList.contains('object-form') ? {type} : null
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
        let content = this.getViewSelect();
        content += htmlHelper.getClassSelect(app);
        let btns = htmlHelper.getButton({
          text: Helper.L10n.translate('Create'),
          css: 'btn-success btn-submit'
        });
        content += htmlHelper.wrapFormFooter(btns);
        let form = htmlHelper.createForm({content});
        let $form = $(form);
        $form.find('.btn-submit').click(event => {
          let cls = app.getClassByName($form.find('[name="class"]').val());
          let view = cls && cls.getViewByName($form.find('[name="view"]').val());
          if (view) {
            this.createForm(view);
            modal.close();
          }
        });
        let title = Helper.L10n.translate('New object form');
        modal.setTitle(title).setContent(form).open();
        Helper.select2($form.find('select'));
      },

      getViewSelect () {
        return htmlHelper.getSelect({
          'name': 'view',
          'label': Helper.L10n.translate('View'),
          'hasEmpty': false,
          'items': [{
            'value': 'create',
            'text': Helper.L10n.translate('Creation form')
          }, {
            'value': 'item',
            'text': Helper.L10n.translate('Edit form')
          }]
        });
      },

      createForm (view) {
        let components = this.model.components();
        let params = {
          attrs: []
        };
        view.attrs.forEach(attr => {
          params.attrs.push({
            'name': attr.getName()
          });
        });
        this.model.setAttributes({
          'data-class': view.cls.getName(),
          'data-view': view.getName(),
          'data-params': JSON.stringify(params)
        });
        view.setGroupChildren();
        let cmd = view.getName() === 'create' ? 'create' : 'update';
        let content = `<input type="hidden" name="cmd" value="${cmd}">`;
        content += this.createItems(view.getRootItems());
        components.add(`<form action="#objectFormUrl" method="post" class="form form-horizontal">${content}</form>`);
      },

      createItems (items) {
        var result = '';
        var resultTab = '';
        if (items instanceof Array) {
          for (let item of items) {
            if (item instanceof Studio.ClassViewAttrModel) {
              result += this.createAttr(item);
            } else if (item.isTab()) {
              resultTab += this.createTab(item, !resultTab);
              result += this.createTabContent(item, !resultTab);
            } else {
              result += this.createGroup(item);
            }
          }
        }
        return this.wrapTab(resultTab, result);
      },

      wrapTab (resultTab, result) {
        return resultTab
          ? `<div data-tabs="1"><nav class="tab-container" data-tab-container="1">${resultTab}</nav>${result}</div>`
          : result;
      },

      createTab: function (tab, active) {
        active = active ? 'tab-active' : '';
        return `<a class="tab ${active}" href="#tab-${tab.getName()}" data-tab="1">${tab.getTitle()}</a>`;
      },

      createTabContent: function (tab, active) {
        active = active ? 'block' : 'none';
        return `<div class="tab-content" id="tab-${tab.getName()}" data-tab-content="1" style="display:${active}">
          ${this.createItems(tab.children)}
        </div>`;
      },

      createGroup: function (group) {
        let title = group.getTitle();
        return `<fieldset class="form-set" data-name="${group.getName()}">
          <legend>${group.getTitle()}</legend>
          ${this.createItems(group.children)}  
        </fieldset>`;
      },

      createAttr: function (attr) {
        let required = attr.isRequired() ? ' required' : '';
        return `<div class="form-group ${required}" data-name="${attr.getName()}">
          <label class="control-label col-sm-3">${attr.getTitle()}</label>
          <div class="col-sm-9">
            ${this.createAttrValue(attr)}
          </div>
        </div>`;
      },

      createAttrValue (attr) {
        switch (attr.getType()) {
          case '4': return this.createBooleanValue(attr);
          case '5': return this.createSelectValue(attr);
          case '7': return this.createTextValue(attr);
        }
        return this.createStringValue(attr);
      },

      createBooleanValue (attr) {
        return `<input type="checkbox" class="value" name="data(${attr.getName()})">`;
      },

      createSelectValue (attr) {
        return `<select class="form-control value" name="data(${attr.getName()})">
          <option>${attr.getTypeTitle()}</option>
          <option>Value 1</option>
          <option>Value 2</option>
        </select>`;
      },

      createTextValue (attr) {
        return `<textarea rows="4" class="form-control value" name="data(${attr.getName()})"></textarea>`;
      },

      createStringValue (attr) {
        return `<input type="text" rows="4" class="form-control value" name="data(${attr.getName()})" value="${attr.getTypeTitle()}">`;
      },

    })
  });
}
