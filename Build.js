const vectFn = require("./vectors.js");


class cord {
constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
}
};

///////////////TODO from hear
function GenSphere(r,pointsPerSlice,bottomStart, RadiusAtPoint) {
    
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
    
    var Voxels = [];
    
	var top = new cord(r,r,r + RadiusAtPoint(0, 0, r));
	top = vectFn.add(top, bottomStart);
	
    var bottom = new cord(r,r,r - RadiusAtPoint(Math.PI, 0, r));
	bottom = vectFn.add(bottom, bottomStart);

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

			tempBall = vectFn.add(tempBall, bottomStart);

			GridVert[theta].push(tempBall);
		}
	}
	//gen  grid  equvilent
	//gen top equivilent
	for (var ep = 0; ep < pointsPerSlice; ep++) {
		Voxels.push([GridVert[0][ep], GridVert[0][ep + 1], top]);
	}
	//gen bottom

	for (var i = 0; i < (pointsPerSlice / 2) - 1 - 1; i++) {//first is wird
		//start from 1 and make full rotation
		console.log("layer :" + (i + 1) + "");
		for (var l = 1; l < pointsPerSlice + 1; l++) {
            
            
Voxels.push([GridVert[i][l - 1], GridVert[i + 1][l - 1], GridVert[i + 1][l]]);
Voxels.push([GridVert[i][l], GridVert[i][l - 1], GridVert[i + 1][l]]);
		}
	}

	//gen bottom equvilent
	for (var ep = 0; ep < pointsPerSlice; ep++) {
Voxels.push([GridVert[pointsPerSlice / 2 - 2][ep], bottom, GridVert[pointsPerSlice / 2 - 2][ep + 1]]);
    }
	//gen bottom equvilent
	//[pointsPerSlice + 1] ;
    
    
    
    return Voxels;
}
function FlatMeshFromFunction(cellSize,height,width,hightParm,CordAt,offSet) {
	//gen top mesh
    if(offSet == undefined){
        offSet = new cord(0,0,0);
    }
    if(CordAt == undefined){
        CordAt = function(x,y){
            return 1;
        }
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
    var Voxels = [];
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
tempVect1 = vectFn.add(tempVect1,offSet);
            
			var tempVect2 = new cord(0,0,0);
			tempVect2.z = CordAt(i + 1, l) * hightParm + hightParm - 1;
			//tempVect2.z = 0;
			tempVect2.x = (l * cellSize);
			tempVect2.y = (i * cellSize) + cellSize;////ok
tempVect2= vectFn.add(tempVect2,offSet);

            
			var tempVect3 = new cord(0,0,0);
			tempVect3.z = CordAt(i, l + 1) * hightParm + hightParm - 1;
			//tempVect3.z = 0;
			tempVect3.x = (l * cellSize) + cellSize;
			tempVect3.y = (i * cellSize);//width
            
            console.log(tempVect3);
            tempVect3 = vectFn.add(tempVect3,offSet);

            
			var tempVect4 = new cord(0,0,0);
			tempVect4.z = CordAt(i + 1, l + 1) * hightParm + hightParm - 1;
			//tempVect4.z = 0;
			tempVect4.x = (l * cellSize) + cellSize;
			tempVect4.y = (i * cellSize) + cellSize;
tempVect4 = vectFn.add(tempVect4,offSet);


			//mid smooth?
//			DataText+=LogTriangle(mid, tempVect1, tempVect3, STLNormal(mid, tempVect1, tempVect3));
//			DataText+=LogTriangle(mid, tempVect2, tempVect1, STLNormal(mid, tempVect2, tempVect1));
//			DataText+=LogTriangle(mid, tempVect4, tempVect2, STLNormal(mid, tempVect4, tempVect2));
//			DataTextFLogTriangle(mid, tempVect3, tempVect4, STLNormal(mid, tempVect3, tempVect4));
			//midsmooth?
			//v no mid
            
Voxels.push([tempVect3, tempVect2, tempVect1]);
Voxels.push([tempVect4, tempVect2, tempVect3]);
			//log triangle with normalline                           middle,
			
		}
	}
    
	// gen top mesh
    
    return Voxels;
}
function RectMeshFromFunction(cellSize,height,width,hightParm,CordAt,offSet,elevation) {
	//gen top mesh
    if(offSet == undefined){
        offSet = new cord(0,0,0);
    }
    if(elevation == undefined){
        elevation = 0;
    }
    if(CordAt == undefined){
        CordAt = function(x,y){
            return 1;
        }
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
    var Voxles = [];
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
tempVect1 = vectFn.add(tempVect1,offSet);
            
			var tempVect2 = new cord(0,0,0);
			tempVect2.z = CordAt(i + 1, l) * hightParm + elevation;
			//tempVect2.z = 0;
			tempVect2.x = (l * cellSize);
			tempVect2.y = (i * cellSize) + cellSize;////ok
tempVect2= vectFn.add(tempVect2,offSet);

            
			var tempVect3 = new cord(0,0,0);
			tempVect3.z = (CordAt(i, l + 1) * hightParm) + elevation;
			//tempVect3.z = 0;
			tempVect3.x = (l * cellSize) + cellSize;
			tempVect3.y = (i * cellSize);//width
            
tempVect3 = vectFn.add(tempVect3,offSet);
           
			var tempVect4 = new cord(0,0,0);
			tempVect4.z = CordAt(i + 1, l + 1) * hightParm + elevation;
			//tempVect4.z = 0;
			tempVect4.x = (l * cellSize) + cellSize;
			tempVect4.y = (i * cellSize) + cellSize;
tempVect4 = vectFn.add(tempVect4,offSet);


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
           
			Voxles.push([tempVect3, tempVect2, tempVect1]);
			Voxles.push([tempVect4, tempVect2, tempVect3]);
			//log triangle with normalline                           middle,
			
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
		tempNormal.z = -1;
		//tempMidvect.z = 0;
		tempNormal.x = 0;
		tempNormal.y = 0;
		//vectors of four corners
        tempVect1 = vectFn.add(tempVect1,offSet);
        tempVect2 = vectFn.add(tempVect2,offSet);
        tempVect3 = vectFn.add(tempVect3,offSet);
        tempVect4 = vectFn.add(tempVect4,offSet);
        
		Voxles.push([tempVect2, tempVect3, tempVect1, tempNormal]);
		Voxles.push([tempVect2, tempVect4, tempVect3, tempNormal]);

		//log triangle with normalline                           middle,
		//vectFn.disply(tempMidvect);
		//vectFn.disply(tempVect2);
		//vectFn.disply(tempVect3);
	//	vectFn.disply(tempVect4);
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
     
     tempVect1 = vectFn.add(tempVect1,offSet);
        tempVect2 = vectFn.add(tempVect2,offSet);
        tempVect3 = vectFn.add(tempVect3,offSet);
        tempVect4 = vectFn.add(tempVect4,offSet);
        
            
Voxles.push([tempVect2, tempVect1, tempVect3, tempNormal]);
Voxles.push([tempVect2, tempVect3, tempVect4, tempNormal]);
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
        
        tempVect1 = vectFn.add(tempVect1,offSet);
        tempVect2 = vectFn.add(tempVect2,offSet);
        tempVect3 = vectFn.add(tempVect3,offSet);
        tempVect4 = vectFn.add(tempVect4,offSet);
        
            
		Voxles.push([tempVect1, tempVect2, tempVect3, tempNormal]);
		Voxles.push([tempVect2, tempVect4, tempVect3, tempNormal]);
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
        
        tempVect1 = vectFn.add(tempVect1,offSet);
        tempVect2 = vectFn.add(tempVect2,offSet);
        tempVect3 = vectFn.add(tempVect3,offSet);
        tempVect4 = vectFn.add(tempVect4,offSet);
        
		Voxles.push([tempVect2, tempVect3, tempVect1, tempNormal]);
		Voxles.push([tempVect2, tempVect4, tempVect3, tempNormal]);
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
        
        tempVect1 = vectFn.add(tempVect1,offSet);
        tempVect2 = vectFn.add(tempVect2,offSet);
        tempVect3 = vectFn.add(tempVect3,offSet);
        tempVect4 = vectFn.add(tempVect4,offSet);
		Voxles.push([tempVect2, tempVect1, tempVect3, tempNormal]);
		Voxles.push([tempVect2, tempVect3, tempVect4, tempNormal]);
	}
//fill wall
    
    
    return Voxles;
}


