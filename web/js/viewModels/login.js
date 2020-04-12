// Artificial Renaissance itself 2019-2020. All rights reserved.

define(['ojs/ojrouter', 'ojs/ojbootstrap', 'knockout', 'ojs/ojbutton', 'ojs/ojlabel', 'ojs/ojknockout'],
  function (Router, Bootstrap, ko) {
    var vm = function ViewModel() 
      {
        this.login = ko.observable('');
        this.password = ko.observable('');

        var parentRouter = Router.rootInstance;
        var self = this;

        this.clickListener_login = function(event, data, bindingContext)
        {
          if(self.login() === "john" && self.password() === "dow")
          {
            parentRouter.go('calendar');
          }
          else
          {
            parentRouter.go('approval');
          }
        };

        this.clickListener_registration = function(event, data, bindingContext)
        {
          parentRouter.go('registration');
        };
      }

    return vm;
  }
);