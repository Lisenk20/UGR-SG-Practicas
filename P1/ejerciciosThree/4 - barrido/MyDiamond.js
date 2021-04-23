import * as THREE from '../libs/three.module.js'

class MyDiamond extends THREE.Object3D {
    constructor(){
        super();

        var x=0, y=0;

        var diamanteShape = new THREE.Shape();

        diamanteShape.moveTo( x , y + 3 );
        diamanteShape.lineTo( x + 2 , y );
        diamanteShape.lineTo( x , y - 3 );
        diamanteShape.lineTo( x - 2 , y );

        var options = {depth: 1, bevelThickness: 0.1, bevelSize: 0.3};

        var diamanteGeometry = new THREE.ExtrudeBufferGeometry(diamanteShape, options);

        var diamanteMaterial = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
        
        this.diamante = new THREE.Mesh(diamanteGeometry, diamanteMaterial);

        this.add(this.diamante);
    }
}

export { MyDiamond }