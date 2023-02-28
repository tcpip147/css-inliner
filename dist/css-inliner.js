/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (function() { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/CSSInliner.js":
/*!***************************!*\
  !*** ./src/CSSInliner.js ***!
  \***************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _CSSSpecificity_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CSSSpecificity.js */ \"./src/CSSSpecificity.js\");\n\nfunction CSSInliner() {\n  var inlineDeclarations;\n  var nextId;\n  var orderedSelectors = orderBySpecificity(collapseSelectors());\n  function inline(elements) {\n    inlineDeclarations = {};\n    nextId = 0;\n    for (var i = 0; i < orderedSelectors.length; i++) {\n      var selectorText = orderedSelectors[i].selectorText;\n      var declaration = orderedSelectors[i].style;\n      var els = document.querySelectorAll(selectorText);\n      for (var j = 0; j < els.length; j++) {\n        if (isInParentNode(elements, els[j])) {\n          backupInlineStyles(els[j]);\n          setStyles(els[j], declaration);\n        }\n      }\n    }\n    for (var id in inlineDeclarations) {\n      setInlineStyles(inlineDeclarations[id]);\n      delete inlineDeclarations[id].element.dataset.cssInlinerId;\n    }\n  }\n  function inlineAll() {\n    inlineDeclarations = {};\n    nextId = 0;\n    for (var i = 0; i < orderedSelectors.length; i++) {\n      var selectorText = orderedSelectors[i].selectorText;\n      var declaration = orderedSelectors[i].style;\n      var els = document.querySelectorAll(selectorText);\n      for (var j = 0; j < els.length; j++) {\n        backupInlineStyles(els[j]);\n        setStyles(els[j], declaration);\n      }\n    }\n    for (var id in inlineDeclarations) {\n      setInlineStyles(inlineDeclarations[id]);\n      delete inlineDeclarations[id].element.dataset.cssInlinerId;\n    }\n  }\n  function isInParentNode(parents, child) {\n    var node = child.parentNode;\n    while (node != null) {\n      if (parents.length) {\n        for (var i = 0; i < parents.length; i++) {\n          if (parents[i] == node) {\n            return true;\n          }\n        }\n      } else {\n        if (parents == node) {\n          return true;\n        }\n      }\n      node = node.parentNode;\n    }\n    return false;\n  }\n  function collapseSelectors() {\n    var collapsed = [];\n    for (var i = 0; i < document.styleSheets.length; i++) {\n      var cssRules = document.styleSheets[i].cssRules;\n      for (var j = 0; j < cssRules.length; j++) {\n        if (cssRules[j].selectorText != null) {\n          var selectors = cssRules[j].selectorText.split(\",\");\n          for (var k = 0; k < selectors.length; k++) {\n            collapsed.push({\n              selectorText: selectors[k].trim(),\n              style: cssRules[j].style\n            });\n          }\n        }\n      }\n    }\n    return collapsed;\n  }\n  function orderBySpecificity(selectors) {\n    var orderd = selectors.sort(function (a, b) {\n      return (0,_CSSSpecificity_js__WEBPACK_IMPORTED_MODULE_0__.compare)(a.selectorText, b.selectorText);\n    });\n    return orderd;\n  }\n  function backupInlineStyles(el) {\n    if (el.dataset.cssInlinerId == null) {\n      el.dataset.cssInlinerId = nextId;\n      inlineDeclarations[nextId] = {\n        element: el,\n        declaration: deepcopy(el.style),\n        important: copyImportant(el.style)\n      };\n      nextId++;\n    }\n  }\n  function deepcopy(obj) {\n    var newobj = {};\n    for (var key in obj) {\n      newobj[key] = obj[key];\n    }\n\n    // IE11 Compatibility\n    if (obj.length > 0 && !newobj[0]) {\n      for (var i = 0; i < obj.length; i++) {\n        newobj[i] = obj[i];\n      }\n    }\n    return newobj;\n  }\n  function copyImportant(declaration) {\n    var important = {};\n    for (var i = 0; i < declaration.length; i++) {\n      important[declaration[i]] = declaration.getPropertyPriority(declaration[i]);\n    }\n    return important;\n  }\n  function setStyles(el, declaration) {\n    for (var i = 0; i < declaration.length; i++) {\n      var styleName = declaration[i];\n      var property = declaration.getPropertyPriority(styleName);\n      if (el.style.getPropertyPriority(styleName) == \"important\" && property != \"important\") {\n        continue;\n      } else if (property == \"important\") {\n        el.style.setProperty(styleName, declaration[styleName], \"important\");\n      } else {\n        el.style[styleName] = declaration[styleName];\n      }\n    }\n  }\n  function setInlineStyles(inlineDeclaration) {\n    for (var i = 0; i < inlineDeclaration.declaration.length; i++) {\n      var declaration = inlineDeclaration.declaration;\n      var important = inlineDeclaration.important;\n      var el = inlineDeclaration.element;\n      var styleName = declaration[i];\n      var styleNameCamelcase = styleName.toLowerCase().replace(/[^a-zA-Z0-9]+(.)/g, function (m, c) {\n        return c.toUpperCase();\n      });\n      var property = important[styleName];\n      if (el.style.getPropertyPriority(styleName) == \"important\" && property != \"important\") {\n        continue;\n      } else if (property == \"important\") {\n        el.style.setProperty(styleName, declaration[styleNameCamelcase], \"important\");\n      } else {\n        el.style[styleName] = declaration[styleNameCamelcase];\n      }\n    }\n  }\n  CSSInliner.prototype.calculate = _CSSSpecificity_js__WEBPACK_IMPORTED_MODULE_0__.calculate;\n  CSSInliner.prototype.inlineAll = inlineAll;\n  CSSInliner.prototype.inline = inline;\n}\n/* harmony default export */ __webpack_exports__[\"default\"] = (CSSInliner);\n\n//# sourceURL=webpack://css-inliner/./src/CSSInliner.js?");

/***/ }),

