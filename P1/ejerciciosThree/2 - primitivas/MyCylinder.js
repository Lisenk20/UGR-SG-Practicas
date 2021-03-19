import * as THREE from '../libs/three.module.js'

class MyCylinder extends THREE.Object3D{
    constructor(gui, titleGui){
        super();

        // Se crea la parte de la interfaz que corresponde a la esfera
        // Se crea primero porque otros métodos usan las variables que se definen para la interfaz
        this.createGUI(gui, titleGui);

        // Un Mesh se compone de geometría y material
        var cylGeom = new THREE.CylinderGeometry(0.5,0.5,1.0,3.0);
        // Como material, se crea uno a partir de un color
        var cylMat = new THREE.MeshPhongMaterial({color: 0x00FFFF});

        // Construimos el Mesh
        this.cylinder = new THREE.Mesh(cylGeom, cylMat);
        // Y lo añadimos como hijo de Object3D (el this)
        this.add(this.cylinder);
    }

    createGUI (gui, titleGui){
        // Controles para el radio superior e inferior, altura y resolución
        this.guiControls = new function(){
            this.radioSup = 0.5;
            this.radioInf = 0.5;
            this.altura = 1.0;
            this.resolucion = 3.0

            this.reset=function(){
                this.radioSup = 0.5;
                this.radioInf = 0.5;
                this.altura = 1.0;
                this.resolucion = 3.0
            }
        }

        // Se crea una sección para los controles de la esfera
        var folder = gui.addFolder (titleGui);
        var that = this;
        // Estas lineas son las que añaden los componentes de la interfaz
        // Las tres cifras indican un valor mínimo, un máximo y el incremento
        // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
        folder.add (this.guiControls, 'radioSup', 0.5, 5.0, 0.1).name ('Radio Superior : ').onChange(function(value){that.crearNueva()});
        folder.add (this.guiControls, 'radioInf', 0.5, 5.0, 0.1).name ('Radio Inferior : ').onChange(function(value){that.crearNueva()});
        folder.add (this.guiControls, 'altura', 1.0, 5.0, 0.1).name ('Altura : ').onChange(function(value){that.crearNueva()});
        folder.add (this.guiControls, 'resolucion', 3.0, 15.0, 1.0).name ('Resolución : ').onChange(function(value){that.crearNueva()});

        folder.add (this.guiControls, 'reset').name ('[ Reset ]');
    }

    crearNueva(){
        var cylGeom = new THREE.CylinderGeometry(this.guiControls.radioSup, this.guiControls.radioInf, this.guiControls.altura, this.guiControls.resolucion);
        this.cylinder.geometry = cylGeom;
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

export { MyCylinder }