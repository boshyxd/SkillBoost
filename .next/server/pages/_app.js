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

/***/ "./components/ErrorBoundary.js":
/*!*************************************!*\
  !*** ./components/ErrorBoundary.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n\n\nclass ErrorBoundary extends (react__WEBPACK_IMPORTED_MODULE_1___default().Component) {\n    constructor(props){\n        super(props);\n        this.state = {\n            hasError: false\n        };\n    }\n    static getDerivedStateFromError(error) {\n        return {\n            hasError: true\n        };\n    }\n    componentDidCatch(error, errorInfo) {\n        console.error(\"Uncaught error:\", error, errorInfo);\n    }\n    render() {\n        if (this.state.hasError) {\n            return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n                children: \"Something went wrong. Please try refreshing the page.\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\poiso\\\\Documents\\\\SkillBoost\\\\components\\\\ErrorBoundary.js\",\n                lineNumber: 19,\n                columnNumber: 14\n            }, this);\n        }\n        return this.props.children;\n    }\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ErrorBoundary);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL0Vycm9yQm91bmRhcnkuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQTBCO0FBRTFCLE1BQU1DLHNCQUFzQkQsd0RBQWU7SUFDekNHLFlBQVlDLEtBQUssQ0FBRTtRQUNqQixLQUFLLENBQUNBO1FBQ04sSUFBSSxDQUFDQyxLQUFLLEdBQUc7WUFBRUMsVUFBVTtRQUFNO0lBQ2pDO0lBRUEsT0FBT0MseUJBQXlCQyxLQUFLLEVBQUU7UUFDckMsT0FBTztZQUFFRixVQUFVO1FBQUs7SUFDMUI7SUFFQUcsa0JBQWtCRCxLQUFLLEVBQUVFLFNBQVMsRUFBRTtRQUNsQ0MsUUFBUUgsS0FBSyxDQUFDLG1CQUFtQkEsT0FBT0U7SUFDMUM7SUFFQUUsU0FBUztRQUNQLElBQUksSUFBSSxDQUFDUCxLQUFLLENBQUNDLFFBQVEsRUFBRTtZQUN2QixxQkFBTyw4REFBQ087MEJBQUc7Ozs7OztRQUNiO1FBRUEsT0FBTyxJQUFJLENBQUNULEtBQUssQ0FBQ1UsUUFBUTtJQUM1QjtBQUNGO0FBRUEsaUVBQWViLGFBQWFBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL0Vycm9yQm91bmRhcnkuanM/YzlhYiJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5cclxuY2xhc3MgRXJyb3JCb3VuZGFyeSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudCB7XHJcbiAgY29uc3RydWN0b3IocHJvcHMpIHtcclxuICAgIHN1cGVyKHByb3BzKTtcclxuICAgIHRoaXMuc3RhdGUgPSB7IGhhc0Vycm9yOiBmYWxzZSB9O1xyXG4gIH1cclxuXHJcbiAgc3RhdGljIGdldERlcml2ZWRTdGF0ZUZyb21FcnJvcihlcnJvcikge1xyXG4gICAgcmV0dXJuIHsgaGFzRXJyb3I6IHRydWUgfTtcclxuICB9XHJcblxyXG4gIGNvbXBvbmVudERpZENhdGNoKGVycm9yLCBlcnJvckluZm8pIHtcclxuICAgIGNvbnNvbGUuZXJyb3IoXCJVbmNhdWdodCBlcnJvcjpcIiwgZXJyb3IsIGVycm9ySW5mbyk7XHJcbiAgfVxyXG5cclxuICByZW5kZXIoKSB7XHJcbiAgICBpZiAodGhpcy5zdGF0ZS5oYXNFcnJvcikge1xyXG4gICAgICByZXR1cm4gPGgxPlNvbWV0aGluZyB3ZW50IHdyb25nLiBQbGVhc2UgdHJ5IHJlZnJlc2hpbmcgdGhlIHBhZ2UuPC9oMT47XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHRoaXMucHJvcHMuY2hpbGRyZW47XHJcbiAgfVxyXG59XHJcblxyXG5leHBvcnQgZGVmYXVsdCBFcnJvckJvdW5kYXJ5OyJdLCJuYW1lcyI6WyJSZWFjdCIsIkVycm9yQm91bmRhcnkiLCJDb21wb25lbnQiLCJjb25zdHJ1Y3RvciIsInByb3BzIiwic3RhdGUiLCJoYXNFcnJvciIsImdldERlcml2ZWRTdGF0ZUZyb21FcnJvciIsImVycm9yIiwiY29tcG9uZW50RGlkQ2F0Y2giLCJlcnJvckluZm8iLCJjb25zb2xlIiwicmVuZGVyIiwiaDEiLCJjaGlsZHJlbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/ErrorBoundary.js\n");

/***/ }),

/***/ "./components/layout/Footer.js":
/*!*************************************!*\
  !*** ./components/layout/Footer.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Footer)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction Footer() {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"footer\", {\n        className: \"bg-gray-200 p-4 text-center\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"p\", {\n            children: \"\\xa9 2023 SkillBoost. All rights reserved.\"\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\poiso\\\\Documents\\\\SkillBoost\\\\components\\\\layout\\\\Footer.js\",\n            lineNumber: 4,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\poiso\\\\Documents\\\\SkillBoost\\\\components\\\\layout\\\\Footer.js\",\n        lineNumber: 3,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL2xheW91dC9Gb290ZXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFlLFNBQVNBO0lBQ3RCLHFCQUNFLDhEQUFDQztRQUFPQyxXQUFVO2tCQUNoQiw0RUFBQ0M7c0JBQUU7Ozs7Ozs7Ozs7O0FBR1QiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL2xheW91dC9Gb290ZXIuanM/NzI5OCJdLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBGb290ZXIoKSB7XHJcbiAgcmV0dXJuIChcclxuICAgIDxmb290ZXIgY2xhc3NOYW1lPVwiYmctZ3JheS0yMDAgcC00IHRleHQtY2VudGVyXCI+XHJcbiAgICAgIDxwPiZjb3B5OyAyMDIzIFNraWxsQm9vc3QuIEFsbCByaWdodHMgcmVzZXJ2ZWQuPC9wPlxyXG4gICAgPC9mb290ZXI+XHJcbiAgKVxyXG59XHJcbiJdLCJuYW1lcyI6WyJGb290ZXIiLCJmb290ZXIiLCJjbGFzc05hbWUiLCJwIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/layout/Footer.js\n");

/***/ }),

