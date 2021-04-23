import * as THREE from '../libs/three.module.js'

class MyBarridoHeart extends THREE.Object3D {
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

        var path = new THREE.CatmullRomCurve3( [
            new THREE.Vector3( -20, 5, 0 ),
            new THREE.Vector3( -15, 5, 15 ),
            new THREE.Vector3( -10, 0, 10 ),
            new THREE.Vector3( -5, 5, 5 ),
            new THREE.Vector3( 0, 0, 0 ),
            new THREE.Vector3( 5, -5, 5 ),
            new THREE.Vector3( 10, 0, 10 ),
            new THREE.Vector3( 15, 5, 15 ),
            new THREE.Vector3( 20, 5, 0 )
        ]);

        var options = { steps: 50, curveSegments: 20, extrudePath: path }

        var corazonGeom = new THREE.ExtrudeGeometry( corazonShape, options );

        var corazonMat = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );

        this.columna = new THREE.Mesh( corazonGeom, corazonMat );

        this.columna.scale.set(0.6,0.3,0.3);
        this.rotation.z = Math.PI/2;
        this.rotation.y = Math.PI/2;


        this.add(this.columna);
    }
}

export { MyBarridoHeart }