/*global dplActionBlade */

dplActionBlade.controller('dplControllerActionBlade', [
    '$scope',
    '$uibModal',

function ($scope, $uibModal) {
    "use strict";

    $scope.showActionBlade = function () {
        $uibModal.open({
            templateUrl: 'template/action-blade.html',
            windowClass: 'd-action-blade',
            controller: 'modalInstanceCtrl',
            animation: true
        });
    };
}
]);

dplActionBlade.controller('modalInstanceCtrl', function ($scope) {
    "use strict";

    $scope.data = {
        "header": "This is sample header",
        "body": "This is sample body"
    };
}); /*globals dplBusy */
var dplBusyDemo = angular.module('dplBusyDemo', ['ngAnimate', 'cgBusy', 'template/busy-loader.html']);
dplBusyDemo.controller('demoControllerBusyPreloader', function ($scope, $http) {
    $scope.delay = 0;
    $scope.minDuration = 0;
    $scope.message = 'Please Wait...';
    $scope.templateUrl = 'template/busy-loader.html';
    $scope.backdrop = true;
    $scope.promise = null;

    $scope.demo = function () {
        $scope.promise = $http.get("http://httpbin.org/delay/3");//for test promise
    };
});


 var dplMenu = angular.module("dplMenu", ['ngAnimate', 'ui.bootstrap']);
dplMenu.controller("dplMenuCtrl", ["$scope", "$http", function ($scope, $http) {
    'use strict';
    $scope.isCollapsed = true;
    $scope.isOpen = true;
    $scope.menuList = [
        {
            name: "My Server Settings",
            name_class: "d-menu__link",
            name_list_class: "d-menu__list",
            icon_class: "d-icon-left-angle_right",
            name_item: [
                {
                    item: "Configure Properties of my Server",
                    item_active: "is-active"
                }
            ]
        },
        {
            name: "My Server Settings",
            name_class: "d-menu__link",
            icon_class: "d-icon-left-angle_right",
            name_list_class: "d-menu__list d-menu__list_sub collapse",
            name_item: [
                {
                    item: "Configure Properties of my Server",
                    item_icon: "d-icon-left-angle_right",
                    item_list_class: "d-menu__list collapse",
                    sub_menu: [
                        { item: "Configure Global Application " }
                    ]
                },
                { item: "Configure Application Rules" },
                { item: "Configure Global Application Settings" },
                { item: "Define Impact Values" },
                { item: "Define Urgency Values" },
                { item: "Define Prioritization" },
                { item: "Define Priority Weighting" },
                { item: "Define Priority Weighting" },
                { item: "Maintain Scripts" },
                { item: "Maintain Templates" }
            ]
        },
        {
            name: "Configure Change Settings",
            name_class: "d-menu__link",
            icon_class: "d-icon-left-angle_right",
            name_list_class: "d-menu__list collapse",
            name_item: [
                { item: "Configure Properties of my Server" },
                { item: "Configure Application Rules" },
                { item: "Configure Global Application Settings" }
            ]
        },
        {
            name: "Configure Problem Settings",
            name_class: "d-menu__link",
            icon_class: "d-icon-left-angle_right",
            name_list_class: "d-menu__list collapse",
            name_item: [
                { item: "Configure Properties of my Server" },
                { item: "Configure Application Rules" }
            ]
        }
    ]
}]);
 var dplDatepickerDemo = angular.module('dplDatepickerDemo',[]);

//This directive only for demo purpose, you may init datepicker with simple jQuery call
angular.module('dplDatepickerDemo').directive('dplDatepicker', [
    function () {
        return {
            restrict: 'A',
            link: function () {

                $(function() {
                    $("#datepicker-1").datepicker({
                        dateFormat: "dd/mm/yy",
                        monthNamesShort: [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ]
                    });

                    $('#ui-datepicker-div').addClass('d-datepicker');
                });

            }
        };
    }
]); dplModal.controller('demoControllerModal', function ($scope, $uibModal, $log) {

    $scope.items = ['item1', 'item2', 'item3'];

    $scope.animationsEnabled = true;

    $scope.open = function (size) {

        var modalInstance = $uibModal.open({
            windowTemplateUrl: 'template/modal.html',
            animation: $scope.animationsEnabled,
            templateUrl: 'template/modal.html',
            size: size,
            resolve: {
                items: function () {
                    return $scope.items;
                }
            }
        });

        modalInstance.result.then(function (selectedItem) {
            $scope.selected = selectedItem;
        }, function () {
            $log.info('Modal dismissed at: ' + new Date());
        });
    };

    $scope.toggleAnimation = function () {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };
    $scope.ok = function () {
        $modalInstance.close($scope.selected.item);
    };

    $scope.cancel = function () {
        $modalInstance.dismiss('cancel');
    };

});

