/************************* Require *****************************/
angular.module('directive', [])
    .directive("repeat", [function() {
        return {
            restrict: 'A',
            require: "ngModel",
            link: function(scope, element, attrs, ctrl) {
                if (ctrl) {
                    var otherInput = element.inheritedData("$formController")[attrs.repeat];
                    var repeatValidator = function(value) {
                        var validity = value === otherInput.$viewValue;
                        ctrl.$setValidity("repeat", validity);
                        return validity ? value : undefined;
                    };
                    ctrl.$parsers.push(repeatValidator);
                    ctrl.$formatters.push(repeatValidator);
                    otherInput.$parsers.push(function(value) {
                        ctrl.$setValidity("repeat", value === ctrl.$viewValue);
                        return value;
                    });
                }
            }
        };
    }]);