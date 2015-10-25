/**
 * Vmc Slider
 * 维米客网页工作室
 * vomoc@qq.com
 * 2015/06/29
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
		the.elem.find('.vui-children').hide();
		the._createCurrentBar();
		var itemHeight = the.elem.find('.vui-main').height();
		the.elem.find('.vui-item').each(function() {
			var itemWidth = $(this).width();
			var $child = $(this).children('.vui-children');
			var childWidth = $child.width();
			$child.css({
				'top': itemHeight,
				'width': Math.max(itemWidth, childWidth)
			});
		}).hover(function() {
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
			// 子菜单
			$(this).children('.vui-children').stop(false, true).slideDown({
				duration: opts.duration,
				easing: opts.easing,
				queue: false
			});
		}, function() {
			$(this).children('.vui-item-value').removeClass('vui-item-hover');
			$(this).children('.vui-children').stop(false, true).slideUp({
				duration: opts.duration / 2,
				queue: false
			});
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