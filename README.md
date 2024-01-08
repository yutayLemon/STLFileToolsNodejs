# stlFileTools
This is a simple set of tools to create a 3d model in a STL file for 3d printing including the following functionalities.
***The STL files are currently only in ASCII**
-   Functions to manipulate vectors
-   Function to write a single triangle onto a stl file
-   Function which creates a sphere and maps values generated from a custom function as varying radii.
-   Function which maps height values from a custom function on to a flat plane.
eg perlin Noise
-   Function which maps height values from a custom function on to a rectangular prism.
-   The manipulation of the plain and rectangular prism by 3 by 3 transformation matrices.


## example/Demonstration
The following is a example and demonstraion of the library where a cos grath is used as the custom function.The parmaters will be explained later.
    const stl = require('stlfiletools');
    var soMatix = [[2,1,0],[-1,3,0],[0,0,4]];

    //User defined function wich returns value based on position
    function cosGrath(x,y){
	       return Math.cos(Math.sqrt(((x-50)/10)*((x-50)/10) + ((y-50)/10) * ((y-50)/10)));  
	 }
	 //starts stl file
    stl.StartSTLFile("testSTL.stl","testingg").then(()=>{
    var offset = new stl.cord(0,0,15);

    //creates rectangular mesh using cos function
    return stl.RectMeshFromFunction("testSTL.stl",0.1,100,100,1,cosGrath,offset,5,soMatix);
    }).then(()=>{
    
    //end stl file
    return stl.endSTLFile("testSTL.stl","testingg");
    });
