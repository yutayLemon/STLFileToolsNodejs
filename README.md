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
![simpleDemo](https://github.com/yutayLemon/STLFileToolsNodejs/blob/main/documentation/SimpleDemo.png?raw=true)
    

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
## Mesh  Generation Functions
**StartSTLFile()**
`async function StartSTLFile(path,name)`
 - path : states path to stl file,it will create one.
 - name: name
 
 Starts a stl file.Returns 0 when finished.

**endSTLFile()**

    async function endSTLFile(path,name)
 - path:path to stl file
 - name:name same as the starting name

ends stl file.Returns 0 when finished

**GenSphere()**

    async function GenSphere(path,r,pointsPerSlice,bottomStart, RadiusAtPoint)
   

 - path : path to stl file
 - r : base radius
 - pointsPerSlice : how meany points per revolution,determens how sphereical the shape seems(all odd numbers will be changed to even)
 - bottomStart : cord class,States offset from original position.
 - RadiusAtPoint : User defined function wich returns radius at given point with the parmaters theta : anglein radin from positive z axis,epsilon : angle in radien from horizontal axis,r : base radius.

example
![sphere](https://github.com/yutayLemon/STLFileToolsNodejs/blob/main/documentation/sphereDemo.png?raw=true)
   
    
    
     const stl = require('stlfiletools');
    //starts stl file
    stl.StartSTLFile("testSTL.stl","testingg").then(()=>{
    var offset = new stl.cord(0,0,15);
    
    //Creates sphere with radius 5 
    //RadiusAtPointSphere is a built in function wich alwase returns radius
    return stl.GenSphere("testSTL.stl",5,30,offset,stl.RadiusAtPointSphere);
    }).then(()=>{
    
    //end stl file
    return stl.endSTLFile("testSTL.stl","testingg");
    });
**FlatMeshFromFunction**

    async function FlatMeshFromFunction(path,cellSize,length,width,hightParm,CordAt,offSet,Matrix)
   

 - path : path to stl file
 - cellSize : distance between one data point and the other
 - length : number of points in the y direction actual length is from cellSize * length
 - width : number of points in the x direction actual width from cellSize * width
 - hightParm : z values from user function is multiplyed by this.Not so usefule.
 - CordAt : user defined function wich returns z value from x and y positions.x is between 0 and width,y is between 0 and height
 - offset : cord class.states offset from original position.-optional
 - Matrix : 3 by 3 transformation matrix all points will be multiplyed by this
 
 example
 ![flat demo](https://github.com/yutayLemon/STLFileToolsNodejs/blob/main/documentation/flatDemo.png?raw=true)


    const stl = require('stlfiletools');
    var rotation = [[Math.cos(1),0,Math.sin(1)],[0,1,0],[-1*Math.sin(1),0,Math.cos(1)]];
    function cosGrath(x,y){
    return Math.cos(Math.sqrt(((x*2-50)/10)*((x*2-50)/10) + ((y*2-50)/10) * ((y*2-50)/10)));  
    }
    stl.StartSTLFile("testSTL.stl","testingg").then(()=>{
    var offset = new stl.cord(0,0,15);
    return stl.FlatMeshFromFunction("testSTL.stl",0.1,100,100,1,cosGrath,offset,rotation);
    //return stl.GenSphere("testSTL.stl",5,40,offset,stl.RadiusAtPointSphere);
    }).then(()=>{
    return stl.endSTLFile("testSTL.stl","testingg");
    });



 
