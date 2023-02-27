/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/CSSInliner.js":
/*!***************************!*\
  !*** ./src/CSSInliner.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _CSSSpecificity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CSSSpecificity.js */ \"./src/CSSSpecificity.js\");\n\r\n\r\nfunction CSSInliner() {\r\n}\r\n\r\nCSSInliner.prototype.calculate = _CSSSpecificity_js__WEBPACK_IMPORTED_MODULE_0__.calculate;\r\n\r\nCSSInliner.prototype.inlineAll = function () {\r\n    const inlineDeclarations = {};\r\n    let nextId = 0;\r\n    const orderedSelectors = orderBySpecificity(collapseSelectors());\r\n\r\n    for (var i = 0; i < orderedSelectors.length; i++) {\r\n        var selectorText = orderedSelectors[i].selectorText;\r\n        var declaration = orderedSelectors[i].style;\r\n        var els = document.querySelectorAll(selectorText);\r\n        for (var j = 0; j < els.length; j++) {\r\n            backupInlineStyles(els[j]);\r\n            setStyles(els[j], declaration);\r\n        }\r\n    }\r\n\r\n    for (var id in inlineDeclarations) {\r\n        setInlineStyles(inlineDeclarations[id]);\r\n        delete inlineDeclarations[id].element.dataset.cssInlinerId;\r\n    }\r\n\r\n    function collapseSelectors() {\r\n        const collapsed = [];\r\n        for (let i = 0; i < document.styleSheets.length; i++) {\r\n            const cssRules = document.styleSheets[i].cssRules;\r\n            for (let j = 0; j < cssRules.length; j++) {\r\n                const selectors = cssRules[j].selectorText.split(\",\");\r\n                for (let k = 0; k < selectors.length; k++) {\r\n                    collapsed.push({\r\n                        selectorText: selectors[k].trim(),\r\n                        style: cssRules[j].style\r\n                    });\r\n                }\r\n            }\r\n        }\r\n        return collapsed;\r\n    }\r\n\r\n    function orderBySpecificity(selectors) {\r\n        const orderd = selectors.sort(function (a, b) {\r\n            return (0,_CSSSpecificity_js__WEBPACK_IMPORTED_MODULE_0__.compare)(a.selectorText, b.selectorText);\r\n        });\r\n        return orderd;\r\n    }\r\n\r\n    function backupInlineStyles(el) {\r\n        if (el.dataset.cssInlinerId == null) {\r\n            el.dataset.cssInlinerId = nextId;\r\n            inlineDeclarations[nextId] = {\r\n                element: el,\r\n                declaration: deepcopy(el.style),\r\n                important: copyImportant(el.style)\r\n            };\r\n            nextId++;\r\n        }\r\n    }\r\n\r\n    function deepcopy(obj) {\r\n        var newobj = {};\r\n        for (var key in obj) {\r\n            newobj[key] = obj[key];\r\n        }\r\n        return newobj;\r\n    }\r\n\r\n    function copyImportant(declaration) {\r\n        var important = {};\r\n        for (var i = 0; i < declaration.length; i++) {\r\n            important[declaration[i]] = declaration.getPropertyPriority(declaration[i]);\r\n        }\r\n        return important;\r\n    }\r\n\r\n    function setStyles(el, declaration) {\r\n        for (var i = 0; i < declaration.length; i++) {\r\n            var styleName = declaration[i];\r\n            var property = declaration.getPropertyPriority(styleName);\r\n            if (el.style.getPropertyPriority(styleName) == \"important\" && property != \"important\") {\r\n                continue;\r\n            } else if (property == \"important\") {\r\n                el.style.setProperty(styleName, declaration[styleName], \"important\");\r\n            } else {\r\n                el.style[styleName] = declaration[styleName];\r\n            }\r\n        }\r\n    }\r\n\r\n    function setInlineStyles(inlineDeclaration) {\r\n        for (var i = 0; i < inlineDeclaration.declaration.length; i++) {\r\n            var declaration = inlineDeclaration.declaration;\r\n            var important = inlineDeclaration.important;\r\n            var el = inlineDeclaration.element;\r\n            var styleName = declaration[i];\r\n            var styleNameCamelcase = styleName.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, (m, c) => c.toUpperCase());\r\n            var property = important[styleName];\r\n            if (el.style.getPropertyPriority(styleName) == \"important\" && property != \"important\") {\r\n                continue;\r\n            } else if (property == \"important\") {\r\n                el.style.setProperty(styleName, declaration[styleNameCamelcase], \"important\");\r\n            } else {\r\n                el.style[styleName] = declaration[styleNameCamelcase];\r\n            }\r\n        }\r\n    }\r\n};\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CSSInliner);\n\n//# sourceURL=webpack://css-inliner/./src/CSSInliner.js?");

