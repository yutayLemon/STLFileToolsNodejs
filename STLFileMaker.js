const fs = require('node:fs').promises;



class cord {
constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
}
};
//z as up


///simple add
function vectorOPadd(vec1,vec2) {
	var temp = new cord(vec1.x + vec2.x,vec1.y + vec2.y,vec1.z + vec2.z);
	return temp;
}
//simple mius
function vectorOPmins( vec1,  vec2) {
	var temp = new cord(vec1.x - vec2.x,vec1.y - vec2.y,vec1.z - vec2.z);
	return temp;
}
//multiply as a scaler
function vectorOPmult(scal,vec2) {
    var temp = new cord(scal *vec2.x,scal * vec2.y,scal * vec2.z);
	return temp;
}
//get vector len
function vectorOPlen(vect1) {
	return Math.sqrt(vect1.x * vect1.x + vect1.y * vect1.y + vect1.z * vect1.z);
}
//get unit vector
function vectorOPUnit(vect1) {
	return vectorOPmult(1 / vectorOPlen(vect1), vect1);
}
//display vector
function vectorOPdisply(vect1) {
	console.log( "x:" + vect1.x + " y:" + vect1.y + " z:" + vect1.z + "");
}
//crossproduct generates othorgonal vector perpendiculer to the other 2
function vectorOPCrossProd(vect1,vect2) {
	var temp = new cord(0,0,0);
	temp.x = (vect1.y * vect2.z) - (vect1.z * vect2.y);
	temp.y = (vect1.z * vect2.x) - (vect1.x * vect2.z);
	temp.z = (vect1.x * vect2.y) - (vect1.y * vect2.x);

	return temp;
}
//get normal vector in stl triangle vect1,2 vector from middle to outer sides
function STLNormal(vect1,vect2,vect3) {
	var tempVect1;
	var tempVect2;
	tempVect1 = vectorOPmins(vect1, vect3);
	tempVect2 = vectorOPmins(vect2, vect3);
	return vectorOPUnit(vectorOPCrossProd(tempVect1, tempVect2));

}
/*
std::ofstream MyfileO("perlinNoiseSTL.stl");
void LogTriangle(cord vect1, cord vect2, cord vect3, cord normal) {
	MyfileO << std::scientific << std::setprecision(6) << "facet normal " << normal.x << " " << normal.y << " " << normal.z;
	MyfileO << std::scientific << std::setprecision(6) << "outer loopvertex " << vect1.x << " " << vect1.y << " " << vect1.z << "";
	MyfileO << std::scientific << std::setprecision(6) << "vertex " << vect2.x << " " << vect2.y << " " << vect2.z << "";
	MyfileO << std::scientific << std::setprecision(6) << "vertex " << vect3.x << " " << vect3.y << " " << vect3.z << "";
	MyfileO << std::scientific << std::setprecision(6) << "endloopendfacet";


	//log the triangle STL

}
*/
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
function MatrixMultiplication(Matrix,vector){
    var temp = new cord(0,0,0);
    temp.x = (vector.x * Matrix[0][0])+(vector.y * Matrix[0][1]) + (vector.z * Matrix[0][2]);
    temp.y = (vector.x * Matrix[1][0])+(vector.y * Matrix[1][1]) + (vector.z * Matrix[1][2]);
    temp.z = (vector.x * Matrix[2][0])+(vector.y * Matrix[2][1]) + (vector.z * Matrix[2][2]);
    
    return temp;
}
function MatrixMultiMatrix(Matrix1,Matrix2){
    var resMatrix = [[0,0,0],[0,0,0],[0,0,0]];
    for(var i = 0;i<Matrix1.length;i++){
        for(var l = 0;l<Matrix1.length;l++){
            for(var e = 0;e<Matrix1.length;e++){
                resMatrix[i][l] += Matrix1[i][e] * Matrix2[e][l];
            }
        }
    }
    return resMatrix;
}
/////////////////////////////////////////////////sphear parms
function RadiusAtPointSphere( theta,  epsilon,  r) {
	return r;
}
///////////////TODO from hear
async function GenSphere(path,r,pointsPerSlice,bottomStart, RadiusAtPoint) {
    if(path == undefined){
       console.log("err no path set");
        return 0;
    }
    if(r == undefined){
        r = 1;
    }
    if(pointsPerSlice == undefined){
        40;
    }
    if(bottomStart == undefined){
        bottomStart = new cord(0,0,0);
    }
    if(RadiusAtPoint == undefined){
        RadiusAtPoint = RadiusAtPointSphere;
    }
    if(pointsPerSlice %2 == 1){
        pointsPerSlice++;
    }
    var DataText = '';
	var top = new cord(r,r,r + RadiusAtPoint(0, 0, r));
	top = vectorOPadd(top, bottomStart);
	
    var bottom = new cord(r,r,r - RadiusAtPoint(Math.PI, 0, r));
	bottom = vectorOPadd(bottom, bottomStart);

	//initalise grid
	//height of poins on each side minus the top and bottom (eg 10, so 3) where index 0 is the second layer
	//width points horozontal then plus one to connect
    var GridVert = [];
	//gen grid equvilent
	//theta is height
	//start from 0 as grid starts from 0 end at pps/2 - 2 because it is the length of the height
	for (var theta = 0; theta < (pointsPerSlice / 2) - 1; theta++) {//total angle / PPS)
           GridVert.push([]);
		//epsilon is the verticle
		//start from 0
		//make full revolution so PPS + 1
		for (var epsil = 0; epsil < pointsPerSlice + 1; epsil++) {
			var tempBall = new cord(0,0,0);

			//sin cos tan 3d
			//theta verticle from pos z axis
			//epsilon from pos x?<-need to cheak(horozontal)

			//pluss one as grid index 0 is second layer(index1)
			tempBall.x = RadiusAtPoint((theta + 1) * ((2 * Math.PI) / pointsPerSlice), epsil * ((2 * Math.PI) / pointsPerSlice), r) * Math.sin((theta + 1) * ((2 * Math.PI) / pointsPerSlice)) * Math.cos(epsil * ((2 * Math.PI) / pointsPerSlice)) + r;
			tempBall.z = RadiusAtPoint((theta + 1) * ((2 * Math.PI) / pointsPerSlice), epsil * ((2 * Math.PI) / pointsPerSlice), r) * Math.cos((theta + 1) * ((2 * Math.PI) / pointsPerSlice)) + r;
			tempBall.y = RadiusAtPoint((theta + 1) * ((2 * Math.PI) / pointsPerSlice), epsil * ((2 * Math.PI) / pointsPerSlice), r) * Math.sin((theta + 1) * ((2 * Math.PI) / pointsPerSlice)) * Math.sin(epsil * ((2 * Math.PI) / pointsPerSlice)) + r;

			tempBall = vectorOPadd(tempBall, bottomStart);

			GridVert[theta].push(tempBall);
		}
	}
	//gen  grid  equvilent
	//gen top equivilent
	for (var ep = 0; ep < pointsPerSlice; ep++) {
		DataText += LogTriangle(GridVert[0][ep], GridVert[0][ep + 1], top, STLNormal(GridVert[0][ep], GridVert[0][ep + 1], top));
	}
	//gen bottom

	for (var i = 0; i < (pointsPerSlice / 2) - 1 - 1; i++) {//first is wird
		//start from 1 and make full rotation
		console.log("layer :" + (i + 1) + "");
		for (var l = 1; l < pointsPerSlice + 1; l++) {
            
            
			DataText += LogTriangle(GridVert[i][l - 1], GridVert[i + 1][l - 1], GridVert[i + 1][l], STLNormal(GridVert[i][l - 1], GridVert[i + 1][l - 1], GridVert[i + 1][l]));
			DataText += LogTriangle(GridVert[i][l], GridVert[i][l - 1], GridVert[i + 1][l], STLNormal(GridVert[i][l], GridVert[i][l - 1], GridVert[i + 1][l - 1]));
		}
	}

	//gen bottom equvilent
	for (var ep = 0; ep < pointsPerSlice; ep++) {
		DataText += LogTriangle(GridVert[pointsPerSlice / 2 - 2][ep], bottom, GridVert[pointsPerSlice / 2 - 2][ep + 1], STLNormal(GridVert[pointsPerSlice / 2 - 2][ep], bottom, GridVert[pointsPerSlice / 2 - 2][ep + 1]));
	}
	//gen bottom equvilent
	//[pointsPerSlice + 1] ;
    
    
    
    //TODO log file
    await fs.appendFile(path,DataText);
    return 0;
}
async function FlatMeshFromFunction(path,cellSize,height,width,hightParm,CordAt,offSet,Matrix) {
	//gen top mesh
    if(offSet == undefined){
        offSet = new cord(0,0,0);
    }
    if(Matrix == undefined){
        Matrix = [[1,0,0],[0,1,0],[0,0,1]];
    }
    if(CordAt == undefined){
        CordAt = function(x,y){
            return 1;
        }
    }
    if(path == undefined){
        console.log("err path not set");
        return 0;
    }
    if(cellSize == undefined){
        cellSize = 1;
    }
    if(height == undefined){
        height = 100;
    }
    if(width == undefined){
        width = 100;
    }
    if(hightParm == undefined){
        hightParm = 1;
    }
    var DataText = '';
	for (var i = 0; i < height - 1; i++) {
		//height y
		console.log("GenMesh Layer:" + i);
		for (var l = 0; l < width - 1; l++) {
			//width x
            

			//vectors for each corner(cordinates)
			var tempVect1 = new cord(0,0,0);
			//perlin noise z values
			tempVect1.z = CordAt(i, l) * hightParm + hightParm - 1;
			//tempVect1.z = 0;
			tempVect1.x = l * cellSize;
			tempVect1.y = i * cellSize;////ok?swap
tempVect1 = vectorOPadd(tempVect1,offSet);
            
			var tempVect2 = new cord(0,0,0);
			tempVect2.z = CordAt(i + 1, l) * hightParm + hightParm - 1;
			//tempVect2.z = 0;
			tempVect2.x = (l * cellSize);
			tempVect2.y = (i * cellSize) + cellSize;////ok
tempVect2= vectorOPadd(tempVect2,offSet);

            
			var tempVect3 = new cord(0,0,0);
			tempVect3.z = CordAt(i, l + 1) * hightParm + hightParm - 1;
			//tempVect3.z = 0;
			tempVect3.x = (l * cellSize) + cellSize;
			tempVect3.y = (i * cellSize);//width
            
            console.log(tempVect3);
            tempVect3 = vectorOPadd(tempVect3,offSet);

            
			var tempVect4 = new cord(0,0,0);
			tempVect4.z = CordAt(i + 1, l + 1) * hightParm + hightParm - 1;
			//tempVect4.z = 0;
			tempVect4.x = (l * cellSize) + cellSize;
			tempVect4.y = (i * cellSize) + cellSize;
tempVect4 = vectorOPadd(tempVect4,offSet);


			//mid smooth?
//			DataText+=LogTriangle(mid, tempVect1, tempVect3, STLNormal(mid, tempVect1, tempVect3));
//			DataText+=LogTriangle(mid, tempVect2, tempVect1, STLNormal(mid, tempVect2, tempVect1));
//			DataText+=LogTriangle(mid, tempVect4, tempVect2, STLNormal(mid, tempVect4, tempVect2));
//			DataText+=LogTriangle(mid, tempVect3, tempVect4, STLNormal(mid, tempVect3, tempVect4));
			//midsmooth?
			//v no mid
            tempVect1 = MatrixMultiplication(Matrix,tempVect1);
            tempVect2 = MatrixMultiplication(Matrix,tempVect2);
            tempVect3 = MatrixMultiplication(Matrix,tempVect3);
            tempVect4 = MatrixMultiplication(Matrix,tempVect4);
			DataText += LogTriangle(tempVect3, tempVect2, tempVect1, STLNormal(tempVect1, tempVect3, tempVect2));
			DataText += LogTriangle(tempVect4, tempVect2, tempVect3, STLNormal(tempVect3, tempVect4, tempVect2));
			//log triangle with normalline                           middle,
			//vectorOPdisply(tempMidvect);
			//vectorOPdisply(tempVect2);
			//vectorOPdisply(tempVect3);
		//	vectorOPdisply(tempVect4);
		}
	}
    
	// gen top mesh
	await fs.appendFile(path,DataText);
    return 0;
}
async function RectMeshFromFunction(path,cellSize,height,width,hightParm,CordAt,offSet,elevation,Matrix) {
	//gen top mesh
    if(offSet == undefined){
        offSet = new cord(0,0,0);
    }
    if(elevation == undefined){
        elevation = 0;
    }
    if(Matrix == undefined){
        Matrix = [[1,0,0],[0,1,0],[0,0,1]];
    }
    if(CordAt == undefined){
        CordAt = function(x,y){
            return 1;
        }
    }
    if(path == undefined){
        console.log("err path not set");
    }
    if(cellSize == undefined){
        cellSize = 1;
    }
    if(height == undefined){
        height = 100;
    }
    if(width == undefined){
        width = 100;
    }
    if(hightParm == undefined){
        hightParm = 1;
    }
	var bottom = 0;
    var TextData = '';
	for (var i = 0; i < height - 1; i++) {
		//height y
		console.log("GenMesh Layer:" +i);
		for (var l = 0; l < width - 1; l++) {
			//width x

		
			//vectors for each corner(cordinates)
			var tempVect1 = new cord(0,0,0);
			//perlin noise z values
			tempVect1.z = CordAt(i, l) * hightParm + elevation;
			//tempVect1.z = 0;
			tempVect1.x = l * cellSize;
			tempVect1.y = i * cellSize;////ok?swap
tempVect1 = vectorOPadd(tempVect1,offSet);
            
			var tempVect2 = new cord(0,0,0);
			tempVect2.z = CordAt(i + 1, l) * hightParm + elevation;
			//tempVect2.z = 0;
			tempVect2.x = (l * cellSize);
			tempVect2.y = (i * cellSize) + cellSize;////ok
tempVect2= vectorOPadd(tempVect2,offSet);

            
			var tempVect3 = new cord(0,0,0);
			tempVect3.z = (CordAt(i, l + 1) * hightParm) + elevation;
			//tempVect3.z = 0;
			tempVect3.x = (l * cellSize) + cellSize;
			tempVect3.y = (i * cellSize);//width
            
tempVect3 = vectorOPadd(tempVect3,offSet);
           
			var tempVect4 = new cord(0,0,0);
			tempVect4.z = CordAt(i + 1, l + 1) * hightParm + elevation;
			//tempVect4.z = 0;
			tempVect4.x = (l * cellSize) + cellSize;
			tempVect4.y = (i * cellSize) + cellSize;
tempVect4 = vectorOPadd(tempVect4,offSet);


				bottom = Math.min(bottom, Math.min(Math.min(tempVect1.z, tempVect2.z), Math.min(tempVect3.z, tempVect4.z)));
			//mid smooth?
//			cord mid;
		//mid.x = (l * cellSize) + (cellSize / 2);
		//mid.y = (i * cellSize) + (cellSize / 2);
		//	mid.z = (tempVect1.z + tempVect2.z + tempVect3.z + tempVect4.z) / 4;
			//mid smooth?
			//vectors of four corners

			//mid smooth?
		//	LogTriangle(mid, tempVect1, tempVect3, STLNormal(mid, tempVect1, tempVect3));
		//	LogTriangle(mid, tempVect2, tempVect1, STLNormal(mid, tempVect2, tempVect1));
		//	LogTriangle(mid, tempVect4, tempVect2, STLNormal(mid, tempVect4, tempVect2));
		//	LogTriangle(mid, tempVect3, tempVect4, STLNormal(mid, tempVect3, tempVect4));
			//midsmooth?
			//v no mid
            
            tempVect1 = MatrixMultiplication(Matrix,tempVect1);
            tempVect2 = MatrixMultiplication(Matrix,tempVect2);
            tempVect3 = MatrixMultiplication(Matrix,tempVect3);
            tempVect4 = MatrixMultiplication(Matrix,tempVect4);
           
			TextData += LogTriangle(tempVect3, tempVect2, tempVect1, STLNormal(tempVect3, tempVect2, tempVect1));
			TextData += LogTriangle(tempVect4, tempVect2, tempVect3, STLNormal(tempVect4, tempVect2, tempVect3));
			//log triangle with normalline                           middle,
			//vectorOPdisply(tempMidvect);
			//vectorOPdisply(tempVect2);
			//vectorOPdisply(tempVect3);
		//	vectorOPdisply(tempVect4);
		}
	}
	// gen top mesh
	//fill floor
	 for (var i = 0; i < height - 1; i++) {
		//height y
	for (var l = 0; l < width - 1; l++) {
		//width x


		//vectors for each corner(cordinates)
		var tempVect1 = new cord(0,0,0);
		//perlin noise z values
		tempVect1.z = bottom;
		//tempVect1.z = 0;
		tempVect1.x = l * cellSize;
		tempVect1.y = i * cellSize;////ok?swap
var tempVect2 = new cord(0,0,0);
		tempVect2.z = bottom;
		//tempVect2.z = 0;
		tempVect2.x = (l * cellSize);
		tempVect2.y = (i * cellSize) + cellSize;////ok

		var tempVect3 = new cord(0,0,0);
        tempVect3.z = bottom;
		//tempVect3.z = 0;
		tempVect3.x = (l * cellSize) + cellSize;
		tempVect3.y = (i * cellSize);//width

		var tempVect4 = new cord(0,0,0);
        tempVect4.z = bottom;
		//tempVect4.z = 0;
		tempVect4.x = (l * cellSize) + cellSize;
		tempVect4.y = (i * cellSize) + cellSize;

var tempNormal = new cord(0,0,0);
		tempNormal.z = 1;
		//tempMidvect.z = 0;
		tempNormal.x = 0;
		tempNormal.y = 0;
		//vectors of four corners
        tempVect1 = vectorOPadd(tempVect1,offSet);
        tempVect2 = vectorOPadd(tempVect2,offSet);
        tempVect3 = vectorOPadd(tempVect3,offSet);
        tempVect4 = vectorOPadd(tempVect4,offSet);
        
            tempVect1 = MatrixMultiplication(Matrix,tempVect1);
            tempVect2 = MatrixMultiplication(Matrix,tempVect2);
            tempVect3 = MatrixMultiplication(Matrix,tempVect3);
            tempVect4 = MatrixMultiplication(Matrix,tempVect4);
		TextData += LogTriangle(tempVect2, tempVect1, tempVect3, tempNormal);
		TextData += LogTriangle(tempVect2, tempVect3, tempVect4, tempNormal);

		//log triangle with normalline                           middle,
		//vectorOPdisply(tempMidvect);
		//vectorOPdisply(tempVect2);
		//vectorOPdisply(tempVect3);
	//	vectorOPdisply(tempVect4);
	}
}
	//fill floor

//fill wall
 for (var i = 1; i < width; i++) {

		//hight with
var tempVect1 = new cord(0,0,0);
tempVect1.x = (i - 1) * cellSize;//done
tempVect1.y = 0;//same
tempVect1.z = CordAt(0,i - 1) * hightParm +elevation ;//done


var tempVect2 = new cord(0,0,0);
tempVect2.x = i * cellSize;//done
tempVect2.y = 0;//same
tempVect2.z = CordAt(0,i) * hightParm + elevation;//done


var tempVect3 = new cord(0,0,0);
tempVect3.x = (i - 1) * cellSize;//done
tempVect3.y = 0;//same
tempVect3.z = bottom;//done


var tempVect4 = new cord(0,0,0);
tempVect4.x = i * cellSize;//done
tempVect4.y = 0;//same
tempVect4.z = bottom;//done

var tempNormal = new cord(0,0,0);
tempNormal.x = 0;
tempNormal.y = -1;
tempNormal.z = 0;
     
     tempVect1 = vectorOPadd(tempVect1,offSet);
        tempVect2 = vectorOPadd(tempVect2,offSet);
        tempVect3 = vectorOPadd(tempVect3,offSet);
        tempVect4 = vectorOPadd(tempVect4,offSet);
        
            tempVect1 = MatrixMultiplication(Matrix,tempVect1);
            tempVect2 = MatrixMultiplication(Matrix,tempVect2);
            tempVect3 = MatrixMultiplication(Matrix,tempVect3);
            tempVect4 = MatrixMultiplication(Matrix,tempVect4);
TextData += LogTriangle(tempVect2, tempVect1, tempVect3, tempNormal);
TextData += LogTriangle(tempVect2, tempVect3, tempVect4, tempNormal);
	}


	for (var i = 1; i < width; i++) {

		//hight with
		var tempVect1 = new cord(0,0,0);
		tempVect1.x = (i - 1) * cellSize;//done
		tempVect1.y = (height - 1) * cellSize;//same
		tempVect1.z = CordAt(height - 1,i - 1) * hightParm + elevation;//done


		var tempVect2 = new cord(0,0,0);
		tempVect2.x = i * cellSize;//done
		tempVect2.y = (height - 1) * cellSize;//same
		tempVect2.z = CordAt(height - 1,i) * hightParm +elevation;//done


		var tempVect3 = new cord(0,0,0);
		tempVect3.x = (i - 1) * cellSize;//done
		tempVect3.y = (height - 1) * cellSize;//same
		tempVect3.z = bottom;//done


		var tempVect4 = new cord(0,0,0);
		tempVect4.x = (i)*cellSize;//done
		tempVect4.y = (height - 1) * cellSize;//same
		tempVect4.z = bottom;//done

		var tempNormal = new cord(0,0,0);
		tempNormal.x = 0;
		tempNormal.y = 1;
		tempNormal.z = 0;
        
        tempVect1 = vectorOPadd(tempVect1,offSet);
        tempVect2 = vectorOPadd(tempVect2,offSet);
        tempVect3 = vectorOPadd(tempVect3,offSet);
        tempVect4 = vectorOPadd(tempVect4,offSet);
        
            tempVect1 = MatrixMultiplication(Matrix,tempVect1);
            tempVect2 = MatrixMultiplication(Matrix,tempVect2);
            tempVect3 = MatrixMultiplication(Matrix,tempVect3);
            tempVect4 = MatrixMultiplication(Matrix,tempVect4);
		TextData += LogTriangle(tempVect1, tempVect3, tempVect2, tempNormal);
		TextData += LogTriangle(tempVect2, tempVect3, tempVect4, tempNormal);
	}

	for (var i = 1; i < height; i++) {

		//hight with
		var tempVect1 = new cord(0,0,0);
		tempVect1.x = 0;//done
		tempVect1.y = (i - 1) * cellSize;//same
		tempVect1.z = CordAt(i - 1,0) * hightParm +elevation;//done


		var tempVect2 = new cord(0,0,0);
		tempVect2.x = 0;//done
		tempVect2.y = i * cellSize;//same
		tempVect2.z = CordAt(i,0) * hightParm + elevation;//done


		var tempVect3 = new cord(0,0,0);
		tempVect3.x = 0;//done
		tempVect3.y = (i - 1) * cellSize;//same
		tempVect3.z = bottom;//done


		var tempVect4 = new cord(0,0,0);
		tempVect4.x = 0;//done
		tempVect4.y = i * cellSize;//same
		tempVect4.z = bottom;//done

		var tempNormal = new cord(0,0,0);
		tempNormal.x = -1;
		tempNormal.y = 0;
		tempNormal.z = 0;
        
        tempVect1 = vectorOPadd(tempVect1,offSet);
        tempVect2 = vectorOPadd(tempVect2,offSet);
        tempVect3 = vectorOPadd(tempVect3,offSet);
        tempVect4 = vectorOPadd(tempVect4,offSet);
        
            tempVect1 = MatrixMultiplication(Matrix,tempVect1);
            tempVect2 = MatrixMultiplication(Matrix,tempVect2);
            tempVect3 = MatrixMultiplication(Matrix,tempVect3);
            tempVect4 = MatrixMultiplication(Matrix,tempVect4);
		TextData += LogTriangle(tempVect2, tempVect1, tempVect3, tempNormal);
		TextData += LogTriangle(tempVect2, tempVect3, tempVect4, tempNormal);
	}

	for (var i = 1; i < height; i++) {

		//hight with
		var tempVect1 = new cord(0,0,0);
		tempVect1.x = (width - 1) * cellSize;//done
		tempVect1.y = (i - 1) * cellSize;//same
		tempVect1.z =            CordAt(i - 1,width - 1) * hightParm + elevation;//done


		var tempVect2 = new cord(0,0,0);
		tempVect2.x = (width - 1) * cellSize;//done
		tempVect2.y = i * cellSize;//same
		tempVect2.z = CordAt(i,width - 1) * hightParm + elevation;//done


		var tempVect3 = new cord(0,0,0);
		tempVect3.x = (width - 1) * cellSize;//done
		tempVect3.y = cellSize * (i - 1);//same
		tempVect3.z = bottom;//done


		var tempVect4 = new cord(0,0,0);
		tempVect4.x = (width - 1) * cellSize;//done
		tempVect4.y = i * cellSize;//same
		tempVect4.z = bottom;//done

		var tempNormal = new cord(0,0,0);
		tempNormal.x = 1;
		tempNormal.y = 0;
		tempNormal.z = 0;
        
        tempVect1 = vectorOPadd(tempVect1,offSet);
        tempVect2 = vectorOPadd(tempVect2,offSet);
        tempVect3 = vectorOPadd(tempVect3,offSet);
        tempVect4 = vectorOPadd(tempVect4,offSet);
        
            tempVect1 = MatrixMultiplication(Matrix,tempVect1);
            tempVect2 = MatrixMultiplication(Matrix,tempVect2);
            tempVect3 = MatrixMultiplication(Matrix,tempVect3);
            tempVect4 = MatrixMultiplication(Matrix,tempVect4);
		TextData += LogTriangle(tempVect2, tempVect1, tempVect3, tempNormal);
		TextData += LogTriangle(tempVect2, tempVect3, tempVect4, tempNormal);
	}
//fill wall
    
      await fs.appendFile(path,TextData);
    return 0;
}


