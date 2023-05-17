"use strict";
let darkThemeButton = document.getElementById("dark-theme-button");
let lightThemeButton = document.getElementById("light-theme-button");
if (darkThemeButton && lightThemeButton) {
    darkThemeButton.addEventListener('click', OnThemeButtonClicked);
    lightThemeButton.addEventListener('click', OnThemeButtonClicked);
}
else {
    console.log("ERROR: Could not find either \"dark-theme-button\" or \"light-theme-button\" to register an event handler to the 'click' event.");
}
function OnThemeButtonClicked(ev) {
    if (darkThemeButton && lightThemeButton) {
        if (ev.currentTarget instanceof HTMLElement) {
            let themeButton = ev.currentTarget;
            themeButton.classList.add("hide-element");
            if (themeButton.id == "dark-theme-button") {
                lightThemeButton.classList.remove("hide-element");
                SetTheme(lightThemeColours);
                localStorage.setItem("theme", "lightTheme");
            }
            else if (themeButton.id == "light-theme-button") {
                darkThemeButton.classList.remove("hide-element");
                SetTheme(darkThemeColours);
                localStorage.setItem("theme", "darkTheme");
            }
        }
    }
    if (ev instanceof Event) {
        ev.stopPropagation();
    }
}
let buttons = document.getElementsByClassName('generic-button');
for (let index = 0; index < buttons.length; index++) {
    const button = buttons[index];
    button.addEventListener('mousedown', OnButtonMouseDown);
    button.addEventListener('mouseup', OnButtonMouseUp);
    button.addEventListener('dragend', OnButtonMouseUp);
}
function OnButtonMouseDown(ev) {
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
function OnButtonMouseUp(ev) {
    if (ev.currentTarget instanceof HTMLElement) {
        let button = ev.currentTarget;
        button.style.scale = '1';
    }
    if (ev instanceof Event) {
        ev.stopPropagation();
    }
}
let darkThemeColours = {
    "--background-colour": "rgb(28, 28, 26)",
    "--primary-colour": "rgb(35, 35, 32)",
    "--button-colour": "rgb(47, 47, 42)",
    "--button-hover-colour": "rgb(65, 65, 58)",
    "--text-colour": "rgb(211, 211, 211)",
    "--hyperlink-text-colour": "rgb(110, 168, 254)",
};
let lightThemeColours = {
    "--background-colour": "rgb(234,220,191)",
    "--primary-colour": "rgb(250,245,239)",
    "--button-colour": "rgb(236, 219, 201)",
    "--button-hover-colour": "rgb(215, 200, 190)",
    "--text-colour": "rgb(69, 40, 15)",
    "--hyperlink-text-colour": "rgb(0, 84, 211)",
};
function SetTheme(theme) {
    let themeProperties = Object.keys(theme);
    for (let index = 0; index < buttons.length; index++) {
        const button = buttons[index];
        button.classList.remove("animatable");
    }
    for (let index = 0; index < themeProperties.length; index++) {
        if (themeProperties[index].includes("--")) {
            document.documentElement.style.setProperty(themeProperties[index], theme[themeProperties[index]]);
        }
    }
    setTimeout(AddBackAnimatable, 100);
}
function AddBackAnimatable() {
    for (let index = 0; index < buttons.length; index++) {
        const button = buttons[index];
        button.classList.add("animatable");
    }
}
var buttonGroupOneSections;
(function (buttonGroupOneSections) {
    buttonGroupOneSections[buttonGroupOneSections["new-posts-section"] = 0] = "new-posts-section";
    buttonGroupOneSections[buttonGroupOneSections["archive-section"] = 1] = "archive-section";
    buttonGroupOneSections[buttonGroupOneSections["length"] = 2] = "length";
})(buttonGroupOneSections || (buttonGroupOneSections = {}));
let buttonGroupOne = document.getElementsByClassName("button-group-one");
if (buttonGroupOne.length > 0) {
    for (let index = 0; index < buttonGroupOne.length; index++) {
        const button = buttonGroupOne[index];
        button.addEventListener('click', OnButtonGroupOneClicked);
    }
}
function OnButtonGroupOneClicked(ev) {
    if (ev.currentTarget instanceof HTMLElement) {
        let button = ev.currentTarget;
        let buttonIndex = null;
        for (let index = 0; index < buttonGroupOne.length; index++) {
            if (button == buttonGroupOne[index]) {
                buttonIndex = index;
                break;
            }
        }
        if (buttonIndex != null) {
            for (let index = 0; index < buttonGroupOne.length; index++) {
                buttonGroupOne[index].classList.remove('selected-button');
            }
            for (let index = 0; index < buttonGroupOneSections.length; index++) {
                let toggleSection = document.getElementById(buttonGroupOneSections[index]);
                if (toggleSection) {
                    toggleSection.classList.add("hide-element");
                }
            }
            button.classList.add('selected-button');
            let toggleSection = document.getElementById(buttonGroupOneSections[buttonIndex]);
            if (toggleSection) {
                toggleSection.classList.remove("hide-element");
            }
        }
        else {
            console.log("ERROR: Could not toggle button because clicked button was not in the button-group-one array.");
        }
    }
}
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
matchMedia('(prefers-color-scheme: dark)').addEventListener('change', OnOSThemeChange);
function OnOSThemeChange(ev) {
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
