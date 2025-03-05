
class cord {
constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
}
};
///simple add
function VectOPadd(vec1,vec2) {
	var temp = new cord(vec1.x + vec2.x,vec1.y + vec2.y,vec1.z + vec2.z);
	return temp;
}
//simple mius
function VectOPmins( vec1,  vec2) {
	var temp = new cord(vec1.x - vec2.x,vec1.y - vec2.y,vec1.z - vec2.z);
	return temp;
}
//multiply as a scaler
function VectOPmult(scal,vec2) {
    var temp = new cord(scal *vec2.x,scal * vec2.y,scal * vec2.z);
	return temp;
}
//get vector len
function VectOPlen(vect1) {
	return Math.sqrt(vect1.x * vect1.x + vect1.y * vect1.y + vect1.z * vect1.z);
}
//get unit vector
function VectOPUnit(vect1) {
	return VectOPmult(1 / VectOPlen(vect1), vect1);
}
//display vector
function VectOPdisply(vect1) {
	console.log( "x:" + vect1.x + " y:" + vect1.y + " z:" + vect1.z + "");
}

//crossproduct generates othorgonal vector perpendiculer to the other 2
function VectOPCrossProd(vect1,vect2) {
	var temp = new cord(0,0,0);
	temp.x = (vect1.y * vect2.z) - (vect1.z * vect2.y);
	temp.y = (vect1.z * vect2.x) - (vect1.x * vect2.z);
	temp.z = (vect1.x * vect2.y) - (vect1.y * vect2.x);

	return temp;
}

module.exports.add = VectOPadd;
module.exports.mins = VectOPmins;
module.exports.mult = VectOPmult;
module.exports.len = VectOPlen;
module.exports.Unit = VectOPUnit;
module.exports.disply = VectOPdisply;
module.exports.CrossProd = VectOPCrossProd;