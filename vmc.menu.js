/**
 * VmcMenu 导航菜单插件 v1.1.0
 * 维米客网页工作室 Vomoc Web Studio
 * http://www.vomoc.com/vmc/menu/
 * vomoc@qq.com
 * 2015/11/15
 **/
;
(function($, undefined) {
    var dataKey = 'vomoc';
    //**************************************************************************************************************
    // 插件
    $.fn.vmcMenu = function(settings) {
        var run = $.type(settings) === 'string',
            args = [].slice.call(arguments, 1);
        if (!this.length) return;
        return this.each(function() {
            var $element = $(this),
                instance = $element.data(dataKey);
            if (run && settings.charAt(0) !== '_' && instance) {
                vmcMenu.prototype[settings] && vmcMenu.prototype[settings].apply(instance, args);
            } else if (!run && !instance) {
                instance = new vmcMenu($element, settings);
                instance._init();
                $element.data(dataKey, instance);
            }
        });
    };
    //**************************************************************************************************************
    // 构造函数
    var vmcMenu = function($element, settings) {
        var the = this;
        the.options = $.extend({}, the.options, settings);
        the.elem = $element;
    };
    //**************************************************************************************************************
    // 配置参数
    vmcMenu.prototype.options = {
        duration: 400,
        easing: 'easeOutBack',
        currentBar: true
    };
    //**************************************************************************************************************
    // 初始化
    vmcMenu.prototype._init = function() {
        var the = this,
            opts = the.options;
        // 创建滑动游标
        the._createCurrentBar();
        // 获取一级导航高度
        var itemHeight = the.elem.find('.vui-main').height();
        // 主菜单宽度
        var mainWidth = the.elem.find('.vui-main').width();
        // 一级导航
        the.elem.find('.vui-item').each(function() {
            // 当前菜单相对主菜单位置
            var pos = $(this).position();
            // 当前菜单宽度
            var itemWidth = $(this).width();
            // 子菜单
            var $child = $(this).children('.vui-children');
            // 子菜单宽度
            var childWidth = $child.width();
            childWidth = Math.max(itemWidth, childWidth);
            // 子菜单居左位置
            var childLeft = mainWidth - pos.left - childWidth;
            childLeft = childLeft > 0 ? 0 : childLeft;
            // 设置子菜单样式
            $child.css({
                'top': itemHeight,
                'left': childLeft,
                'width': childWidth
            });
        }).hover(function() {
            // 子菜单
            $(this).children('.vui-children').stop(true, true).slideDown({
                duration: opts.duration,
                easing: opts.easing,
                queue: false
            });
            // 一级菜单样式
            $(this).children('.vui-item-value').addClass('vui-item-hover');
            // current bar
            if (true === opts.currentBar) {
                the.elem.find('.vui-current-bar').stop().animate({
                    'left': $(this).position().left,
                    'width': $(this).width()
                }, {
                    duration: 300,
                    easing: 'easeOutBack',
                    queue: false
                });
            }
        }, function() {
            var that = $(this);
            if (that.find('.vui-child-item').length > 0) {
                that.children('.vui-children').stop(true, true).slideUp({
                    duration: opts.duration / 2,
                    queue: false,
                    complete: function() {
                        that.children('.vui-item-value').removeClass('vui-item-hover');
                    }
                });
            } else {
                that.children('.vui-item-value').removeClass('vui-item-hover');
            }
        });
        the.elem.find('.vui-child-item').css({
            'float': 'none',
            'display': 'block'
        });
        the.elem.find('.vui-child-value').css({
            'float': 'none',
            'display': 'block'
        }).hover(function() {
            $(this).addClass('vui-child-hover');
        }, function() {
            $(this).removeClass('vui-child-hover');
        });
        the.elem.find('.vui-children').css('visibility', 'visible').hide();
    };
    vmcMenu.prototype._createCurrentBar = function() {
        var the = this,
            opts = the.options;
        if (false === opts.currentBar) return;
        var $currentBarBox = $('<div class="vui-current-bar-box"></div>').hide().appendTo(the.elem);
        var $currentBar = $('<div class="vui-current-bar"></div>').appendTo($currentBarBox);
        the.elem.hover(function() {
            $currentBarBox.stop(false, true).fadeIn({
                duration: 400,
                queue: false
            });
        }, function() {
            $currentBarBox.stop(false, true).fadeOut({
                duration: 400,
                queue: false
            });
        });
    };
})(jQuery);
