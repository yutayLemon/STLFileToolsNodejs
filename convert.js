const FuncTools = require("./Functools.js");


function TrianglesToTxt(Tri,Name){
    var cont = "solid " + Name + "\n";
    for(var i = 0;i<Tri.length;i++){
        cont += FuncTools.LogTriangle(Tri[i][0],Tri[i][1],Tri[i][2],FuncTools.STLNormal(Tri[i][0],Tri[i][1],Tri[i][2])) + "\n";
    }
    cont += "endsolid "+Name + "\n";
    return cont;
}




module.exports.TrianglesToTxt = TrianglesToTxt;
