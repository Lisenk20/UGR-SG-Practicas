import * as THREE from '../libs/three.module.js'

class MyTorus extends THREE.Object3D{
    constructor(gui, titleGui){
        super();

        // Se crea la parte de la interfaz que corresponde a la esfera
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui, titleGui);

        // Un Mesh se compone de geometría y material
        var torusGeom = new THREE.TorusGeometry(1.0,0.2,3.0,3.0);
        // Como material, se crea uno a partir de un color
        var torusMat = new THREE.MeshNormalMaterial();
        torusMat.flatShading = true;

        // Construimos el Mesh
        this.torus = new THREE.Mesh(torusGeom, torusMat);
        // Y lo añadimos como hijo de Object3D (el this)
        this.add(this.torus);
    }

    createGUI (gui, titleGui){
        // Controles para el radio, ecuador y meridiano de la esfera
        this.guiControls = new function(){
            this.radioP = 1.0;
            this.radioTub = 0.2;
            this.resolucionT = 3.0;
            this.resolucionTub = 3.0

            this.reset=function(){
                this.radioP = 1.0;
                this.radioTub = 0.2;
                this.resolucionT = 3.0;
                this.resolucionTub = 3.0
            }
        }

        // Se crea una sección para los controles de la esfera
        var folder = gui.addFolder (titleGui);
        var that = this;
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add (this.guiControls, 'radioP', 1.0, 5.0, 0.1).name ('Radio Principal : ').onChange(function(value){that.crearNueva()});
        folder.add (this.guiControls, 'radioTub', 0.2, 1.0, 0.1).name ('Radio Tubo : ').onChange(function(value){that.crearNueva()});
        folder.add (this.guiControls, 'resolucionT', 3.0, 15.0, 1.0).name ('Resolucion Toro : ').onChange(function(value){that.crearNueva()});
        folder.add (this.guiControls, 'resolucionTub', 3.0, 15.0, 1.0).name ('Resolución Tubo : ').onChange(function(value){that.crearNueva()});

        folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }

    crearNueva(){
        var torusGeom = new THREE.TorusGeometry(this.guiControls.radioP, this.guiControls.radioTub, this.guiControls.resolucionT, this.guiControls.resolucionTub);
        this.torus.geometry = torusGeom;
    }

    update(){
        // Con independencia de cómo se escriban las 3 siguientes líneas, el orden en el que se aplican las transformaciones es:
        // Primero, el escalado
        // Segundo, la rotación en Z
        // Después, la rotación en Y
        // Luego, la rotación en X
        // Y por último la traslación
        this.rotation.z += 0.01;
        this.rotation.y += 0.01;
        this.rotation.x += 0.01;
    }
}

export { MyTorus }