import * as THREE from '../libs/three.module.js'

class MyReloj extends THREE.Object3D{
    constructor(gui){
        super();

        this.createGUI(gui);

        var sphGeom = new THREE.SphereGeometry(1.5,10.0,20.0);
        var matRojo = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
        var matVerde = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );

        this.reloj = new THREE.Object3D();

        var i;
        for(i = 0; i < 2*Math.PI; i+=Math.PI/6 ){
            var circuloReloj = new THREE.Mesh(sphGeom, matVerde);
            circuloReloj.position.set(20 * Math.cos(i), 0, 20 * Math.sin(i));
            this.reloj.add(circuloReloj);
        }

        //Creamos el Mesh del objeto que rota y lo desplazamos a la posición deseada
        this.circuloRot = new THREE.Mesh(sphGeom, matRojo);
        this.circuloRot.position.x = 17;

        // Creamos un Object3D que contendrá al Mesh. Como el Object3D se encuentra en el 
        // origen de coordenadas y el Mesh está desplazado, se aplica la rotación deseada.
        this.circuloRotObject = new THREE.Object3D();
        this.circuloRotObject.add(this.circuloRot);

        this.reloj.add(this.circuloRotObject);

        this.add(this.reloj);

        this.tiempoAnterior = Date.now();
    }

    createGUI(gui){
        this.guiControls = new function(){
            this.velocidad = 1.0;
        }

        var folder = gui.addFolder("Control de la velocidad");
        
        folder.add (this.guiControls, 'velocidad', -12.0, 12.0, 1.0).name ('Velocidad : ').listen();
    }

    update(){
        var tiempoActual = Date.now();
        var segundos = (tiempoActual - this.tiempoAnterior)/1000;
        this.circuloRotObject.rotation.y -= segundos * (this.guiControls.velocidad*Math.PI/6);
        this.tiempoAnterior = tiempoActual;
    }
}

export { MyReloj }