/***/ }),

/***/ "./src/CSSSpecificity.js":
/*!*******************************!*\
  !*** ./src/CSSSpecificity.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"calculate\": () => (/* binding */ calculate),\n/* harmony export */   \"compare\": () => (/* binding */ compare)\n/* harmony export */ });\n/**\r\n * referenced in https://www.w3.org/TR/selectors-3/#specificity\r\n */\r\nfunction calculate(text) {\r\n    const score = { A: 0, B: 0, C: 0 };\r\n    const tokens = tokenize(text);\r\n    let n = 0;\r\n    selector();\r\n    if (tokens[n]) {\r\n        throw \"unexpected symbol \" + tokens[n].value;\r\n    }\r\n    return score;\r\n\r\n    function accept(symbol) {\r\n        if (typeof symbol == \"string\") {\r\n            if (n < tokens.length && tokens[n].type == symbol) {\r\n                if (symbol == \"HASH\") {\r\n                    score[\"A\"]++;\r\n                }\r\n                n++;\r\n                return true;\r\n            }\r\n        } else if (typeof symbol == \"function\") {\r\n            let start = n;\r\n            symbol();\r\n            if (start != n) {\r\n                return true;\r\n            }\r\n        }\r\n        return false;\r\n    }\r\n\r\n    function selector() {\r\n        accept(simple_selector_sequence);\r\n        while (accept(combinator)) {\r\n            accept(simple_selector_sequence);\r\n        }\r\n    }\r\n\r\n    function combinator() {\r\n        if (accept(\"PLUS\")) {\r\n            while (accept(\"S\"));\r\n        } else if (accept(\"GREATER\")) {\r\n            while (accept(\"S\"));\r\n        } else if (accept(\"TILDE\")) {\r\n            while (accept(\"S\"));\r\n        } else if (accept(\"S\")) {\r\n            while (accept(\"S\"));\r\n        }\r\n    }\r\n\r\n    function simple_selector_sequence() {\r\n        if (accept(type_selector) || accept(universal)) {\r\n            while (accept(\"HASH\") || accept(class_selector) || accept(attrib) || accept(pseudo) || accept(negation));\r\n        } else if (accept(\"HASH\") || accept(class_selector) || accept(attrib) || accept(pseudo) || accept(negation)) {\r\n            while (accept(\"HASH\") || accept(class_selector) || accept(attrib) || accept(pseudo) || accept(negation));\r\n        }\r\n    }\r\n\r\n    function type_selector() {\r\n        let start = n;\r\n        accept(namespace_prefix);\r\n        if (!accept(element_name)) {\r\n            n = start;\r\n        }\r\n        if (start != n) {\r\n            score[\"C\"]++;\r\n        }\r\n    }\r\n\r\n    function namespace_prefix() {\r\n        let start = n;\r\n        (accept(\"IDENT\") || accept(\"ASTERLISK\"));\r\n        if (!accept(\"PIPELINE\")) {\r\n            n = start;\r\n        }\r\n    }\r\n\r\n    function element_name() {\r\n        accept(\"IDENT\");\r\n    }\r\n\r\n    function universal() {\r\n        let start = n;\r\n        accept(namespace_prefix);\r\n        if (!accept(\"ASTERLISK\")) {\r\n            n = start;\r\n        }\r\n    }\r\n\r\n    function class_selector() {\r\n        if (accept(\"DOT\")) {\r\n            let start = n;\r\n            accept(\"IDENT\");\r\n            if (start != n) {\r\n                score[\"B\"]++;\r\n            }\r\n        }\r\n    }\r\n\r\n    function attrib() {\r\n        let start = n;\r\n        if (accept(\"LC\")) {\r\n            while (accept(\"S\"));\r\n            accept(namespace_prefix);\r\n            if (accept(\"IDENT\")) {\r\n                while (accept(\"S\"));\r\n                if (accept(\"PREFIXMATCH\") || accept(\"SUFFIXMATCH\") || accept(\"SUBSTRINGMATCH\") || accept(\"EQUAL\") || accept(\"INCLUDES\") || accept(\"DASHMATCH\")) {\r\n                    while (accept(\"S\"));\r\n                    if (accept(\"IDENT\") || accept(\"STRING\")) {\r\n                        while (accept(\"S\"));\r\n                    } else {\r\n                        n = start;\r\n                        return;\r\n                    }\r\n                }\r\n                if (accept(\"RC\")) {\r\n                    score[\"B\"]++;\r\n                } else {\r\n                    n = start;\r\n                    return;\r\n                }\r\n            } else {\r\n                n = start;\r\n                return;\r\n            }\r\n        }\r\n    }\r\n\r\n    function pseudo() {\r\n        let start = n;\r\n        if (accept(\"COLON\")) {\r\n            const isPseudoElement = accept(\"COLON\");\r\n            if (accept(\"IDENT\") || accept(functional_pseudo)) {\r\n                if (isPseudoElement) {\r\n                    score[\"C\"]++;\r\n                } else {\r\n                    score[\"B\"]++;\r\n                }\r\n            } else {\r\n                n = start;\r\n            }\r\n        }\r\n    }\r\n\r\n    function functional_pseudo() {\r\n        if (accept(\"FUNCTION\")) {\r\n            while (accept(\"S\"));\r\n            if (accept(expression)) {\r\n                accept(\"RCC\");\r\n            }\r\n        }\r\n    }\r\n\r\n    function expression() {\r\n        if (accept(\"PLUS\") || accept(\"MINUS\") || accept(\"DIMENSION\") || accept(\"NUMBER\") || accept(\"STRING\") || accept(\"IDENT\")) {\r\n            while (accept(\"S\"));\r\n            while (accept(\"PLUS\") || accept(\"MINUS\") || accept(\"DIMENSION\") || accept(\"NUMBER\") || accept(\"STRING\") || accept(\"IDENT\")) {\r\n                while (accept(\"S\"));\r\n            }\r\n        }\r\n    }\r\n\r\n    function negation() {\r\n        if (accept(\"NOT\")) {\r\n            while (accept(\"S\"));\r\n            if (accept(negation_arg)) {\r\n                while (accept(\"S\"));\r\n                accept(\"RCC\");\r\n            }\r\n        }\r\n    }\r\n\r\n    function negation_arg() {\r\n        accept(type_selector) || accept(universal) || accept(\"HASH\") || accept(class_selector) || accept(attrib) || accept(pseudo);\r\n    }\r\n}\r\n\r\nfunction tokenize(text) {\r\n    const tokens = [];\r\n\r\n    const rules = {\r\n        PIPELINE: /^\\|/,\r\n        INCLUDES: /^~=/,\r\n        DASHMATCH: /^\\|=/,\r\n        PREFIXMATCH: /^\\^=/,\r\n        SUFFIXMATCH: /^\\$=/,\r\n        SUBSTRINGMATCH: /^\\*=/,\r\n        DIMENSION: /^([0-9]+|[0-9]*\\.[0-9]+)([-]?([_a-z]|[^\\0-\\177]|\\\\[0-9a-f]{1,6}(\\r\\n|[ \\n\\r\\t\\f])?|\\\\[^\\n\\r\\f0-9a-f])([_a-z0-9-]|[^\\0-\\177]|\\\\[0-9a-f]{1,6}(\\r\\n|[ \\n\\r\\t\\f])?|\\\\[^\\n\\r\\f0-9a-f])*)/i,\r\n        ATKEYWORD: /^@([-]?([_a-z]|[^\\0-\\177]|\\\\[0-9a-f]{1,6}(\\r\\n|[ \\n\\r\\t\\f])?|\\\\[^\\n\\r\\f0-9a-f])([_a-z0-9-]|[^\\0-\\177]|\\\\[0-9a-f]{1,6}(\\r\\n|[ \\n\\r\\t\\f])?|\\\\[^\\n\\r\\f0-9a-f])*)/i,\r\n        FUNCTION: /^([-]?([_a-z]|[^\\0-\\177]|\\\\[0-9a-f]{1,6}(\\r\\n|[ \\n\\r\\t\\f])?|\\\\[^\\n\\r\\f0-9a-f])([_a-z0-9-]|[^\\0-\\177]|\\\\[0-9a-f]{1,6}(\\r\\n|[ \\n\\r\\t\\f])?|\\\\[^\\n\\r\\f0-9a-f])*)\\(/i,\r\n        IDENT: /^([-]?([_a-z]|[^\\0-\\177]|\\\\[0-9a-f]{1,6}(\\r\\n|[ \\n\\r\\t\\f])?|\\\\[^\\n\\r\\f0-9a-f])([_a-z0-9-]|[^\\0-\\177]|\\\\[0-9a-f]{1,6}(\\r\\n|[ \\n\\r\\t\\f])?|\\\\[^\\n\\r\\f0-9a-f])*)/i,\r\n        STRING: /^((\\\"([^\\n\\r\\f\\\\\"]|\\\\{nl}|[^\\0-\\177]|\\\\[0-9a-f]{1,6}(\\r\\n|[ \\n\\r\\t\\f])?|\\\\[^\\n\\r\\f0-9a-f])*\\\")|(\\'([^\\n\\r\\f\\\\']|\\\\{nl}|[^\\0-\\177]|\\\\[0-9a-f]{1,6}(\\r\\n|[ \\n\\r\\t\\f])?|\\\\[^\\n\\r\\f0-9a-f])*\\'))/i,\r\n        NUMBER: /^([0-9]+|[0-9]*\\.[0-9]+)/,\r\n        HASH: /^#(([_a-z0-9-]|[^\\0-\\177]|\\\\[0-9a-f]{1,6}(\\r\\n|[ \\n\\r\\t\\f])?|\\\\[^\\n\\r\\f0-9a-f])+)/i,\r\n        PLUS: /^([ \\t\\r\\n\\f]*)\\+/,\r\n        GREATER: /^([ \\t\\r\\n\\f]*)\\>/,\r\n        COMMA: /^([ \\t\\r\\n\\f]*)\\,/,\r\n        TILDE: /^([ \\t\\r\\n\\f]*)\\~/,\r\n        NOT: /^:(n|\\\\0{0,4}(4e|6e)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\n)(o|\\\\0{0,4}(4f|6f)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\o)(t|\\\\0{0,4}(54|74)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\t)\\(/i,\r\n        INVALID: /^((\\\"([^\\n\\r\\f\\\\\"]|\\\\{nl}|[^\\0-\\177]|\\\\[0-9a-f]{1,6}(\\r\\n|[ \\n\\r\\t\\f])?|\\\\[^\\n\\r\\f0-9a-f])*)|(\\'([^\\n\\r\\f\\\\']|\\\\{nl}|[^\\0-\\177]|\\\\[0-9a-f]{1,6}(\\r\\n|[ \\n\\r\\t\\f])?|\\\\[^\\n\\r\\f0-9a-f])*))/i,\r\n        PERCENTAGE: /^([0-9]+|[0-9]*\\.[0-9]+)%/,\r\n        CDO: /^<!--/,\r\n        CDC: /^-->/,\r\n        EQUAL: /^=/,\r\n        ASTERLISK: /^\\*/,\r\n        LC: /^\\[/,\r\n        RC: /^\\]/,\r\n        RCC: /^\\)/,\r\n        DOT: /^\\./,\r\n        COLON: /^\\:/,\r\n        MINUS: /^\\-/,\r\n        S: /^[ \\t\\r\\n\\f]+/\r\n    };\r\n\r\n    let i = 0;\r\n    while (text != \"\" && i < 100) {\r\n        i++;\r\n        let index = 0;\r\n        for (const type in rules) {\r\n            if (rules[type].test(text)) {\r\n                const match = rules[type].exec(text);\r\n                tokens.push({\r\n                    type: type,\r\n                    value: match[0]\r\n                });\r\n                text = text.substring(match[0].length);\r\n                break;\r\n            }\r\n            index++;\r\n        }\r\n        if (Object.keys(rules).length <= index) {\r\n            console.error(\"unknown characters \\\"\" + text + \"\\\"\");\r\n            text = \"\";\r\n        }\r\n    }\r\n\r\n    return tokens;\r\n}\r\n\r\nfunction compare(a, b) {\r\n    const scoreA = calculate(a);\r\n    const scoreB = calculate(b);\r\n    if (scoreA.A > scoreB.A) {\r\n        return 1;\r\n    } else if (scoreA.A < scoreB.A) {\r\n        return -1;\r\n    } else if (scoreA.A == scoreB.A) {\r\n        if (scoreA.B > scoreB.B) {\r\n            return 1;\r\n        } else if (scoreA.B < scoreB.B) {\r\n            return -1;\r\n        } else if (scoreA.B == scoreB.B) {\r\n            if (scoreA.C > scoreB.C) {\r\n                return 1;\r\n            } else if (scoreA.C < scoreB.C) {\r\n                return -1;\r\n            } else if (scoreA.C == scoreB.C) {\r\n                return 0;\r\n            }\r\n        }\r\n    }\r\n}\r\n\r\n\n\n//# sourceURL=webpack://css-inliner/./src/CSSSpecificity.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CSSInliner\": () => (/* reexport safe */ _CSSInliner_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"])\n/* harmony export */ });\n/* harmony import */ var _CSSInliner_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CSSInliner.js */ \"./src/CSSInliner.js\");\n\r\n\r\n\n\n//# sourceURL=webpack://css-inliner/./src/index.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	var __webpack_export_target__ = window;
/******/ 	for(var i in __webpack_exports__) __webpack_export_target__[i] = __webpack_exports__[i];
/******/ 	if(__webpack_exports__.__esModule) Object.defineProperty(__webpack_export_target__, "__esModule", { value: true });
/******/ 	
/******/ })()
;