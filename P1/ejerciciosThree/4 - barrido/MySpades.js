import * as THREE from '../libs/three.module.js'

class MySpades extends THREE.Object3D {
    constructor(){
        super();

        var picaShape = new THREE.Shape();

        picaShape.moveTo(0,0);
        picaShape.lineTo(2.5,-2.5);
        picaShape.quadraticCurveTo(3, -5, 0.5, -3.25);
        picaShape.lineTo(-0.5,-3.25);
        picaShape.quadraticCurveTo(-3, -5, -2.5, -2.5);
        picaShape.lineTo(0,0);

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

        var picaGeometry = new THREE.ExtrudeBufferGeometry(picaShape, options);

        var picaMaterial = new THREE.MeshPhongMaterial( { color: 0x0000ff } );
        
        this.pica = new THREE.Mesh(picaGeometry, picaMaterial);

        this.add(this.pica);
    }
}

export { MySpades }