// these functions are all about the menus. they are executed when the different menu buttons are clicked
var menuIsOpen = 'n';   // 'n' for play, 's' for settings, 'h' for help, 'a' for about

// responsible for all of the main page buttons along the top of the screen
function openMenu(newMenu)
{
    // first close the old menu
    switch(menuIsOpen)
    {
        case 'n':
            document.getElementById("left-side").style.display = "none";
            document.getElementById("right-side").style.display = "none";
            document.getElementById("play-button").className = "ui-button";
            break;

        case 's':
            document.getElementById("menu").style.display = "none";
            document.getElementById("menu-button").className = "ui-button";
            break;

        case 'h':
            document.getElementById("help").style.display = "none";
            document.getElementById("help-button").className = "ui-button";
            break;

        case 'a':
            document.getElementById("about").style.display = "none";
            document.getElementById("about-button").className = "ui-button";
            break;
    }

    // then open new menu
    switch(newMenu)
    {
        case 'n':
            document.getElementById("left-side").style.display = "inline-block";
            document.getElementById("right-side").style.display = "inline-block";
            document.getElementById("play-button").className = "selected-ui-button";
            break;

        case 's':
            document.getElementById("menu").style.display = "inline-block";
            document.getElementById("menu-button").className = "selected-ui-button";
            break;

        case 'h':
            document.getElementById("help").style.display = "inline-block";
            document.getElementById("help-button").className = "selected-ui-button";
            break;

        case 'a':
            document.getElementById("about").style.display = "inline-block";
            document.getElementById("about-button").className = "selected-ui-button";
            break;
    }

    menuIsOpen = newMenu;
}


// when you check the dark background button
function setBackground()
{
    if(!globalIsDarkBackground)
    {
        // set dark
        document.body.style.backgroundColor = "#222F2D";

        document.getElementById("header").style.backgroundColor = "#1E2928";
        document.getElementById("play-button").style.color = "#ffffff";
        document.getElementById("menu-button").style.color = "#ffffff";
        document.getElementById("help-button").style.color = "#ffffff";
        document.getElementById("about-button").style.color = "#ffffff";
        document.getElementById("restart-button").style.color = "#ffffff";

        document.body.style.color = "#ffffff";
        globalIsDarkBackground = true;
    }
    else
    {
        // set light
        document.body.style.backgroundColor = "#baffee";

        document.getElementById("header").style.backgroundColor = "#a9eedd";
        document.getElementById("play-button").style.color = "#000000";
        document.getElementById("menu-button").style.color = "#000000";
        document.getElementById("help-button").style.color = "#000000";
        document.getElementById("about-button").style.color = "#000000";
        document.getElementById("restart-button").style.color = "#000000";

        document.body.style.color = "#000000";
        globalIsDarkBackground = false;
    }
}


// setting the difficulty and autoselect mode are straightforward
function setDifficulty(x)
{
    DIFFICULTY = x;
}

function setAutosel(x)
{
    globalSettingAutoSelect = x;
}

function setSettingsAutosave()
{
    if(globalIsAutosaveSettings)
    {
        globalIsAutosaveSettings = false;
        if(getCookie("autosave-settings") !== "")
        {
            setCookie("autosave-settings", "", 0);
        }
    }
    else
    {
        globalIsAutosaveSettings = true;
    }
}

function setPuzzleAutosave()
{
    if(globalIsAutosavePuzzle)
    {
        globalIsAutosavePuzzle = false;
        if(getCookie("saved-clues") !== "")
        {
            setCookie("saved-clues", "", 0);
            setCookie("saved-grid", "", 0);
        }
        setCookie("autosave-puzzle", "", 0);
    }
    else
    {
        globalIsAutosavePuzzle = true;
        setCookie("autosave-puzzle", globalIsAutosavePuzzle, 1000);
    }
}


// saving the settings using cookies
function saveSettings()
{
    setCookie("difficulty", DIFFICULTY, 1000);
    
    setCookie("width", document.getElementById("size-w").value, 1000);
    setCookie("height", document.getElementById("size-h").value, 1000);
    
    setCookie("dark-mode", globalIsDarkBackground, 1000);
    
    setCookie("autosel", globalSettingAutoSelect, 1000);
    
    setCookie("autosave-puzzle", globalIsAutosavePuzzle, 1000);
    setCookie("autosave-settings", globalIsAutosaveSettings, 1000);
}


// autosave function
function saveEverything()
{
    if(globalIsAutosavePuzzle)
    {
        if(!globalDoNotSave)
        {
            savePuzzleToCookies();
        }
    }
    
    if(globalIsAutosaveSettings)
    {
        saveSettings();
    }
}
