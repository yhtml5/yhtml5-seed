/*
 * @require ../../../server/author.js
 */
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