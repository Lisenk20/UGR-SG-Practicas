import * as THREE from '../libs/three.module.js'
import { ThreeBSP } from '../libs/ThreeBSP.js'

class MyTuerca extends THREE.Object3D{
    constructor(){
        super();

        var cylinder1 = new THREE.CylinderGeometry(10.0, 10.0, 6.0, 6.0);
        var cylinder2 = new THREE.CylinderGeometry(5.0, 5.0, 6.0, 50.0);

        var cylinder1BSP = new ThreeBSP(cylinder1);
        var cylinder2BSP = new ThreeBSP(cylinder2);

        var parcialResult = cylinder1BSP.subtract(cylinder2BSP);

        var tuercaMat = new THREE.MeshNormalMaterial();

        this.tuerca = parcialResult.toMesh(tuercaMat);

        this.add(this.tuerca);
    }
}

export { MyTuerca }