/***/ "./components/layout/Header.js":
/*!*************************************!*\
  !*** ./components/layout/Header.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Header)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n\nfunction Header() {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"header\", {\n        className: \"bg-blue-500 text-white p-4\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h1\", {\n            className: \"text-2xl font-bold\",\n            children: \"SkillBoost\"\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\poiso\\\\Documents\\\\SkillBoost\\\\components\\\\layout\\\\Header.js\",\n            lineNumber: 4,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\poiso\\\\Documents\\\\SkillBoost\\\\components\\\\layout\\\\Header.js\",\n        lineNumber: 3,\n        columnNumber: 5\n    }, this);\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL2xheW91dC9IZWFkZXIuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFlLFNBQVNBO0lBQ3RCLHFCQUNFLDhEQUFDQztRQUFPQyxXQUFVO2tCQUNoQiw0RUFBQ0M7WUFBR0QsV0FBVTtzQkFBcUI7Ozs7Ozs7Ozs7O0FBR3pDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9sYXlvdXQvSGVhZGVyLmpzPzVlZWQiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gSGVhZGVyKCkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8aGVhZGVyIGNsYXNzTmFtZT1cImJnLWJsdWUtNTAwIHRleHQtd2hpdGUgcC00XCI+XHJcbiAgICAgIDxoMSBjbGFzc05hbWU9XCJ0ZXh0LTJ4bCBmb250LWJvbGRcIj5Ta2lsbEJvb3N0PC9oMT5cclxuICAgIDwvaGVhZGVyPlxyXG4gIClcclxufVxyXG4iXSwibmFtZXMiOlsiSGVhZGVyIiwiaGVhZGVyIiwiY2xhc3NOYW1lIiwiaDEiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./components/layout/Header.js\n");

/***/ }),

/***/ "./components/layout/Layout.js":
/*!*************************************!*\
  !*** ./components/layout/Layout.js ***!
  \*************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ Layout)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _Header__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Header */ \"./components/layout/Header.js\");\n/* harmony import */ var _Footer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Footer */ \"./components/layout/Footer.js\");\n/* harmony import */ var _navigation_BottomNav__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../navigation/BottomNav */ \"./components/navigation/BottomNav.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_navigation_BottomNav__WEBPACK_IMPORTED_MODULE_3__]);\n_navigation_BottomNav__WEBPACK_IMPORTED_MODULE_3__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\nfunction Layout({ children }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex flex-col min-h-screen\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Header__WEBPACK_IMPORTED_MODULE_1__[\"default\"], {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\poiso\\\\Documents\\\\SkillBoost\\\\components\\\\layout\\\\Layout.js\",\n                lineNumber: 8,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"main\", {\n                className: \"flex-grow mb-16\",\n                children: children\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\poiso\\\\Documents\\\\SkillBoost\\\\components\\\\layout\\\\Layout.js\",\n                lineNumber: 9,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_navigation_BottomNav__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\poiso\\\\Documents\\\\SkillBoost\\\\components\\\\layout\\\\Layout.js\",\n                lineNumber: 10,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_Footer__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n                fileName: \"C:\\\\Users\\\\poiso\\\\Documents\\\\SkillBoost\\\\components\\\\layout\\\\Layout.js\",\n                lineNumber: 11,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\poiso\\\\Documents\\\\SkillBoost\\\\components\\\\layout\\\\Layout.js\",\n        lineNumber: 7,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL2xheW91dC9MYXlvdXQuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUE2QjtBQUNBO0FBQ2tCO0FBRWhDLFNBQVNHLE9BQU8sRUFBRUMsUUFBUSxFQUFFO0lBQ3pDLHFCQUNFLDhEQUFDQztRQUFJQyxXQUFVOzswQkFDYiw4REFBQ04sK0NBQU1BOzs7OzswQkFDUCw4REFBQ087Z0JBQUtELFdBQVU7MEJBQW1CRjs7Ozs7OzBCQUNuQyw4REFBQ0YsNkRBQVNBOzs7OzswQkFDViw4REFBQ0QsK0NBQU1BOzs7Ozs7Ozs7OztBQUdiIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9sYXlvdXQvTGF5b3V0LmpzP2MwZjMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IEhlYWRlciBmcm9tICcuL0hlYWRlcidcclxuaW1wb3J0IEZvb3RlciBmcm9tICcuL0Zvb3RlcidcclxuaW1wb3J0IEJvdHRvbU5hdiBmcm9tICcuLi9uYXZpZ2F0aW9uL0JvdHRvbU5hdidcclxuXHJcbmV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIExheW91dCh7IGNoaWxkcmVuIH0pIHtcclxuICByZXR1cm4gKFxyXG4gICAgPGRpdiBjbGFzc05hbWU9XCJmbGV4IGZsZXgtY29sIG1pbi1oLXNjcmVlblwiPlxyXG4gICAgICA8SGVhZGVyIC8+XHJcbiAgICAgIDxtYWluIGNsYXNzTmFtZT1cImZsZXgtZ3JvdyBtYi0xNlwiPntjaGlsZHJlbn08L21haW4+XHJcbiAgICAgIDxCb3R0b21OYXYgLz5cclxuICAgICAgPEZvb3RlciAvPlxyXG4gICAgPC9kaXY+XHJcbiAgKVxyXG59Il0sIm5hbWVzIjpbIkhlYWRlciIsIkZvb3RlciIsIkJvdHRvbU5hdiIsIkxheW91dCIsImNoaWxkcmVuIiwiZGl2IiwiY2xhc3NOYW1lIiwibWFpbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/layout/Layout.js\n");

/***/ }),

