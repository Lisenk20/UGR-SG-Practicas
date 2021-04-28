import * as THREE from '../libs/three.module.js'

class MyLinea extends THREE.Object3D{
    constructor(spline){
        super();

        var geometry = new THREE.Geometry();

        var material = new THREE.LineBasicMaterial( { color: 0xff0000 } );

        geometry.vertices = spline.getPoints(100);

        var linea = new THREE.Line( geometry, material );

        this.add(linea);
    }
}

export { MyLinea }