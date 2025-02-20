/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
(() => {
var exports = {};
exports.id = "pages/_app";
exports.ids = ["pages/_app"];
exports.modules = {

/***/ "./context/ThemeContext.js":
/*!*********************************!*\
  !*** ./context/ThemeContext.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   ThemeContext: () => (/* binding */ ThemeContext),\n/* harmony export */   ThemeProvider: () => (/* binding */ ThemeProvider)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nconst ThemeContext = /*#__PURE__*/ (0,react__WEBPACK_IMPORTED_MODULE_1__.createContext)();\nfunction ThemeProvider({ children }) {\n    const [isDarkMode, setIsDarkMode] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)(true);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"ThemeProvider.useEffect\": ()=>{\n            const savedTheme = localStorage.getItem('theme');\n            if (savedTheme) {\n                const isDark = savedTheme === 'dark';\n                setIsDarkMode(isDark);\n                document.documentElement.classList.toggle('dark', isDark);\n            } else {\n                document.documentElement.classList.add('dark');\n            }\n        }\n    }[\"ThemeProvider.useEffect\"], []);\n    const toggleTheme = ()=>{\n        const newMode = !isDarkMode;\n        setIsDarkMode(newMode);\n        localStorage.setItem('theme', newMode ? 'dark' : 'light');\n        document.documentElement.classList.toggle('dark', newMode);\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(ThemeContext.Provider, {\n        value: {\n            isDarkMode,\n            toggleTheme\n        },\n        children: children\n    }, void 0, false, {\n        fileName: \"/Users/roycim/Documents/[10] Projects/Sharefolio code/test build/sharefoliobuildv2/context/ThemeContext.js\",\n        lineNumber: 27,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb250ZXh0L1RoZW1lQ29udGV4dC5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBQWlFO0FBRTFELE1BQU1JLDZCQUFlSCxvREFBYUEsR0FBRTtBQUVwQyxTQUFTSSxjQUFjLEVBQUVDLFFBQVEsRUFBRTtJQUN4QyxNQUFNLENBQUNDLFlBQVlDLGNBQWMsR0FBR04sK0NBQVFBLENBQUM7SUFFN0NDLGdEQUFTQTttQ0FBQztZQUNSLE1BQU1NLGFBQWFDLGFBQWFDLE9BQU8sQ0FBQztZQUN4QyxJQUFJRixZQUFZO2dCQUNkLE1BQU1HLFNBQVNILGVBQWU7Z0JBQzlCRCxjQUFjSTtnQkFDZEMsU0FBU0MsZUFBZSxDQUFDQyxTQUFTLENBQUNDLE1BQU0sQ0FBQyxRQUFRSjtZQUNwRCxPQUFPO2dCQUNMQyxTQUFTQyxlQUFlLENBQUNDLFNBQVMsQ0FBQ0UsR0FBRyxDQUFDO1lBQ3pDO1FBQ0Y7a0NBQUcsRUFBRTtJQUVMLE1BQU1DLGNBQWM7UUFDbEIsTUFBTUMsVUFBVSxDQUFDWjtRQUNqQkMsY0FBY1c7UUFDZFQsYUFBYVUsT0FBTyxDQUFDLFNBQVNELFVBQVUsU0FBUztRQUNqRE4sU0FBU0MsZUFBZSxDQUFDQyxTQUFTLENBQUNDLE1BQU0sQ0FBQyxRQUFRRztJQUNwRDtJQUVBLHFCQUNFLDhEQUFDZixhQUFhaUIsUUFBUTtRQUFDQyxPQUFPO1lBQUVmO1lBQVlXO1FBQVk7a0JBQ3JEWjs7Ozs7O0FBR1AiLCJzb3VyY2VzIjpbIi9Vc2Vycy9yb3ljaW0vRG9jdW1lbnRzL1sxMF0gUHJvamVjdHMvU2hhcmVmb2xpbyBjb2RlL3Rlc3QgYnVpbGQvc2hhcmVmb2xpb2J1aWxkdjIvY29udGV4dC9UaGVtZUNvbnRleHQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IGNyZWF0ZUNvbnRleHQsIHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCdcblxuZXhwb3J0IGNvbnN0IFRoZW1lQ29udGV4dCA9IGNyZWF0ZUNvbnRleHQoKVxuXG5leHBvcnQgZnVuY3Rpb24gVGhlbWVQcm92aWRlcih7IGNoaWxkcmVuIH0pIHtcbiAgY29uc3QgW2lzRGFya01vZGUsIHNldElzRGFya01vZGVdID0gdXNlU3RhdGUodHJ1ZSlcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHNhdmVkVGhlbWUgPSBsb2NhbFN0b3JhZ2UuZ2V0SXRlbSgndGhlbWUnKVxuICAgIGlmIChzYXZlZFRoZW1lKSB7XG4gICAgICBjb25zdCBpc0RhcmsgPSBzYXZlZFRoZW1lID09PSAnZGFyaydcbiAgICAgIHNldElzRGFya01vZGUoaXNEYXJrKVxuICAgICAgZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmNsYXNzTGlzdC50b2dnbGUoJ2RhcmsnLCBpc0RhcmspXG4gICAgfSBlbHNlIHtcbiAgICAgIGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5jbGFzc0xpc3QuYWRkKCdkYXJrJylcbiAgICB9XG4gIH0sIFtdKVxuXG4gIGNvbnN0IHRvZ2dsZVRoZW1lID0gKCkgPT4ge1xuICAgIGNvbnN0IG5ld01vZGUgPSAhaXNEYXJrTW9kZVxuICAgIHNldElzRGFya01vZGUobmV3TW9kZSlcbiAgICBsb2NhbFN0b3JhZ2Uuc2V0SXRlbSgndGhlbWUnLCBuZXdNb2RlID8gJ2RhcmsnIDogJ2xpZ2h0JylcbiAgICBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuY2xhc3NMaXN0LnRvZ2dsZSgnZGFyaycsIG5ld01vZGUpXG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxUaGVtZUNvbnRleHQuUHJvdmlkZXIgdmFsdWU9e3sgaXNEYXJrTW9kZSwgdG9nZ2xlVGhlbWUgfX0+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9UaGVtZUNvbnRleHQuUHJvdmlkZXI+XG4gIClcbn1cbiJdLCJuYW1lcyI6WyJSZWFjdCIsImNyZWF0ZUNvbnRleHQiLCJ1c2VTdGF0ZSIsInVzZUVmZmVjdCIsIlRoZW1lQ29udGV4dCIsIlRoZW1lUHJvdmlkZXIiLCJjaGlsZHJlbiIsImlzRGFya01vZGUiLCJzZXRJc0RhcmtNb2RlIiwic2F2ZWRUaGVtZSIsImxvY2FsU3RvcmFnZSIsImdldEl0ZW0iLCJpc0RhcmsiLCJkb2N1bWVudCIsImRvY3VtZW50RWxlbWVudCIsImNsYXNzTGlzdCIsInRvZ2dsZSIsImFkZCIsInRvZ2dsZVRoZW1lIiwibmV3TW9kZSIsInNldEl0ZW0iLCJQcm92aWRlciIsInZhbHVlIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./context/ThemeContext.js\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _context_ThemeContext__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../context/ThemeContext */ \"./context/ThemeContext.js\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_3__);\n// pages/_app.js\n\n\n\n\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_context_ThemeContext__WEBPACK_IMPORTED_MODULE_2__.ThemeProvider, {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n            ...pageProps\n        }, void 0, false, {\n            fileName: \"/Users/roycim/Documents/[10] Projects/Sharefolio code/test build/sharefoliobuildv2/pages/_app.js\",\n            lineNumber: 9,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"/Users/roycim/Documents/[10] Projects/Sharefolio code/test build/sharefoliobuildv2/pages/_app.js\",\n        lineNumber: 8,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQUEsZ0JBQWdCOztBQUNVO0FBQzhCO0FBQ3pCO0FBRS9CLFNBQVNFLE1BQU0sRUFBRUMsU0FBUyxFQUFFQyxTQUFTLEVBQUU7SUFDckMscUJBQ0UsOERBQUNILGdFQUFhQTtrQkFDWiw0RUFBQ0U7WUFBVyxHQUFHQyxTQUFTOzs7Ozs7Ozs7OztBQUc5QjtBQUVBLGlFQUFlRixLQUFLQSxFQUFDIiwic291cmNlcyI6WyIvVXNlcnMvcm95Y2ltL0RvY3VtZW50cy9bMTBdIFByb2plY3RzL1NoYXJlZm9saW8gY29kZS90ZXN0IGJ1aWxkL3NoYXJlZm9saW9idWlsZHYyL3BhZ2VzL19hcHAuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gcGFnZXMvX2FwcC5qc1xuaW1wb3J0IFJlYWN0IGZyb20gXCJyZWFjdFwiO1xuaW1wb3J0IHsgVGhlbWVQcm92aWRlciB9IGZyb20gXCIuLi9jb250ZXh0L1RoZW1lQ29udGV4dFwiO1xuaW1wb3J0IFwiLi4vc3R5bGVzL2dsb2JhbHMuY3NzXCI7XG5cbmZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkge1xuICByZXR1cm4gKFxuICAgIDxUaGVtZVByb3ZpZGVyPlxuICAgICAgPENvbXBvbmVudCB7Li4ucGFnZVByb3BzfSAvPlxuICAgIDwvVGhlbWVQcm92aWRlcj5cbiAgKTtcbn1cblxuZXhwb3J0IGRlZmF1bHQgTXlBcHA7XG4iXSwibmFtZXMiOlsiUmVhY3QiLCJUaGVtZVByb3ZpZGVyIiwiTXlBcHAiLCJDb21wb25lbnQiLCJwYWdlUHJvcHMiXSwiaWdub3JlTGlzdCI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("./pages/_app.js"));
module.exports = __webpack_exports__;

})();