/***/ "./components/navigation/AuthNav.js":
/*!******************************************!*\
  !*** ./components/navigation/AuthNav.js ***!
  \******************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ AuthNav)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _hooks_useAuth__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../hooks/useAuth */ \"./hooks/useAuth.js\");\n/* harmony import */ var _lib_firebase__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../lib/firebase */ \"./lib/firebase.js\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! firebase/auth */ \"firebase/auth\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_5__);\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_hooks_useAuth__WEBPACK_IMPORTED_MODULE_2__, _lib_firebase__WEBPACK_IMPORTED_MODULE_3__, firebase_auth__WEBPACK_IMPORTED_MODULE_4__]);\n([_hooks_useAuth__WEBPACK_IMPORTED_MODULE_2__, _lib_firebase__WEBPACK_IMPORTED_MODULE_3__, firebase_auth__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\n\nfunction AuthNav() {\n    const { user } = (0,_hooks_useAuth__WEBPACK_IMPORTED_MODULE_2__.useAuth)();\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_5__.useRouter)();\n    const handleLogout = async ()=>{\n        try {\n            await (0,firebase_auth__WEBPACK_IMPORTED_MODULE_4__.signOut)(_lib_firebase__WEBPACK_IMPORTED_MODULE_3__.auth);\n            router.push(\"/\");\n        } catch (error) {\n            console.error(\"Error signing out:\", error);\n        }\n    };\n    if (user) {\n        return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n            onClick: handleLogout,\n            className: \"flex flex-col items-center p-2 text-gray-500\",\n            children: [\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                    className: \"text-2xl\",\n                    children: \"\\uD83D\\uDEAA\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\poiso\\\\Documents\\\\SkillBoost\\\\components\\\\navigation\\\\AuthNav.js\",\n                    lineNumber: 26,\n                    columnNumber: 9\n                }, this),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                    className: \"text-xs mt-1\",\n                    children: \"Logout\"\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\poiso\\\\Documents\\\\SkillBoost\\\\components\\\\navigation\\\\AuthNav.js\",\n                    lineNumber: 27,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\poiso\\\\Documents\\\\SkillBoost\\\\components\\\\navigation\\\\AuthNav.js\",\n            lineNumber: 22,\n            columnNumber: 7\n        }, this);\n    }\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: \"flex flex-col items-center p-2\",\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                href: \"/login\",\n                className: \"text-blue-500 hover:underline text-xs\",\n                children: \"Login\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\poiso\\\\Documents\\\\SkillBoost\\\\components\\\\navigation\\\\AuthNav.js\",\n                lineNumber: 34,\n                columnNumber: 7\n            }, this),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                href: \"/register\",\n                className: \"text-green-500 hover:underline text-xs mt-1\",\n                children: \"Register\"\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\poiso\\\\Documents\\\\SkillBoost\\\\components\\\\navigation\\\\AuthNav.js\",\n                lineNumber: 37,\n                columnNumber: 7\n            }, this)\n        ]\n    }, void 0, true, {\n        fileName: \"C:\\\\Users\\\\poiso\\\\Documents\\\\SkillBoost\\\\components\\\\navigation\\\\AuthNav.js\",\n        lineNumber: 33,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL25hdmlnYXRpb24vQXV0aE5hdi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQUE0QjtBQUNpQjtBQUNKO0FBQ0Y7QUFDQTtBQUV4QixTQUFTSztJQUN0QixNQUFNLEVBQUVDLElBQUksRUFBRSxHQUFHTCx1REFBT0E7SUFDeEIsTUFBTU0sU0FBU0gsc0RBQVNBO0lBRXhCLE1BQU1JLGVBQWU7UUFDbkIsSUFBSTtZQUNGLE1BQU1MLHNEQUFPQSxDQUFDRCwrQ0FBSUE7WUFDbEJLLE9BQU9FLElBQUksQ0FBQztRQUNkLEVBQUUsT0FBT0MsT0FBTztZQUNkQyxRQUFRRCxLQUFLLENBQUMsc0JBQXNCQTtRQUN0QztJQUNGO0lBRUEsSUFBSUosTUFBTTtRQUNSLHFCQUNFLDhEQUFDTTtZQUNDQyxTQUFTTDtZQUNUTSxXQUFVOzs4QkFFViw4REFBQ0M7b0JBQUtELFdBQVU7OEJBQVc7Ozs7Ozs4QkFDM0IsOERBQUNDO29CQUFLRCxXQUFVOzhCQUFlOzs7Ozs7Ozs7Ozs7SUFHckM7SUFFQSxxQkFDRSw4REFBQ0U7UUFBSUYsV0FBVTs7MEJBQ2IsOERBQUNkLGtEQUFJQTtnQkFBQ2lCLE1BQUs7Z0JBQVNILFdBQVU7MEJBQXdDOzs7Ozs7MEJBR3RFLDhEQUFDZCxrREFBSUE7Z0JBQUNpQixNQUFLO2dCQUFZSCxXQUFVOzBCQUE4Qzs7Ozs7Ozs7Ozs7O0FBS3JGIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vLy4vY29tcG9uZW50cy9uYXZpZ2F0aW9uL0F1dGhOYXYuanM/ZWYxOSJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTGluayBmcm9tICduZXh0L2xpbmsnXHJcbmltcG9ydCB7IHVzZUF1dGggfSBmcm9tICcuLi8uLi9ob29rcy91c2VBdXRoJ1xyXG5pbXBvcnQgeyBhdXRoIH0gZnJvbSAnLi4vLi4vbGliL2ZpcmViYXNlJ1xyXG5pbXBvcnQgeyBzaWduT3V0IH0gZnJvbSAnZmlyZWJhc2UvYXV0aCdcclxuaW1wb3J0IHsgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9yb3V0ZXInXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBBdXRoTmF2KCkge1xyXG4gIGNvbnN0IHsgdXNlciB9ID0gdXNlQXV0aCgpXHJcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKClcclxuXHJcbiAgY29uc3QgaGFuZGxlTG9nb3V0ID0gYXN5bmMgKCkgPT4ge1xyXG4gICAgdHJ5IHtcclxuICAgICAgYXdhaXQgc2lnbk91dChhdXRoKVxyXG4gICAgICByb3V0ZXIucHVzaCgnLycpXHJcbiAgICB9IGNhdGNoIChlcnJvcikge1xyXG4gICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBzaWduaW5nIG91dDonLCBlcnJvcilcclxuICAgIH1cclxuICB9XHJcblxyXG4gIGlmICh1c2VyKSB7XHJcbiAgICByZXR1cm4gKFxyXG4gICAgICA8YnV0dG9uXHJcbiAgICAgICAgb25DbGljaz17aGFuZGxlTG9nb3V0fVxyXG4gICAgICAgIGNsYXNzTmFtZT1cImZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIHAtMiB0ZXh0LWdyYXktNTAwXCJcclxuICAgICAgPlxyXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQtMnhsXCI+8J+aqjwvc3Bhbj5cclxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LXhzIG10LTFcIj5Mb2dvdXQ8L3NwYW4+XHJcbiAgICAgIDwvYnV0dG9uPlxyXG4gICAgKVxyXG4gIH1cclxuXHJcbiAgcmV0dXJuIChcclxuICAgIDxkaXYgY2xhc3NOYW1lPVwiZmxleCBmbGV4LWNvbCBpdGVtcy1jZW50ZXIgcC0yXCI+XHJcbiAgICAgIDxMaW5rIGhyZWY9XCIvbG9naW5cIiBjbGFzc05hbWU9XCJ0ZXh0LWJsdWUtNTAwIGhvdmVyOnVuZGVybGluZSB0ZXh0LXhzXCI+XHJcbiAgICAgICAgTG9naW5cclxuICAgICAgPC9MaW5rPlxyXG4gICAgICA8TGluayBocmVmPVwiL3JlZ2lzdGVyXCIgY2xhc3NOYW1lPVwidGV4dC1ncmVlbi01MDAgaG92ZXI6dW5kZXJsaW5lIHRleHQteHMgbXQtMVwiPlxyXG4gICAgICAgIFJlZ2lzdGVyXHJcbiAgICAgIDwvTGluaz5cclxuICAgIDwvZGl2PlxyXG4gIClcclxufSJdLCJuYW1lcyI6WyJMaW5rIiwidXNlQXV0aCIsImF1dGgiLCJzaWduT3V0IiwidXNlUm91dGVyIiwiQXV0aE5hdiIsInVzZXIiLCJyb3V0ZXIiLCJoYW5kbGVMb2dvdXQiLCJwdXNoIiwiZXJyb3IiLCJjb25zb2xlIiwiYnV0dG9uIiwib25DbGljayIsImNsYXNzTmFtZSIsInNwYW4iLCJkaXYiLCJocmVmIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./components/navigation/AuthNav.js\n");

