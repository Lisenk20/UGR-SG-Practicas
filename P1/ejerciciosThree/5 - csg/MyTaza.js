import * as THREE from '../libs/three.module.js'
import { ThreeBSP } from '../libs/ThreeBSP.js'

class MyTaza extends THREE.Object3D{
    constructor(){
        super();

        var cylinder1 = new THREE.CylinderGeometry(5.0, 5.0, 10, 30.0, 30.0);

        var cylinder2 = new THREE.CylinderGeometry(4.7, 4.7, 10.0, 30.0);

        var torus = new THREE.TorusGeometry(3.0, 0.5, 20.0, 20.0)

        cylinder2.translate(0, 2, 0);
        torus.translate(-4.7,0,0);

        var cylinder1BSP = new ThreeBSP(cylinder1);
        var cylinder2BSP = new ThreeBSP(cylinder2);
        var torusBSP = new ThreeBSP(torus);

        var partialResult = cylinder1BSP.union(torusBSP);
        var tazaBSP = partialResult.subtract(cylinder2BSP);

        var tazaMat = new THREE.MeshNormalMaterial();

        this.taza = tazaBSP.toMesh(tazaMat);

        this.add(this.taza);
    }
}

export { MyTaza }