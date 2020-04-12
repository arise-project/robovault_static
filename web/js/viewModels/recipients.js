// Artificial Renaissance itself 2019-2020. All rights reserved.

define(['knockout', 'ojs/ojbootstrap', 'ojs/ojmodel', 'ojs/ojknockouttemplateutils', 'ojs/ojcollectiondatagriddatasource',
  'ojs/ojconverter-datetime', 'ojs/ojconverter-number', 'ojs/ojknockout', 'ojs/ojdatagrid'],
  function (ko, Bootstrap, Model, KnockoutTemplateUtils,
    collectionModule, DateTimeConverter, NumberConverter) {
    var ViewModel = function () {
      this.KnockoutTemplateUtils = KnockoutTemplateUtils;
      var dateOptions = { formatType: 'date', dateFormat: 'medium' };
      this.dateConverter = new DateTimeConverter.IntlDateTimeConverter(dateOptions);

      var salaryOptions =
      {
        style: 'currency',
        currency: 'USD',
        currencyDisplay: 'symbol'
      };
      this.salaryConverter = new NumberConverter.IntlNumberConverter(
        salaryOptions);

      var collection = new Model.Collection(null, {
        url: 'recipients.json'
      });

      this.dataSource = new collectionModule.CollectionDataGridDataSource(collection,
        { rowHeader: 'EMPLOYEE_ID' }
      );
      console.log(1);
      this.getCellClassName = function (cellContext) {
        var key = cellContext.keys.column;
        if (key === 'SALARY') {
          return 'oj-helper-justify-content-right';
        } else if (key === 'FIRST_NAME' ||
          key === 'LAST_NAME' ||
          key === 'EMAIL' ||
          key === 'HIRE_DATE') {
          return 'oj-sm-justify-content-flex-start';
        }
        return '';
      };
    };
    return ViewModel;
  }
);