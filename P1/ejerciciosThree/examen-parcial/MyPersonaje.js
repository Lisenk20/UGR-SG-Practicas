import * as THREE from '../libs/three.module.js'

class MyPersonaje extends THREE.Object3D{
    constructor(material){
        super();

        this.bocaAbre = true;

        material.side = THREE.DoubleSide;
        var sphGeomSuperior = new THREE.SphereGeometry(1.0, 16.0, 16.0, 0, Math.PI*2, 0, Math.PI/2);
        var sphGeomInferior = new THREE.SphereGeometry(1.0, 16.0, 16.0, 0, Math.PI*2, 0, Math.PI/2);

        this.sphereSuperior = new THREE.Mesh ( sphGeomSuperior, material );

        this.sphereInferior = new THREE.Mesh ( sphGeomInferior, material );
        this.sphereInferior.rotation.x = Math.PI;

        this.add(this.sphereSuperior);
        this.add(this.sphereInferior);

        this.tiempoAnterior = Date.now();

        this.velocidad = 2.0;
    }

    update(){
        var tiempoActual = Date.now();
        var segundos = (tiempoActual - this.tiempoAnterior)/1000;

        if(this.bocaAbre){
            this.sphereInferior.rotation.x += segundos * this.velocidad;

            if(this.sphereInferior.rotation.x >= Math.PI*1.25){
                this.bocaAbre = false;
            }
        } else{
            this.sphereInferior.rotation.x -= segundos * this.velocidad;
            
            if(this.sphereInferior.rotation.x <= Math.PI){
                this.bocaAbre = true;
            }
        }

        this.tiempoAnterior = tiempoActual;
    }
}

export { MyPersonaje }