// Artificial Renaissance itself 2019-2020. All rights reserved.

define([
  'ojs/ojrouter',
  'knockout',
  'ojs/ojbootstrap',
  'ojs/ojmodel',
  'ojs/ojknockouttemplateutils',
  'ojs/ojcollectiondatagriddatasource',
  'ojs/ojconverter-datetime',
  'ojs/ojconverter-number',
  'ojs/ojknockout',
  'ojs/ojdatagrid',
  'ojs/ojmoduleanimations',
  'ojs/ojmodule-element-utils',
  'ojs/ojmodule-element',
  'ojs/ojmenu',
  'ojs/ojtoolbar',
  'ojs/ojbutton',
  'text'],
  function (Router, ko, Bootstrap, Model, KnockoutTemplateUtils,
    collectionModule, DateTimeConverter, NumberConverter, Knockout, DataGrid, ModuleAnimations, ModuleElementUtils) {
    var ViewModel = function () {
      this.KnockoutTemplateUtils = KnockoutTemplateUtils;
      var dateOptions = { formatType: 'date', dateFormat: 'medium' };
      this.dateConverter = new DateTimeConverter.IntlDateTimeConverter(dateOptions);

      // An observable to hold the animation type.
      this.anim = ko.observable('None');

      // Construct the label for the animation menu
      this.animLabel = ko.pureComputed(function () {
        return ('Module Animation: ' + this.anim());
      }.bind(this));

      this.moduleConfig = ko.observable({ view: [], viewModel: null });;
      this.moduleAnimation = ko.observable();

      this.animSelectAction = function (event) {
        var value = event.target.value;
        var anim = value ? ModuleAnimations[value] : null;
        this.moduleAnimation(anim);
        this.anim(event.target.textContent);
      }.bind(this);


      var parentRouter = Router.rootInstance;
      this.router = parentRouter.getChildRouter('notes') || parentRouter.createChildRouter('notes')
        .configure({
          'notes': {
            label: 'All',
            canExit: true
          },
          'note': {
            label: 'Add note',
            canExit: true
          }
        });

      // A computed observable which listens to the router's state change and
      // creates a module config Promise.
      var moduleConfigPromise = ko.pureComputed(function () {
        var value = this.router.stateId();

        var name = this.router.moduleConfig.name();
        var viewPath = 'views/' + value + '.html';
        var modelPath = 'viewModels/' + value;
        return ModuleElementUtils.createConfig({
          viewPath: viewPath,
          viewModelPath: modelPath, params: { parentRouter: Router.rootInstance }
        });
      }.bind(this));

      // When the given module config Promise is resolved, pass it to our own
      // this.moduleConfig observable.
      var updateConfig = function (currentConfigPromise) {
        currentConfigPromise.then(function (moduleConfig) {
          // Guard against multiple router state changes causing modules to load
          // out-of-order by comparing the returned config Promise against the
          // latest in the view model.
          if (currentConfigPromise === moduleConfigPromise.peek()) {
            this.moduleConfig(moduleConfig);
          }
        }.bind(this));
      }.bind(this);
      // Update our moduleConfig with the initial value from the module config Promise
      updateConfig(moduleConfigPromise.peek());
      // When moduleConfigPromise udpates (due to router state change), tell it to
      // update our module config.
      moduleConfigPromise.subscribe(updateConfig.bind(this));

      // Invoke go() with the new state path when goto menu changes
      this.menuItemAction = function (event) {
        this.router.go(event.target.value);
      };

      var childRouter = this.router;
      this.selectHandler = function (event) {
        if ('menu' === event.target.id && event.detail.originalEvent) {
          // router takes care of changing the selection
          event.preventDefault();
          // Invoke go() with the selected item.
          childRouter.go(event.detail.key);
        }
      }

      childRouter.go('notes');

    };
    return ViewModel;
  }
);