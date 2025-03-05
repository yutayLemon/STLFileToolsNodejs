
class cord {
constructor(x,y,z){
    this.x = x;
    this.y = y;
    this.z = z;
}
};

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



module.exports.MatrixMultiplication = MatrixMultiplication;
module.exports.MatrixMultiMatrix = MatrixMultiMatrix;