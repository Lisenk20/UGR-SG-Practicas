import * as THREE from '../libs/three.module.js'
 
class MyRevolution extends THREE.Object3D {
    constructor(gui, titleGui){
        super();

        // Se crea la parte de la interfaz que corresponde a la caja
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui,titleGui);

        // Un Mesh se compone de geometría y material
        this.points = [];
        this.points.push(new THREE.Vector3(0, -1.4, 0));
        this.points.push(new THREE.Vector3 (1.0,-1.4,0));
        this.points.push(new THREE.Vector3(1.0,-1.1,0));
        this.points.push(new THREE.Vector3(0.5,-0.7,0));
        this.points.push(new THREE.Vector3(0.4,-0.4,0));
        this.points.push(new THREE.Vector3(0.4,0.5,0));
        this.points.push(new THREE.Vector3(0.5,0.6,0));
        this.points.push(new THREE.Vector3(0.3,0.6,0));
        this.points.push(new THREE.Vector3(0.5,0.8,0));
        this.points.push(new THREE.Vector3(0.55,1.0,0));
        this.points.push(new THREE.Vector3(0.5,1.2,0));
        this.points.push(new THREE.Vector3(0.3,1.4,0));
        this.points.push(new THREE.Vector3(0, 1.4, 0));
        var latheGeom=new THREE.LatheGeometry(this.points, 15.0, 0, 2*Math.PI);
        // Como material se crea uno a partir de un color
        var shapeMat = new THREE.MeshNormalMaterial();
        shapeMat.flatShading=true;

        // Ya podemos construir el Mesh
        this.lathe = new THREE.Mesh (latheGeom, shapeMat);
        // Y añadirlo como hijo del Object3D (el this)
        this.add (this.lathe);

        this.position.y = 1.4;
    }

    createGUI (gui,titleGui) {
        var that=this
        // Controles para las dimensiones
        this.guiControls = new function () {
        this.resolucion=3.0
        this.angulo=1.0;
        
        // Un botón para dejarlo todo en su posición inicial
        // Cuando se pulse se ejecutará esta función.
        this.reset = function () {
            this.resolucion=3.0
            this.angulo=1.0;
            that.crearNueva(this.resolucion, this.angulo);
        }
        } 
        
        // Se crea una sección para los controles de la caja
        var folder = gui.addFolder (titleGui);
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add (this.guiControls, 'resolucion', 3.0, 15.0, 1.0).name ('Resolucion : ').onChange(function(value){that.crearNueva()});
        folder.add (this.guiControls, 'angulo', 0.001, 1, 0.001).name ('Angulo : ').onChange(function(value){that.crearNueva()});
        
        folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }

    crearNueva(){
        var latheGeom = new THREE.LatheGeometry(this.points, this.guiControls.resolucion, 0, this.guiControls.angulo*2*Math.PI);
        this.lathe.geometry = latheGeom;
    }
    
    update(){
        // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
        // Primero, el escalado
        // Segundo, la rotación en Z
        // Después, la rotación en Y
        // Luego, la rotación en X
        // Y por último la traslación
    }
}

export { MyRevolution }
