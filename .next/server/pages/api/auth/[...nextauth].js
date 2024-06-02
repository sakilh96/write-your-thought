"use strict";
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
exports.id = "pages/api/auth/[...nextauth]";
exports.ids = ["pages/api/auth/[...nextauth]"];
exports.modules = {

/***/ "bcryptjs":
/*!***************************!*\
  !*** external "bcryptjs" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("bcryptjs");

/***/ }),

/***/ "mongoose":
/*!***************************!*\
  !*** external "mongoose" ***!
  \***************************/
/***/ ((module) => {

module.exports = require("mongoose");

/***/ }),

/***/ "next-auth":
/*!****************************!*\
  !*** external "next-auth" ***!
  \****************************/
/***/ ((module) => {

module.exports = require("next-auth");

/***/ }),

/***/ "next-auth/providers/credentials":
/*!**************************************************!*\
  !*** external "next-auth/providers/credentials" ***!
  \**************************************************/
/***/ ((module) => {

module.exports = require("next-auth/providers/credentials");

/***/ }),

/***/ "(api)/./lib/models/user.model.js":
/*!**********************************!*\
  !*** ./lib/models/user.model.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst UserSchema = new mongoose__WEBPACK_IMPORTED_MODULE_0__.Schema({\n    name: {\n        type: String,\n        required: true\n    },\n    email: {\n        type: String,\n        unique: true,\n        required: true\n    },\n    city: {\n        type: String\n    },\n    role: {\n        type: String,\n        enum: [\n            \"Writer\",\n            \"Admin\",\n            \"Sub-Admin\"\n        ],\n        default: \"Writer\"\n    },\n    password: {\n        type: String,\n        required: true\n    },\n    bio: {\n        type: String\n    },\n    occupation: {\n        type: String\n    },\n    phone: {\n        type: String\n    },\n    dob: {\n        type: String\n    },\n    profile_pic: {\n        type: String\n    },\n    cover_pic: {\n        type: String\n    },\n    gender: {\n        type: String\n    }\n}, {\n    timestamps: true\n});\nconst UserModel = mongoose__WEBPACK_IMPORTED_MODULE_0__.models.User || (0,mongoose__WEBPACK_IMPORTED_MODULE_0__.model)(\"User\", UserSchema);\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (UserModel);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9saWIvbW9kZWxzL3VzZXIubW9kZWwuanMuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWlEO0FBRWpELE1BQU1HLGFBQWEsSUFBSUQsNENBQU1BLENBQzNCO0lBQ0VFLE1BQU07UUFBRUMsTUFBTUM7UUFBUUMsVUFBVSxJQUFJO0lBQUM7SUFDckNDLE9BQU87UUFBRUgsTUFBTUM7UUFBUUcsUUFBUSxJQUFJO1FBQUVGLFVBQVUsSUFBSTtJQUFDO0lBQ3BERyxNQUFNO1FBQUVMLE1BQU1DO0lBQU87SUFDckJLLE1BQU07UUFBRU4sTUFBTUM7UUFBUU0sTUFBSztZQUFDO1lBQVM7WUFBUTtTQUFZO1FBQUVDLFNBQVM7SUFBUztJQUM3RUMsVUFBVTtRQUFFVCxNQUFNQztRQUFRQyxVQUFVLElBQUk7SUFBQztJQUN6Q1EsS0FBSztRQUFFVixNQUFNQztJQUFPO0lBQ3BCVSxZQUFZO1FBQUVYLE1BQU1DO0lBQU87SUFDM0JXLE9BQU87UUFBRVosTUFBTUM7SUFBTztJQUN0QlksS0FBSztRQUFFYixNQUFNQztJQUFPO0lBQ3BCYSxhQUFhO1FBQUNkLE1BQU1DO0lBQU07SUFDMUJjLFdBQVc7UUFBQ2YsTUFBTUM7SUFBTTtJQUV4QmUsUUFBUTtRQUFFaEIsTUFBTUM7SUFBTztBQUV6QixHQUNBO0lBQ0VnQixZQUFZLElBQUk7QUFDbEI7QUFHRixNQUFNQyxZQUFZdkIsaURBQVcsSUFBSUMsK0NBQUtBLENBQUMsUUFBUUU7QUFFL0MsaUVBQWVvQixTQUFTQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZGFzaHVpLWZyZWUtbmV4dGpzLWFkbWluLXRlbXBsYXRlLy4vbGliL21vZGVscy91c2VyLm1vZGVsLmpzPzQ4NzciXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgbW9kZWxzLCBtb2RlbCwgU2NoZW1hIH0gZnJvbSBcIm1vbmdvb3NlXCI7XG5cbmNvbnN0IFVzZXJTY2hlbWEgPSBuZXcgU2NoZW1hKFxuICB7XG4gICAgbmFtZTogeyB0eXBlOiBTdHJpbmcsIHJlcXVpcmVkOiB0cnVlIH0sXG4gICAgZW1haWw6IHsgdHlwZTogU3RyaW5nLCB1bmlxdWU6IHRydWUsIHJlcXVpcmVkOiB0cnVlIH0sXG4gICAgY2l0eTogeyB0eXBlOiBTdHJpbmcgfSxcbiAgICByb2xlOiB7IHR5cGU6IFN0cmluZywgZW51bTpbJ1dyaXRlcicsJ0FkbWluJywnU3ViLUFkbWluJ10sIGRlZmF1bHQ6ICdXcml0ZXInIH0sXG4gICAgcGFzc3dvcmQ6IHsgdHlwZTogU3RyaW5nLCByZXF1aXJlZDogdHJ1ZSB9LFxuICAgIGJpbzogeyB0eXBlOiBTdHJpbmcgfSxcbiAgICBvY2N1cGF0aW9uOiB7IHR5cGU6IFN0cmluZyB9LFxuICAgIHBob25lOiB7IHR5cGU6IFN0cmluZyB9LFxuICAgIGRvYjogeyB0eXBlOiBTdHJpbmcgfSxcbiAgICBwcm9maWxlX3BpYzoge3R5cGU6IFN0cmluZ30sXG4gICAgY292ZXJfcGljOiB7dHlwZTogU3RyaW5nfSxcbiAgXG4gICAgZ2VuZGVyOiB7IHR5cGU6IFN0cmluZyB9LFxuICAgXG4gIH0sXG4gIHtcbiAgICB0aW1lc3RhbXBzOiB0cnVlLFxuICB9XG4pO1xuXG5jb25zdCBVc2VyTW9kZWwgPSBtb2RlbHMuVXNlciB8fCBtb2RlbChcIlVzZXJcIiwgVXNlclNjaGVtYSk7XG5cbmV4cG9ydCBkZWZhdWx0IFVzZXJNb2RlbDtcbiJdLCJuYW1lcyI6WyJtb2RlbHMiLCJtb2RlbCIsIlNjaGVtYSIsIlVzZXJTY2hlbWEiLCJuYW1lIiwidHlwZSIsIlN0cmluZyIsInJlcXVpcmVkIiwiZW1haWwiLCJ1bmlxdWUiLCJjaXR5Iiwicm9sZSIsImVudW0iLCJkZWZhdWx0IiwicGFzc3dvcmQiLCJiaW8iLCJvY2N1cGF0aW9uIiwicGhvbmUiLCJkb2IiLCJwcm9maWxlX3BpYyIsImNvdmVyX3BpYyIsImdlbmRlciIsInRpbWVzdGFtcHMiLCJVc2VyTW9kZWwiLCJVc2VyIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./lib/models/user.model.js\n");

/***/ }),

