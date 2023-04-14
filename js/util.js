// this function initializes an empty array of any sizes of any dimension
// it takes an unlimited number of parameters IN AN ARRAY and generates arrays with recursion
// stolen from https://stackoverflow.com/questions/12588618/javascript-n-dimensional-array-creation
function initArray(dimensions)
{
    if(dimensions.length > 0)
    {
        var dim = dimensions[0];
        var rest = dimensions.slice(1);
        var newArray = new Array();

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
