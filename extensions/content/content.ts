(async () => {
    try {
        const response = await fetch("http://localhost:5000/profile");
        const data = await response.json();
        console.log("Fetched profile data", data);

        // Sprint 3 - Implemnentation
    } catch( error) {
        console.error("Error fetching profile data", error);

    }
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
