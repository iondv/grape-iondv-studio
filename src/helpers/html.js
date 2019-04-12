
export default {

  getClassSelect,
  getSelect,
  getInput,
  getButton,

  createForm,

  wrapForm,
  wrapFormFooter,
  wrapFormAttr
}

function getClassSelect (app, params) {
  return getSelect({
    'name': 'class',
    'label': Helper.L10n.translate('Class'),
    'items': app ? app.classes.map(model => ({
      'value': model.getName(),
      'text': model.getTitle()
    })) : [],
    ...params
  });
}

function getSelect (params = {}) {
  normalizeParams(params);
  let options = params.items.map(item => {
    return `<option value="${item.value}" title="${item.value}">${item.text}</option>`;
  }).join('');
  let hasEmpty = params.hasEmpty !== false;
  let placeholder = hasEmpty ? '<option value="">${params.placeholder}</option>' : '';
  params.content = `<select name="${params.name}" class="form-control">${placeholder}${options}</select>`;
  return wrapFormAttr(params);
}

function getInput (params = {}) {
  normalizeParams(params);
  params.content = `<input name="${params.name}" type="${params.type}" value="${value}" placeholder="${params.placeholder}" class="form-control">`;
  return wrapFormAttr(params);
}

function getButton (params = {}) {
  let css = stringifyEmpty(params.css) || 'btn-default';
  return `<button type="button" class="btn btn-sm ${css}">${params.text}</button>`;
}

function createForm (params = {}) {
  let form = document.createElement('div');
  form.className = 'form form-horizontal';
  form.innerHTML = params.content;
  return form;
}

function wrapForm (content) {
  return `<div class="form form-horizontal">${content}</div>`;
}

function wrapFormAttr (params = {}) {
  let label = stringifyEmpty(params.label);
  let content = stringifyEmpty(params.content);
  let labelCol = params.labelCol || 2;
  let inputCol = params.inputCol || (12 - labelCol);
  return `<div class="form-group"><label class="control-label col-sm-${labelCol}">${label}</label><div class="col-sm-${inputCol}">${content}</div></div>`;
}

function wrapFormFooter (content) {
  return `<div class="form-footer">${content}</div>`;
}

function normalizeParams (params = {}) {
  params.name = stringifyEmpty(params.name);
  params.type = stringifyEmpty(params.type) || 'text';
  params.placeholder = stringifyEmpty(params.placeholder);
  params.value = stringifyEmpty(params.value);
  return params;
}

function stringifyEmpty (value) {
  return value === undefined || value === null ? '' : value;
}