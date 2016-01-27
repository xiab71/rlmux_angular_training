(function ($) {
    $.fn.dButtonGroup = function (options) {
        var settings = $.extend({
            buttonGroupSelector : ".d-button-group",
            buttonGroupItemSelector : ".d-button-group__item",
            buttonGroupItemButtonSelector : ".d-button-group__item .d-button",
            mode : "mode",
            selectable : "selectable",
            unselectable : "unselectable",
            multiselectable : "multiselectable"
        }, options);
        $(document).on('click', settings.buttonGroupItemButtonSelector, function (e){
            var $this = $(this);
            var $buttonGroup = $this.parents(settings.buttonGroupSelector);
            var isSelectable = $buttonGroup.data(settings.mode) == settings.selectable;
            var isUnSelectable = $buttonGroup.data(settings.mode) == settings.unselectable;
            var isMultiSelectable = $buttonGroup.data(settings.mode) == settings.multiselectable;
            var isDisabled = $this.attr("disabled") !== undefined;
            var isSelected = $this.hasClass("is-checked");
            var clearItemSelection = function () {
                $buttonGroup.find(settings.buttonGroupItemButtonSelector).removeClass("is-checked");
            };
            var selectItem = function () {
                $this.addClass("is-checked");
            };
            var unSelectItem = function () {
                $this.removeClass("is-checked");
            };
            if (!isDisabled) {
                if (isSelectable) {
                    if (!isSelected) {
                        clearItemSelection();
                        selectItem();
                    }
                } else if (isUnSelectable) {
                    if (!isSelected) {
                        clearItemSelection();
                        selectItem();
                    } else {
                        unSelectItem();
                    }
                } else if (isMultiSelectable) {
                    if (!isSelected) {
                        selectItem();
                    } else {
                        unSelectItem();
                    }
                }
            }
        });
    };
    $(".d-button-group").dButtonGroup();
}(jQuery));
 var dpl_components = angular.module('dpl_components', []);

(function () {
    angular.module('dpl_components')
        .directive('dButtonGroup', ['$compile', function ($compile) {
            return {
                restrict: 'C',
                scope: {
                    model: "="
                },
                controller : function($scope, $element, $attrs){
                    this.getScopeValue = function (key) {
                        return $scope[key];
                    };
                    var getElementValue = function (el) {
                        return el.data("value") || el.attr("value");
                    };
                    this.updateModel = function () {
                        if ($attrs.mode == "selectable" || $attrs.mode == "unselectable") {
                            $scope.model = getElementValue($element.find(".is-checked"));
                            $scope.$apply();
                        } else if ($attrs.mode == "multiselectable") {
                            var arr = [];
                            $element.find(".is-checked").each(function() {
                                arr.push(getElementValue($(this)));
                            });
                            $scope.model = arr;
                            $scope.$apply();
                        }
                    };
                    this.updateButtons = function ($button) {
                        if ($scope.model !== undefined) {
                            if ($scope.model.constructor == Array) {
                                if ($attrs.mode == "multiselectable") {
                                    if ($scope.model.indexOf(getElementValue($button)) != -1) {
                                        $button.addClass("is-checked");
                                    } else {
                                        $button.removeClass("is-checked");
                                    }
                                }
                            } else  {
                                if ($attrs.mode == "selectable" || $attrs.mode == "unselectable") {
                                    if (getElementValue($button) == $scope.model) {
                                        $button.addClass("is-checked");
                                    } else {
                                        $button.removeClass("is-checked");
                                    }
                                }
                            }
                        }
                    }
                }
            };
        }])
        .directive('dButtonGroupItem', ['$compile', function ($compile) {
            return {
                restrict: 'C',
                scope: {},
                require : '^dButtonGroup',
                link: function (scope, element, attrs, ctrl, transclude) {
                    element.on("click", function() {
                        setTimeout(function() {
                            ctrl.updateModel();
                        }, 0);
                    });
                    scope.$watch(function(){return ctrl.getScopeValue("model");}, function () {
                        ctrl.updateButtons(element.find(".d-button"));
                    }, true);
                }
            };
        }]);
}()); (function ($) {
    $.fn.dAccordion = function (options) {
        var settings = $.extend({
                speed: 200,
                accordionItemSelector : ".d-accordion__item",
                accordionItemHeaderSelector: ".d-accordion__item-header",
                accordionItemContentSelector: ".d-accordion__item-content"
            }, options);
            // bind click on accordion header
            $(document).on('click', settings.accordionItemSelector, function (e){
                var $this = $(this);
                // check if accordion item isn't selected
                if (!$this.attr("checked")) {
                    $this.siblings().find(settings.accordionItemContentSelector).slideUp(settings.speed);
                    $this.find(settings.accordionItemContentSelector).slideDown(settings.speed);
                    setTimeout(function () {
                        $this.siblings().removeAttr("checked");
                        $this.attr("checked", "checked");
                    }, settings.speed);
                } else {
                    // close current item
                    $this.find(settings.accordionItemContentSelector).slideUp(settings.speed);
                    setTimeout(function () {
                        $this.removeAttr("checked");
                    }, settings.speed);
                }
            });
            // unbind click on accordion header childs
            $(document).on('click', settings.accordionItemHeaderSelector + " a", function (e){
                e.stopPropagation();
            });
            // unbind click on accordion content childs
            $(document).on('click', settings.accordionItemContentSelector, function (e){
                e.stopPropagation();
            });
            // trigger accordion item click on enter when focused
            $(document).keypress(function (e) {
                if (e.which == 13 && $(e.target).parents($(".d-accordion"))) {
                    $(e.target).trigger('click');
                }
            });
    };
}(jQuery));
$(".d-accordion").dAccordion(); var dplActionBlade = angular.module('dplActionBlade', ['ngAnimate', 'ui.bootstrap', 'template/action-blade.html']);

