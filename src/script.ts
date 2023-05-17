//-- Theme Button toggle icon --

//Get theme buttons.
let darkThemeButton = document.getElementById("dark-theme-button");
let lightThemeButton = document.getElementById("light-theme-button");

//Register event handler to both theme button 'click' events.
if (darkThemeButton && lightThemeButton) {
    darkThemeButton.addEventListener('click', OnThemeButtonClicked);
    lightThemeButton.addEventListener('click', OnThemeButtonClicked);
}
else {
    console.log("ERROR: Could not find either \"dark-theme-button\" or \"light-theme-button\" to register an event handler to the 'click' event.");
}

//If theme button is clicked, toggle icon and theme.
function OnThemeButtonClicked(ev: Event) {
    if (darkThemeButton && lightThemeButton) {
        if (ev.currentTarget instanceof HTMLElement) {
            let themeButton = ev.currentTarget;
            themeButton.classList.add("hide-element");
            if (themeButton.id == "dark-theme-button") {
                lightThemeButton.classList.remove("hide-element");
                //Toggle light theme and set localStorage.
                SetTheme(lightThemeColours);
                localStorage.setItem("theme", "lightTheme");
            }
            else if (themeButton.id == "light-theme-button") {
                darkThemeButton.classList.remove("hide-element");
                //Toggle dark theme and set localStorage.
                SetTheme(darkThemeColours);
                localStorage.setItem("theme", "darkTheme");
            }
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
if (lightThemeButton && darkThemeButton) {
    if (localStorage.getItem("theme") == "darkTheme") {
        SetTheme(darkThemeColours);
        lightThemeButton.classList.add("hide-element");
    }
    else {
        SetTheme(lightThemeColours);
        darkThemeButton.classList.add("hide-element");
    }
}
else {
    console.log("ERROR: Could not find either \"dark-theme-button\" or \"light-theme-button\" to set the initial theme based on the 'theme' variable in stored in local storage.");
}

//Watch for OS theme change and set theme and local storage accordingly.
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', OnOSThemeChange);

function OnOSThemeChange(ev: MediaQueryListEvent) {
    if (lightThemeButton && darkThemeButton) {
        if (ev.matches) {
            localStorage.setItem("theme", "darkTheme");
            SetTheme(darkThemeColours);
            lightThemeButton.classList.add("hide-element");

        }
        else {
            localStorage.setItem("theme", "lightTheme");
            SetTheme(lightThemeColours);
            darkThemeButton.classList.add("hide-element");
        }
    }
    else {
        console.log("ERROR: Could not find either \"dark-theme-button\" or \"light-theme-button\" to set the initial theme based on the OS theme.");
    }
}
