;/*!server/author.js*/
/*=====================================================================
 * Author:Kyle && qichao
 * Website:http://yhtml5.com
 * Gihub:https://github.com/yhtml5
 * Description: We work hard to contribute our work back
 *              to the web, mobile, server, & new technology.
 *====================================================================*/
 'use strict';
;/*!components/js/directive.js*/
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
;/*!components/js/filter.js*/
/************************* Filter *****************************/

;/*!components/js/router.js*/
/************************* Router *****************************/
angular.module('yhtml5', [
    'ui.router',
    'controllers',
    'directive'
])
    .config(['$compileProvider', function ($compileProvider) {
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(|blob|):/);
    }])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider
        //.when('/dashboard/*', '/dashboard')
            .otherwise("")
        $stateProvider
            .state('dashboard', {
                url: "/dashboard",
                views: {
                    "nav": {
                        templateUrl: ""
                    },
                    "content": {
                        templateUrl: ""
                    }
                }
            })
    })
;/*!components/js/ctrl.js*/
/************************* Ctrl *****************************/
angular.module('controllers', [])
    .controller('controllers', function($scope) {

    })
    .controller('smsConfirmCtrl', function($scope) {

    })