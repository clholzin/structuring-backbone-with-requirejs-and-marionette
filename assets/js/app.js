define(["marionette", "apps/config/marionette/regions/dialog"], function(Marionette){
  var ContactManager = new Marionette.Application();

  ContactManager.addRegions({
    headerRegion: "#header-region",
    mainRegion: "#main-region",
    dialogRegion: Marionette.Region.Dialog.extend({
      el: "#dialog-region"
    })
  });

  ContactManager.navigate = function(route,  options){
    options || (options = {});
    Backbone.history.navigate(route, options);
  };

  ContactManager.getCurrentRoute = function(){
    return Backbone.history.fragment
  };

  ContactManager.on("start", function(){
    if(Backbone.history){
      require(["apps/contacts/contacts_app"], function () {
        Backbone.history.start();

        if(ContactManager.getCurrentRoute() === ""){
          ContactManager.trigger("contacts:list");
        }
      });
    }
  });

  return ContactManager;
});
