// Queries for finding each item
let tabs = document.querySelectorAll(".tabs h3");
let tabContents = document.querySelectorAll(".tab-content div");
let inputs = document.querySelectorAll(".tab-content input");
let colorSquares = document.querySelectorAll(".color-square");
let hexCodes = document.querySelectorAll(".hex-code");


// Loop for cycling through each tab
tabs.forEach((tab, index) => {

    // Listens for the click of a new tab
    tab.addEventListener("click", () => {

        // Removes the "active" tag from content and tab 
        tabContents.forEach(content => {
            content.classList.remove("active");
        });
        tabs.forEach(tab => {
            tab.classList.remove("active");
        });

        // Adds the "active" tag from content and tab
        tabContents[index].classList.add("active");
        tabs[index].classList.add("active");

        // Reset code output
        codeOutputs[index].innerText = "";

        // Clear input field
        inputs[index].value = "";

        // Hide copy button, color square, and hex code
        copyButtons[index].style.display = "none";
        colorSquares[index].style.display = "none";
        hexCodes[index].style.display = "none";
    });
});

// Queries for finding each item
let calculateButtons = document.querySelectorAll(".calculate-btn");
let codeOutputs = document.querySelectorAll(".code-output");
let copyButtons = document.querySelectorAll(".copy-btn");

// Loops through each Calculate button
calculateButtons.forEach((btn, index) => {
    // Listens for the click of calculate button
    btn.addEventListener("click", () => {
        // Retrieves input
        let input = tabContents[index].querySelector(".color-input").value;
        let language = tabs[index].innerText.toLowerCase();

        let hex = input.replace("#", "");

        // Checks to see if input is valid
        if (hex.length !== 6) {
            alert("Invalid HEX Code")
            return;
        }

        // Converts the hex code into accurate RGB values
        let r = parseInt(hex.substring(0, 2), 16) / 255;
        let g = parseInt(hex.substring(2, 4), 16) / 255;
        let b = parseInt(hex.substring(4, 6), 16) / 255;

        if (isNaN(r) || isNaN(g) || isNaN(b)) {
            alert("Invalid HEX Code");
            return;
        }

        r = r.toFixed(3);
        g = g.toFixed(3);
        b = b.toFixed(3);

        let rInt = Math.round(r * 255);
        let gInt = Math.round(g * 255);
        let bInt = Math.round(b * 255);


        // Sets output based on selected language
        let output = "";
        switch (language) {
            case "swiftui":
                output = `
                    <span class="keyword">let</span> <span class="variable">customColor</span> = <span class="class">Color</span>(<span class="parameter">red</span>: ${r}, <span class="parameter">green</span>: ${g}, <span class="parameter">blue</span>: ${b})
                `;
                break;
            case "swift":
                output = `
                    <span class="keyword">let</span> <span class="variable">customColor</span> = <span class="class">UIColor</span>(<span class="parameter">red</span>: ${r}, <span class="parameter">green</span>: ${g}, <span class="parameter">blue</span>: ${b}, <span class="parameter">alpha</span>: 1.0)
                `;
                break;
            case "java":
                output = `
                    <span class="class">Color</span> <span class="variable">customColor</span> = <span class="keyword">new</span> <span class="class">Color</span>(${rInt}, ${gInt}, ${bInt});
                `;
                break;
            case "javascript":
                output = `
                    <span class="keyword">var</span> <span class="variable">customColor</span> = '<span class="string">rgb(${rInt}, ${gInt}, ${bInt})</span>';
                `;
                break;
            case "python":
                output = `
                    <span class="variable">custom_color</span> = (${rInt}, ${gInt}, ${bInt})
                `;
                break;
            case "c++":
                output = `
                    <span class="class">Color</span> <span class="variable">customColor</span>(${rInt}, ${gInt}, ${bInt});
                `;
                break;
            default:
                output = "<span class='error'>Unsupported language</span>";
        }

        codeOutputs[index].innerHTML = output;

        // Shows copy button
        copyButtons[index].style.display = "block";

        // Displays colored square and hexcode
        hex = hex.toUpperCase();
        let hashtag = "#";
        let result = hashtag.concat(hex);

        hexCodes[index].innerHTML = result;
        hexCodes[index].style.display = "block";

        colorSquares[index].style.display = "block";
        colorSquares[index].style.backgroundColor = `rgb(${rInt}, ${gInt}, ${bInt})`;

    });
});


// Copy to clipboard functionality
copyButtons.forEach((copyBtn, index) => {
    copyBtn.addEventListener("click", () => {
        let text = codeOutputs[index].innerText;
        navigator.clipboard.writeText(text)
            .then(() => {
                alert("Copied to clipboard!");
            })
            .catch(err => {
                console.error("Failed to copy: ", err);
            });
    });
});

