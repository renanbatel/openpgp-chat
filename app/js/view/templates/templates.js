(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['contact'] = template({"1":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "  <li data-uid=\""
    + alias4(((helper = (helper = helpers.uid || (depth0 != null ? depth0.uid : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"uid","hash":{},"data":data}) : helper)))
    + "\" data-pubkey=\""
    + alias4(((helper = (helper = helpers.chavePublica || (depth0 != null ? depth0.chavePublica : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"chavePublica","hash":{},"data":data}) : helper)))
    + "\" data-name=\""
    + alias4(((helper = (helper = helpers.nome || (depth0 != null ? depth0.nome : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nome","hash":{},"data":data}) : helper)))
    + "\" class=\"home-sidebar_list-item home-sidebar_contact\">\r\n    <div class=\"row-content spaced\">\r\n        <strong>"
    + alias4(((helper = (helper = helpers.nome || (depth0 != null ? depth0.nome : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"nome","hash":{},"data":data}) : helper)))
    + "</strong>\r\n    </div>\r\n  </li>\r\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "  <li class=\"home-sidebar_contact-empty\" >Adicione um contato para começar</li>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(3, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});
templates['message'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=helpers.helperMissing, alias3="function", alias4=container.escapeExpression;

  return "  <li class=\"home-main_message-row row-content "
    + ((stack1 = helpers["if"].call(alias1,(depth0 != null ? depth0.from : depth0),{"name":"if","hash":{},"fn":container.program(2, data, 0),"inverse":container.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "\">\r\n    <div class=\"home-main_message row-content inline\">\r\n      <p>"
    + alias4(((helper = (helper = helpers.message || (depth0 != null ? depth0.message : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"message","hash":{},"data":data}) : helper)))
    + "</p>\r\n      <span class=\"time\">"
    + alias4(((helper = (helper = helpers.date || (depth0 != null ? depth0.date : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"date","hash":{},"data":data}) : helper)))
    + "</span>\r\n    </div>\r\n  </li>\r\n";
},"2":function(container,depth0,helpers,partials,data) {
    return "contact";
},"4":function(container,depth0,helpers,partials,data) {
    return "user";
},"6":function(container,depth0,helpers,partials,data) {
    return "  <li class=\"home-main_message-empty\">Não há nenhuma mensagem ainda</li>\r\n";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0 != null ? depth0 : (container.nullContext || {}),depth0,{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(6, data, 0),"data":data})) != null ? stack1 : "");
},"useData":true});
})();