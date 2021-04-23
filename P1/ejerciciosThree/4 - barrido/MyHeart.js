import * as THREE from '../libs/three.module.js'

class MyHeart extends THREE.Object3D {
    constructor(){
        super();

        var corazonShape = new THREE.Shape();

        corazonShape.moveTo(0,0);
        corazonShape.quadraticCurveTo(2,3,4,0);
        corazonShape.quadraticCurveTo(4.5,-0.5,3,-3);
        corazonShape.lineTo(0,-6);
        corazonShape.lineTo(-3,-3);
        corazonShape.quadraticCurveTo(-4.5,-0.5,-4,0);
        corazonShape.quadraticCurveTo(-2,3,0,0);

        var options = {depth: 1, bevelThickness: 0.1, bevelSize: 0.3};

        var corazonGeometry = new THREE.ExtrudeBufferGeometry(corazonShape, options);

        var corazonMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
        
        this.corazon = new THREE.Mesh(corazonGeometry, corazonMaterial);

        this.add(this.corazon);
    }
}

export { MyHeart }