angular.module('template/action-blade.html', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put('template/action-blade.html',
        "<div class='modal-header'>" +
        "	<h3>{{data.header}}</h3>" +
        "</div>" +
        "<div class='modal-body'>" +
        "{{data.body}}" +
        "</div>"
    );
}]);
 angular.module('template/busy-loader.html', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put('template/busy-loader.html',
        "<div class='d-busy__wrapper'>" +
        "    <div class='d-busy__cover'>" +
        "        <ul class='d-loading'>" +
        "        <li class='d-loading__stick d-loading__stick_1'></li>" +
        "        <li class='d-loading__stick d-loading__stick_2'></li>" +
        "        <li class='d-loading__stick d-loading__stick_3'></li>" +
        "        <li class='d-loading__stick d-loading__stick_4'></li>" +
        "        <li class='d-loading__stick d-loading__stick_5'></li>" +
        "        <li class='d-loading__stick d-loading__stick_6'></li>" +
        "        <li class='d-loading__stick d-loading__stick_7'></li>" +
        "        <li class='d-loading__stick d-loading__stick_8'></li>" +
        "        <li class='d-loading__stick d-loading__stick_9'></li>" +
        "        <li class='d-loading__stick d-loading__stick_10'></li>" +
        "        <li class='d-loading__stick d-loading__stick_11'></li>" +
        "        <li class='d-loading__stick d-loading__stick_12'></li>" +
        "        </ul>" +
        "        <p class='d-busy__text'>{{$message}}</p>" +
        "    </div>" +
        "</div>" +
        "");
}]);
 (function () {
    angular.module('dpl_components')
        .directive('dDropdown', ['$compile', function ($compile) {
            return {
                restrict: 'C',
                scope: {
                    model: "="
                },
                controller : function($scope, $element, $attrs){
                    this.getScopeValue = function (key) {
                        return $scope[key];
                    };
                    var getElementValue = function (el) {
                        if (el.data("value") !== undefined) {
                            return el.data("value");
                        } else {
                            return el.attr("value");
                        }
                    };
                    this.updateModel = function () {
                        if ($attrs.mode == "selectable" || $attrs.mode == "unselectable") {
                            $scope.model = getElementValue($element.find(".d-dropdown__menu .is-checked"));
                            $scope.$apply();
                        } else if ($attrs.mode == "multiselectable") {
                            var arr = [];
                            $element.find(".d-dropdown__menu .is-checked").each(function() {
                                arr.push(getElementValue($(this)));
                            });
                            $scope.model = arr;
                            $scope.$apply();
                        }
                    };
                    this.updateOptions = function ($item) {
                        if ($scope.model !== undefined) {
                            if ($scope.model.constructor == Array) {
                                if ($attrs.mode == "multiselectable") {
                                    if ($scope.model.indexOf(getElementValue($item)) != -1) {
                                        $item.addClass("is-checked");
                                    } else {
                                        $item.removeClass("is-checked");
                                    }
                                }
                            } else  {
                                if ($attrs.mode == "selectable" || $attrs.mode == "unselectable") {
                                    if (getElementValue($item) == $scope.model) {
                                        $item.addClass("is-checked");
                                    } else {
                                        $item.removeClass("is-checked");
                                    }
                                }
                            }
                        }
                    };
                    this.updateTriggerValue = function () {

                        var dropdownTriggerValue = "";
                        var $dropdownTrigger = $element.find(".d-dropdown__trigger");

                        $element.find(".d-dropdown__menu-options-item-option.is-checked").each(function () {
                            var val = $(this).data("value");
                            var title = $(this).html();
                            dropdownTriggerValue +='<span data-value="'+val+'">' + title + '</span>';
                        });
                        if (dropdownTriggerValue == "") {
                            dropdownTriggerValue = $dropdownTrigger.data("placeholder");
                        }
                        $dropdownTrigger.html(dropdownTriggerValue);
                    };
                    this.checkInit = function () {
                        return $attrs.model !== undefined;
                    };
                    this.checkShowValue = function () {
                        return $element.find(".d-dropdown__trigger").data("showValue") !== undefined;
                    }
                },
                link: function (scope, element, attrs, ctrl, transclude) {
                    if (ctrl.checkInit()) {
                        if (ctrl.checkShowValue()) {
                            scope.$watch(function () {return ctrl.getScopeValue("model");}, function () {
                                setTimeout(function () {
                                    //console.log("update trigger value");
                                    ctrl.updateTriggerValue();
                                }, 0);
                            }, true);
                        }
                    }
                }
            };
        }])
        .directive('dDropdownMenuOptionsItemOption', ['$compile', function ($compile) {
            return {
                restrict: 'C',
                scope: {},
                require: "^dDropdown",
                link: function (scope, element, attrs, ctrl, transclude) {
                    if (ctrl.checkInit()) {
                        element.on("click", function() {
                            //console.log("click");
                            setTimeout(function() {
                                ctrl.updateModel();
                            }, 0);
                        });
                        scope.$watch(function(){return ctrl.getScopeValue("model");}, function () {
                            //console.log("options update");
                            ctrl.updateOptions(element);
                        }, true);
                    }
                }
            };
        }])
        .directive('dDropdownMenuActionsActionSelectAll', ['$compile', function ($compile) { // "select all" filter
            return {
                restrict: 'C',
                scope: {},
                require: "^dDropdown",
                link: function (scope, element, attrs, ctrl, transclude) {
                    if (ctrl.checkInit()) {
                        element.on("click", function() {
                            setTimeout(function() {
                                ctrl.updateModel();
                            }, 0);
                        });
                        scope.$watch(function(){return ctrl.getScopeValue("model");}, function () {
                            //console.log("options update");
                            ctrl.updateOptions(element);
                        }, true);
                    }
                }
            };
        }])
        .directive('dDropdownMenuActionsActionSelectNone', ['$compile', function ($compile) { // "select none" filter
            return {
                restrict: 'C',
                scope: {},
                require: "^dDropdown",
                link: function (scope, element, attrs, ctrl, transclude) {
                    if (ctrl.checkInit()) {
                        element.on("click", function() {
                            setTimeout(function() {
                                ctrl.updateModel();
                            }, 0);
                        });
                        scope.$watch(function(){return ctrl.getScopeValue("model");}, function () {
                            //console.log("options update");
                            ctrl.updateOptions(element);
                        }, true);
                    }
                }
            };
        }]);
}()); (function ($) {
    $.fn.dDropdown = function (options) {
        var getElementAttributeValue = function (element) {
            return element.data("value") || element.attr("value");
        };
        var settings = $.extend({
            dropdownSelector : ".d-dropdown",
            dropdownTriggerSelector : ".d-dropdown__trigger",
            dropdownOptionSelector : ".d-dropdown__menu-options-item-option",
            selectable : "selectable",
            unselectable : "unselectable",
            multiselectable : "multiselectable"
        }, options);
        // bind click on label to trigger dropdown's trigger
        $(document).on('click', ".d-dropdown__label", function (e){
            var $this = $(this);
            $this.parents(settings.dropdownSelector).find(settings.dropdownTriggerSelector).trigger("click");
        });
        // bind click on dropdown trigger
        $(document).on('click', settings.dropdownTriggerSelector, function (e){
            e.stopPropagation();
            var $this = $(this); // dropdown trigger
            if (!$this.attr("disabled")) { // check dropdown trigger not disabled
                if (!$this.hasClass("is-checked")) { // check dropdown trigger is not open
                    $(settings.dropdownSelector).removeClass("is-open");
                    $(settings.dropdownTriggerSelector).removeClass("is-checked");
                    $this.parents(settings.dropdownSelector).addClass("is-open");
                    $this.addClass("is-checked");
                } else {
                    $this.parents(settings.dropdownSelector).removeClass("is-open");
                    $this.removeClass("is-checked");
                }
                $this.parents(settings.dropdownSelector).find(".d-textfield__input").focus();
            }
        });
        // bind click on document to close dropdown on click outside of dropdown
        $(document).on('click', function (e){
            $(settings.dropdownSelector).removeClass("is-open");
            $(settings.dropdownTriggerSelector).removeClass("is-checked");
        });
        $(document).on('click', '.d-dropdown', function (e){
            e.stopPropagation();
        });
        // bind click on escape button to close dropdown
        $(document).keyup(function(e) {
            if (e.keyCode == 27) { // escape
                $(settings.dropdownSelector).removeClass("is-open");
                $(settings.dropdownTriggerSelector).removeClass("is-checked");
            }
        });

        var updateTriggerValue = function ($dropdown) {
            var dropdownTriggerValue = "";
            var $dropdownTrigger = $dropdown.find(settings.dropdownTriggerSelector);
            if ($dropdownTrigger.data("showValue") !== undefined) {
                $dropdown.find(settings.dropdownOptionSelector + ".is-checked").each(function () {
                    var val = $(this).data("value");
                    var title = $(this).text();
                    dropdownTriggerValue +='<span data-value="'+val+'">' + title + '</span>';
                });
                if (dropdownTriggerValue == "") {
                    dropdownTriggerValue = $dropdownTrigger.data("placeholder");
                } else {

                }
                $dropdownTrigger.html(dropdownTriggerValue);
            }

        };
        var unSelectItems = function ($dropdown) {
            $dropdown.find(settings.dropdownOptionSelector).removeClass("is-checked");
        };
        var selectItems = function ($dropdown) {
            $dropdown.find(settings.dropdownOptionSelector).addClass("is-checked");
        };
        var selectItem = function ($item) {
            $item.addClass("is-checked");
        };
        var unSelectItem = function ($item) {
            $item.removeClass("is-checked");
        };


        $(document).on('click', '.d-dropdown__menu-options-item-option', function (e) {
            var $this = $(this);
            var $dropdown = $this.parents(settings.dropdownSelector);
            var isSelectable = $dropdown.data("mode") == settings.selectable;
            var isUnSelectable = $dropdown.data("mode") == settings.unselectable;
            var isMultiSelectable = $dropdown.data("mode") == settings.multiselectable;
            var isDisabled = $this.attr("disabled") !== undefined;
            var isSelected = $this.hasClass("is-checked");
            if (!isDisabled) {
                if (isSelectable) {
                    if (!isSelected) {
                        unSelectItems($dropdown);
                        selectItem($this);
                    }
                    $this.parents(".d-dropdown").removeClass("is-open");
                    $this.parents(".d-dropdown").find(".d-dropdown__trigger").removeClass("is-checked");
                } else if (isUnSelectable) {
                    if (!isSelected) {
                        unSelectItems($dropdown);
                        selectItem($this);
                    } else {
                        unSelectItem($this);
                    }
                    $this.parents(".d-dropdown").removeClass("is-open");
                    $this.parents(".d-dropdown").find(".d-dropdown__trigger").removeClass("is-checked");
                } else if (isMultiSelectable) {
                    if (!isSelected) {
                        selectItem($this);
                    } else {
                        unSelectItem($this);
                    }
                }
            }
            updateTriggerValue($dropdown);
        });
        $(document).on('click', '.d-dropdown__menu-actions-action_select-all', function (e) {
            var $this = $(this);
            var $dropdown = $this.parents(settings.dropdownSelector);
            var isMultiSelectable = $dropdown.data("mode") == settings.multiselectable;
            if (isMultiSelectable) {
                selectItems($dropdown);
                updateTriggerValue($dropdown);
            }  else {
                console.log("error log: all dropdown options can't be selected");
            }
        });
        $(document).on('click', '.d-dropdown__menu-actions-action_select-none', function (e) {
            var $this = $(this);
            var $dropdown = $this.parents(settings.dropdownSelector);
            var isMultiSelectable = $dropdown.data("mode") == settings.multiselectable;
            if (isUnSelectable || isMultiSelectable) {
                unSelectItems($dropdown);
                updateTriggerValue($dropdown);
            } else {
                console.log("error log: dropdown options can't be unselected");
            }
        });
    };
    $("d-dropdown").dDropdown();
}(jQuery)); var dplModal = angular.module('dplModal', ['ngAnimate', 'ui.bootstrap', 'template/modal.html']);


