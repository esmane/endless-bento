var menuIsOpen = false;

function openMenu()
{
	if(menuIsOpen)
	{
		menuIsOpen = false;
		document.getElementById("menu").style.display = "none";
		document.getElementById("left-side").style.display = "inline-block";
		document.getElementById("right-side").style.display = "inline-block";
		document.getElementById("menu-button").innerHTML = "menu";
		document.getElementById("main-header").innerHTML = "endless bento";
	}
	else
	{
		menuIsOpen = true;
		document.getElementById("menu").style.display = "inline";
		document.getElementById("left-side").style.display = "none";
		document.getElementById("right-side").style.display = "none";
		document.getElementById("menu-button").innerHTML = "back";
		document.getElementById("main-header").innerHTML = "settings";
	}
}

function setBackground()
{
	if(!isDarkBackground)
	{
		document.body.style.backgroundColor = "#253330";
		
		document.getElementById("header").style.backgroundColor = "#131918";
		document.getElementById("menu-button").style.color = "#ffffff";
		document.getElementById("restart-button").style.color = "#ffffff";
		
		document.body.style.color = "#ffffff";
		isDarkBackground = true;
	}
	else
	{
		document.body.style.backgroundColor = "#baffee";
		
		document.getElementById("header").style.backgroundColor = "#a9eedd";
		document.getElementById("menu-button").style.color = "#000000";
		document.getElementById("restart-button").style.color = "#000000";
		
		document.body.style.color = "#000000";
		isDarkBackground = false;
	}
}

function setDifficulty(x)
{
	difficulty = x;
}

function setAutosel(x)
{
	autoSelect = x;
}