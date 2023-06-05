//-- Theme Button toggle icon --

//Get theme button.
let themeButton = document.getElementById("theme-button");

//Track the current theme.
let darkTheme = false;

//Theme button SVG Icon Elements.
let darkThemeIcon = '<svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" width=\"20\" height=\"20\" fill=\"currentColor\" class=\"bi bi-moon-fill\" viewBox=\"0 0 16 16\"><path d=\"M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z\" \/><\/svg>Theme'
let lightThemeIcon = '<svg xmlns=\"http:\/\/www.w3.org\/2000\/svg\" width=\"20\" height=\"20\" fill=\"currentColor\" class=\"bi bi-sun-fill\" viewBox=\"0 0 16 16\">\r\n<path d=\"M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z\" \/><\/svg>Theme'

//Register event handler to both theme button 'click' events.
if (themeButton) {
    themeButton.addEventListener('click', OnThemeButtonClicked);
}
else {
    console.log("ERROR: Could not find either \"theme-button\" to register an event handler to the 'click' event.");
}

//If theme button is clicked, toggle icon and theme.
function OnThemeButtonClicked(ev: Event) {
    if (themeButton) {
        if (ev.currentTarget instanceof HTMLElement) {
            let themeButton = ev.currentTarget;
            //Toggle theme state.
            darkTheme = !darkTheme;
            SetTheme(darkTheme ? darkThemeColours : lightThemeColours);
            localStorage.setItem("theme", darkTheme ? "darkTheme" : "lightTheme");
            themeButton.innerHTML = darkTheme ? darkThemeIcon : lightThemeIcon;
        }
    }

    if (ev instanceof Event) {
        ev.stopPropagation();
    }
}


//-- UI Buttons shrink/expand animation --

//Get all buttons.
let buttons = document.getElementsByClassName('generic-button');

//Register an event handler to the events 'mousedown', 'mouseup' and 'dragend' for the buttons.
for (let index = 0; index < buttons.length; index++) {
    const button = buttons[index];
    button.addEventListener('mousedown', OnButtonMouseDown);
    button.addEventListener('mouseup', OnButtonMouseUp);
    button.addEventListener('dragend', OnButtonMouseUp);
}

//'mousedown' event handler.
function OnButtonMouseDown(ev: Event) {
    if (ev.currentTarget instanceof HTMLElement) {
        let button = ev.currentTarget;
        let scaleAmount = (button.offsetWidth - 10) / button.offsetWidth;
        button.style.scale = scaleAmount.toString();
        button.classList.add("animatable");
    }

    if (ev instanceof Event) {
        ev.stopPropagation();
    }
}

//'mouseup' and 'dragend' event handler.
function OnButtonMouseUp(ev: Event) {
    if (ev.currentTarget instanceof HTMLElement) {
        let button = ev.currentTarget;
        button.style.scale = '1';
    }

    if (ev instanceof Event) {
        ev.stopPropagation();
    }
}

//Set the theme.
interface IThemeColoursDictionary {
    readonly [index: string]: string;

    readonly "--background-colour": string,
    readonly "--primary-colour": string,
    readonly "--button-colour": string,
    readonly "--button-hover-colour": string,
    readonly "--text-colour": string,
}

let darkThemeColours: IThemeColoursDictionary = {
    "--background-colour": "rgb(28, 28, 26)",
    "--primary-colour": "rgb(35, 35, 32)",
    "--button-colour": "rgb(47, 47, 42)",
    "--button-hover-colour": "rgb(65, 65, 58)",
    "--text-colour": "rgb(211, 211, 211)",
    "--hyperlink-text-colour": "rgb(110, 168, 254)",
}

let lightThemeColours: IThemeColoursDictionary = {
    "--background-colour": "rgb(234,220,191)",
    "--primary-colour": "rgb(250,245,239)",
    "--button-colour": "rgb(236, 219, 201)",
    "--button-hover-colour": "rgb(215, 200, 190)",
    "--text-colour": "rgb(69, 40, 15)",
    "--hyperlink-text-colour": "rgb(0, 84, 211)",

}

