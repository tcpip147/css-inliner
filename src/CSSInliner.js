import { calculate, compare } from "./CSSSpecificity.js";

function CSSInliner() {
}

CSSInliner.prototype.calculate = calculate;

CSSInliner.prototype.inlineAll = function () {
    const inlineDeclarations = {};
    let nextId = 0;
    const orderedSelectors = orderBySpecificity(collapseSelectors());

    for (var i = 0; i < orderedSelectors.length; i++) {
        var selectorText = orderedSelectors[i].selectorText;
        var declaration = orderedSelectors[i].style;
        var els = document.querySelectorAll(selectorText);
        for (var j = 0; j < els.length; j++) {
            backupInlineStyles(els[j]);
            setStyles(els[j], declaration);
        }
    }

    for (var id in inlineDeclarations) {
        setInlineStyles(inlineDeclarations[id]);
        delete inlineDeclarations[id].element.dataset.cssInlinerId;
    }

    function collapseSelectors() {
        const collapsed = [];
        for (let i = 0; i < document.styleSheets.length; i++) {
            const cssRules = document.styleSheets[i].cssRules;
            for (let j = 0; j < cssRules.length; j++) {
                if (cssRules[j].selectorText != null) {
                    const selectors = cssRules[j].selectorText.split(",");
                    for (let k = 0; k < selectors.length; k++) {
                        collapsed.push({
                            selectorText: selectors[k].trim(),
                            style: cssRules[j].style
                        });
                    }
                }
            }
        }
        return collapsed;
    }

    function orderBySpecificity(selectors) {
        const orderd = selectors.sort(function (a, b) {
            return compare(a.selectorText, b.selectorText);
        });
        return orderd;
    }

    function backupInlineStyles(el) {
        if (el.dataset.cssInlinerId == null) {
            el.dataset.cssInlinerId = nextId;
            inlineDeclarations[nextId] = {
                element: el,
                declaration: deepcopy(el.style),
                important: copyImportant(el.style)
            };
            nextId++;
        }
    }

    function deepcopy(obj) {
        var newobj = {};
        for (var key in obj) {
            newobj[key] = obj[key];
        }

        // IE11 Compatibility
        if (obj.length > 0 && !newobj[0]) {
            for (var i = 0; i < obj.length; i++) {
                newobj[i] = obj[i];
            }
        }
        return newobj;
    }

    function copyImportant(declaration) {
        var important = {};
        for (var i = 0; i < declaration.length; i++) {
            important[declaration[i]] = declaration.getPropertyPriority(declaration[i]);
        }
        return important;
    }

    function setStyles(el, declaration) {
        for (var i = 0; i < declaration.length; i++) {
            var styleName = declaration[i];
            var property = declaration.getPropertyPriority(styleName);
            if (el.style.getPropertyPriority(styleName) == "important" && property != "important") {
                continue;
            } else if (property == "important") {
                el.style.setProperty(styleName, declaration[styleName], "important");
            } else {
                el.style[styleName] = declaration[styleName];
            }
        }
    }

    function setInlineStyles(inlineDeclaration) {
        for (var i = 0; i < inlineDeclaration.declaration.length; i++) {
            var declaration = inlineDeclaration.declaration;
            var important = inlineDeclaration.important;
            var el = inlineDeclaration.element;
            var styleName = declaration[i];
            var styleNameCamelcase = styleName.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, c) => c.toUpperCase());
            var property = important[styleName];
            if (el.style.getPropertyPriority(styleName) == "important" && property != "important") {
                continue;
            } else if (property == "important") {
                el.style.setProperty(styleName, declaration[styleNameCamelcase], "important");
            } else {
                el.style[styleName] = declaration[styleNameCamelcase];
            }
        }
    }
};

export default CSSInliner;