/***/ }),

/***/ "./components/navigation/BottomNav.js":
/*!********************************************!*\
  !*** ./components/navigation/BottomNav.js ***!
  \********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* binding */ BottomNav)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next/link */ \"./node_modules/next/link.js\");\n/* harmony import */ var next_link__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_link__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/router */ \"./node_modules/next/router.js\");\n/* harmony import */ var next_router__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_router__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _hooks_useAuth__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../hooks/useAuth */ \"./hooks/useAuth.js\");\n/* harmony import */ var _AuthNav__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./AuthNav */ \"./components/navigation/AuthNav.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_hooks_useAuth__WEBPACK_IMPORTED_MODULE_3__, _AuthNav__WEBPACK_IMPORTED_MODULE_4__]);\n([_hooks_useAuth__WEBPACK_IMPORTED_MODULE_3__, _AuthNav__WEBPACK_IMPORTED_MODULE_4__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n\n\nconst navItems = [\n    {\n        href: \"/\",\n        label: \"Home\",\n        icon: \"\\uD83C\\uDFE0\"\n    },\n    {\n        href: \"/explore\",\n        label: \"Explore\",\n        icon: \"\\uD83D\\uDD0D\"\n    },\n    {\n        href: \"/progress\",\n        label: \"Progress\",\n        icon: \"\\uD83D\\uDCCA\"\n    },\n    {\n        href: \"/profile\",\n        label: \"Profile\",\n        icon: \"\\uD83D\\uDC64\"\n    }\n];\nfunction BottomNav() {\n    const router = (0,next_router__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const { user } = (0,_hooks_useAuth__WEBPACK_IMPORTED_MODULE_3__.useAuth)();\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"nav\", {\n        className: \"fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200\",\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"ul\", {\n            className: \"flex justify-around items-center h-16\",\n            children: [\n                navItems.map((item)=>/*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)((next_link__WEBPACK_IMPORTED_MODULE_1___default()), {\n                            href: item.href,\n                            className: `flex flex-col items-center p-2 ${router.pathname === item.href ? \"text-blue-500\" : \"text-gray-500\"}`,\n                            children: [\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                    className: \"text-2xl\",\n                                    children: item.icon\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\poiso\\\\Documents\\\\SkillBoost\\\\components\\\\navigation\\\\BottomNav.js\",\n                                    lineNumber: 25,\n                                    columnNumber: 15\n                                }, this),\n                                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"span\", {\n                                    className: \"text-xs mt-1\",\n                                    children: item.label\n                                }, void 0, false, {\n                                    fileName: \"C:\\\\Users\\\\poiso\\\\Documents\\\\SkillBoost\\\\components\\\\navigation\\\\BottomNav.js\",\n                                    lineNumber: 26,\n                                    columnNumber: 15\n                                }, this)\n                            ]\n                        }, void 0, true, {\n                            fileName: \"C:\\\\Users\\\\poiso\\\\Documents\\\\SkillBoost\\\\components\\\\navigation\\\\BottomNav.js\",\n                            lineNumber: 22,\n                            columnNumber: 13\n                        }, this)\n                    }, item.href, false, {\n                        fileName: \"C:\\\\Users\\\\poiso\\\\Documents\\\\SkillBoost\\\\components\\\\navigation\\\\BottomNav.js\",\n                        lineNumber: 21,\n                        columnNumber: 11\n                    }, this)),\n                /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"li\", {\n                    children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_AuthNav__WEBPACK_IMPORTED_MODULE_4__[\"default\"], {}, void 0, false, {\n                        fileName: \"C:\\\\Users\\\\poiso\\\\Documents\\\\SkillBoost\\\\components\\\\navigation\\\\BottomNav.js\",\n                        lineNumber: 31,\n                        columnNumber: 11\n                    }, this)\n                }, void 0, false, {\n                    fileName: \"C:\\\\Users\\\\poiso\\\\Documents\\\\SkillBoost\\\\components\\\\navigation\\\\BottomNav.js\",\n                    lineNumber: 30,\n                    columnNumber: 9\n                }, this)\n            ]\n        }, void 0, true, {\n            fileName: \"C:\\\\Users\\\\poiso\\\\Documents\\\\SkillBoost\\\\components\\\\navigation\\\\BottomNav.js\",\n            lineNumber: 19,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\poiso\\\\Documents\\\\SkillBoost\\\\components\\\\navigation\\\\BottomNav.js\",\n        lineNumber: 18,\n        columnNumber: 5\n    }, this);\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9jb21wb25lbnRzL25hdmlnYXRpb24vQm90dG9tTmF2LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBNEI7QUFDVztBQUNNO0FBQ2Q7QUFFL0IsTUFBTUksV0FBVztJQUNmO1FBQUVDLE1BQU07UUFBS0MsT0FBTztRQUFRQyxNQUFNO0lBQUs7SUFDdkM7UUFBRUYsTUFBTTtRQUFZQyxPQUFPO1FBQVdDLE1BQU07SUFBSztJQUNqRDtRQUFFRixNQUFNO1FBQWFDLE9BQU87UUFBWUMsTUFBTTtJQUFLO0lBQ25EO1FBQUVGLE1BQU07UUFBWUMsT0FBTztRQUFXQyxNQUFNO0lBQUs7Q0FDbEQ7QUFFYyxTQUFTQztJQUN0QixNQUFNQyxTQUFTUixzREFBU0E7SUFDeEIsTUFBTSxFQUFFUyxJQUFJLEVBQUUsR0FBR1IsdURBQU9BO0lBRXhCLHFCQUNFLDhEQUFDUztRQUFJQyxXQUFVO2tCQUNiLDRFQUFDQztZQUFHRCxXQUFVOztnQkFDWFIsU0FBU1UsR0FBRyxDQUFDLENBQUNDLHFCQUNiLDhEQUFDQztrQ0FDQyw0RUFBQ2hCLGtEQUFJQTs0QkFBQ0ssTUFBTVUsS0FBS1YsSUFBSTs0QkFBRU8sV0FBVyxDQUFDLCtCQUErQixFQUNoRUgsT0FBT1EsUUFBUSxLQUFLRixLQUFLVixJQUFJLEdBQUcsa0JBQWtCLGdCQUNuRCxDQUFDOzs4Q0FDQSw4REFBQ2E7b0NBQUtOLFdBQVU7OENBQVlHLEtBQUtSLElBQUk7Ozs7Ozs4Q0FDckMsOERBQUNXO29DQUFLTixXQUFVOzhDQUFnQkcsS0FBS1QsS0FBSzs7Ozs7Ozs7Ozs7O3VCQUxyQ1MsS0FBS1YsSUFBSTs7Ozs7OEJBU3BCLDhEQUFDVzs4QkFDQyw0RUFBQ2IsZ0RBQU9BOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFLbEIiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vLi9jb21wb25lbnRzL25hdmlnYXRpb24vQm90dG9tTmF2LmpzP2I5MDQiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IExpbmsgZnJvbSAnbmV4dC9saW5rJ1xyXG5pbXBvcnQgeyB1c2VSb3V0ZXIgfSBmcm9tICduZXh0L3JvdXRlcidcclxuaW1wb3J0IHsgdXNlQXV0aCB9IGZyb20gJy4uLy4uL2hvb2tzL3VzZUF1dGgnXHJcbmltcG9ydCBBdXRoTmF2IGZyb20gJy4vQXV0aE5hdidcclxuXHJcbmNvbnN0IG5hdkl0ZW1zID0gW1xyXG4gIHsgaHJlZjogJy8nLCBsYWJlbDogJ0hvbWUnLCBpY29uOiAn8J+PoCcgfSxcclxuICB7IGhyZWY6ICcvZXhwbG9yZScsIGxhYmVsOiAnRXhwbG9yZScsIGljb246ICfwn5SNJyB9LFxyXG4gIHsgaHJlZjogJy9wcm9ncmVzcycsIGxhYmVsOiAnUHJvZ3Jlc3MnLCBpY29uOiAn8J+TiicgfSxcclxuICB7IGhyZWY6ICcvcHJvZmlsZScsIGxhYmVsOiAnUHJvZmlsZScsIGljb246ICfwn5GkJyB9LFxyXG5dXHJcblxyXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBCb3R0b21OYXYoKSB7XHJcbiAgY29uc3Qgcm91dGVyID0gdXNlUm91dGVyKClcclxuICBjb25zdCB7IHVzZXIgfSA9IHVzZUF1dGgoKVxyXG5cclxuICByZXR1cm4gKFxyXG4gICAgPG5hdiBjbGFzc05hbWU9XCJmaXhlZCBib3R0b20tMCBsZWZ0LTAgcmlnaHQtMCBiZy13aGl0ZSBib3JkZXItdCBib3JkZXItZ3JheS0yMDBcIj5cclxuICAgICAgPHVsIGNsYXNzTmFtZT1cImZsZXgganVzdGlmeS1hcm91bmQgaXRlbXMtY2VudGVyIGgtMTZcIj5cclxuICAgICAgICB7bmF2SXRlbXMubWFwKChpdGVtKSA9PiAoXHJcbiAgICAgICAgICA8bGkga2V5PXtpdGVtLmhyZWZ9PlxyXG4gICAgICAgICAgICA8TGluayBocmVmPXtpdGVtLmhyZWZ9IGNsYXNzTmFtZT17YGZsZXggZmxleC1jb2wgaXRlbXMtY2VudGVyIHAtMiAke1xyXG4gICAgICAgICAgICAgIHJvdXRlci5wYXRobmFtZSA9PT0gaXRlbS5ocmVmID8gJ3RleHQtYmx1ZS01MDAnIDogJ3RleHQtZ3JheS01MDAnXHJcbiAgICAgICAgICAgIH1gfT5cclxuICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJ0ZXh0LTJ4bFwiPntpdGVtLmljb259PC9zcGFuPlxyXG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cInRleHQteHMgbXQtMVwiPntpdGVtLmxhYmVsfTwvc3Bhbj5cclxuICAgICAgICAgICAgPC9MaW5rPlxyXG4gICAgICAgICAgPC9saT5cclxuICAgICAgICApKX1cclxuICAgICAgICA8bGk+XHJcbiAgICAgICAgICA8QXV0aE5hdiAvPlxyXG4gICAgICAgIDwvbGk+XHJcbiAgICAgIDwvdWw+XHJcbiAgICA8L25hdj5cclxuICApXHJcbn1cclxuIl0sIm5hbWVzIjpbIkxpbmsiLCJ1c2VSb3V0ZXIiLCJ1c2VBdXRoIiwiQXV0aE5hdiIsIm5hdkl0ZW1zIiwiaHJlZiIsImxhYmVsIiwiaWNvbiIsIkJvdHRvbU5hdiIsInJvdXRlciIsInVzZXIiLCJuYXYiLCJjbGFzc05hbWUiLCJ1bCIsIm1hcCIsIml0ZW0iLCJsaSIsInBhdGhuYW1lIiwic3BhbiJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///./components/navigation/BottomNav.js\n");

