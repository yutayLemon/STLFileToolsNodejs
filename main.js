const Convert = require("./convert.js");
const fs = require('node:fs').promises;
const build = require("./Build.js");
const Matrix = require("./matrix.js");


class cord {
constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
}
};
//z as up


class STLfile{
    constructor(fileName,Name){
        this.Name = Name;
        this.FileName = fileName;
        this.triangles = [];
        this.txt = function(){
            return Convert.TrianglesToTxt(this.triangles,Name);
        }
        
        this.CreateSTLfile = async function(){
            await fs.writeFile(this.FileName,this.txt());
            return 0;
        }
        
        
        this.Sphere = function(r,pointsPerSlice,bottomStart, RadiusAtPoint){
            this.triangles = this.triangles.concat(build.GenSphere(r,pointsPerSlice,bottomStart, RadiusAtPoint));
        }
        this.FlatMeshFromFunction = function(cellSize,height,width,hightParm,CordAt,offSet,Matrix){
            this.triangles = this.triangles.concat(build.FlatMeshFromFunction(cellSize,height,width,hightParm,CordAt,offSet,Matrix));
        }
        this.RectMeshFromFunction = function(cellSize,height,width,hightParm,CordAt,offSet,elevation){
            this.triangles = this.triangles.concat(build.RectMeshFromFunction(cellSize,height,width,hightParm,CordAt,offSet,elevation));
        }
        this.BlockyMesh = function(cellSize,height,width,hightParm,CordAt,offSet,elevation){
            this.triangles = this.triangles.concat(build.BlockyMesh(cellSize,height,width,hightParm,CordAt,offSet,elevation));
        }
        this.CreateWallBlock = function(centerLeft,centerRight,FrontLeft,FrontRight,ToLeft,ToRight){
            this.triangles = this.triangles.concat(build.CreateWallBlock(centerLeft,centerRight,FrontLeft,FrontRight,ToLeft,ToRight));
        }
        
        
        this.MatrixMult = function(Mrx){
            for(var i = 0;i<this.triangles.length;i++){
                for(var j = 0;j<this.triangles[i].length;j++){
                    this.triangles[i][j] = Matrix.MatrixMultiplication(Mrx,this.triangles[i][j]);
                }
            }
        }
    }
}


module.exports.STLfile = STLfile;
module.exports.cord = cord;


