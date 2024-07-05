// first two "util" functions deal with arrays
// this function initializes an empty array of any sizes of any dimension
// it takes an unlimited number of parameters IN AN ARRAY and generates arrays with recursion
// stolen from https://stackoverflow.com/questions/12588618/javascript-n-dimensional-array-creation
function initArray(dimensions)
{
    if(dimensions.length > 0)
    {
        var dim = dimensions[0];
        var rest = dimensions.slice(1);
        var newArray = [];

        for(let i = 0; i < dim; i++)
        {
            newArray[i] = initArray(rest);
        }
        return newArray;
    }
    else
    {
        return "";
    }
}


// this function checks if two arrays are equal to each other.
// mainly used to check if the puzzle has been solved.
// source: https://stackoverflow.com/questions/27102507/assert-if-two-2d-arrays-are-equal
function equal(array1, array2)
{
    if(!Array.isArray(array1) && !Array.isArray(array2))
    {
        return array1 === array2;
    }

    if(array1.length !== array2.length)
    {
        return false;
    }

    for(var i = 0, len = array1.length; i < len; i++)
    {
        if(!equal(array1[i], array2[i]))
        {
            return false;
        }
    }
    return true;
}



// these next two functions deal with cookies
// source: https://www.w3schools.com/js/js_cookies.asp
function setCookie(name, value, daysToExpire)
{
    const d = new Date();
    d.setTime(d.getTime() + (daysToExpire * 24 * 60 * 60 * 1000));
    let expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}


function getCookie(name)
{
    name += "=";
    let decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');

    for(let i = 0; i < ca.length; i++)
    {
        let c = ca[i];
        while(c.charAt(0) === ' ')
        {
            c = c.substring(1);
        }
        if(c.indexOf(name) === 0)
        {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}