/***/ }),

/***/ "./hooks/useAuth.js":
/*!**************************!*\
  !*** ./hooks/useAuth.js ***!
  \**************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   useAuth: () => (/* binding */ useAuth)\n/* harmony export */ });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/auth */ \"firebase/auth\");\n/* harmony import */ var _lib_firebase__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../lib/firebase */ \"./lib/firebase.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_auth__WEBPACK_IMPORTED_MODULE_1__, _lib_firebase__WEBPACK_IMPORTED_MODULE_2__]);\n([firebase_auth__WEBPACK_IMPORTED_MODULE_1__, _lib_firebase__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\nfunction useAuth() {\n    const [user, setUser] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(null);\n    const [loading, setLoading] = (0,react__WEBPACK_IMPORTED_MODULE_0__.useState)(true);\n    (0,react__WEBPACK_IMPORTED_MODULE_0__.useEffect)(()=>{\n        const unsubscribe = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.onAuthStateChanged)(_lib_firebase__WEBPACK_IMPORTED_MODULE_2__.auth, (user)=>{\n            setUser(user);\n            setLoading(false);\n        });\n        return ()=>unsubscribe();\n    }, []);\n    return {\n        user,\n        loading\n    };\n}\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9ob29rcy91c2VBdXRoLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O0FBQTJDO0FBQ087QUFDWjtBQUUvQixTQUFTSTtJQUNkLE1BQU0sQ0FBQ0MsTUFBTUMsUUFBUSxHQUFHTiwrQ0FBUUEsQ0FBQztJQUNqQyxNQUFNLENBQUNPLFNBQVNDLFdBQVcsR0FBR1IsK0NBQVFBLENBQUM7SUFFdkNDLGdEQUFTQSxDQUFDO1FBQ1IsTUFBTVEsY0FBY1AsaUVBQWtCQSxDQUFDQywrQ0FBSUEsRUFBRSxDQUFDRTtZQUM1Q0MsUUFBUUQ7WUFDUkcsV0FBVztRQUNiO1FBRUEsT0FBTyxJQUFNQztJQUNmLEdBQUcsRUFBRTtJQUVMLE9BQU87UUFBRUo7UUFBTUU7SUFBUTtBQUN6QiIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2hvb2tzL3VzZUF1dGguanM/YTQ4NyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnXHJcbmltcG9ydCB7IG9uQXV0aFN0YXRlQ2hhbmdlZCB9IGZyb20gJ2ZpcmViYXNlL2F1dGgnXHJcbmltcG9ydCB7IGF1dGggfSBmcm9tICcuLi9saWIvZmlyZWJhc2UnXHJcblxyXG5leHBvcnQgZnVuY3Rpb24gdXNlQXV0aCgpIHtcclxuICBjb25zdCBbdXNlciwgc2V0VXNlcl0gPSB1c2VTdGF0ZShudWxsKVxyXG4gIGNvbnN0IFtsb2FkaW5nLCBzZXRMb2FkaW5nXSA9IHVzZVN0YXRlKHRydWUpXHJcblxyXG4gIHVzZUVmZmVjdCgoKSA9PiB7XHJcbiAgICBjb25zdCB1bnN1YnNjcmliZSA9IG9uQXV0aFN0YXRlQ2hhbmdlZChhdXRoLCAodXNlcikgPT4ge1xyXG4gICAgICBzZXRVc2VyKHVzZXIpXHJcbiAgICAgIHNldExvYWRpbmcoZmFsc2UpXHJcbiAgICB9KVxyXG5cclxuICAgIHJldHVybiAoKSA9PiB1bnN1YnNjcmliZSgpXHJcbiAgfSwgW10pXHJcblxyXG4gIHJldHVybiB7IHVzZXIsIGxvYWRpbmcgfVxyXG59Il0sIm5hbWVzIjpbInVzZVN0YXRlIiwidXNlRWZmZWN0Iiwib25BdXRoU3RhdGVDaGFuZ2VkIiwiYXV0aCIsInVzZUF1dGgiLCJ1c2VyIiwic2V0VXNlciIsImxvYWRpbmciLCJzZXRMb2FkaW5nIiwidW5zdWJzY3JpYmUiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./hooks/useAuth.js\n");

