import * as THREE from '../libs/three.module.js'

class MyBarridoClub extends THREE.Object3D {
    constructor(){
        super();

        var trebolShape = new THREE.Shape();

        trebolShape.moveTo (0,0);
        trebolShape.bezierCurveTo (5, -4.5, 7,3.5, 1.5,3);
        trebolShape.bezierCurveTo (4.6,9, -4.6,9, -1.5,3);
        trebolShape.bezierCurveTo (-7,3.5, -4.5, -5, 0,0);

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

        var trebolGeom = new THREE.ExtrudeGeometry( trebolShape, options );

        var trebolMat = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );

        this.columna = new THREE.Mesh( trebolGeom, trebolMat );

        this.columna.scale.set(0.6,0.3,0.3);
        this.rotation.z = Math.PI/2;
        this.rotation.y = Math.PI/2;


        this.add(this.columna);
    }
}

export { MyBarridoClub }