/***/ "(api)/./pages/api/auth/[...nextauth].js":
/*!*****************************************!*\
  !*** ./pages/api/auth/[...nextauth].js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! next-auth */ \"next-auth\");\n/* harmony import */ var next_auth__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(next_auth__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! next-auth/providers/credentials */ \"next-auth/providers/credentials\");\n/* harmony import */ var next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! bcryptjs */ \"bcryptjs\");\n/* harmony import */ var bcryptjs__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(bcryptjs__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var lib_models_user_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! lib/models/user.model */ \"(api)/./lib/models/user.model.js\");\n/* harmony import */ var pages_mongoose__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! pages/mongoose */ \"(api)/./pages/mongoose.js\");\n\n\n\n\n// import mongoConnect from \"pages/common/mongoose\";\n\nconst authOptions = {\n    session: {\n        strategy: \"jwt\"\n    },\n    providers: [\n        next_auth_providers_credentials__WEBPACK_IMPORTED_MODULE_1___default()({\n            type: \"credentials\",\n            credentials: {},\n            async authorize (credentials, req) {\n                const { email , password , rememberMe  } = credentials;\n                console.log(\"rememberMe\", rememberMe);\n                (0,pages_mongoose__WEBPACK_IMPORTED_MODULE_4__[\"default\"])();\n                const logUser = await lib_models_user_model__WEBPACK_IMPORTED_MODULE_3__[\"default\"].findOne({\n                    email\n                });\n                if (!logUser) {\n                    throw new Error(\"Invalid Email or Password\");\n                }\n                const isPasswordMatched = await bcryptjs__WEBPACK_IMPORTED_MODULE_2___default().compare(password, logUser.password);\n                if (!isPasswordMatched) {\n                    throw new Error(\"Invalid Email or Password\");\n                }\n                return {\n                    ...logUser,\n                    rememberMe\n                };\n            }\n        })\n    ],\n    pages: {\n        signIn: \"../../../pages/admin/index.js\",\n        signOut: \"../../../pages/admin/index.js\"\n    },\n    callbacks: {\n        async jwt ({ token , user  }) {\n            return {\n                ...token,\n                ...user\n            };\n        },\n        async session ({ session , token , user  }) {\n            session.user = token;\n            // console.log('sessionsession',session);\n            return session;\n        }\n    },\n    secret: process.env.NEXTAUTH_SECRET\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (next_auth__WEBPACK_IMPORTED_MODULE_0___default()(authOptions));\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLmpzLmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFpQztBQUNpQztBQUNwQztBQUNnQjtBQUM5QyxvREFBb0Q7QUFDVjtBQUUxQyxNQUFNSyxjQUFjO0lBQ2xCQyxTQUFTO1FBQ1BDLFVBQVU7SUFNWjtJQUNBQyxXQUFXO1FBQ1RQLHNFQUFtQkEsQ0FBQztZQUNsQlEsTUFBTTtZQUNOQyxhQUFhLENBQUM7WUFDZCxNQUFNQyxXQUFVRCxXQUFXLEVBQUVFLEdBQUcsRUFBRTtnQkFDaEMsTUFBTSxFQUFFQyxNQUFLLEVBQUVDLFNBQVEsRUFBRUMsV0FBVSxFQUFFLEdBQUdMO2dCQUN4Q00sUUFBUUMsR0FBRyxDQUFDLGNBQWFGO2dCQUN6QlgsMERBQVlBO2dCQUdaLE1BQU1jLFVBQVUsTUFBTWYscUVBQWlCLENBQUM7b0JBQUVVO2dCQUFNO2dCQUdoRCxJQUFJLENBQUNLLFNBQVM7b0JBQ1osTUFBTSxJQUFJRSxNQUFNLDZCQUE2QjtnQkFDL0MsQ0FBQztnQkFFRCxNQUFNQyxvQkFBb0IsTUFBTW5CLHVEQUFjLENBQUNZLFVBQVVJLFFBQVFKLFFBQVE7Z0JBR3pFLElBQUksQ0FBQ08sbUJBQW1CO29CQUN0QixNQUFNLElBQUlELE1BQU0sNkJBQTZCO2dCQUMvQyxDQUFDO2dCQUVELE9BQU87b0JBQUMsR0FBR0YsT0FBTztvQkFBRUg7Z0JBQVU7WUFDaEM7UUFDRjtLQUNEO0lBQ0RRLE9BQU87UUFDTEMsUUFBUTtRQUNSQyxTQUFTO0lBQ1g7SUFDQUMsV0FBVztRQUNULE1BQU1DLEtBQUksRUFBRUMsTUFBSyxFQUFFQyxLQUFJLEVBQUUsRUFBRTtZQUN6QixPQUFPO2dCQUFFLEdBQUdELEtBQUs7Z0JBQUUsR0FBR0MsSUFBSTtZQUFDO1FBQzdCO1FBQ0EsTUFBTXZCLFNBQVEsRUFBRUEsUUFBTyxFQUFFc0IsTUFBSyxFQUFFQyxLQUFJLEVBQUUsRUFBRTtZQUN0Q3ZCLFFBQVF1QixJQUFJLEdBQUdEO1lBQ2YseUNBQXlDO1lBQ3pDLE9BQU90QjtRQUNUO0lBQ0Y7SUFDQXdCLFFBQVFDLFFBQVFDLEdBQUcsQ0FBQ0MsZUFBZTtBQUNyQztBQUVBLGlFQUFlakMsZ0RBQVFBLENBQUNLLFlBQVlBLEVBQUMiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kYXNodWktZnJlZS1uZXh0anMtYWRtaW4tdGVtcGxhdGUvLi9wYWdlcy9hcGkvYXV0aC9bLi4ubmV4dGF1dGhdLmpzPzUyN2YiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IE5leHRBdXRoIGZyb20gJ25leHQtYXV0aCc7XG5pbXBvcnQgQ3JlZGVudGlhbHNQcm92aWRlciBmcm9tICduZXh0LWF1dGgvcHJvdmlkZXJzL2NyZWRlbnRpYWxzJztcbmltcG9ydCBiY3J5cHQgZnJvbSAnYmNyeXB0anMnO1xuaW1wb3J0IFVzZXJNb2RlbCBmcm9tIFwibGliL21vZGVscy91c2VyLm1vZGVsXCI7XG4vLyBpbXBvcnQgbW9uZ29Db25uZWN0IGZyb20gXCJwYWdlcy9jb21tb24vbW9uZ29vc2VcIjtcbmltcG9ydCBtb25nb0Nvbm5lY3QgZnJvbSAncGFnZXMvbW9uZ29vc2UnO1xuXG5jb25zdCBhdXRoT3B0aW9ucyA9IHtcbiAgc2Vzc2lvbjoge1xuICAgIHN0cmF0ZWd5OiAnand0JyxcbiAgICAvLyBtYXhBZ2U6ICh7IHNlc3Npb24sIHRva2VuLCB1c2VyIH0pID0+IHtcbiAgICAvLyAgY29uc29sZS5sb2coJ3Nlc3Npb24gdXAnLHNlc3Npb24pO1xuICAgIC8vICAgLy8gY29uc3QgcmVtZW1iZXJNZSA9IHNlc3Npb24gJiYgc2Vzc2lvbi5yZW1lbWJlck1lO1xuICAgIC8vICAgLy8gcmV0dXJuIHJlbWVtYmVyTWUgPyAzMCAqIDI0ICogNjAgKiA2MCA6IDI0ICogNjAgKiA2MDsgXG4gICAgLy8gfVxuICB9LFxuICBwcm92aWRlcnM6IFtcbiAgICBDcmVkZW50aWFsc1Byb3ZpZGVyKHtcbiAgICAgIHR5cGU6ICdjcmVkZW50aWFscycsXG4gICAgICBjcmVkZW50aWFsczoge30sXG4gICAgICBhc3luYyBhdXRob3JpemUoY3JlZGVudGlhbHMsIHJlcSkge1xuICAgICAgICBjb25zdCB7IGVtYWlsLCBwYXNzd29yZCwgcmVtZW1iZXJNZSB9ID0gY3JlZGVudGlhbHM7XG4gICAgICAgIGNvbnNvbGUubG9nKCdyZW1lbWJlck1lJyxyZW1lbWJlck1lKTtcbiAgICAgICAgbW9uZ29Db25uZWN0KCk7XG4gICAgIFxuXG4gICAgICAgIGNvbnN0IGxvZ1VzZXIgPSBhd2FpdCBVc2VyTW9kZWwuZmluZE9uZSh7IGVtYWlsIH0pO1xuICAgICBcblxuICAgICAgICBpZiAoIWxvZ1VzZXIpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgRW1haWwgb3IgUGFzc3dvcmQnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGlzUGFzc3dvcmRNYXRjaGVkID0gYXdhaXQgYmNyeXB0LmNvbXBhcmUocGFzc3dvcmQsIGxvZ1VzZXIucGFzc3dvcmQpO1xuICAgICAgICBcblxuICAgICAgICBpZiAoIWlzUGFzc3dvcmRNYXRjaGVkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIEVtYWlsIG9yIFBhc3N3b3JkJyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gey4uLmxvZ1VzZXIsIHJlbWVtYmVyTWV9O1xuICAgICAgfVxuICAgIH0pXG4gIF0sXG4gIHBhZ2VzOiB7XG4gICAgc2lnbkluOiAnLi4vLi4vLi4vcGFnZXMvYWRtaW4vaW5kZXguanMnLFxuICAgIHNpZ25PdXQ6ICcuLi8uLi8uLi9wYWdlcy9hZG1pbi9pbmRleC5qcydcbiAgfSxcbiAgY2FsbGJhY2tzOiB7XG4gICAgYXN5bmMgand0KHsgdG9rZW4sIHVzZXIgfSkge1xuICAgICAgcmV0dXJuIHsgLi4udG9rZW4sIC4uLnVzZXIgfTtcbiAgICB9LFxuICAgIGFzeW5jIHNlc3Npb24oeyBzZXNzaW9uLCB0b2tlbiwgdXNlciB9KSB7XG4gICAgICBzZXNzaW9uLnVzZXIgPSB0b2tlbjtcbiAgICAgIC8vIGNvbnNvbGUubG9nKCdzZXNzaW9uc2Vzc2lvbicsc2Vzc2lvbik7XG4gICAgICByZXR1cm4gc2Vzc2lvbjtcbiAgICB9XG4gIH0sXG4gIHNlY3JldDogcHJvY2Vzcy5lbnYuTkVYVEFVVEhfU0VDUkVUXG59O1xuXG5leHBvcnQgZGVmYXVsdCBOZXh0QXV0aChhdXRoT3B0aW9ucyk7XG4iXSwibmFtZXMiOlsiTmV4dEF1dGgiLCJDcmVkZW50aWFsc1Byb3ZpZGVyIiwiYmNyeXB0IiwiVXNlck1vZGVsIiwibW9uZ29Db25uZWN0IiwiYXV0aE9wdGlvbnMiLCJzZXNzaW9uIiwic3RyYXRlZ3kiLCJwcm92aWRlcnMiLCJ0eXBlIiwiY3JlZGVudGlhbHMiLCJhdXRob3JpemUiLCJyZXEiLCJlbWFpbCIsInBhc3N3b3JkIiwicmVtZW1iZXJNZSIsImNvbnNvbGUiLCJsb2ciLCJsb2dVc2VyIiwiZmluZE9uZSIsIkVycm9yIiwiaXNQYXNzd29yZE1hdGNoZWQiLCJjb21wYXJlIiwicGFnZXMiLCJzaWduSW4iLCJzaWduT3V0IiwiY2FsbGJhY2tzIiwiand0IiwidG9rZW4iLCJ1c2VyIiwic2VjcmV0IiwicHJvY2VzcyIsImVudiIsIk5FWFRBVVRIX1NFQ1JFVCJdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(api)/./pages/api/auth/[...nextauth].js\n");

