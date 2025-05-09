

// Autofill function 
function autofillField(value: string, selectors: string[]) {
    if (!value) return;

    for (const selector of selectors) {
        const input = document.querySelector<HTMLInputElement>(selector);
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

function autofillDropdownByLabel(labelText: string, valueToType: string) {
    const containers = Array.from(document.querySelectorAll("label, div, span"));

    for (const el of containers) {
        const text = el.textContent?.trim().toLowerCase();
        if (text && text.includes(labelText.toLowerCase())) {
            let container: HTMLElement | null = el as HTMLElement;
            let depth = 0;
            while (container && depth < 5) {
                const input = container.querySelector<HTMLInputElement>('input[placeholder="Search"], input[type="text"]');
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

    async function uploadResumeByUrl(fileUrl: string, filename = "resume.pdf") {
        const input = document.querySelector<HTMLInputElement>('input[type="file"]');
        if (!input) {
          console.warn("⚠️ File input not found for resume upload.");
          return;
        }
      
        try {
          const response = await fetch(fileUrl);
          const blob = await response.blob();
      
          const file = new File([blob], filename, { type: blob.type });
      
          // Use a DataTransfer to simulate file selection
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file);
          input.files = dataTransfer.files;
      
          // Trigger change event so Workday starts processing it
          input.dispatchEvent(new Event("change", { bubbles: true }));
          console.log(`✅ Uploaded resume "${filename}" from ${fileUrl}`);
        } catch (err) {
          console.error("❌ Failed to upload resume:", err);
        }
      }

      function autofillLinkedInField(value: string) {
        const input = document.querySelector<HTMLInputElement>('input[name="linkedInAccount"]');
      
        if (input) {
          input.focus();
          input.value = value;
          input.dispatchEvent(new Event("input", { bubbles: true }));
          input.blur();
          console.log(`✅ Autofilled LinkedIn with "${value}"`);
        } else {
          console.warn("⚠️ LinkedIn input field not found");
        }
      }
      
      function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
      }
      async function selectDropdownByQuestion(questionKeyword: string, answerText: string) {
        const allButtons = Array.from(document.querySelectorAll('button[aria-haspopup="listbox"]'));

        const clean = (s?: string | null | undefined) =>
            s?.toLowerCase().replace(/[^\w\s]/g, "").trim();

  for (const button of allButtons) {
    // Step 1: Walk upward and find question text block
    let container: HTMLElement | null = button as HTMLElement;
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
      (button as HTMLElement).focus();
      (button as HTMLElement).click();
      console.log(`🔍 Opened dropdown for "${questionKeyword}"`);

      await new Promise(resolve => setTimeout(resolve, 400));

      const options = Array.from(document.querySelectorAll('[role="option"]'));

      for (const option of options) {
        const optionText = option.textContent?.trim().toLowerCase();
        if (optionText === answerText.toLowerCase()) {
          (option as HTMLElement).click();
          console.log(`✅ Selected "${answerText}" for "${questionKeyword}"`);
          return;
        }
      }

      console.warn(`⚠️ Dropdown found but no option matched "${answerText}"`);
      return;
    }
  }

  console.warn(`⚠️ Could not find dropdown for question: "${questionKeyword}"`);
}

function autofillNativeSelectByLabel(labelKeyword: string, optionText: string) {
    const allLabels = Array.from(document.querySelectorAll("label, span, div, p"));
  
    for (const label of allLabels) {
      const labelText = label.textContent?.trim().toLowerCase() || "";
  
      if (labelText.includes(labelKeyword.toLowerCase())) {
        let container: HTMLElement | null = label as HTMLElement;
        let depth = 0;
  
        while (container && depth < 5) {
          const select = container.querySelector<HTMLSelectElement>('select');
          if (select) {
            const optionToSelect = Array.from(select.options).find(opt =>
              opt.textContent?.trim().toLowerCase() === optionText.toLowerCase()
            );
  
            if (optionToSelect) {
              select.value = optionToSelect.value;
              select.dispatchEvent(new Event("change", { bubbles: true }));
              console.log(`✅ Selected "${optionText}" for "${labelKeyword}"`);
              return;
            } else {
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
  

function autofillTextareaByLabel(labelText: string, value: string) {
    const containers = Array.from(document.querySelectorAll("label, div, span, p"));
  
    for (const el of containers) {
      const text = el.textContent?.trim().toLowerCase();
      if (text && text.includes(labelText.toLowerCase())) {
        let container: HTMLElement | null = el as HTMLElement;
        let depth = 0;
  
        while (container && depth < 5) {
          const textarea = container.querySelector<HTMLTextAreaElement>('textarea');
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
  

(async () => {
        const profile = await fetchProfile(); 
        await uploadResumeByUrl(`http://localhost:5000${profile.resume}`); 
        await selectDropdownByQuestion("18 years", "Yes");
        await selectDropdownByQuestion("sponsorship", "No");
        await selectDropdownByQuestion("work visa", "No");
        await selectDropdownByQuestion("eligible to work", "Yes");
        await selectDropdownByQuestion("relocate", "Yes");
        await selectDropdownByQuestion("work authorization", "Yes");
        await selectDropdownByQuestion("Please select ethnicity","Asian (Not Hispanic or Latino) (United States of America)");
        await selectDropdownByQuestion("select your gender", "Male");
        
       
        await sleep(400);
        await selectDropdownByQuestion("Please select veteran status", "I AM NOT A VETERAN");

       
      
        


        autofillDropdownByLabel("hear about", profile.how_heard);

           
        // First Name
        autofillField(profile.first_name || "", [
            'input[aria-label*="First Name"]',
            'input[placeholder*="First Name"]',
            'input[name*="first"]',
            'input[aria-label*="Given Name"]',
            'input[placeholder*="Given Name"]',
            'input[name*="given"]'
        ]);
        // Last Name
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

        // Address Line 1
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
        // City
        autofillField(profile.city || "", [
            'input[aria-label*="City"]',
            'input[placeholder*="City"]',
            'input[name*="city"]'
        ]);
        
        // Postal Code
        autofillField(profile.postal_code || "", [
            'input[aria-label*="Postal Code"]',
            'input[placeholder*="Postal Code"]',
            'input[name*="postal"]',
            'input[name*="zip"]'
        ]);
        // Phone Number
        autofillField(profile.phone_number || "", [
            'input[aria-label*="Phone Number"]',
            'input[placeholder*="Phone Number"]',
            'input[name*="phone"]',
            'input[name*="mobile"]'
        ]); 

        autofillLinkedInField("");

        autofillTextareaByLabel("salary", "30000");

        

        


               
    })();

// const testInjectLogg = document.createElement('div');
let testInjectLogg = document.getElementById("autofill-status");
if(!testInjectLogg){
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
