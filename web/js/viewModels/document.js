// Artificial Renaissance itself 2019-2020. All rights reserved.

define(['ojs/ojcore', 'knockout', 'jquery', 'ojs/ojfilepicker'],
    function (oj, ko, $) {

        function UploadCSVModel() {
            var self = this;
            self.csvFileContent = ko.observable("");
            self.acceptStr = ko.observable("*");
            self.acceptArr = ko.pureComputed(function () {
                var accept = self.acceptStr();
                return accept ? accept.split(",") : [];
            }, self);

            self.selectListener = function (event) {
                var files = event.detail.files;
                for (var i = 0; i < files.length; i++) {
                    console.log(files[i].name);
                    var file = files[i];
                    var reader = new FileReader();
                    reader.addEventListener("loadend", function () {
                        self.csvFileContent(reader.result);
                    });
                    reader.readAsText(file);

                }
            }
        }

        /*
         * Returns a constructor for the ViewModel so that the ViewModel is constructed
         * each time the view is displayed.  Return an instance of the ViewModel if
         * only one instance of the ViewModel is needed.
         */
        return new UploadCSVModel();
    }
);