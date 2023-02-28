import { calculate, compare } from "./CSSSpecificity.js";

function CSSInliner() {
    let inlineDeclarations;
    let nextId;
    const orderedSelectors = orderBySpecificity(collapseSelectors());

    function inline(element) {
        inlineDeclarations = {};
        nextId = 0;

        for (let i = 0; i < orderedSelectors.length; i++) {
            const selectorText = orderedSelectors[i].selectorText;
            const declaration = orderedSelectors[i].style;
            const els = document.querySelectorAll(selectorText);
            for (let j = 0; j < els.length; j++) {
                if (isInParentNode(element, els[j])) {
                    backupInlineStyles(els[j]);
                    setStyles(els[j], declaration);
                }
            }
        }

        for (let id in inlineDeclarations) {
            setInlineStyles(inlineDeclarations[id]);
            delete inlineDeclarations[id].element.dataset.cssInlinerId;
        }
    }

    function inlineAll() {
        inlineDeclarations = {};
        nextId = 0;

        for (let i = 0; i < orderedSelectors.length; i++) {
            const selectorText = orderedSelectors[i].selectorText;
            const declaration = orderedSelectors[i].style;
            const els = document.querySelectorAll(selectorText);
            for (let j = 0; j < els.length; j++) {
                backupInlineStyles(els[j]);
                setStyles(els[j], declaration);
            }
        }

        for (let id in inlineDeclarations) {
            setInlineStyles(inlineDeclarations[id]);
            delete inlineDeclarations[id].element.dataset.cssInlinerId;
        }
    }

    function isInParentNode(parent, child) {
        let node = child.parentNode;
        while (node != null) {
            if (parent == node) {
                return true;
            }
            node = node.parentNode;
        }
        return false;
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
        const newobj = {};
        for (let key in obj) {
            newobj[key] = obj[key];
        }

        // IE11 Compatibility
        if (obj.length > 0 && !newobj[0]) {
            for (let i = 0; i < obj.length; i++) {
                newobj[i] = obj[i];
            }
        }
        return newobj;
    }

    function copyImportant(declaration) {
        const important = {};
        for (let i = 0; i < declaration.length; i++) {
            important[declaration[i]] = declaration.getPropertyPriority(declaration[i]);
        }
        return important;
    }

    function setStyles(el, declaration) {
        for (let i = 0; i < declaration.length; i++) {
            const styleName = declaration[i];
            const property = declaration.getPropertyPriority(styleName);
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
        for (let i = 0; i < inlineDeclaration.declaration.length; i++) {
            const declaration = inlineDeclaration.declaration;
            const important = inlineDeclaration.important;
            const el = inlineDeclaration.element;
            const styleName = declaration[i];
            const styleNameCamelcase = styleName.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, c) => c.toUpperCase());
            const property = important[styleName];
            if (el.style.getPropertyPriority(styleName) == "important" && property != "important") {
                continue;
            } else if (property == "important") {
                el.style.setProperty(styleName, declaration[styleNameCamelcase], "important");
            } else {
                el.style[styleName] = declaration[styleNameCamelcase];
            }
        }
    }

    CSSInliner.prototype.calculate = calculate;
    CSSInliner.prototype.inlineAll = inlineAll;
    CSSInliner.prototype.inline = inline;
}

export default CSSInliner;