angular.module('template/modal.html', []).run(['$templateCache', function ($templateCache) {
    'use strict';

    //TODO: add differernts d-modal__header

    $templateCache.put('template/modal.html',
        "<div class='d-modal' ng-click='close($event)' modal-render='{{$isRendered}}' tabindex='-1' role='dialog' ng-class=\"{'d-modal_in': animate}\" modal-animation-class='d-modal_fade' modal-in-class='d-modal_in' ng-style=\"{'z-index': 1050 + index*10, display: 'block'}\">" +
        "<div class='d-modal__dialog'>" +
        "<div class='d-modal__header'></div>" +
        "<div class='d-modal__content'></div>" +
        "<div class='d-modal__footer'> " +
        "</div>" +
        "</div>" +
        "</div>");
}]); ;
(function (window) {
    'use strict';
    var Ripple = Ripple || {},
        $$ = document.querySelectorAll.bind(document);

    function isWindow(obj) {
        return obj !== null && obj === obj.window;
    }

    function getWindow(elem) {
        return isWindow(elem) ? elem : elem.nodeType === 9 && elem.defaultView;
    }

    function offset(elem) {
        var docElem, win,
            box = {
                top: 0,
                left: 0
            },
            doc = elem && elem.ownerDocument;

        docElem = doc.documentElement;

        if (typeof elem.getBoundingClientRect !== typeof undefined) {
            box = elem.getBoundingClientRect();
        }
        win = getWindow(doc);
        return {
            top: box.top + win.pageYOffset - docElem.clientTop,
            left: box.left + win.pageXOffset - docElem.clientLeft
        };
    }

    function convertStyle(obj) {
        var style = '';
        for (var a in obj) {
            if (obj.hasOwnProperty(a)) {
                style += (a + ':' + obj[a] + ';');
            }
        }
        return style;
    }

    var Effect = {
        duration: 900,
        show: function (e, element) {
            if (e.button === 2) {
                return false;
            }
            var el = element || this,
                ripple = document.createElement('div');
            ripple.className = 'd-ripple__effect';
            el.appendChild(ripple);

            // Get click coordinate and element witdh
            var pos = offset(el),
                relativeY = (e.pageY - pos.top),
                relativeX = (e.pageX - pos.left),
                scale = 'scale(' + ((el.clientWidth / 100) * 10) + ')';

            // Support for touch devices
            if ('touches' in e) {
                relativeY = (e.touches[0].pageY - pos.top);
                relativeX = (e.touches[0].pageX - pos.left);
            }

            // Attach data to element
            ripple.setAttribute('data-hold', Date.now());
            ripple.setAttribute('data-scale', scale);
            ripple.setAttribute('data-x', relativeX);
            ripple.setAttribute('data-y', relativeY);

            // Set ripple position
            var rippleStyle = {
                top: relativeY + 'px',
                left: relativeX + 'px'
            };

            ripple.className = ripple.className + ' ripple-notransition';
            ripple.setAttribute('style', convertStyle(rippleStyle));
            ripple.className = ripple.className.replace('ripple-notransition', '');

            // Scale the ripple
            rippleStyle['-webkit-transform'] = scale;
            rippleStyle['-moz-transform'] = scale;
            rippleStyle['-ms-transform'] = scale;
            rippleStyle['-o-transform'] = scale;
            rippleStyle.transform = scale;
            rippleStyle.opacity = '1';

            rippleStyle['-webkit-transition-duration'] = Effect.duration + 'ms';
            rippleStyle['-moz-transition-duration'] = Effect.duration + 'ms';
            rippleStyle['-o-transition-duration'] = Effect.duration + 'ms';
            rippleStyle['transition-duration'] = Effect.duration + 'ms';

            rippleStyle['-webkit-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            rippleStyle['-moz-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            rippleStyle['-o-transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            rippleStyle['transition-timing-function'] = 'cubic-bezier(0.250, 0.460, 0.450, 0.940)';
            ripple.setAttribute('style', convertStyle(rippleStyle));
        },

        hide: function (e) {
            TouchHandler.touchup(e);
            var el = this,
                width = el.clientWidth * 1.4,
                ripple = null,
                ripples = el.getElementsByClassName('d-ripple__effect');

            if (ripples.length > 0) {
                ripple = ripples[ripples.length - 1];
            } else {
                return false;
            }

            var relativeX = ripple.getAttribute('data-x'),
                relativeY = ripple.getAttribute('data-y'),
                scale = ripple.getAttribute('data-scale'),
                diff = Date.now() - Number(ripple.getAttribute('data-hold')),
                delay = 350 - diff;

            if (delay < 0) {
                delay = 0;
            }

            setTimeout(function () {
                var style = {
                    top: relativeY + 'px',
                    left: relativeX + 'px',
                    opacity: '0',

                    '-webkit-transition-duration': Effect.duration + 'ms',
                    '-moz-transition-duration': Effect.duration + 'ms',
                    '-o-transition-duration': Effect.duration + 'ms',
                    'transition-duration': Effect.duration + 'ms',
                    '-webkit-transform': scale,
                    '-moz-transform': scale,
                    '-ms-transform': scale,
                    '-o-transform': scale,
                    transform: scale
                };

                ripple.setAttribute('style', convertStyle(style));
                setTimeout(function () {
                    try {
                        el.removeChild(ripple);
                    } catch (e) {
                        return false;
                    }
                }, Effect.duration);
            }, delay);
        },

        // Little hack to make <input> can perform ripple effect
        wrapInput: function (elements) {
            for (var a = 0; a < elements.length; a++) {
                var el = elements[a];
                if (el.tagName.toLowerCase() === 'input') {
                    var parent = el.parentNode;
                    // If input already have parent just pass through
                    if (parent.tagName.toLowerCase() === 'i' && parent.className.indexOf('d-ripple') !== -1) {
                        continue;
                    }

                    // Put element class and style to the specified parent
                    var wrapper = document.createElement('i');
                    wrapper.className = el.className + ' ripple-input-wrapper';

                    var elementStyle = el.getAttribute('style');

                    if (!elementStyle) {
                        elementStyle = '';
                    }

                    wrapper.setAttribute('style', elementStyle);

                    el.className = 'ripple-button-input';
                    el.removeAttribute('style');

                    // Put element as child
                    parent.replaceChild(wrapper, el);
                    wrapper.appendChild(el);
                }
            }
        }
    };


    /**
     * Disable mousedown event for 500ms during and after touch
     */
    var TouchHandler = {
        touches: 0,
        allowEvent: function (e) {
            var allow = true;

            if (e.type === 'touchstart') {
                TouchHandler.touches += 1; //push
            } else if (e.type === 'touchend' || e.type === 'touchcancel') {
                setTimeout(function () {
                    if (TouchHandler.touches > 0) {
                        TouchHandler.touches -= 1; //pop after 500ms
                    }
                }, 500);
            } else if (e.type === 'mousedown' && TouchHandler.touches > 0) {
                allow = false;
            }

            return allow;
        },
        touchup: function (e) {
            TouchHandler.allowEvent(e);
        }
    };


    /**
     * Delegated click handler for .d-ripple element.
     * returns null when .d-ripple element not in "click tree"
     */
    function getRippleEffectElement(e) {
        if (TouchHandler.allowEvent(e) === false) {
            return null;
        }
        var element = null,
            target = e.target || e.srcElement;

        while (target.parentElement !== null) {
            if (!(target instanceof SVGElement) && target.className.indexOf('d-ripple') !== -1) {
                element = target;
                break;
            } else if (target.classList.contains('d-ripple')) {
                element = target;
                break;
            }
            target = target.parentElement;
        }
        return element;
    }

    /**
     * Bubble the click and show effect if .d-ripple elem was found
     */
    function showEffect(e) {
        var element = getRippleEffectElement(e);
        if (element !== null) {
            Effect.show(e, element);
            if ('ontouchstart' in window) {
                element.addEventListener('touchend', Effect.hide, false);
                element.addEventListener('touchcancel', Effect.hide, false);
            }
            element.addEventListener('mouseup', Effect.hide, false);
            element.addEventListener('mouseleave', Effect.hide, false);
        }
    }

    Ripple.displayEffect = function (options) {
        options = options || {};

        if ('duration' in options) {
            Effect.duration = options.duration;
        }

        //Wrap input inside <i> tag
        Effect.wrapInput($$('.d-ripple'));

        if ('ontouchstart' in window) {
            document.body.addEventListener('touchstart', showEffect, false);
        }

        document.body.addEventListener('mousedown', showEffect, false);
    };

    /**
     * Attach Ripple to an input element (or any element which doesn't
     * bubble mouseup/mousedown events).
     *   Intended to be used with dynamically loaded forms/inputs, or
     * where the user doesn't want a delegated click handler.
     */
    Ripple.attach = function (element) {
        //FUTURE: automatically add Ripple classes and allow users
        // to specify them with an options param? Eg. light/classic/button
        if (element.tagName.toLowerCase() === 'input') {
            Effect.wrapInput([element]);
            element = element.parentElement;
        }

        if ('ontouchstart' in window) {
            element.addEventListener('touchstart', showEffect, false);
        }

        element.addEventListener('mousedown', showEffect, false);
    };

    window.Ripple = Ripple;

    document.addEventListener('DOMContentLoaded', function () {
        Ripple.displayEffect();
    }, false);

})(window);
 /*
 jQuery UI Slider plugin wrapper
*/
var dplRangeSlider = angular.module('dplRangeSlider', ['ui.slider']);
 'use strict';

var dplSplitter = angular.module('dplSplitter', ['ui.layout']);

/**
 * UI.Layout - http://angular-ui.github.io/ui-layout/
 */
angular.module('ui.layout', [])
  .controller('uiLayoutCtrl', ['$scope', '$attrs', '$element', '$timeout', '$window', 'LayoutContainer', function uiLayoutCtrl($scope, $attrs, $element, $timeout, $window, LayoutContainer) {
    var ctrl = this;
    var opts = angular.extend({}, $scope.$eval($attrs.uiLayout), $scope.$eval($attrs.options));
    var numOfSplitbars = 0;
    //var cache = {};
    var animationFrameRequested;
    var lastPos;

    // regex to verify size is properly set to pixels or percent
    var sizePattern = /\d+\s*(px|%)\s*$/i;

    ctrl.containers = [];
    ctrl.movingSplitbar = null;
    ctrl.bounds = $element[0].getBoundingClientRect();
    ctrl.isUsingColumnFlow = opts.flow === 'column';
    ctrl.sizeProperties = !ctrl.isUsingColumnFlow ?
    { sizeProperty: 'height', offsetSize: 'offsetHeight', offsetPos: 'top', flowProperty: 'top', oppositeFlowProperty: 'bottom', mouseProperty: 'clientY', flowPropertyPosition: 'y' } :
    { sizeProperty: 'width', offsetSize: 'offsetWidth', offsetPos: 'left', flowProperty: 'left', oppositeFlowProperty: 'right', mouseProperty: 'clientX', flowPropertyPosition: 'x' };

    $element
      // Force the layout to fill the parent space
      // fix no height layout...
      .addClass('stretch')
      // set the layout css class
      .addClass('ui-layout-' + (opts.flow || 'row'));

    if (opts.disableToggle) {
      $element.addClass('no-toggle');
    }
    if (opts.disableMobileToggle) {
      $element.addClass('no-mobile-toggle');
    }

    // Initial global size definition
    opts.sizes = opts.sizes || [];
    opts.maxSizes = opts.maxSizes || [];
    opts.minSizes = opts.minSizes || [];
    opts.dividerSize = opts.dividerSize || 10; //default divider size set to 10
    opts.collapsed = opts.collapsed || [];
    ctrl.opts = opts;

    $scope.updateDisplay = function() {
      ctrl.updateDisplay();
    };

    var debounceEvent;
    function draw() {
      var position = ctrl.sizeProperties.flowProperty;
      var dividerSize = parseInt(opts.dividerSize);
      var elementSize = $element[0][ctrl.sizeProperties.offsetSize];

      if(ctrl.movingSplitbar !== null) {
        var splitbarIndex = ctrl.containers.indexOf(ctrl.movingSplitbar);
        var nextSplitbarIndex = (splitbarIndex + 2) < ctrl.containers.length ? splitbarIndex + 2 : null;

        if(splitbarIndex > -1) {
          var processedContainers = ctrl.processSplitbar(ctrl.containers[splitbarIndex]);
          var beforeContainer = processedContainers.beforeContainer;
          var afterContainer = processedContainers.afterContainer;

          if(!beforeContainer.collapsed && !afterContainer.collapsed) {
            // calculate container positons
            var difference = ctrl.movingSplitbar[position] - lastPos;
            var newPosition = ctrl.movingSplitbar[position] - difference;

            // Keep the bar in the window (no left/top 100%)
            newPosition = Math.min(elementSize-dividerSize, newPosition);

            // Keep the bar from going past the previous element min/max values
            if(angular.isNumber(beforeContainer.beforeMinValue) && newPosition < beforeContainer.beforeMinValue) newPosition = beforeContainer.beforeMinValue;
            if(angular.isNumber(beforeContainer.beforeMaxValue) && newPosition > beforeContainer.beforeMaxValue) newPosition = beforeContainer.beforeMaxValue;

            // Keep the bar from going past the next element min/max values
            if(afterContainer !== null &&
               angular.isNumber(afterContainer.afterMinValue) &&
               newPosition > (afterContainer.afterMinValue - dividerSize))
                newPosition = afterContainer.afterMinValue - dividerSize;
            if(afterContainer !== null && angular.isNumber(afterContainer.afterMaxValue) && newPosition < afterContainer.afterMaxValue) newPosition = afterContainer.afterMaxValue;

            // resize the before container
            beforeContainer.size = newPosition - beforeContainer[position];

            // update after container position
            var oldAfterContainerPosition = afterContainer[position];
            afterContainer[position] = newPosition + dividerSize;

            //update after container size if the position has changed
            if(afterContainer[position] != oldAfterContainerPosition)
              afterContainer.size = (nextSplitbarIndex !== null) ? (oldAfterContainerPosition + afterContainer.size) - (newPosition + dividerSize) : elementSize - (newPosition + dividerSize);

            // move the splitbar
            ctrl.movingSplitbar[position] = newPosition;

            // broadcast an event that resize happened (debounced to 50ms)
            if(debounceEvent) $timeout.cancel(debounceEvent);
            debounceEvent = $timeout(function() {
                $scope.$broadcast('ui.layout.resize', beforeContainer, afterContainer);
                debounceEvent = null;
            }, 50);
          }
        }
      }

      //Enable a new animation frame
      animationFrameRequested = null;
    }

    function offset(element) {
      var rawDomNode = element[0];
      var body = document.documentElement || document.body;
      var scrollX = window.pageXOffset || body.scrollLeft;
      var scrollY = window.pageYOffset || body.scrollTop;
      var clientRect = rawDomNode.getBoundingClientRect();
      var x = clientRect.left + scrollX;
      var y = clientRect.top + scrollY;
      return { left: x, top: y };
    }

    /**
     * Returns the current value for an option
     * @param  option   The option to get the value for
     * @return The value of the option. Returns null if there was no option set.
     */
    function optionValue(option) {
      if(typeof option == 'number' || typeof option == 'string' && option.match(sizePattern)) {
        return option;
      } else {
        return null;
      }
    }

    //================================================================================
    // Public Controller Functions
    //================================================================================
    ctrl.mouseUpHandler = function(event) {
      if(ctrl.movingSplitbar !== null) {
        ctrl.movingSplitbar = null;
      }
      return event;
    };

    ctrl.mouseMoveHandler = function(mouseEvent) {
      var mousePos = mouseEvent[ctrl.sizeProperties.mouseProperty] ||
        (mouseEvent.originalEvent && mouseEvent.originalEvent[ctrl.sizeProperties.mouseProperty]) ||
        // jQuery does touches weird, see #82
        ($window.jQuery ?
          (mouseEvent.originalEvent ? mouseEvent.originalEvent.targetTouches[0][ctrl.sizeProperties.mouseProperty] : 0) :
          (mouseEvent.targetTouches ? mouseEvent.targetTouches[0][ctrl.sizeProperties.mouseProperty] : 0));

      lastPos = mousePos - offset($element)[ctrl.sizeProperties.offsetPos];

      //Cancel previous rAF call
      if(animationFrameRequested) {
        window.cancelAnimationFrame(animationFrameRequested);
      }

      //TODO: cache layout values

      //Animate the page outside the event
      animationFrameRequested = window.requestAnimationFrame(draw);
    };

    /**
     * Returns the min and max values of the ctrl.containers on each side of the container submitted
     * @param container
     * @returns {*}
     */
    ctrl.processSplitbar = function(container) {
      var index = ctrl.containers.indexOf(container);

      var setValues = function(container) {
        var start = container[ctrl.sizeProperties.flowProperty];
        var end = container[ctrl.sizeProperties.flowProperty] + container.size;

        container.beforeMinValue = angular.isNumber(container.minSize) ? start + container.minSize : start;
        container.beforeMaxValue = angular.isNumber(container.maxSize) ? start + container.maxSize : null;

        container.afterMinValue = angular.isNumber(container.minSize) ? end - container.minSize : end;
        container.afterMaxValue = angular.isNumber(container.maxSize) ? end - container.maxSize : null;
      };

      //verify the container was found in the list
      if(index > -1) {
        var beforeContainer = (index > 0) ? ctrl.containers[index-1] : null;
        var afterContainer = ((index+1) <= ctrl.containers.length) ? ctrl.containers[index+1] : null;

        if(beforeContainer !== null) setValues(beforeContainer);
        if(afterContainer !== null) setValues(afterContainer);

        return {
          beforeContainer: beforeContainer,
          afterContainer: afterContainer
        };
      }

      return null;
    };

    /**
     * Checks if a string has a percent symbol in it.
     * @param num
     * @returns {boolean}
     */
    ctrl.isPercent = function(num) {
      return (num && angular.isString(num) && num.indexOf('%') > -1) ? true : false;
    };

    /**
     * Converts a number to pixels from percent.
     * @param size
     * @param parentSize
     * @returns {number}
     */
    ctrl.convertToPixels = function(size, parentSize) {
      return Math.floor(parentSize * (parseInt(size) / 100));
    };

    /**
     * Sets the default size for each container.
     */
    ctrl.updateDisplay = function() {
      var c, i;
      var dividerSize = parseInt(opts.dividerSize);
      var elementSize = $element[0].getBoundingClientRect()[ctrl.sizeProperties.sizeProperty];
      var availableSize = elementSize - (dividerSize * numOfSplitbars);
      var originalSize = availableSize;
      var usedSpace = 0;
      var numOfAutoContainers = 0;

      if(ctrl.containers.length > 0 && $element.children().length > 0) {

        // calculate sizing for ctrl.containers
        for(i=0; i < ctrl.containers.length; i++) {
          if(!LayoutContainer.isSplitbar(ctrl.containers[i])) {

            var child = ctrl.containers[i].element;
            opts.maxSizes[i] = child.attr('max-size') || child.attr('data-max-size') || opts.maxSizes[i] || null;
            opts.minSizes[i] = child.attr('min-size') || child.attr('data-min-size') || opts.minSizes[i] || null;
            opts.sizes[i] = child.attr('size') || child.attr('data-size') || opts.sizes[i] || 'auto';
            //opts.collapsed[i] = child.attr('collapsed') || opts.collapsed[i] || false;


            opts.sizes[i] = optionValue(opts.sizes[i]) || 'auto';
            opts.minSizes[i] = optionValue(opts.minSizes[i]);
            opts.maxSizes[i] = optionValue(opts.maxSizes[i]);

            if(opts.sizes[i] != 'auto') {
              if(ctrl.isPercent(opts.sizes[i])) {
                opts.sizes[i] = ctrl.convertToPixels(opts.sizes[i], originalSize);
              } else {
                opts.sizes[i] = parseInt(opts.sizes[i]);
              }
            }

            if(opts.minSizes[i] != null) {
              if(ctrl.isPercent(opts.minSizes[i])) {
                opts.minSizes[i] = ctrl.convertToPixels(opts.minSizes[i], originalSize);
              } else {
                opts.minSizes[i] = parseInt(opts.minSizes[i]);
              }

              // don't allow the container size to initialize smaller than the minSize
              if(opts.sizes[i] < opts.minSizes[i]) opts.sizes[i] = opts.minSizes[i];
            }

            if(opts.maxSizes[i] != null) {
              if(ctrl.isPercent(opts.maxSizes[i])) {
                opts.maxSizes[i] = ctrl.convertToPixels(opts.maxSizes[i], originalSize);
              } else {
                opts.maxSizes[i] = parseInt(opts.maxSizes[i]);
              }

              // don't allow the container size to intialize larger than the maxSize
              if(opts.sizes[i] > opts.maxSizes[i]) opts.sizes[i] = opts.maxSizes[i];
            }

            if(opts.sizes[i] === 'auto') {
              numOfAutoContainers++;
            } else {
              availableSize -= opts.sizes[i];
            }
          }
        }

        // set the sizing for the ctrl.containers
        var autoSize = Math.floor(availableSize / numOfAutoContainers);
        for(i=0; i < ctrl.containers.length; i++) {
          c = ctrl.containers[i];
          c[ctrl.sizeProperties.flowProperty] = usedSpace;
          c.maxSize = opts.maxSizes[i];
          c.minSize = opts.minSizes[i];

          c.collapsed = c.collapsed || opts.collapsed[i];

          //TODO: adjust size if autosize is greater than the maxSize

          if(!LayoutContainer.isSplitbar(c)) {
            var newSize = (opts.sizes[i] === 'auto') ? autoSize : opts.sizes[i];

            c.size = (newSize !== null) ? newSize : autoSize;
          } else {
            c.size = dividerSize;
          }

          usedSpace += c.size;
        }
      }
    };

    /**
     * Adds a container to the list of layout ctrl.containers.
     * @param container The container to add
     */
    ctrl.addContainer = function(container) {
      var index = ctrl.indexOfElement(container.element);
      if(!angular.isDefined(index) || index < 0 || ctrl.containers.length < index) {
        console.error("Invalid index to add container; i=" + index + ", len=", ctrl.containers.length);
        return;
      }

      if(LayoutContainer.isSplitbar(container)) {
        numOfSplitbars++;
      }

      ctrl.containers.splice(index, 0, container);

      ctrl.updateDisplay();
    };

    /**
     * Remove a container from the list of layout ctrl.containers.
     * @param  container
     */
    ctrl.removeContainer = function(container) {
      var index = ctrl.containers.indexOf(container);
      if(index >= 0) {
        if(!LayoutContainer.isSplitbar(container)) {
          if(ctrl.containers.length > 2) {
            // Assume there's a sidebar between each container
            // We need to remove this container and the sidebar next to it
            if(index == ctrl.containers.length - 1) {
              // We're removing the last element, the side bar is on the left
              ctrl.containers[index-1].element.remove();
            } else {
              // The side bar is on the right
              ctrl.containers[index+1].element.remove();
            }
          }
        } else {
          // fix for potentially collapsed containers
          ctrl.containers[index - 1].collapsed = false;
          numOfSplitbars--;
        }

        // Need to re-check the index, as a side bar may have been removed
        var newIndex = ctrl.containers.indexOf(container);
        if(newIndex >= 0) {
          ctrl.containers.splice(newIndex, 1);
        }
        ctrl.updateDisplay();
      } else {
        console.error("removeContainer for container that did not exist!");
      }
    };

    /**
     * Returns an array of layout ctrl.containers.
     * @returns {Array}
     */
    ctrl.getContainers = function() {
      return ctrl.containers;
    };

    /**
     * Toggles the container before the provided splitbar
     * @param splitbar
     * @returns {boolean|*|Array}
     */
    ctrl.toggleBefore = function(splitbar) {
      var index = ctrl.containers.indexOf(splitbar) - 1;

      var c = ctrl.containers[index];
      c.collapsed = !ctrl.containers[index].collapsed;

      var nextSplitbar = ctrl.containers[index+1];
      var nextContainer = ctrl.containers[index+2];

      $scope.$apply(function() {
        if(c.collapsed) {
          c.actualSize = c.size;
          c.size = 0;

          if(nextSplitbar) nextSplitbar[ctrl.sizeProperties.flowProperty] -= c.actualSize;
          if(nextContainer) {
            nextContainer[ctrl.sizeProperties.flowProperty] -= c.actualSize;
            nextContainer.size += c.actualSize;
          }

        } else {
          c.size = c.actualSize;

          if(nextSplitbar) nextSplitbar[ctrl.sizeProperties.flowProperty] += c.actualSize;
          if(nextContainer) {
            nextContainer[ctrl.sizeProperties.flowProperty] += c.actualSize;
            nextContainer.size -= c.actualSize;
          }
        }
      });
      $scope.$broadcast('ui.layout.toggle', c);

      return c.collapsed;
    };

    /**
     * Toggles the container after the provided splitbar
     * @param splitbar
     * @returns {boolean|*|Array}
     */
    ctrl.toggleAfter = function(splitbar) {
      var index = ctrl.containers.indexOf(splitbar) + 1;
      var c = ctrl.containers[index];
      var prevSplitbar = ctrl.containers[index-1];
      var prevContainer = ctrl.containers[index-2];
      var isLastContainer = index === (ctrl.containers.length - 1);
      var endDiff;

      ctrl.bounds = $element[0].getBoundingClientRect();

      c.collapsed = !ctrl.containers[index].collapsed;

      $scope.$apply(function() {
        if(c.collapsed) {
          c.actualSize = c.size;
          c.size = 0;

          // adds additional space so the splitbar moves to the very end of the container
          // to offset the lost space when converting from percents to pixels
          endDiff = (isLastContainer) ? ctrl.bounds[ctrl.sizeProperties.sizeProperty] - c[ctrl.sizeProperties.flowProperty] - c.actualSize : 0;

          if(prevSplitbar) prevSplitbar[ctrl.sizeProperties.flowProperty] += (c.actualSize + endDiff);
          if(prevContainer) prevContainer.size += (c.actualSize + endDiff);

        } else {
          c.size = c.actualSize;

          // adds additional space so the splitbar moves back to the proper position
          // to offset the additional space added when collapsing
          endDiff = (isLastContainer) ? ctrl.bounds[ctrl.sizeProperties.sizeProperty] - c[ctrl.sizeProperties.flowProperty] - c.actualSize : 0;

          if(prevSplitbar) prevSplitbar[ctrl.sizeProperties.flowProperty] -= (c.actualSize + endDiff);
          if(prevContainer) prevContainer.size -= (c.actualSize + endDiff);
        }
      });
      $scope.$broadcast('ui.layout.toggle', c);

      return c.collapsed;
    };

    /**
     * Returns the container object of the splitbar that is before the one passed in.
     * @param currentSplitbar
     */
    ctrl.getPreviousSplitbarContainer = function(currentSplitbar) {
      if(LayoutContainer.isSplitbar(currentSplitbar)) {
        var currentSplitbarIndex = ctrl.containers.indexOf(currentSplitbar);
        var previousSplitbarIndex = currentSplitbarIndex - 2;
        if(previousSplitbarIndex >= 0) {
          return ctrl.containers[previousSplitbarIndex];
        }
        return null;
      }
      return null;
    };

    /**
     * Returns the container object of the splitbar that is after the one passed in.
     * @param currentSplitbar
     */
    ctrl.getNextSplitbarContainer = function(currentSplitbar) {
      if(LayoutContainer.isSplitbar(currentSplitbar)) {
        var currentSplitbarIndex = ctrl.containers.indexOf(currentSplitbar);
        var nextSplitbarIndex = currentSplitbarIndex + 2;
        if(currentSplitbarIndex > 0 && nextSplitbarIndex < ctrl.containers.length) {
          return ctrl.containers[nextSplitbarIndex];
        }
        return null;
      }
      return null;
    };

    /**
     * Checks whether the container before this one is a split bar
     * @param  {container}  container The container to check
     * @return {Boolean}    true if the element before is a splitbar, false otherwise
     */
    ctrl.hasSplitbarBefore = function(container) {
      var index = ctrl.containers.indexOf(container);
      if(1 <= index) {
        return LayoutContainer.isSplitbar(ctrl.containers[index-1]);
      }

      return false;
    };

    /**
     * Checks whether the container after this one is a split bar
     * @param  {container}  container The container to check
     * @return {Boolean}    true if the element after is a splitbar, false otherwise
     */
    ctrl.hasSplitbarAfter = function(container) {
      var index = ctrl.containers.indexOf(container);
      if(index < ctrl.containers.length - 1) {
        return LayoutContainer.isSplitbar(ctrl.containers[index+1]);
      }

      return false;
    };

    /**
     * Checks whether the passed in element is a ui-layout type element.
     * @param  {element}  element The element to check
     * @return {Boolean}          true if the element is a layout element, false otherwise.
     */
    ctrl.isLayoutElement = function(element) {
      return element.hasAttribute('ui-layout-container') || element.hasAttribute('ui-splitbar') || element.nodeName === 'UI-LAYOUT-CONTAINER';
    };

    /**
     * Retrieve the index of an element within it's parents context.
     * @param  {element} element The element to get the index of
     * @return {int}             The index of the element within it's parent
     */
    ctrl.indexOfElement = function(element) {
      var parent = element.parent();
      var children = parent.children();
      var containerIndex = 0;
      for(var i = 0; i < children.length; i++) {
        var child = children[i];
        if(ctrl.isLayoutElement(child)) {
          if(element[0] == children[i]) {
            return containerIndex;
          }
          containerIndex++;
        }
      }
      return -1;
    };

    return ctrl;
  }])

  .directive('uiLayout', ['$window', function($window) {
    return {
      restrict: 'AE',
      controller: 'uiLayoutCtrl',
      link: function(scope, element, attrs, ctrl) {
        scope.$watch(function () {
          return element[0][ctrl.sizeProperties.offsetSize];
        }, function() {
          ctrl.updateDisplay();
        });

        function onResize() {
          scope.$evalAsync(function() {
            ctrl.updateDisplay();
          });
        }

        angular.element($window).bind('resize', onResize);

        scope.$on('$destroy', function() {
          angular.element($window).unbind('resize', onResize);
        });
      }
    };
  }])

  .directive('uiSplitbar', ['LayoutContainer', function(LayoutContainer) {
    // Get all the page.
    var htmlElement = angular.element(document.body.parentElement);

    return {
      restrict: 'EAC',
      require: '^uiLayout',
      scope: {},

      link: function(scope, element, attrs, ctrl) {
        if(!element.hasClass('stretch')) element.addClass('stretch');
        if(!element.hasClass('ui-splitbar')) element.addClass('ui-splitbar');

        scope.splitbar = LayoutContainer.Splitbar();
        scope.splitbar.element = element;

        //icon <a> elements
        var prevButton = angular.element(element.children()[0]);
        var afterButton = angular.element(element.children()[2]);

	    var splitterMark = angular.element(element.children()[1]);
        //icon <span> elements
        var prevIcon = angular.element(prevButton.children()[0]);
        var afterIcon = angular.element(afterButton.children()[0]);

        //icon classes

	    var iconLeft = 'ui-splitbar-icon-left';
		var iconRight = 'ui-splitbar-icon-right';
		var iconUp = 'ui-splitbar-icon-up';
        var iconDown = 'ui-splitbar-icon-down';

        var prevIconClass = ctrl.isUsingColumnFlow ? iconLeft : iconUp;
        var afterIconClass = ctrl.isUsingColumnFlow ? iconRight : iconDown;

        prevIcon.addClass(prevIconClass);
        afterIcon.addClass(afterIconClass);

        prevButton.on('click', function() {
          var prevSplitbarBeforeButton, prevSplitbarAfterButton;
          var result = ctrl.toggleBefore(scope.splitbar);
          var previousSplitbar = ctrl.getPreviousSplitbarContainer(scope.splitbar);

          if(previousSplitbar !== null) {
            prevSplitbarBeforeButton = angular.element(previousSplitbar.element.children()[0]);
            prevSplitbarAfterButton = angular.element(previousSplitbar.element.children()[2]);
          }

          if(ctrl.isUsingColumnFlow) {
            if(result) {
              afterButton.css('display', 'none');
              prevIcon.removeClass(iconLeft);
              prevIcon.addClass(iconRight);
				//splitterMark.css('display', 'none');

              // hide previous splitbar buttons
              if(previousSplitbar !== null) {
                prevSplitbarBeforeButton.css('display', 'none');
                prevSplitbarAfterButton.css('display', 'none');
				  //splitterMark.css('display', 'none');
              }
            } else {
              afterButton.css('display', 'inline');
              prevIcon.removeClass(iconRight);
              prevIcon.addClass(iconLeft);
				//splitterMark.css('display', 'inline');

              // show previous splitbar icons
              if(previousSplitbar !== null) {
                prevSplitbarBeforeButton.css('display', 'inline');
                prevSplitbarAfterButton.css('display', 'inline');
				  //splitterMark.css('display', 'inline');
              }
            }
          } else {
            if(result) {
              afterButton.css('display', 'none');
              prevIcon.removeClass(iconUp);
              prevIcon.addClass(iconDown);
				//splitterMark.css('display', 'none');

              // hide previous splitbar buttons
              if(previousSplitbar !== null) {
                prevSplitbarBeforeButton.css('display', 'none');
                prevSplitbarAfterButton.css('display', 'none');
				  //splitterMark.css('display', 'none');
              }
            } else {
              afterButton.css('display', 'inline');
              prevIcon.removeClass(iconDown);
              prevIcon.addClass(iconUp);
				//splitterMark.css('display', 'inline');

              // show previous splitbar icons
              if(previousSplitbar !== null) {
                prevSplitbarBeforeButton.css('display', 'inline');
                prevSplitbarAfterButton.css('display', 'inline');
				  //splitterMark.css('display', 'inline');
              }
            }
          }
        });

        afterButton.on('click', function() {
          var nextSplitbarBeforeButton, nextSplitbarAfterButton;
          var result = ctrl.toggleAfter(scope.splitbar);
          var nextSplitbar = ctrl.getNextSplitbarContainer(scope.splitbar);

          if(nextSplitbar !== null) {
            nextSplitbarBeforeButton = angular.element(nextSplitbar.element.children()[0]);
            nextSplitbarAfterButton = angular.element(nextSplitbar.element.children()[1]);
          }

          if(ctrl.isUsingColumnFlow) {
            if(result) {
              prevButton.css('display', 'none');
              afterIcon.removeClass(iconRight);
              afterIcon.addClass(iconLeft);

              // hide next splitbar buttons
              if(nextSplitbar !== null) {
                nextSplitbarBeforeButton.css('display', 'none');
                nextSplitbarAfterButton.css('display', 'none');
              }
            } else {
              prevButton.css('display', 'inline');
              afterIcon.removeClass(iconLeft);
              afterIcon.addClass(iconRight);

              // show next splitbar buttons
              if(nextSplitbar !== null) {
                nextSplitbarBeforeButton.css('display', 'inline');
                nextSplitbarAfterButton.css('display', 'inline');
              }
            }
          } else {
            if(result) {
              prevButton.css('display', 'none');
              afterIcon.removeClass(iconDown);
              afterIcon.addClass(iconUp);

              // hide next splitbar buttons
              if(nextSplitbar !== null) {
                nextSplitbarBeforeButton.css('display', 'none');
                nextSplitbarAfterButton.css('display', 'none');
              }
            } else {
              prevButton.css('display', 'inline');
              afterIcon.removeClass(iconUp);
              afterIcon.addClass(iconDown);

              // show next splitbar buttons
              if(nextSplitbar !== null) {
                nextSplitbarBeforeButton.css('display', 'inline');
                nextSplitbarAfterButton.css('display', 'inline');
              }
            }
          }
        });

        element.on('mousedown touchstart', function(e) {
          ctrl.movingSplitbar = scope.splitbar;
          ctrl.processSplitbar(scope.splitbar);

          e.preventDefault();
          e.stopPropagation();

          htmlElement.on('mousemove touchmove', function(event) {
            scope.$apply(angular.bind(ctrl, ctrl.mouseMoveHandler, event));
          });
          return false;
        });

        htmlElement.on('mouseup touchend', function(event) {
          scope.$apply(angular.bind(ctrl, ctrl.mouseUpHandler, event));
          htmlElement.off('mousemove touchmove');
        });

        scope.$watch('splitbar.size', function(newValue) {
          element.css(ctrl.sizeProperties.sizeProperty, newValue + 'px');
        });

        scope.$watch('splitbar.' + ctrl.sizeProperties.flowProperty, function(newValue) {
          element.css(ctrl.sizeProperties.flowProperty, newValue + 'px');
        });

        scope.$on('$destroy', function() {
          htmlElement.off('mouseup touchend mousemove touchmove');
        });

        //Add splitbar to layout container list
        ctrl.addContainer(scope.splitbar);

        element.on('$destroy', function() {
          ctrl.removeContainer(scope.splitbar);
          scope.$evalAsync();
        });
      }
    };

  }])

  .directive('uiLayoutContainer', ['LayoutContainer', '$compile', function(LayoutContainer, $compile) {
    return {
      restrict: 'AE',
      require: '^uiLayout',
      scope: {},

      compile: function() {
        return {
          pre: function(scope, element, attrs, ctrl) {
            scope.container = LayoutContainer.Container();
            scope.container.element = element;

            ctrl.addContainer(scope.container);

            element.on('$destroy', function() {
              ctrl.removeContainer(scope.container);
              scope.$evalAsync();
            });
          },
          post: function(scope, element, attrs, ctrl) {
            if(!element.hasClass('stretch')) element.addClass('stretch');
            if(!element.hasClass('ui-layout-container')) element.addClass('ui-layout-container');

            scope.$watch('container.size', function(newValue) {
              element.css(ctrl.sizeProperties.sizeProperty, newValue + 'px');
            });

            scope.$watch('container.' + ctrl.sizeProperties.flowProperty, function(newValue) {
              element.css(ctrl.sizeProperties.flowProperty, newValue + 'px');
            });

            //TODO: add ability to disable auto-adding a splitbar after the container
            var parent = element.parent();
            var children = parent.children();
            var index = ctrl.indexOfElement(element);
            var splitbar = angular.element('<div ui-splitbar><a><span class="ui-splitbar-icon"></span></a><span class="splitter-mark"></span><a><span class="ui-splitbar-icon"></span></a></div>');
            if(0 < index && !ctrl.hasSplitbarBefore(scope.container)) {
              angular.element(children[index-1]).after(splitbar);
              $compile(splitbar)(scope);
            } else if(index < children.length - 1) {
              element.after(splitbar);
              $compile(splitbar)(scope);
            }
          }
        };
      }
    };
  }])

  .factory('LayoutContainer', function() {
    // Base container that can be locked and resized
    function BaseContainer() {
      this.size = 0;
      this.maxSize = null;
      this.minSize = 0;
      this.resizable = true;
      this.locked = false;
      this.element = null;
      this.collapsed = false;
    }

    // Splitbar container
    function SplitbarContainer() {
      this.size = 10;
      this.left = 0;
      this.top = 0;
      this.element = null;
    }

    return {
      Container: function(initialSize) {
        return new BaseContainer(initialSize);
      },
      Splitbar: function() {
        return new SplitbarContainer();
      },
      isSplitbar: function(container) {
        return container instanceof SplitbarContainer;
      }
    };
  })
; (function ($) {
    $.fn.dTabs = function (options) {
        var settings = $.extend({
            tabsSelector: ".d-tabs",
            tabsMenuItemSelector: ".d-tabs__tab",
            tabsContentItemSelector: ".d-tabs__item",
            checkedClass: "is-checked"
        }, options);
        $(document).on('click', settings.tabsMenuItemSelector, function (e) {
            var $this = $(this);
            if (!$this.hasClass(settings.checkedClass)) {
                var $tabs = $this.parents(settings.tabsSelector);
                var $menuItem = $tabs.find(settings.tabsMenuItemSelector);
                var $contentItem = $tabs.find(settings.tabsContentItemSelector);
                $menuItem.removeClass(settings.checkedClass);
                $contentItem.removeClass(settings.checkedClass);
                $this.addClass(settings.checkedClass);
                $contentItem.eq($(this).index()).addClass(settings.checkedClass);
            }
        });
    };
    $("d-tabs").dTabs();
}(jQuery)); 
/* HTML templates */
var dplTagsInput = angular.module('dplTagsInput', ['ngTagsInput']);


dplTagsInput.run(["$templateCache", function($templateCache) {
    $templateCache.put('ngTagsInput/tags-input.html',
        "<div class=\"host\" tabindex=\"-1\" ng-click=\"eventHandlers.host.click()\" ti-transclude-append><div class=\"tags d-input-tags\" ng-class=\"{focused: hasFocus}\"><ul class=\"tag-list\"><li class=\"tag-item d-tag\" ng-repeat=\"tag in tagList.items track by track(tag)\" ng-class=\"{ selected: tag == tagList.selected }\" ng-click=\"eventHandlers.tag.click(tag)\"><ti-tag-item data=\"::tag\"></ti-tag-item></li></ul><input class=\"input\" autocomplete=\"off\" ng-model=\"newTag.text\" ng-model-options=\"{getterSetter: true}\" ng-keydown=\"eventHandlers.input.keydown($event)\" ng-focus=\"eventHandlers.input.focus($event)\" ng-blur=\"eventHandlers.input.blur($event)\" ng-paste=\"eventHandlers.input.paste($event)\" ng-trim=\"false\" ng-class=\"{'invalid-tag': newTag.invalid}\" ng-disabled=\"disabled\" ti-bind-attrs=\"{type: options.type, placeholder: options.placeholder, tabindex: options.tabindex, spellcheck: options.spellcheck}\" ti-autosize></div></div>"
    );

    $templateCache.put('ngTagsInput/tag-item.html',
        "<span ng-bind=\"$getDisplayText()\"></span> <a ng-click=\"$removeTag()\" data-role=\"remove\"></a>"
    );

    $templateCache.put('ngTagsInput/auto-complete.html',
        "<div class=\"autocomplete\" ng-if=\"suggestionList.visible\"><ul class=\"suggestion-list\"><li class=\"suggestion-item\" ng-repeat=\"item in suggestionList.items track by track(item)\" ng-class=\"{selected: item == suggestionList.selected}\" ng-click=\"addSuggestionByIndex($index)\" ng-mouseenter=\"suggestionList.select($index)\"><ti-autocomplete-match data=\"::item\"></ti-autocomplete-match></li></ul></div>"
    );

    $templateCache.put('ngTagsInput/auto-complete-match.html',
        "<span ng-bind-html=\"$highlight($getDisplayText())\"></span>"
    );
}]);
 var dplTimepicker = angular.module('dplTimepicker', ['ui.bootstrap', 'template/timepicker.html']);

dplTimepicker.config(['$provide', function ($provide) {
    'use strict';

    //for old way, deprecated now
    $provide.decorator('timepickerDirective', ['$delegate', function ($delegate) {
        $delegate[0].templateUrl = 'template/timepicker.html';

		$delegate[0].$$isolateBindings.label = {
			attrName: 'label',
			mode: '@',
			optional: true
		};

        return $delegate;
    }]);

	$provide.decorator('uibTimepickerDirective', ['$delegate', function ($delegate) {

		$delegate[0].templateUrl = 'template/timepicker.html';

		$delegate[0].$$isolateBindings.label = {
			attrName: 'label',
			mode: '@',
			optional: true
		};

		return $delegate;
	}]);
}]);

angular.module('template/timepicker.html', []).run(['$templateCache', function ($templateCache) {
    $templateCache.put('template/timepicker.html',
        "<div>" +
        "  <label class='d-timepicker__label'>" +
        "      <span class='d-timepicker__label_name'>{{label}}</span>" +
        "      <span class='d-timepicker__unit d-timepicker__unit_hours'>" +
        "        <span class='sr-only'>Hours:</span>" +
        "        <input class='d-timepicker__input' type='text' ng-model='hours' ng-change='updateHours()' ng-readonly='readonlyInput' maxlength='2'/>" +
        "        <span class='d-timepicker__increase __icon-angle_up' ng-click='incrementHours()'></span>" +
        "        <span class='d-timepicker__decrease __icon-angle_down' ng-click='decrementHours()'></span>" +
        "        </span>" +
        "    </label>" +
        "    <div class='d-timepicker__unit'>" +
        "      <label>" +
        "        <span class='sr-only'>Minutes:</span>" +
        "        <input class='d-timepicker__input' type='text' ng-model='minutes' ng-change='updateMinutes()' ng-readonly='readonlyInput' maxlength='2'/>" +
        "      </label>" +
        "      <span class='d-timepicker__increase __icon-angle_up' ng-click='incrementMinutes()'></span>" +
        "      <span class='d-timepicker__decrease __icon-angle_down' ng-click='decrementMinutes()'></span>" +
        "    </div>" +
        "    <div class='d-timepicker__unit d-timepicker__meridian' ng-show='showMeridian' ng-click='toggleMeridian()'>" +
        "      <label>" +
        "        <span class='sr-only'>AM\\PM (Meridian):</span>" +
        "        <input class='d-timepicker__input' type='text' ng-readonly='readonlyInput' maxlength='2' value='{{meridian}}'/>" +
        "      </label>" +
        "      <span class='d-timepicker__increase __icon-angle_up'></span>" +
        "      <span class='d-timepicker__decrease __icon-angle_down'></span>" +
        "    </div>" +
        "    <p class='d-error'>Time is not valid</p>" +
        "</div>"
    );
}]);