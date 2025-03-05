function sinGrath(x,y){
    return Math.sin(Math.sqrt(((x-50)/10)*((x-50)/10) + ((y-50)/10) * ((y-50)/10)));  
}


function RadiusAtPointSphere( theta,  epsilon,  r) {
	return r;
}


module.exports.sinGrath = sinGrath;
module.exports.RadiusAtPointSphere = RadiusAtPointSphere;