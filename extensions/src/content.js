"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch("http://localhost:5000/profile");
        const data = yield response.json();
        console.log("Fetched profile data", data);
        // Sprint 3 - Implemnentation
    }
    catch (error) {
        console.error("Error fetching profile data", error);
    }
}))();
const testInjectLog = document.createElement('div');
testInjectLog.innerText = "✅ Autofill Script Injected Successfully!";
testInjectLog.style.position = 'fixed';
testInjectLog.style.bottom = '20px';
testInjectLog.style.right = '20px';
testInjectLog.style.background = 'green';
testInjectLog.style.color = 'white';
testInjectLog.style.padding = '10px';
testInjectLog.style.zIndex = '9999';
document.body.appendChild(testInjectLog);
