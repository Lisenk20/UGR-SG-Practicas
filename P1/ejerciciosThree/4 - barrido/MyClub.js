import * as THREE from '../libs/three.module.js'

class MyClub extends THREE.Object3D {
    constructor(){
        super();

        var trebolShape = new THREE.Shape();

        trebolShape.moveTo (0,0);
        trebolShape.bezierCurveTo (5, -4.5, 7,3.5, 1.5,3);
        trebolShape.bezierCurveTo (4.6,9, -4.6,9, -1.5,3);
        trebolShape.bezierCurveTo (-7,3.5, -4.5, -5, 0,0);

        var points = [];

        points.push(new THREE.Vector3(0, -6, 0));
        points.push(new THREE.Vector3(1.25, -6, 0));
        points.push(new THREE.Vector3(1, -5.75, 0));
        points.push(new THREE.Vector3(0.9, -5.7, 0));
        points.push(new THREE.Vector3(0.5, -5, 0));
        points.push(new THREE.Vector3(0.25, -4.75, 0));
        points.push(new THREE.Vector3(0.25, -3.25, 0));

        var baseGeom = new THREE.LatheGeometry(points, 15.0, 0, 2*Math.PI);
        var baseMat = new THREE.MeshPhongMaterial( { color: 0x0000ff } );

        this.base = new THREE.Mesh(baseGeom, baseMat);
        this.add(this.base);

        var options = {depth: 1, bevelThickness: 0.1, bevelSize: 0.3};

        var trebolGeometry = new THREE.ExtrudeBufferGeometry(trebolShape, options);

        var trebolMaterial = new THREE.MeshPhongMaterial( { color: 0x0000ff } );
        
        this.trebol = new THREE.Mesh(trebolGeometry, trebolMaterial);

        this.add(this.trebol);
    }
}

export { MyClub }