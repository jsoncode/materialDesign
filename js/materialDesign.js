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
            btn.addEventListener('touchstart', materialDesignBg);
            btn.addEventListener('mousedown', materialDesignBg);
        }
    }

    function materialDesignBg(e) {
        var d = this;
        for (var i in d) {
            if (/[a-z]+/.test(i) && typeof d[i] == 'number' && d[i] > 0) {
                console.log(i, d[i]);
            }
        }
        console.log(e.target);
        e.preventDefault();
        // e.stopPropagation(); 
        var tag = this;
        if (this.getAttribute('materialDesign') === undefined) {
            tag = this.parentNode;
        }

        /*if (e.changedTouches) {
            var item = e.changedTouches[0];
            console.log(item.clientX, item.pageX, item.screenX);
            console.log(item.clientY, item.pageY, item.screenY);
        }
        console.log(tag.offsetWidth, tag.clientWidth, tag.scrollWidth);
        console.log(tag.offsetHeight, tag.clientHeight, tag.scrollHeight);
        console.log(tag.offsetLeft, tag.clientLeft, tag.scrollLeft);
        console.log(tag.offsetTop, tag.clientTop, tag.scrollTop);
*/
        var div = tag.querySelector(".animate-hand");
        if (!div) {
            div = document.createElement("div");
        }
        div.className = 'animate-hand';
        tag.insertBefore(div, tag.firstElementChild);

        var scale = Math.round(tag.offsetWidth / 100) || 1;

        var left = 0;
        var top = 0;
        //触摸
        if (e.changedTouches) {
            left = e.changedTouches[0].pageX - e.changedTouches[0].target.x;
            top = e.changedTouches[0].pageY - e.changedTouches[0].target.y;
        } else {
            left = e.layerX;
            top = e.layerY;
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
/*模板引擎*/
var TemplateEngine = function(html, options, reg) {
    var reg = reg || ['<%', '%>'];
    var re = new RegExp(reg[0] + '([^' + reg[1] + ']+)?' + reg[1], 'g');
    var reExp = /(^(\s)?(if|for|else|switch|case|break|{|}))(.*)?/g;
    var code = 'var r=[];\n';
    var cursor = 0;
    var add = function(line, js) {
        js ? (code += line.match(reExp) ? line + '\n' : 'r.push(' + line + ');\n') :
            (code += line != '' ? 'r.push("' + line.replace(/"/g, '\\"') + '");\n' : '');
        return add;
    }
    while (match = re.exec(html)) {
        add(html.slice(cursor, match.index))(match[1], true);
        cursor = match.index + match[0].length;
    }
    add(html.substr(cursor, html.length - cursor));
    code += 'return r.join("");';
    return new Function(code.replace(/[\r\t\n]/g, '')).apply(options);
}
