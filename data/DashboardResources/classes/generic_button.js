// Add import hack to import button.js

function createGenericButton (button_div, label, callback, minwidth) {
  var b = GrommitGlassButton(button_div, label, callback);
  b.set_min_width(minwidth);
}

function genericButtonSetEnabled(button_div, enabled) {
    var b = button_div.childNodes[1];
    b.setEnabled(enabled);
}