/***/ }),

/***/ "./lib/firebase.js":
/*!*************************!*\
  !*** ./lib/firebase.js ***!
  \*************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   auth: () => (/* binding */ auth),\n/* harmony export */   db: () => (/* binding */ db)\n/* harmony export */ });\n/* harmony import */ var firebase_app__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! firebase/app */ \"firebase/app\");\n/* harmony import */ var firebase_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! firebase/auth */ \"firebase/auth\");\n/* harmony import */ var firebase_firestore__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! firebase/firestore */ \"firebase/firestore\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_auth__WEBPACK_IMPORTED_MODULE_1__, firebase_firestore__WEBPACK_IMPORTED_MODULE_2__]);\n([firebase_app__WEBPACK_IMPORTED_MODULE_0__, firebase_auth__WEBPACK_IMPORTED_MODULE_1__, firebase_firestore__WEBPACK_IMPORTED_MODULE_2__] = __webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__);\n\n\n\n// Your web app's Firebase configuration\nconst firebaseConfig = {\n    apiKey: \"AIzaSyA8UadBfYlR6hizwYsmdPwNB7ybuMbrIVw\",\n    authDomain: \"skillboost-caa64.firebaseapp.com\",\n    projectId: \"skillboost-caa64\",\n    storageBucket: \"skillboost-caa64.appspot.com\",\n    messagingSenderId: \"509723520392\",\n    appId: \"1:509723520392:web:dd7b9b70b28bb51b3a5e3d\"\n};\n// Initialize Firebase\nlet app;\nif (!(0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.getApps)().length) {\n    app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.initializeApp)(firebaseConfig);\n} else {\n    app = (0,firebase_app__WEBPACK_IMPORTED_MODULE_0__.getApps)()[0];\n}\nconst auth = (0,firebase_auth__WEBPACK_IMPORTED_MODULE_1__.getAuth)(app);\nconst db = (0,firebase_firestore__WEBPACK_IMPORTED_MODULE_2__.getFirestore)(app);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9saWIvZmlyZWJhc2UuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFBc0Q7QUFDZDtBQUNVO0FBRWxELHdDQUF3QztBQUN4QyxNQUFNSSxpQkFBaUI7SUFDckJDLFFBQVFDLHlDQUF3QztJQUNoREcsWUFBWUgsa0NBQTRDO0lBQ3hESyxXQUFXTCxrQkFBMkM7SUFDdERPLGVBQWVQLDhCQUErQztJQUM5RFMsbUJBQW1CVCxjQUFvRDtJQUN2RVcsT0FBT1gsMkNBQXVDO0FBQ2hEO0FBRUEsc0JBQXNCO0FBQ3RCLElBQUlhO0FBQ0osSUFBSSxDQUFDbEIscURBQU9BLEdBQUdtQixNQUFNLEVBQUU7SUFDckJELE1BQU1uQiwyREFBYUEsQ0FBQ0k7QUFDdEIsT0FBTztJQUNMZSxNQUFNbEIscURBQU9BLEVBQUUsQ0FBQyxFQUFFO0FBQ3BCO0FBRU8sTUFBTW9CLE9BQU9uQixzREFBT0EsQ0FBQ2lCLEtBQUs7QUFDMUIsTUFBTUcsS0FBS25CLGdFQUFZQSxDQUFDZ0IsS0FBSyIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL2xpYi9maXJlYmFzZS5qcz9hYjQ0Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGluaXRpYWxpemVBcHAsIGdldEFwcHMgfSBmcm9tICdmaXJlYmFzZS9hcHAnO1xyXG5pbXBvcnQgeyBnZXRBdXRoIH0gZnJvbSAnZmlyZWJhc2UvYXV0aCc7XHJcbmltcG9ydCB7IGdldEZpcmVzdG9yZSB9IGZyb20gJ2ZpcmViYXNlL2ZpcmVzdG9yZSc7XHJcblxyXG4vLyBZb3VyIHdlYiBhcHAncyBGaXJlYmFzZSBjb25maWd1cmF0aW9uXHJcbmNvbnN0IGZpcmViYXNlQ29uZmlnID0ge1xyXG4gIGFwaUtleTogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfRklSRUJBU0VfQVBJX0tFWSxcclxuICBhdXRoRG9tYWluOiBwcm9jZXNzLmVudi5ORVhUX1BVQkxJQ19GSVJFQkFTRV9BVVRIX0RPTUFJTixcclxuICBwcm9qZWN0SWQ6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0ZJUkVCQVNFX1BST0pFQ1RfSUQsXHJcbiAgc3RvcmFnZUJ1Y2tldDogcHJvY2Vzcy5lbnYuTkVYVF9QVUJMSUNfRklSRUJBU0VfU1RPUkFHRV9CVUNLRVQsXHJcbiAgbWVzc2FnaW5nU2VuZGVySWQ6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0ZJUkVCQVNFX01FU1NBR0lOR19TRU5ERVJfSUQsXHJcbiAgYXBwSWQ6IHByb2Nlc3MuZW52Lk5FWFRfUFVCTElDX0ZJUkVCQVNFX0FQUF9JRCxcclxufTtcclxuXHJcbi8vIEluaXRpYWxpemUgRmlyZWJhc2VcclxubGV0IGFwcDtcclxuaWYgKCFnZXRBcHBzKCkubGVuZ3RoKSB7XHJcbiAgYXBwID0gaW5pdGlhbGl6ZUFwcChmaXJlYmFzZUNvbmZpZyk7XHJcbn0gZWxzZSB7XHJcbiAgYXBwID0gZ2V0QXBwcygpWzBdO1xyXG59XHJcblxyXG5leHBvcnQgY29uc3QgYXV0aCA9IGdldEF1dGgoYXBwKTtcclxuZXhwb3J0IGNvbnN0IGRiID0gZ2V0RmlyZXN0b3JlKGFwcCk7XHJcbiJdLCJuYW1lcyI6WyJpbml0aWFsaXplQXBwIiwiZ2V0QXBwcyIsImdldEF1dGgiLCJnZXRGaXJlc3RvcmUiLCJmaXJlYmFzZUNvbmZpZyIsImFwaUtleSIsInByb2Nlc3MiLCJlbnYiLCJORVhUX1BVQkxJQ19GSVJFQkFTRV9BUElfS0VZIiwiYXV0aERvbWFpbiIsIk5FWFRfUFVCTElDX0ZJUkVCQVNFX0FVVEhfRE9NQUlOIiwicHJvamVjdElkIiwiTkVYVF9QVUJMSUNfRklSRUJBU0VfUFJPSkVDVF9JRCIsInN0b3JhZ2VCdWNrZXQiLCJORVhUX1BVQkxJQ19GSVJFQkFTRV9TVE9SQUdFX0JVQ0tFVCIsIm1lc3NhZ2luZ1NlbmRlcklkIiwiTkVYVF9QVUJMSUNfRklSRUJBU0VfTUVTU0FHSU5HX1NFTkRFUl9JRCIsImFwcElkIiwiTkVYVF9QVUJMSUNfRklSRUJBU0VfQVBQX0lEIiwiYXBwIiwibGVuZ3RoIiwiYXV0aCIsImRiIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./lib/firebase.js\n");

