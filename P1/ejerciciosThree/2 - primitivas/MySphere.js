import * as THREE from '../libs/three.module.js'

class MySphere extends THREE.Object3D{
    constructor(gui, titleGui){
        super();

        // Se crea la parte de la interfaz que corresponde a la esfera
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui, titleGui);

        // Un Mesh se compone de geometría y material
        var sphGeom = new THREE.SphereGeometry(1.0,3.0,2.0);
        // Como material, se crea uno a partir de un color
        var sphMat = new THREE.MeshNormalMaterial();
        sphMat.flatShading = true;

        // Construimos el Mesh
        this.sphere = new THREE.Mesh(sphGeom, sphMat);
        // Y lo añadimos como hijo de Object3D (el this)
        this.add(this.sphere);
    }

    createGUI (gui, titleGui){
        // Controles para el radio, ecuador y meridiano de la esfera
        this.guiControls = new function(){
            this.radio = 1.0;
            this.ecuador = 3.0;
            this.meridiano = 2.0;

            this.reset=function(){
                this.radio = 1.0;
                this.ecuador = 3.0;
                this.meridiano = 2.0;
            }
        }

        // Se crea una sección para los controles de la esfera
        var folder = gui.addFolder (titleGui);
        var that = this;
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add (this.guiControls, 'radio', 1.0, 5.0, 0.1).name ('Radio : ').onChange(function(value){that.crearNueva()});
        folder.add (this.guiControls, 'ecuador', 3.0, 15.0, 1.0).name ('Res. Ecuador : ').onChange(function(value){that.crearNueva()});
        folder.add (this.guiControls, 'meridiano', 2.0, 8.0, 1.0).name ('Res. Meridiano : ').onChange(function(value){that.crearNueva()});

        folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }

    crearNueva(){
        var sphereGeom = new THREE.SphereGeometry(this.guiControls.radio, this.guiControls.ecuador, this.guiControls.meridiano);
        this.sphere.geometry = sphereGeom;
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

export { MySphere }