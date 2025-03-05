var vectFn = require("./vectors.js");


function LogTriangle(vect1,vect2, vect3, normal) {
    var context = '';
	context += "facet normal " + normal.x.toExponential(6) + " " + normal.y.toExponential(6) + " " + normal.z.toExponential(6);
	context += "\nouter loop\nvertex " + vect1.x.toExponential(6) + " " + vect1.y.toExponential(6) + " " + vect1.z.toExponential(6) + "\n";
	context += "vertex " + vect2.x.toExponential(6) + " " + vect2.y.toExponential(6) + " " + vect2.z.toExponential(6) + "\n";
	context += "vertex " + vect3.x.toExponential(6) + " " + vect3.y.toExponential(6) + " " + vect3.z.toExponential(6) + "\n";
	context += "endloop\nendfacet\n";
	//log the triangle STL
    return context;
}

function LogTriangle(vect1,vect2, vect3) {
    var normal = STLNormal(vect1,vect2,vect3);
    var context = '';
	context += "facet normal " + normal.x.toExponential(6) + " " + normal.y.toExponential(6) + " " + normal.z.toExponential(6);
	context += "\nouter loop\nvertex " + vect1.x.toExponential(6) + " " + vect1.y.toExponential(6) + " " + vect1.z.toExponential(6) + "\n";
	context += "vertex " + vect2.x.toExponential(6) + " " + vect2.y.toExponential(6) + " " + vect2.z.toExponential(6) + "\n";
	context += "vertex " + vect3.x.toExponential(6) + " " + vect3.y.toExponential(6) + " " + vect3.z.toExponential(6) + "\n";
	context += "endloop\nendfacet\n";
	//log the triangle STL
    return context;
}



//get normal vector in stl triangle vect1,2 vector from middle to outer sides
function STLNormal(vect1,vect2,vect3) {
	var tempVect1;
	var tempVect2;
	tempVect1 = vectFn.mins(vect1, vect3);
	tempVect2 = vectFn.mins(vect2, vect3);
	return vectFn.Unit(vectFn.CrossProd(tempVect1, tempVect2));

}

console.log(STLNormal({x:1,y:3,z:2,},{x:12,y:3,z:22},{x:1,y:232,z:12}));

module.exports.STLNormal = STLNormal;
module.exports.LogTriangle = LogTriangle;