/***/ }),

/***/ "(api)/./pages/mongoose.js":
/*!***************************!*\
  !*** ./pages/mongoose.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongoose */ \"mongoose\");\n/* harmony import */ var mongoose__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongoose__WEBPACK_IMPORTED_MODULE_0__);\n\nconst connectionString = \"mongodb://localhost:27017/wyt\";\nconst mongoConnect = ()=>{\n    mongoose__WEBPACK_IMPORTED_MODULE_0___default().connect(connectionString, {\n        useNewUrlParser: true,\n        useUnifiedTopology: true\n    });\n    const connection = (mongoose__WEBPACK_IMPORTED_MODULE_0___default().connection);\n    connection.on(\"error\", (err)=>{\n    // console.error(\"MongoDB connection error:\", err);\n    });\n    connection.once(\"open\", ()=>{\n    // console.log(\"MongoDB database connection established successfully\");\n    });\n};\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (mongoConnect);\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKGFwaSkvLi9wYWdlcy9tb25nb29zZS5qcy5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7QUFBZ0M7QUFFaEMsTUFBTUMsbUJBQW1CO0FBRXpCLE1BQU1DLGVBQWUsSUFBTTtJQUN6QkYsdURBQWdCLENBQUNDLGtCQUFrQjtRQUFFRyxpQkFBaUIsSUFBSTtRQUFFQyxvQkFBb0IsSUFBSTtJQUFDO0lBQ3JGLE1BQU1DLGFBQWFOLDREQUFtQjtJQUV0Q00sV0FBV0MsRUFBRSxDQUFDLFNBQVMsQ0FBQ0MsTUFBUTtJQUM5QixtREFBbUQ7SUFDckQ7SUFFQUYsV0FBV0csSUFBSSxDQUFDLFFBQVEsSUFBTTtJQUM1Qix1RUFBdUU7SUFDekU7QUFDRjtBQUVBLGlFQUFlUCxZQUFZQSxFQUFDIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vZGFzaHVpLWZyZWUtbmV4dGpzLWFkbWluLXRlbXBsYXRlLy4vcGFnZXMvbW9uZ29vc2UuanM/NWNmOCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbW9uZ29vc2UgZnJvbSAnbW9uZ29vc2UnO1xuXG5jb25zdCBjb25uZWN0aW9uU3RyaW5nID0gJ21vbmdvZGI6Ly9sb2NhbGhvc3Q6MjcwMTcvd3l0JztcblxuY29uc3QgbW9uZ29Db25uZWN0ID0gKCkgPT4ge1xuICBtb25nb29zZS5jb25uZWN0KGNvbm5lY3Rpb25TdHJpbmcsIHsgdXNlTmV3VXJsUGFyc2VyOiB0cnVlLCB1c2VVbmlmaWVkVG9wb2xvZ3k6IHRydWUgfSk7XG4gIGNvbnN0IGNvbm5lY3Rpb24gPSBtb25nb29zZS5jb25uZWN0aW9uO1xuXG4gIGNvbm5lY3Rpb24ub24oXCJlcnJvclwiLCAoZXJyKSA9PiB7XG4gICAgLy8gY29uc29sZS5lcnJvcihcIk1vbmdvREIgY29ubmVjdGlvbiBlcnJvcjpcIiwgZXJyKTtcbiAgfSk7XG4gIFxuICBjb25uZWN0aW9uLm9uY2UoXCJvcGVuXCIsICgpID0+IHtcbiAgICAvLyBjb25zb2xlLmxvZyhcIk1vbmdvREIgZGF0YWJhc2UgY29ubmVjdGlvbiBlc3RhYmxpc2hlZCBzdWNjZXNzZnVsbHlcIik7XG4gIH0pO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgbW9uZ29Db25uZWN0O1xuIl0sIm5hbWVzIjpbIm1vbmdvb3NlIiwiY29ubmVjdGlvblN0cmluZyIsIm1vbmdvQ29ubmVjdCIsImNvbm5lY3QiLCJ1c2VOZXdVcmxQYXJzZXIiLCJ1c2VVbmlmaWVkVG9wb2xvZ3kiLCJjb25uZWN0aW9uIiwib24iLCJlcnIiLCJvbmNlIl0sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(api)/./pages/mongoose.js\n");

/***/ })

};
;

// load runtime
var __webpack_require__ = require("../../../webpack-api-runtime.js");
__webpack_require__.C(exports);
var __webpack_exec__ = (moduleId) => (__webpack_require__(__webpack_require__.s = moduleId))
var __webpack_exports__ = (__webpack_exec__("(api)/./pages/api/auth/[...nextauth].js"));
module.exports = __webpack_exports__;

})();