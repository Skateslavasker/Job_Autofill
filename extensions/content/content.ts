

// Autofill function 
function autofillField(value: string, selectors: string[]) {
    if (!value) return;

    for (const selector of selectors) {
        const input = document.querySelector<HTMLInputElement>(selector);
        if (input) {
            input.focus();
            input.value = value;
            input.dispatchEvent(new Event("input", { bubbles: true }));
            console.log(`✅ Filled ${selector} with "${value}"`);
            return;
        }
    }

    console.warn(`⚠️ Could not find a matching field for "${value}"`);
}



async function fetchProfile(): Promise<Record<string, any>> {
    try {
        const response =  await fetch("http://localhost:5000/profile");
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const data = await response.json();
            console.log("Fetched profile data", data);
            return data;
        } catch ( error) {
            console.error("Error fetching profile data", error);
            return {};
        }
    }
        
(async () => {
        const profile = await fetchProfile();

        autofillField(profile.first_name, [
            'input[aria-label*="First Name"]',
            'input[placeholder*="First Name"]',
            'input[name*="first"]',
            'input[aria-label*="Given Name"]',
            'input[placeholder*="Given Name"]',
            'input[name*="given"]'
        ]);

        autofillField(profile.last_name, [
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
    })();

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
