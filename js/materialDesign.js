/**
 * 
 * @authors 石亚南 （1348571886@qq.com）
 * @date    2016-06-14 14:48:42
 * @version $Id$
 */

(function() {
    'use strict';
    document.addEventListener("DOMContentLoaded", DOMContentLoaded, false);
    function DOMContentLoaded() {
        for (var i = 0, btn; btn = document.querySelectorAll('[materialDesign]')[i++];) {
            btn.addEventListener('mousedown', materialDesignBg);
        }
    }
    function materialDesignBg(e) {
        e.preventDefault();
        e.stopPropagation();
        var tag = this;
        var div = tag.querySelector(".animate-hand");
        if (!div) {
            div = document.createElement("div");
        }
        div.className = 'animate-hand';
        tag.insertBefore(div, tag.firstElementChild);

        var scale = Math.round(tag.offsetWidth / 100) || 1;
        
        // 优化移动端获取不到精确位置问题
        var left = e.type==='click' ? e.layerX : (e.touches[0].clientX - tag.offsetLeft);
        var top = e.type==='click' ? e.layerY : (e.touches[0].clientY - tag.offsetTop);

        //优化移动端固定元素的位置获取
        if (e.type !== 'click') {
            deepCheckFixed(tag);
        }

        function deepCheckFixed(tag) {
            var parent = tag.parentElement;
            if (parent.tagName !== 'BODY') {
                if (getComputedStyle(parent, null).getPropertyValue('position') === 'fixed') {
                    left = e.touches[0].clientX - tag.offsetLeft - parent.offsetLeft;
                    top = e.touches[0].clientY - parent.offsetTop;
                } else {
                    deepCheckFixed(parent);
                }
            }
        }
        
        div.style.left = left + "px";
        div.style.top = top + "px";
        scale = scale > 6 ? 6 : scale;
        div.className = "animate-hand animate ripple_" + (e.changedTouches ? scale + 1 : scale);
        if (tag.nodeName != 'A' && tag.getAttribute("href")) {
            location.href = tag.getAttribute("href");
        }
        return false;
    }
})();
