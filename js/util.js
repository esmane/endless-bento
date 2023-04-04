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