/***/ "./src/CSSSpecificity.js":
/*!*******************************!*\
  !*** ./src/CSSSpecificity.js ***!
  \*******************************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"calculate\": function() { return /* binding */ calculate; },\n/* harmony export */   \"compare\": function() { return /* binding */ compare; }\n/* harmony export */ });\n/**\r\n * referenced in https://www.w3.org/TR/selectors-3/#specificity\r\n */\nfunction calculate(text) {\n  var score = {\n    A: 0,\n    B: 0,\n    C: 0\n  };\n  var tokens = tokenize(text);\n  var n = 0;\n  selector();\n  if (tokens[n]) {\n    throw \"unexpected symbol \" + tokens[n].value;\n  }\n  return score;\n  function accept(symbol) {\n    if (typeof symbol == \"string\") {\n      if (n < tokens.length && tokens[n].type == symbol) {\n        if (symbol == \"HASH\") {\n          score[\"A\"]++;\n        }\n        n++;\n        return true;\n      }\n    } else if (typeof symbol == \"function\") {\n      var start = n;\n      symbol();\n      if (start != n) {\n        return true;\n      }\n    }\n    return false;\n  }\n  function selector() {\n    accept(simple_selector_sequence);\n    while (accept(combinator)) {\n      accept(simple_selector_sequence);\n    }\n  }\n  function combinator() {\n    if (accept(\"PLUS\")) {\n      while (accept(\"S\"));\n    } else if (accept(\"GREATER\")) {\n      while (accept(\"S\"));\n    } else if (accept(\"TILDE\")) {\n      while (accept(\"S\"));\n    } else if (accept(\"S\")) {\n      while (accept(\"S\"));\n    }\n  }\n  function simple_selector_sequence() {\n    if (accept(type_selector) || accept(universal)) {\n      while (accept(\"HASH\") || accept(class_selector) || accept(attrib) || accept(pseudo) || accept(negation));\n    } else if (accept(\"HASH\") || accept(class_selector) || accept(attrib) || accept(pseudo) || accept(negation)) {\n      while (accept(\"HASH\") || accept(class_selector) || accept(attrib) || accept(pseudo) || accept(negation));\n    }\n  }\n  function type_selector() {\n    var start = n;\n    accept(namespace_prefix);\n    if (!accept(element_name)) {\n      n = start;\n    }\n    if (start != n) {\n      score[\"C\"]++;\n    }\n  }\n  function namespace_prefix() {\n    var start = n;\n    accept(\"IDENT\") || accept(\"ASTERLISK\");\n    if (!accept(\"PIPELINE\")) {\n      n = start;\n    }\n  }\n  function element_name() {\n    accept(\"IDENT\");\n  }\n  function universal() {\n    var start = n;\n    accept(namespace_prefix);\n    if (!accept(\"ASTERLISK\")) {\n      n = start;\n    }\n  }\n  function class_selector() {\n    if (accept(\"DOT\")) {\n      var start = n;\n      accept(\"IDENT\");\n      if (start != n) {\n        score[\"B\"]++;\n      }\n    }\n  }\n  function attrib() {\n    var start = n;\n    if (accept(\"LC\")) {\n      while (accept(\"S\"));\n      accept(namespace_prefix);\n      if (accept(\"IDENT\")) {\n        while (accept(\"S\"));\n        if (accept(\"PREFIXMATCH\") || accept(\"SUFFIXMATCH\") || accept(\"SUBSTRINGMATCH\") || accept(\"EQUAL\") || accept(\"INCLUDES\") || accept(\"DASHMATCH\")) {\n          while (accept(\"S\"));\n          if (accept(\"IDENT\") || accept(\"STRING\")) {\n            while (accept(\"S\"));\n          } else {\n            n = start;\n            return;\n          }\n        }\n        if (accept(\"RC\")) {\n          score[\"B\"]++;\n        } else {\n          n = start;\n          return;\n        }\n      } else {\n        n = start;\n        return;\n      }\n    }\n  }\n  function pseudo() {\n    var start = n;\n    if (accept(\"COLON\")) {\n      var isPseudoElement = accept(\"COLON\");\n      if (accept(\"IDENT\") || accept(functional_pseudo)) {\n        if (isPseudoElement) {\n          score[\"C\"]++;\n        } else {\n          score[\"B\"]++;\n        }\n      } else {\n        n = start;\n      }\n    }\n  }\n  function functional_pseudo() {\n    if (accept(\"FUNCTION\")) {\n      while (accept(\"S\"));\n      if (accept(expression)) {\n        accept(\"RCC\");\n      }\n    }\n  }\n  function expression() {\n    if (accept(\"PLUS\") || accept(\"MINUS\") || accept(\"DIMENSION\") || accept(\"NUMBER\") || accept(\"STRING\") || accept(\"IDENT\")) {\n      while (accept(\"S\"));\n      while (accept(\"PLUS\") || accept(\"MINUS\") || accept(\"DIMENSION\") || accept(\"NUMBER\") || accept(\"STRING\") || accept(\"IDENT\")) {\n        while (accept(\"S\"));\n      }\n    }\n  }\n  function negation() {\n    if (accept(\"NOT\")) {\n      while (accept(\"S\"));\n      if (accept(negation_arg)) {\n        while (accept(\"S\"));\n        accept(\"RCC\");\n      }\n    }\n  }\n  function negation_arg() {\n    accept(type_selector) || accept(universal) || accept(\"HASH\") || accept(class_selector) || accept(attrib) || accept(pseudo);\n  }\n}\nfunction tokenize(text) {\n  var tokens = [];\n  var rules = {\n    PIPELINE: /^\\|/,\n    INCLUDES: /^~=/,\n    DASHMATCH: /^\\|=/,\n    PREFIXMATCH: /^\\^=/,\n    SUFFIXMATCH: /^\\$=/,\n    SUBSTRINGMATCH: /^\\*=/,\n    DIMENSION: /^([0-9]+|[0-9]*\\.[0-9]+)([-]?([_a-z]|[^\\0-\\177]|\\\\[0-9a-f]{1,6}(\\r\\n|[ \\n\\r\\t\\f])?|\\\\[^\\n\\r\\f0-9a-f])([_a-z0-9-]|[^\\0-\\177]|\\\\[0-9a-f]{1,6}(\\r\\n|[ \\n\\r\\t\\f])?|\\\\[^\\n\\r\\f0-9a-f])*)/i,\n    ATKEYWORD: /^@([-]?([_a-z]|[^\\0-\\177]|\\\\[0-9a-f]{1,6}(\\r\\n|[ \\n\\r\\t\\f])?|\\\\[^\\n\\r\\f0-9a-f])([_a-z0-9-]|[^\\0-\\177]|\\\\[0-9a-f]{1,6}(\\r\\n|[ \\n\\r\\t\\f])?|\\\\[^\\n\\r\\f0-9a-f])*)/i,\n    FUNCTION: /^([-]?([_a-z]|[^\\0-\\177]|\\\\[0-9a-f]{1,6}(\\r\\n|[ \\n\\r\\t\\f])?|\\\\[^\\n\\r\\f0-9a-f])([_a-z0-9-]|[^\\0-\\177]|\\\\[0-9a-f]{1,6}(\\r\\n|[ \\n\\r\\t\\f])?|\\\\[^\\n\\r\\f0-9a-f])*)\\(/i,\n    IDENT: /^([-]?([_a-z]|[^\\0-\\177]|\\\\[0-9a-f]{1,6}(\\r\\n|[ \\n\\r\\t\\f])?|\\\\[^\\n\\r\\f0-9a-f])([_a-z0-9-]|[^\\0-\\177]|\\\\[0-9a-f]{1,6}(\\r\\n|[ \\n\\r\\t\\f])?|\\\\[^\\n\\r\\f0-9a-f])*)/i,\n    STRING: /^((\\\"([^\\n\\r\\f\\\\\"]|\\\\{nl}|[^\\0-\\177]|\\\\[0-9a-f]{1,6}(\\r\\n|[ \\n\\r\\t\\f])?|\\\\[^\\n\\r\\f0-9a-f])*\\\")|(\\'([^\\n\\r\\f\\\\']|\\\\{nl}|[^\\0-\\177]|\\\\[0-9a-f]{1,6}(\\r\\n|[ \\n\\r\\t\\f])?|\\\\[^\\n\\r\\f0-9a-f])*\\'))/i,\n    NUMBER: /^([0-9]+|[0-9]*\\.[0-9]+)/,\n    HASH: /^#(([_a-z0-9-]|[^\\0-\\177]|\\\\[0-9a-f]{1,6}(\\r\\n|[ \\n\\r\\t\\f])?|\\\\[^\\n\\r\\f0-9a-f])+)/i,\n    PLUS: /^([ \\t\\r\\n\\f]*)\\+/,\n    GREATER: /^([ \\t\\r\\n\\f]*)\\>/,\n    COMMA: /^([ \\t\\r\\n\\f]*)\\,/,\n    TILDE: /^([ \\t\\r\\n\\f]*)\\~/,\n    NOT: /^:(n|\\\\0{0,4}(4e|6e)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\n)(o|\\\\0{0,4}(4f|6f)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\o)(t|\\\\0{0,4}(54|74)(\\r\\n|[ \\t\\r\\n\\f])?|\\\\t)\\(/i,\n    INVALID: /^((\\\"([^\\n\\r\\f\\\\\"]|\\\\{nl}|[^\\0-\\177]|\\\\[0-9a-f]{1,6}(\\r\\n|[ \\n\\r\\t\\f])?|\\\\[^\\n\\r\\f0-9a-f])*)|(\\'([^\\n\\r\\f\\\\']|\\\\{nl}|[^\\0-\\177]|\\\\[0-9a-f]{1,6}(\\r\\n|[ \\n\\r\\t\\f])?|\\\\[^\\n\\r\\f0-9a-f])*))/i,\n    PERCENTAGE: /^([0-9]+|[0-9]*\\.[0-9]+)%/,\n    CDO: /^<!--/,\n    CDC: /^-->/,\n    EQUAL: /^=/,\n    ASTERLISK: /^\\*/,\n    LC: /^\\[/,\n    RC: /^\\]/,\n    RCC: /^\\)/,\n    DOT: /^\\./,\n    COLON: /^\\:/,\n    MINUS: /^\\-/,\n    S: /^[ \\t\\r\\n\\f]+/\n  };\n  var i = 0;\n  while (text != \"\" && i < 100) {\n    i++;\n    var index = 0;\n    for (var type in rules) {\n      if (rules[type].test(text)) {\n        var match = rules[type].exec(text);\n        tokens.push({\n          type: type,\n          value: match[0]\n        });\n        text = text.substring(match[0].length);\n        break;\n      }\n      index++;\n    }\n    if (Object.keys(rules).length <= index) {\n      console.error(\"unknown characters \\\"\" + text + \"\\\"\");\n      text = \"\";\n    }\n  }\n  return tokens;\n}\nfunction compare(a, b) {\n  var scoreA = calculate(a);\n  var scoreB = calculate(b);\n  if (scoreA.A > scoreB.A) {\n    return 1;\n  } else if (scoreA.A < scoreB.A) {\n    return -1;\n  } else if (scoreA.A == scoreB.A) {\n    if (scoreA.B > scoreB.B) {\n      return 1;\n    } else if (scoreA.B < scoreB.B) {\n      return -1;\n    } else if (scoreA.B == scoreB.B) {\n      if (scoreA.C > scoreB.C) {\n        return 1;\n      } else if (scoreA.C < scoreB.C) {\n        return -1;\n      } else if (scoreA.C == scoreB.C) {\n        return 0;\n      }\n    }\n  }\n}\n\n\n//# sourceURL=webpack://css-inliner/./src/CSSSpecificity.js?");

/***/ }),

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"CSSInliner\": function() { return /* reexport safe */ _CSSInliner_js__WEBPACK_IMPORTED_MODULE_0__[\"default\"]; }\n/* harmony export */ });\n/* harmony import */ var _CSSInliner_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./CSSInliner.js */ \"./src/CSSInliner.js\");\n\n\n\n//# sourceURL=webpack://css-inliner/./src/index.js?");

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
/******/ 	!function() {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = function(exports, definition) {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	!function() {
/******/ 		__webpack_require__.o = function(obj, prop) { return Object.prototype.hasOwnProperty.call(obj, prop); }
/******/ 	}();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	!function() {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = function(exports) {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	}();
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