// Artificial Renaissance itself 2019-2020. All rights reserved.

define(['knockout', 'ojs/ojmodule-element-utils', 'ojs/ojresponsiveutils', 'ojs/ojresponsiveknockoututils', 'ojs/ojrouter', 'ojs/ojarraydataprovider', 'ojs/ojknockouttemplateutils', 'ojs/ojmodule-element', 'ojs/ojknockout', 'ojs/ojinputtext', 'ojs/ojpictochart', 'ojs/ojlegend'],
  function (ko, moduleUtils, ResponsiveUtils, ResponsiveKnockoutUtils, Router, ArrayDataProvider, KnockoutTemplateUtils) {
    function ControllerViewModel() {
      var self = this;

      self.KnockoutTemplateUtils = KnockoutTemplateUtils;

      // Handle announcements sent when pages change, for Accessibility.
      self.manner = ko.observable('polite');
      self.message = ko.observable();
      document.getElementById('globalBody').addEventListener('announce', announcementHandler, false);

      function announcementHandler(event) {
        setTimeout(function () {
          self.message(event.detail.message);
          self.manner(event.detail.manner);
        }, 200);
      };

      // Media queries for repsonsive layouts
      var smQuery = ResponsiveUtils.getFrameworkQuery(ResponsiveUtils.FRAMEWORK_QUERY_KEY.SM_ONLY);
      self.smScreen = ResponsiveKnockoutUtils.createMediaQueryObservable(smQuery);

      // Router setup
      self.router = Router.rootInstance;
      self.router.configure({
        'login': { label: 'Login', isDefault: true },
        'approval': { label: 'Approval' },
        'calendar': { label: 'Calendar' },
        'documents_selector': { label: 'Documents' },
        'documents': { label: 'Documents' },
        'document': { label: 'Document' },
        'incidents': { label: 'Incidents' },
        'notes_selector': { label: 'Notes' },
        'notes': { label: 'Notes' },
        'note': { label: 'Note' },
        'profile': { label: 'Profile' },
        'recipients_selector': { label: 'Recipients' },
        'recipients': { label: 'Recipients' },
        'recipient': { label: 'Recipient' },
        'registration': { label: 'Registration' },
        'subscription': { label: 'Subscription' }
      });
      Router.defaults['urlAdapter'] = new Router.urlParamAdapter();

      self.loadModule = function () {
        self.moduleConfig = ko.pureComputed(function () {
          var name = self.router.moduleConfig.name();
          var viewPath = 'views/' + name + '.html';
          var modelPath = 'viewModels/' + name;
          return moduleUtils.createConfig({
            viewPath: viewPath,
            viewModelPath: modelPath, params: { parentRouter: self.router }
          });
        });
      };

      // Navigation setup
      var navData = [
        {
          name: 'Calendar', id: 'calendar',
          iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-grid-icon-16'
        },
        {
          name: 'Incidents', id: 'incidents',
          iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-fire-icon-24'
        },
        {
          name: 'Recipients', id: 'recipients_selector',
          iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-people-icon-24'
        },
        {
          name: 'Documents', id: 'documents_selector',
          iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-catalog-icon-24'
        },
        {
          name: 'Notes', id: 'notes_selector',
          iconClass: 'oj-navigationlist-item-icon demo-icon-font-24 demo-library-icon-24'
        }
      ];
      self.navDataProvider = new ArrayDataProvider(navData, { keyAttributes: 'id' });

      // Header
      // Application Name used in Branding Area
      self.appName = ko.observable("App Name");
      // User Info used in Global Navigation area
      self.userLogin = ko.observable("john.dow@johndow.com");

      // Footer
      function footerLink(name, id, linkTarget) {
        this.name = name;
        this.linkId = id;
        this.linkTarget = linkTarget;
      }
      self.footerLinks = ko.observableArray([
        new footerLink('About Artificial Renaissance itself', 'aboutARISE', 'https://pirogove.blogspot.com'),
        new footerLink('Contact Us', 'contactUs', 'https://pirogove.blogspot.com'),
        new footerLink('Legal Notices', 'legalNotices', 'https://pirogove.blogspot.com'),
        new footerLink('Terms Of Use', 'termsOfUse', 'https://pirogove.blogspot.com'),
        new footerLink('Your Privacy Rights', 'yourPrivacyRights', 'https://pirogove.blogspot.com')
      ]);

      self.userMenuHandler = function (event) {
        event.preventDefault();
        self.router.go(event.target.id);
      }
    }

    return new ControllerViewModel();
  }
);