/***/ }),

/***/ "./pages/_app.js":
/*!***********************!*\
  !*** ./pages/_app.js ***!
  \***********************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.a(module, async (__webpack_handle_async_dependencies__, __webpack_async_result__) => { try {\n__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../styles/globals.css */ \"./styles/globals.css\");\n/* harmony import */ var _styles_globals_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_styles_globals_css__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _components_layout_Layout__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/layout/Layout */ \"./components/layout/Layout.js\");\n/* harmony import */ var _components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/ErrorBoundary */ \"./components/ErrorBoundary.js\");\nvar __webpack_async_dependencies__ = __webpack_handle_async_dependencies__([_components_layout_Layout__WEBPACK_IMPORTED_MODULE_2__]);\n_components_layout_Layout__WEBPACK_IMPORTED_MODULE_2__ = (__webpack_async_dependencies__.then ? (await __webpack_async_dependencies__)() : __webpack_async_dependencies__)[0];\n\n\n\n\nfunction MyApp({ Component, pageProps }) {\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_ErrorBoundary__WEBPACK_IMPORTED_MODULE_3__[\"default\"], {\n        children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(_components_layout_Layout__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {\n            children: /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(Component, {\n                ...pageProps\n            }, void 0, false, {\n                fileName: \"C:\\\\Users\\\\poiso\\\\Documents\\\\SkillBoost\\\\pages\\\\_app.js\",\n                lineNumber: 9,\n                columnNumber: 9\n            }, this)\n        }, void 0, false, {\n            fileName: \"C:\\\\Users\\\\poiso\\\\Documents\\\\SkillBoost\\\\pages\\\\_app.js\",\n            lineNumber: 8,\n            columnNumber: 7\n        }, this)\n    }, void 0, false, {\n        fileName: \"C:\\\\Users\\\\poiso\\\\Documents\\\\SkillBoost\\\\pages\\\\_app.js\",\n        lineNumber: 7,\n        columnNumber: 5\n    }, this);\n}\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (MyApp);\n\n__webpack_async_result__();\n} catch(e) { __webpack_async_result__(e); } });//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9wYWdlcy9fYXBwLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQThCO0FBQ2tCO0FBQ087QUFFdkQsU0FBU0UsTUFBTSxFQUFFQyxTQUFTLEVBQUVDLFNBQVMsRUFBRTtJQUNyQyxxQkFDRSw4REFBQ0gsaUVBQWFBO2tCQUNaLDRFQUFDRCxpRUFBTUE7c0JBQ0wsNEVBQUNHO2dCQUFXLEdBQUdDLFNBQVM7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJaEM7QUFFQSxpRUFBZUYsS0FBS0EsRUFBQSIsInNvdXJjZXMiOlsid2VicGFjazovLy8uL3BhZ2VzL19hcHAuanM/ZTBhZCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJy4uL3N0eWxlcy9nbG9iYWxzLmNzcydcclxuaW1wb3J0IExheW91dCBmcm9tICcuLi9jb21wb25lbnRzL2xheW91dC9MYXlvdXQnXHJcbmltcG9ydCBFcnJvckJvdW5kYXJ5IGZyb20gJy4uL2NvbXBvbmVudHMvRXJyb3JCb3VuZGFyeSdcclxuXHJcbmZ1bmN0aW9uIE15QXBwKHsgQ29tcG9uZW50LCBwYWdlUHJvcHMgfSkge1xyXG4gIHJldHVybiAoXHJcbiAgICA8RXJyb3JCb3VuZGFyeT5cclxuICAgICAgPExheW91dD5cclxuICAgICAgICA8Q29tcG9uZW50IHsuLi5wYWdlUHJvcHN9IC8+XHJcbiAgICAgIDwvTGF5b3V0PlxyXG4gICAgPC9FcnJvckJvdW5kYXJ5PlxyXG4gIClcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgTXlBcHAiXSwibmFtZXMiOlsiTGF5b3V0IiwiRXJyb3JCb3VuZGFyeSIsIk15QXBwIiwiQ29tcG9uZW50IiwicGFnZVByb3BzIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///./pages/_app.js\n");