async function StartSTLFile(path,name){
    await fs.writeFile(path,"solid " + name + "\n");
    console.log('start file:' + name);
    return 0;
}

async function endSTLFile(path,name){
     await fs.appendFile(path,("endsolid " + name));
    console.log('end file:' + name);
return 0;
                         }

function sinGrath(x,y){
    return Math.sin(Math.sqrt(((x-50)/10)*((x-50)/10) + ((y-50)/10) * ((y-50)/10)));  
}

module.exports.vectorOPadd = vectorOPadd;
module.exports.vectorOPmins = vectorOPmins;
module.exports.vectorOPmult = vectorOPmult;
module.exports.vectorOPlen = vectorOPlen;
module.exports.vectorOPUnit = vectorOPUnit;
module.exports.vectorOPdisply = vectorOPdisply;
module.exports.vectorOPCrossProd = vectorOPCrossProd;
module.exports.STLNormal = STLNormal;
module.exports.LogTriangle = LogTriangle;
module.exports.MatrixMultiplication = MatrixMultiplication;
module.exports.MatrixMultiMatrix = MatrixMultiMatrix;
module.exports.RadiusAtPointSphere = RadiusAtPointSphere;
module.exports.GenSphere = GenSphere;
module.exports.FlatMeshFromFunction = FlatMeshFromFunction;
module.exports.RectMeshFromFunction = RectMeshFromFunction;
module.exports.StartSTLFile = StartSTLFile;
module.exports.endSTLFile = endSTLFile;
module.exports.sinGrath = sinGrath;
module.exports.cord = cord;
/*
var soMatix = [[2,1,0],[-1,3,0],[0,0,4]];
var rotation = [[Math.cos(1),0,Math.sin(1)],[0,1,0],[-1*Math.sin(1),0,Math.cos(1)]];
StartSTLFile("testSTL.stl","testingg").then(()=>{
var offset = new cord(0,0,15);
    console.log(MatrixMultiMatrix(rotation,soMatix));
FlatMeshFromFunction("testSTL.stl",0.1,100,100,1,sinGrath,offset,MatrixMultiMatrix(rotation,soMatix));
}).then(()=>{
endSTLFile("testSTL.stl","testingg");
    
});

*/