function SetTheme(theme: IThemeColoursDictionary) {
    //Get theme properties as a list of strings.
    let themeProperties = Object.keys(theme)

    //Remove animatable class from all elements that are animated.
    for (let index = 0; index < buttons.length; index++) {
        const button = buttons[index];
        button.classList.remove("animatable");
    }

    //Loop through the object properties and set the CSS variables equal to the object property.
    for (let index = 0; index < themeProperties.length; index++) {
        //Check if the property name includes the beginning of the the CSS variable notation.
        if (themeProperties[index].includes("--")) {
            document.documentElement.style.setProperty(themeProperties[index], theme[themeProperties[index]])
        }
    }

    //Re-add the animatable class back to all elements that animate after 100ms.
    setTimeout(AddBackAnimatable, 100)
}

function AddBackAnimatable() {
    for (let index = 0; index < buttons.length; index++) {
        const button = buttons[index];
        button.classList.add("animatable");
    }
}

//Toggle button-group-one.
enum buttonGroupOneSections {
    "new-posts-section",
    "archive-section",
    length,
}

let buttonGroupOne = document.getElementsByClassName("button-group-one");
if (buttonGroupOne.length > 0) {
    for (let index = 0; index < buttonGroupOne.length; index++) {
        const button = buttonGroupOne[index];
        button.addEventListener('click', OnButtonGroupOneClicked);

    }
}

function OnButtonGroupOneClicked(ev: Event) {
    if (ev.currentTarget instanceof HTMLElement) {
        let button = ev.currentTarget;
        let buttonIndex = null;

        //Find the buttons index in the buttonGroupOne.
        for (let index = 0; index < buttonGroupOne.length; index++) {
            if (button == buttonGroupOne[index]) {
                buttonIndex = index;
                break;
            }
        }

        //If we found the button index.
        if (buttonIndex != null) {
            //Deselect all buttons and sections.
            for (let index = 0; index < buttonGroupOne.length; index++) {
                buttonGroupOne[index].classList.remove('selected-button');
            }
            for (let index = 0; index < buttonGroupOneSections.length; index++) {
                let toggleSection = document.getElementById(buttonGroupOneSections[index]);
                if (toggleSection) {
                    toggleSection.classList.add("hide-element");
                }
            }

            //Select the button and toggle the section.
            button.classList.add('selected-button');
            let toggleSection = document.getElementById(buttonGroupOneSections[buttonIndex]);
            if (toggleSection) {
                toggleSection.classList.remove("hide-element");
            }
        }
        else {
            console.log("ERROR: Could not toggle button because clicked button was not in the button-group-one array.")
        }
    }
}

//Set theme based on current localStorage theme and change icon to match if necessary.
if (themeButton) {
    if (localStorage.getItem("theme") == "darkTheme") {
        darkTheme = true;
        SetTheme(darkThemeColours)
        themeButton.innerHTML = darkThemeIcon;
    }
    else {
        darkTheme = false;
        SetTheme(lightThemeColours)
        themeButton.innerHTML = lightThemeIcon;
    }
}
else {
    console.log("ERROR: Could not find either \"theme-button\" to set the initial theme based on the 'theme' variable in stored in local storage.");
}

//Set theme based on OS Theme if localstorage has not been set and watch for OS theme change and set theme and local storage accordingly.
OnOSThemeChange(matchMedia('(prefers-color-scheme: dark)'));
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', OnOSThemeChange);

function OnOSThemeChange(ev: MediaQueryListEvent | MediaQueryList) {
    if (localStorage.getItem("theme") == null) {
        if (themeButton) {
            if (ev.matches) {
                darkTheme = true;
                SetTheme(darkThemeColours)
                themeButton.innerHTML = darkThemeIcon;
                localStorage.setItem("theme", "darkTheme");
            }
            else {
                darkTheme = false;
                SetTheme(lightThemeColours)
                themeButton.innerHTML = lightThemeIcon;
                localStorage.setItem("theme", "lightTheme");
            }
        }
        else {
            console.log("ERROR: Could not find either \"theme-button\" to set the initial theme based on the OS theme.");
        }
    }
}
