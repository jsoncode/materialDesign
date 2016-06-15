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

            function materialDesignBg(e) {
                e.preventDefault();
                var tag = this;
                if (this.getAttribute('materialDesign') === undefined) {
                    tag = this.parentNode;
                }
                var div = tag.querySelector(".animate-hand");
                if (!div) {
                    div = document.createElement("div");
                }
                div.className = 'animate-hand';
                tag.insertBefore(div,tag.firstElementChild);
                var x = e.pageX || e.changedTouches[0].pageX || 0;
                var y = e.pageY || e.changedTouches[0].pageY || 0;
                var left = tag.offsetLeft;
                var top = tag.offsetTop;
                var width = div.offsetWidth;
                var height = div.offsetHeight;
                var scale = Math.round(tag.offsetWidth / 100) || 1;
                div.style.left = x - left - width / 2 + "px";
                div.style.top = y - top - height / 2 + "px";
                scale =scale>6?6:scale;
                div.className = "animate-hand animate ripple_" + (e.changedTouches ? scale + 1 : scale);
                if (tag.nodeName != 'A' && tag.getAttribute("href")) {
                    location.href = tag.getAttribute("href");
                }
                return false;
            }
        }
    }
})();
/*模板引擎*/
var TemplateEngine = function(html, options,reg) {
	var reg = reg||['<%','%>'];
	var re = new RegExp(reg[0]+'([^'+reg[1]+']+)?'+reg[1],'g');
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