angular.module('template/modal.html', []).run(['$templateCache', function ($templateCache) {
    'use strict';

    $templateCache.put('template/modal.html',
        "<div class='d-modal' ng-click=\"close($event)\" modal-render=\"{{$isRendered}}\" tabindex=\"-1\" role=\"dialog\" ng-class=\"{'d-modal_in': animate}\" uib-modal-animation-class=\"d-modal_fade\" modal-in-class=\"d-modal_in\" ng-style=\"{'z-index': 1050 + index*10, display: 'block'}\"><div class='d-modal__dialog'>" +
            "<div class='d-modal__header'>" +
                "<h5 class='d-modal__title'>Disconnectiong Records</h5>" +
            "</div>" +
            "<div class='d-modal__content'> " +
                 "<p class='d-modal__content-item'>Save changes?</p>" +
                 "<p class='d-modal__content-item'>This lifecircle has a field connected to the " +
                 "<a>Incident Record</a>. Are you sure you want to disconnect this record? </p>" +
                "<div class='d-checkbox d-checkbox_default'> " +
                     "<input class='d-checkbox__input' id='hg_hjdksjdnh' type='checkbox'/>" +
                     " <label class='d-checkbox__label' for='hg_hjdksjdnh'> " +
                        "<span class='d-checkbox__item'>Don’t show this tips again</span> " +
                     "</label> " +
                 "</div>" +
            "</div>" +
            "<div class='d-modal__footer'> " +
                 "<button class='d-button d-button_primary d-button_small' ng-click=\"save()\">Save</button> " +
                 "<button class='d-button d-button_secondary d-button_small' ng-click=\"close($event)\">Cancel</button> " +
            "</div>" +
        "</div>" +
        "</div>");
}]);
 /*global dplRangeSlider */
/*
 // To set an option for all sliders
 app.factory('uiSliderConfig', function ($log) {
 return {
 start: function (event, ui) { $log.info('Event: Slider start - set with uiSliderConfig', event); },
 stop: function (event, ui) { $log.info('Event: Slider stop - set with uiSliderCOnfig', event); },
 };
 });
 */

dplRangeSlider.controller('sliderDemoCtrl', function ($scope, $log) {

	// Slider options with event handlers
	$scope.slider = {
		'options': {
			start: function (event, ui) { $log.info('Event: Slider start - set with slider options', event); },
			stop: function (event, ui) { $log.info('Event: Slider stop - set with slider options', event); }
		}
	};

	$scope.demoVals = {
		sliderExample2: 14,
		sliderExample7: [10,33],
		sliderExample1: 50
	};

	$scope.disabledSlider = {
		options: {
			disabled: true,
			orientation: 'horizontal',
			min: 0,
			max: 255,
			range: 'min'
		}
	};
}); dplTagsInput.controller('demoControllerTags', function($scope) {
    $scope.tags = [
        { text: 'Tag1' },
        { text: 'Tag2' },
        { text: 'Tag3' }
    ];
}); /*global dplTimepicker */

dplTimepicker.controller('demoControllerTimepicker', function ($scope) {
    'use strict';

    $scope.mytime = new Date();

    $scope.hstep = 1;
    $scope.mstep = 5;

    $scope.options = {
        hstep: [1, 2, 3],
        mstep: [1, 5, 10, 15, 25, 30]
    };

    $scope.ismeridian = true;
    $scope.toggleMode = function () {
        $scope.ismeridian = !$scope.ismeridian;
    };

    $scope.update = function () {
        var d = new Date();
        d.setHours(14);
        d.setMinutes(0);
        $scope.mytime = d;
    };

    $scope.clear = function () {
        $scope.mytime = null;
    };
});