/***/ }),

/***/ "./styles/globals.css":
/*!****************************!*\
  !*** ./styles/globals.css ***!
  \****************************/
/***/ (() => {



/***/ }),

/***/ "next/dist/compiled/next-server/pages.runtime.dev.js":
/*!**********************************************************************!*\
  !*** external "next/dist/compiled/next-server/pages.runtime.dev.js" ***!
  \**********************************************************************/
/***/ ((module) => {

"use strict";
module.exports = require("next/dist/compiled/next-server/pages.runtime.dev.js");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/***/ ((module) => {

"use strict";
module.exports = require("react");

/***/ }),

/***/ "react-dom":
/*!****************************!*\
  !*** external "react-dom" ***!
  \****************************/
/***/ ((module) => {

"use strict";
module.exports = require("react-dom");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-dev-runtime");

/***/ }),

/***/ "react/jsx-runtime":
/*!************************************!*\
  !*** external "react/jsx-runtime" ***!
  \************************************/
/***/ ((module) => {

"use strict";
module.exports = require("react/jsx-runtime");

/***/ }),

/***/ "firebase/app":
/*!*******************************!*\
  !*** external "firebase/app" ***!
  \*******************************/
/***/ ((module) => {

"use strict";
module.exports = import("firebase/app");;

/***/ }),

/***/ "firebase/auth":
/*!********************************!*\
  !*** external "firebase/auth" ***!
  \********************************/
/***/ ((module) => {

"use strict";
module.exports = import("firebase/auth");;

/***/ }),

/***/ "firebase/firestore":
/*!*************************************!*\
  !*** external "firebase/firestore" ***!
  \*************************************/
/***/ ((module) => {

"use strict";
module.exports = import("firebase/firestore");;

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "stream":
/*!*************************!*\
  !*** external "stream" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("stream");

/***/ }),

/***/ "zlib":
/*!***********************!*\
  !*** external "zlib" ***!
  \***********************/
/***/ ((module) => {

"use strict";
module.exports = require("zlib");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../webpack-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = __webpack_require__.X(0, ["vendor-chunks/next"], () => (__webpack_exec__("./pages/_app.js")));
module.exports = __webpack_exports__;

})();