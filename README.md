
# stlFileTools

This is a simple set of tools to create a 3d model in a STL file for 3d printing including the following functionalities.

***The STL files are currently only in ASCII**

- Functions to manipulate vectors
- Function to write a single triangle onto a stl file
- Function which creates a sphere and maps values generated from a custom function as varying radii.
- Function which maps height values from a custom function onto a flat plane.
eg perlin Noise
- Function which maps height values from a custom function onto a rectangular prism.
- The manipulation of the plain and rectangular prism by 3 by 3 transformation matrices.

  
  

## example/Demonstration

The following is an example and demonstration of the library where a cos graph is used as the custom function.The parameters will be explained later.

![simpleDemo](https://github.com/yutayLemon/STLFileToolsNodejs/blob/main/documentation/SimpleDemo.png?raw=true)

  
```
const stl = require('stlfiletools');

var soMatix = [[2,1,0],[-1,3,0],[0,0,4]];

//User defined function which returns value based on position

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

  
```
## Cords

  

**cord**

This class will be used repeatedly for coordinates in 3 dimensions.

```

class cord {
constructor(x,y,z){
this.x = x;
this.y = y;
this.z = z;
}
};

```

## Mesh Generation Functions

****for the following functions only path and name are required.All other parameters can be set to undefined if not needed.***

  

**StartSTLFile()**

```

async function StartSTLFile(path,name)

```

- path : states path to stl file,it will create one.

- name: name

Starts a stl file.Returns 0 when finished.

  

**endSTLFile()**

  

async function endSTLFile(path,name)

- path:path to stl file

- name:name same as the starting name

  

ends stl file.Returns 0 when finished

  

**GenSphere()**

```

async function GenSphere(path,r,pointsPerSlice,bottomStart, RadiusAtPoint)

```

  

- path : path to stl file

- r : base radius

- pointsPerSlice : how many points per revolution,determine how spherical the shape seems(all odd numbers will be changed to even)

- bottomStart : cord class,States offset from original position.

- RadiusAtPoint : User defined function which returns radius at given point with the parameters theta : anglein radian from positive z axis,epsilon : angle in radian from horizontal axis,r : base radius.

```

function example(theta,epsilon,r){
return r ;
}

```

  

example

![sphere](https://github.com/yutayLemon/STLFileToolsNodejs/blob/main/documentation/sphereDemo.png?raw=true)
```
const stl = require('stlfiletools');

//starts stl file

stl.StartSTLFile("testSTL.stl","testingg").then(()=>{

var offset = new stl.cord(0,0,15);

//Creates sphere with radius 5

//RadiusAtPointSphere is a built in function which always returns radius

return stl.GenSphere("testSTL.stl",5,30,offset,stl.RadiusAtPointSphere);

}).then(()=>{

//end stl file

return stl.endSTLFile("testSTL.stl","testingg");

});
```
  
  

**RectMeshFromFunction()**

****the RectMeshFromFunction has one extra variable elevation then FlatMeshFromFunction***

```js

async function

RectMeshFromFunction(path,cellSize,length,width,hightParm,CordAt,offSet,elevation,Matrix)

```

- path : path to stl file
- cellSize : distance between one data point and the other
- length : number of points in the y direction actual length is from cellSize * length
- width : number of points in the x direction actual width from cellSize * width
- hightParm : z values from user function is multiplied by this.Not so useful.
- CordAt : function which returns z value from x and y positions.x is between 0 and width,y is between 0 and height(EgFunction(x,y))

```js

function example(x,y){

return 1;

}

```

- offset : cord class.states offset from original position.
- elevation : value added onto z value.
- Matrix : 3 by 3 transformation matrix all points will be multiplied by this(set to undefined if not in use)

example

The following example creates a natural looking mesh from perlin noise where values are mapped to height values.

![RectDemo](https://github.com/yutayLemon/STLFileToolsNodejs/blob/main/documentation/RectDemo.png?raw=true)

  
  
```js
const stl = require('stlfiletools');
function perlinnoise(x,y){
//~
//perlin code
//~
}

//start stl file
stl.StartSTLFile("testSTL.stl","testingg").then(()=>{
return stl.RectMeshFromFunction("testSTL.stl",0.5,140,80,1,perlinnoise,undefined,1,undefined);
}).then(()=>{
return stl.endSTLFile("testSTL.stl","testingg");
});
 ```
  
  

**FlatMeshFromFunction()**

  

async function FlatMeshFromFunction(path,cellSize,length,width,hightParm,CordAt,offSet,Matrix)

  

- path : path to stl file
- cellSize : distance between one data point and the other
- length : number of points in the y direction actual length is from cellSize * length
- width : number of points in the x direction actual width from cellSize * width
- hightParm : z values from user function is multiplied by this.Not so useful.
- CordAt : user defined function which returns z value from x and y positions.x is between 0 and width,y is between 0 and height.

```js
function example(x,y){
return 1;
}
```

- offset : cord class.states offset from original position.-optional

- Matrix : 3 by 3 transformation matrix all points will be multiplied by this(set to undefined if not in use)

example

The following example creates a plane from a user defined function cosGrath and then rotates it by multiplying a rotation matrix. ![flat demo](https://github.com/yutayLemon/STLFileToolsNodejs/blob/main/documentation/flatDemo.png?raw=true)

  
  
```js
const stl = require('stlfiletools');

//rotation matrix
var rotation = [[Math.cos(1),0,Math.sin(1)],[0,1,0],[-1*Math.sin(1),0,Math.cos(1)]];

//user defined function
function cosGrath(x,y){
return Math.cos(Math.sqrt(((x*2-50)/10)*((x*2-50)/10) + ((y*2-50)/10) * ((y*2-50)/10)));
}

//starts stl file
stl.StartSTLFile("testSTL.stl","testingg").then(()=>{

//sets offset
var offset = new stl.cord(0,0,15);

//creates mesh
return stl.FlatMeshFromFunction("testSTL.stl",0.1,100,100,1,cosGrath,offset,rotation);
}).then(()=>{
return stl.endSTLFile("testSTL.stl","testingg");
});
```
## Precise functions

These are functions which are the bases of the mesh Generation functions.

  

**STLNormal()**

```js
function STLNormal(vect1,vect2,vect3)
```

  

A normal vector in the class cord is returned.The length of the normal vector is not set to 1.The vectors should be listed in order of the right hand rule.

- vect1 : cord class
- vect2 : cord class
- vect3 : cord class

  

**LogTriangle()**

```js
function LogTriangle(vect1,vect2, vect3, normal)
```

Returns a string about the triangle which can be added to a stl file.The start and end functions are still necessary.The vectors should be in order of right hand rule and the normal should be pointing out.

  

- vect1 : cord class
- vect2 : cord class
- vect3 : cord class
- normal : cord class

  

## Helper functions

  

**sinGrath()**

Built in example for the rect and flat meshes,returns a value based on x and y.

```js
function sinGrath(x,y)
```

  

- x : int as index(width)
- y : int as index(len)

  

**RadiusAtPointSphere()**

Built in example for sphere mesh,always returns r.

```js
function RadiusAtPointSphere( theta, epsilon, r)
```

  

- theta : radian angle from pos z axis
- epsilon : radian angle horizontal
- r : number base radius
