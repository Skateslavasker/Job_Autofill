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
// Autofill function 
function autofillField(value, selectors) {
    if (!value)
        return;
    for (const selector of selectors) {
        const input = document.querySelector(selector);
        if (input) {
            input.focus();
            input.value = value;
            input.dispatchEvent(new Event("input", { bubbles: true }));
            console.log(`✅ Autofill Dropdown Filled ${selector} with "${value}"`);
            return;
        }
    }
    console.warn(`⚠️ Could not find a matching field for "${value}"`);
}
function autofillDropdownByLabel(labelText, valueToType) {
    var _a;
    const containers = Array.from(document.querySelectorAll("label, div, span"));
    for (const el of containers) {
        const text = (_a = el.textContent) === null || _a === void 0 ? void 0 : _a.trim().toLowerCase();
        if (text && text.includes(labelText.toLowerCase())) {
            let container = el;
            let depth = 0;
            while (container && depth < 5) {
                const input = container.querySelector('input[placeholder="Search"], input[type="text"]');
                if (input) {
                    input.focus();
                    input.value = '';
                    input.dispatchEvent(new Event("input", { bubbles: true }));
                    input.value = valueToType;
                    input.dispatchEvent(new KeyboardEvent("keydown", { key: "Enter", bubbles: true }));
                    input.blur();
                    console.log(`✅ Simulated dropdown select for "${valueToType}"`);
                    return;
                }
                container = container.parentElement;
                depth++;
            }
        }
    }
    console.warn(`⚠️ Could not find a field with label: "${labelText}"`);
}
function fetchProfile() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield fetch("http://localhost:5000/profile");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = yield response.json();
            console.log("Fetched profile data", data);
            return data;
        }
        catch (error) {
            console.error("Error fetching profile data", error);
            return {};
        }
    });
}
function uploadResumeByUrl(fileUrl_1) {
    return __awaiter(this, arguments, void 0, function* (fileUrl, filename = "resume.pdf") {
        const input = document.querySelector('input[type="file"]');
        if (!input) {
            console.warn("⚠️ File input not found for resume upload.");
            return;
        }
        try {
            const response = yield fetch(fileUrl);
            const blob = yield response.blob();
            const file = new File([blob], filename, { type: blob.type });
            const dataTransfer = new DataTransfer();
            dataTransfer.items.add(file);
            input.files = dataTransfer.files;
            input.dispatchEvent(new Event("change", { bubbles: true }));
            console.log(`✅ Uploaded resume "${filename}" from ${fileUrl}`);
        }
        catch (err) {
            console.error("❌ Failed to upload resume:", err);
        }
    });
}
function autofillLinkedInField(value) {
    const input = document.querySelector('input[name="linkedInAccount"]');
    if (input) {
        input.focus();
        input.value = value;
        input.dispatchEvent(new Event("input", { bubbles: true }));
        input.blur();
        console.log(`✅ Autofilled LinkedIn with "${value}"`);
    }
    else {
        console.warn("⚠️ LinkedIn input field not found");
    }
}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
function selectDropdownByQuestion(questionKeyword, answerText) {
    return __awaiter(this, void 0, void 0, function* () {
        var _a;
        const allButtons = Array.from(document.querySelectorAll('button[aria-haspopup="listbox"]'));
        const clean = (s) => s === null || s === void 0 ? void 0 : s.toLowerCase().replace(/[^\w\s]/g, "").trim();
        for (const button of allButtons) {
            let container = button;
            let depth = 0;
            let matched = false;
            while (container && depth < 6) {
                const labelText = clean(container.textContent);
                if (labelText && labelText.includes(questionKeyword.toLowerCase())) {
                    matched = true;
                    break;
                }
                container = container.parentElement;
                depth++;
            }
            if (matched) {
                button.focus();
                button.click();
                console.log(`🔍 Opened dropdown for "${questionKeyword}"`);
                yield new Promise(resolve => setTimeout(resolve, 400));
                const options = Array.from(document.querySelectorAll('[role="option"]'));
                for (const option of options) {
                    const optionText = (_a = option.textContent) === null || _a === void 0 ? void 0 : _a.trim().toLowerCase();
                    if (optionText === answerText.toLowerCase()) {
                        option.click();
                        console.log(`✅ Selected "${answerText}" for "${questionKeyword}"`);
                        return;
                    }
                }
                console.warn(`⚠️ Dropdown found but no option matched "${answerText}"`);
                return;
            }
        }
        console.warn(`⚠️ Could not find dropdown for question: "${questionKeyword}"`);
    });
}
function autofillNativeSelectByLabel(labelKeyword, optionText) {
    var _a;
    const allLabels = Array.from(document.querySelectorAll("label, span, div, p"));
    for (const label of allLabels) {
        const labelText = ((_a = label.textContent) === null || _a === void 0 ? void 0 : _a.trim().toLowerCase()) || "";
        if (labelText.includes(labelKeyword.toLowerCase())) {
            let container = label;
            let depth = 0;
            while (container && depth < 5) {
                const select = container.querySelector('select');
                if (select) {
                    const optionToSelect = Array.from(select.options).find(opt => { var _a; return ((_a = opt.textContent) === null || _a === void 0 ? void 0 : _a.trim().toLowerCase()) === optionText.toLowerCase(); });
                    if (optionToSelect) {
                        select.value = optionToSelect.value;
                        select.dispatchEvent(new Event("change", { bubbles: true }));
                        console.log(`✅ Selected "${optionText}" for "${labelKeyword}"`);
                        return;
                    }
                    else {
                        console.warn(`⚠️ No matching option for "${optionText}"`);
                        return;
                    }
                }
                container = container.parentElement;
                depth++;
            }
        }
    }
    console.warn(`⚠️ Could not find select for label "${labelKeyword}"`);
}
function autofillTextareaByLabel(labelText, value) {
    var _a;
    const containers = Array.from(document.querySelectorAll("label, div, span, p"));
    for (const el of containers) {
        const text = (_a = el.textContent) === null || _a === void 0 ? void 0 : _a.trim().toLowerCase();
        if (text && text.includes(labelText.toLowerCase())) {
            let container = el;
            let depth = 0;
            while (container && depth < 5) {
                const textarea = container.querySelector('textarea');
                if (textarea) {
                    textarea.focus();
                    textarea.value = value;
                    textarea.dispatchEvent(new Event("input", { bubbles: true }));
                    textarea.blur();
                    console.log(`✅ Filled textarea "${labelText}" with "${value}"`);
                    return;
                }
                container = container.parentElement;
                depth++;
            }
        }
    }
    console.warn(`⚠️ Could not find textarea for "${labelText}"`);
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    const profile = yield fetchProfile();
    yield uploadResumeByUrl(`http://localhost:5000${profile.resume}`);
    yield selectDropdownByQuestion("18 years", "Yes");
    yield selectDropdownByQuestion("sponsorship", "No");
    yield selectDropdownByQuestion("work visa", "No");
    yield selectDropdownByQuestion("eligible to work", "Yes");
    yield selectDropdownByQuestion("relocate", "Yes");
    yield selectDropdownByQuestion("work authorization", "Yes");
    yield selectDropdownByQuestion("Please select ethnicity", "Asian (Not Hispanic or Latino) (United States of America)");
    yield selectDropdownByQuestion("select your gender", "Male");
    yield sleep(400);
    yield selectDropdownByQuestion("Please select veteran status", "I AM NOT A VETERAN");
    autofillDropdownByLabel("hear about", profile.how_heard);
    autofillField(profile.first_name || "", [
        'input[aria-label*="First Name"]',
        'input[placeholder*="First Name"]',
        'input[name*="first"]',
        'input[aria-label*="Given Name"]',
        'input[placeholder*="Given Name"]',
        'input[name*="given"]'
    ]);
    autofillField(profile.last_name || "Mudavath", [
        'input[aria-label*="Last Name"]',
        'input[placeholder*="Last Name"]',
        'input[name*="last"]',
        'input[aria-label*="Surname"]',
        'input[placeholder*="Surname"]',
        'input[name*="surname"]',
        'input[aria-label*="Family Name"]',
        'input[placeholder*="Family Name"]',
        'input[name*="family"]'
    ]);
    autofillField(profile.address_line1 || "", [
        'input[aria-label*="Address Line 1"]',
        'input[placeholder*="Address Line 1"]',
        'input[name*="address"]',
        'input[aria-label*="Address"]'
    ]);
    autofillField(profile.state || "", [
        'input[aria-label*="State"]',
        'input[placeholder*="State"]',
        'input[name*="state"]'
    ]);
    autofillField(profile.city || "", [
        'input[aria-label*="City"]',
        'input[placeholder*="City"]',
        'input[name*="city"]'
    ]);
    autofillField(profile.postal_code || "", [
        'input[aria-label*="Postal Code"]',
        'input[placeholder*="Postal Code"]',
        'input[name*="postal"]',
        'input[name*="zip"]'
    ]);
    autofillField(profile.phone_number || "", [
        'input[aria-label*="Phone Number"]',
        'input[placeholder*="Phone Number"]',
        'input[name*="phone"]',
        'input[name*="mobile"]'
    ]);
    autofillLinkedInField("");
    autofillTextareaByLabel("salary", "30000");
}))();
// const testInjectLogg = document.createElement('div');
let testInjectLogg = document.getElementById("autofill-status");
if (!testInjectLogg) {
    testInjectLogg = document.createElement('div');
    testInjectLogg.id = "autofill-status";
    testInjectLogg.innerText = "✅ Autofill Script Injected Successfully!";
    testInjectLogg.style.position = 'fixed';
    testInjectLogg.style.bottom = '20px';
    testInjectLogg.style.right = '20px';
    testInjectLogg.style.background = 'green';
    testInjectLogg.style.color = 'white';
    testInjectLogg.style.padding = '10px';
    testInjectLogg.style.zIndex = '9999';
    document.body.appendChild(testInjectLogg);
}