//TODO  fix
function BlockyMesh(cellSize,height,width,hightParm,CordAt,offSet,elevation){
    //gen top mesh
    if(offSet == undefined){
        offSet = new cord(0,0,0);
    }
    if(elevation == undefined){
        elevation = 0;
    }
    if(CordAt == undefined){
        CordAt = function(x,y){
            return 1;
        }
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
    var Voxles = [];
    for(var y = 0;y<height;y++){//add edge cases
       for(var x = 0;x<width;x++){
           /*
                                    BlockTOPvectTOPLEFT               BlockTOPvectTOPRIGHT
                                          |                                       |
                                          |                                       |
           BlockLEFTvecttopLEFT   ----vecttopleft   ------------------------vecttopright   ----BlockRIGHTvecttopRight
                                          |                                       |
                                          |                                       |
           BlockLEFTvectbottomLEFT----vectbottomleft-----------------------vectbottomright----BlockRIGHTvectbottomRight
                                          |                                       |
                                          |                                       |
                                BlockBOTTOMvectBOTTOMLEFT             BlockBOTTOMvectBOTTOMRIGHT
                                
                                
                                                                 (vecttopleft.x,vecttopleft.y,CordAt(y-1,x))  (vecttopright.x,vecttopright.y,CordAt(y-1,x))
                                                                                      |                                              |             
            (vecttopleft.x,vecttopleft.y,CordAt(y,x-1))--(x*cellSize,y*cellSize,CordAt(y,x))--(x*cellSize + cellSize,y*cellSize,CordAt(y,x))--vecttopright.x,vecttopright.y,CordAt(y,x+1)
                                                                                      |                                              |
            (vectbottomleft.x,vectbottomleft.y,CordAt(y,x-1))--(x*cellSize,y*cellSize + cellSize,CordAt(y,x))--(x*cellSize + cellSize,y*cellSize + cellSize,CordAt(y,x))--(vectbottomright.x,vectbottomright.y,CordAt(y,x+1))
                                                                                      |                                              |
                                                          (vectbottomleft.x,vectbottomleft.y,CordAt(y+1,x))  (vectbottomright.x,vectbottomright.y,CordAt(y+1,x))
           */
           var vecttopleft = new cord(x*cellSize,y*cellSize,(CordAt(x,y)*hightParm) +  elevation);
           var vecttopright = new cord(x*cellSize + cellSize,y*cellSize  ,(CordAt(x,y)*hightParm) + elevation);
           var vectbottomleft = new cord(x*cellSize,y*cellSize + cellSize,(CordAt(x,y)*hightParm) + elevation);
           var vectbottomright = new cord(x*cellSize + cellSize,y*cellSize + cellSize,(CordAt(x,y)*hightParm) + elevation);
           
            vecttopleft = vectFn.add(offSet,vecttopleft);
            vecttopright = vectFn.add(offSet,vecttopright);
            vectbottomleft = vectFn.add(offSet,vectbottomleft);
            vectbottomright = vectFn.add(offSet,vectbottomright);
           
           var BlockRIGHTvecttopRight;
           var BlockRIGHTvectbottomRight;
           var BlockLEFTvecttopLEFT;
           var BlockLEFTvectbottomLEFT;
           var BlockBOTTOMvectBOTTOMLEFT;
           var BlockBOTTOMvectBOTTOMRIGHT;
           if(x >= ( width-1)){
               //console.log("tomcuch width");
            BlockRIGHTvecttopRight = new cord(vecttopright.x,vecttopright.y,offSet.z);  
            BlockRIGHTvectbottomRight = new cord(vectbottomright.x,vectbottomright.y,offSet.z);
           }else{
            BlockRIGHTvecttopRight = new cord(vecttopright.x,vecttopright.y,(CordAt(x+1,y)*hightParm)+elevation + offSet.z);//todo no overflow
            BlockRIGHTvectbottomRight = new cord(vectbottomright.x,vectbottomright.y,(CordAt(x+1,y)*hightParm)+elevation+ offSet.z);

           }
           
           if(x <= 0){
         //      console.log("wt");
            BlockLEFTvecttopLEFT = new cord(vecttopleft.x,vecttopleft.y,offSet.z);
            BlockLEFTvectbottomLEFT = new cord(vectbottomleft.x,vectbottomleft.y,offSet.z)
           }else{
            BlockLEFTvecttopLEFT = new cord(vecttopleft.x,vecttopleft.y,((CordAt(x-1,y)*hightParm)*hightParm)+elevation+ offSet.z);
            BlockLEFTvectbottomLEFT = new cord(vectbottomleft.x,vectbottomleft.y,(CordAt(x-1,y)*hightParm)+elevation+ offSet.z);
           }
           
           if(y <= 0){
             BlockTOPvectTOPLEFT = new cord(vecttopleft.x,vecttopleft.y,offSet.z);
             BlockTOPvectTOPRIGHT = new cord(vecttopright.x,vecttopright.y,offSet.z);
           }else{
            BlockTOPvectTOPLEFT = new cord(vecttopleft.x,vecttopleft.y,(CordAt(x,y-1)*hightParm)+elevation+ offSet.z);
            BlockTOPvectTOPRIGHT = new cord(vecttopright.x,vecttopright.y,(CordAt(x,y-1)*hightParm)+elevation+ offSet.z);
           }
           
           if(y >= (height - 1)){//edge case
            BlockBOTTOMvectBOTTOMLEFT = new cord(vectbottomleft.x,vectbottomleft.y,offSet.z);
            BlockBOTTOMvectBOTTOMRIGHT = new cord(vectbottomright.x,vectbottomright.y,offSet.z);
           }else{
            BlockBOTTOMvectBOTTOMLEFT = new cord(vectbottomleft.x,vectbottomleft.y,(CordAt(x,y+1)*hightParm)+elevation+ offSet.z);
            BlockBOTTOMvectBOTTOMRIGHT = new cord(vectbottomright.x,vectbottomright.y,(CordAt(x,y+1)*hightParm)+elevation+ offSet.z);
           }
           
           //addoffset
         
        //gentop
           var tempNormal = (new cord(0,0,1));
           //console.log(tempNormal);
    Voxles.push([vecttopleft,vecttopright,vectbottomleft,tempNormal]);
           tempNormal = new cord(0,0,1);
    Voxles.push([vectbottomright,vectbottomleft,vecttopright,(tempNormal)]);
           //gen top squer with 2 triangles
           //console.log(tempNormal);
           tempNormal = new cord(0,0,-1);
Voxles.push([new cord(vecttopleft.x,vecttopleft.y,offSet.z), new cord(vectbottomleft.x,vectbottomleft.y,offSet.z), new cord(vecttopright.x,vecttopright.y,offSet.z),tempNormal]);
Voxles.push([new cord(vectbottomright.x,vectbottomright.y,offSet.z), new cord(vecttopright.x,vecttopright.y,offSet.z), new cord(vectbottomleft.x,vectbottomleft.y,offSet.z),tempNormal]);
           //gen top squer with 2 triangles
           
           //addeds wall on top side//TODO
           Voxles = Voxles.concat( CreateWallBlock(vecttopleft,vecttopright,BlockTOPvectTOPLEFT,BlockTOPvectTOPRIGHT,BlockLEFTvecttopLEFT,BlockRIGHTvecttopRight));//front
           Voxles = Voxles.concat(CreateWallBlock(vecttopright,vectbottomright,BlockRIGHTvecttopRight,BlockRIGHTvectbottomRight,BlockTOPvectTOPRIGHT,BlockBOTTOMvectBOTTOMRIGHT));//right
           Voxles = Voxles.concat(CreateWallBlock(vectbottomright,vectbottomleft,BlockBOTTOMvectBOTTOMRIGHT,BlockBOTTOMvectBOTTOMLEFT,BlockRIGHTvectbottomRight,BlockLEFTvectbottomLEFT));//bottomD
           Voxles = Voxles.concat(CreateWallBlock(vectbottomleft,vecttopleft,BlockLEFTvectbottomLEFT,BlockLEFTvecttopLEFT,BlockBOTTOMvectBOTTOMLEFT,BlockTOPvectTOPLEFT));//left
        //gentop
           
           
           //bottom
           
           //bottom
           
           
           
           
           
       }   
    }
    
    return Voxles;
    
}


//list when wall is facing same direction,right,left as wall
function CreateWallBlock(centerLeft,centerRight,FrontLeft,FrontRight,ToLeft,ToRight){
        var Voxles = [];
        //only if front
     if(centerLeft.z > FrontLeft.z){
           if(centerLeft.z > ToLeft.z && ToLeft.z > FrontLeft.z){
               //BlockTopvectTopLeft included in terms of top
           if(centerRight.z > ToRight.z && ToRight.z > FrontRight.z){
             //both are contained
               
               Voxles.push([centerLeft,ToRight,centerRight]);
               Voxles.push([centerLeft,ToLeft,ToRight]);
               Voxles.push([ToLeft,FrontRight,ToRight]);
               Voxles.push([ToLeft,FrontLeft,FrontRight]);
           }else{
               //only top leftis included
               
                Voxles.push([centerLeft,ToLeft,centerRight]);
                Voxles.push([centerRight,ToLeft,FrontRight]);
                Voxles.push([ToLeft,FrontLeft,FrontRight]);
               
           }
           }else{
           if(centerRight.z > ToRight.z && ToRight.z > FrontRight.z){
               //BlockTopvectTopRight included in terms of top
               //only tp right included
               
                Voxles.push([centerLeft,ToRight,centerRight]);
                Voxles.push([centerLeft,FrontLeft,ToRight]);
                Voxles.push([ToRight,FrontLeft,FrontRight]);
           }else{
               //no vectercys are included
                            Voxles.push([centerLeft,FrontLeft,centerRight]);
                            Voxles.push([FrontLeft,FrontRight,centerRight]);

           }
           }
           }
    return Voxles;
    
}
////TODO remove

module.exports.GenSphere = GenSphere;
module.exports.FlatMeshFromFunction = FlatMeshFromFunction;
module.exports.RectMeshFromFunction = RectMeshFromFunction;
module.exports.BlockyMesh = BlockyMesh;
module.exports.CreateWallBlock = CreateWallBlock;