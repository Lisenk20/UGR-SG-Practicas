import * as THREE from '../libs/three.module.js'

class MyPendulo extends THREE.Object3D{
    constructor(gui){
        super();

        this.createGUI(gui);

        this.crecePenduloPequeño = true;
        this.rotaPenduloPequeño = true;
        this.crecePorcentaje = true;
        this.crecePenduloGrande = true;
        this.rotaPenduloGrande = true;

        var matAzul = new THREE.MeshPhongMaterial( { color: 0x0000ff } );
        var matRojo = new THREE.MeshPhongMaterial( { color: 0xff0000 } );
        var matVerde = new THREE.MeshPhongMaterial( { color: 0x00ff00 } );

        var cajaAzulGeom  = new THREE.BoxGeometry(2,10,1);
        this.cajaAzul = new THREE.Mesh(cajaAzulGeom, matAzul);
        this.cajaAzul.position.set(0, -5, 1.5);

        // Objeto 3D para el escalado de la caja azul
        this.cajaAzulScale = new THREE.Object3D();
        this.cajaAzulScale.add(this.cajaAzul);

        var tuercaCajaAzulGeom = new THREE.CylinderGeometry(0.5, 0.5, 0.5, 6.0);
        this.tuercaCajaAzul = new THREE.Mesh(tuercaCajaAzulGeom, matVerde);
        this.tuercaCajaAzul.position.set(0, -1, 2);
        this.tuercaCajaAzul.rotation.set(Math.PI/2 ,0, 0);

        // Objeto 3D para la rotacion del pendulo pequeño
        this.penduloPequeño = new THREE.Object3D();
        this.penduloPequeño.add(this.cajaAzulScale);
        this.penduloPequeño.add(this.tuercaCajaAzul);

        var cajaRojaGeom = new THREE.BoxGeometry(4, 5, 2);
        this.cajaRoja = new THREE.Mesh(cajaRojaGeom, matRojo);
        this.cajaRoja.position.set(0, -2.5, 0);

        // Objeto 3D para el escalado de la caja roja
        this.cajaRojaScale = new THREE.Object3D();
        this.cajaRojaScale.add(this.cajaRoja);

        var cajaVerdeGeom = new THREE.BoxGeometry(4,5,2);
        this.cajaVerdeInferior = new THREE.Mesh(cajaVerdeGeom, matVerde);

        // Objeto 3D para adaptarse al escalado de la caja roja
        this.cajaVerdeInferiorPosicion = new THREE.Object3D();
        this.cajaVerdeInferiorPosicion.add(this.cajaVerdeInferior);

        // Objeto 3D para unir caja roja y caja verde inferior
        this.cajaRojaVerdeInf = new THREE.Object3D();
        this.cajaRojaVerdeInf.add(this.cajaRojaScale);
        this.cajaRojaVerdeInf.add(this.penduloPequeño);
        this.cajaRojaVerdeInf.add(this.cajaVerdeInferiorPosicion);
        this.cajaRojaVerdeInf.position.y -= 2.5;

        this.cajaVerdeSuperior = new THREE.Mesh(cajaVerdeGeom, matVerde);

        var tuercaCajaVerdeGeom = new THREE.CylinderGeometry(1,1,0.5,6.0);
        this.tuercaCajaVerde = new THREE.Mesh(tuercaCajaVerdeGeom, matAzul);
        this.tuercaCajaVerde.rotation.set(Math.PI/2, 0, 0);
        this.tuercaCajaVerde.position.set(0, 0, 1.2);

        // Objeto 3D para unir todo el pendulo
        this.pendulo = new THREE.Object3D;
        this.pendulo.add(this.cajaRojaVerdeInf);
        this.pendulo.add(this.cajaVerdeSuperior);
        this.pendulo.add(this.tuercaCajaVerde);


        this.add(this.pendulo);
    }

    createGUI (gui){
        this.guiControls = new function () {
            this.rotateZPenduloPequeño = 0.0;
            this.rotateZPenduloGrande = 0.0;
            this.scaleYPenduloPequeño = 10.0;
            this.scaleYPenduloGrande = 5.0;
            this.porcentaje = 10;
            this.animacion = false;
        }

        var folderPenduloPequeño = gui.addFolder("Pendulo pequeño");

        folderPenduloPequeño.add (this.guiControls, 'scaleYPenduloPequeño', 10, 20, 0.1).name ('Longitud: ').listen();
        folderPenduloPequeño.add (this.guiControls, 'rotateZPenduloPequeño', -Math.PI/4, Math.PI/4, Math.PI/180).name ('Giro: ').listen();
        folderPenduloPequeño.add (this.guiControls, 'porcentaje', 10, 90, 1).name ('Porcentaje: ').listen();

        var folderPenduloGrande = gui.addFolder("Pendulo grande");

        folderPenduloGrande.add (this.guiControls, 'scaleYPenduloGrande', 5, 10, 0.1).name ('Longitud: ').listen();
        folderPenduloGrande.add (this.guiControls, 'rotateZPenduloGrande', -Math.PI/4, Math.PI/4, Math.PI/180).name ('Giro: ').listen();

        var folderAnimacion = gui.addFolder("Animacion");

        folderAnimacion.add (this.guiControls, 'animacion').name ('Animacion: ');
    }

    update() {
        this.cajaAzulScale.scale.set(1, this.guiControls.scaleYPenduloPequeño/10, 1);
        this.penduloPequeño.rotation.z = this.guiControls.rotateZPenduloPequeño;
        this.penduloPequeño.position.y = (-this.guiControls.scaleYPenduloGrande*this.guiControls.porcentaje/100)+1;
        this.pendulo.rotation.z = this.guiControls.rotateZPenduloGrande;
        this.cajaRojaScale.scale.set(1, this.guiControls.scaleYPenduloGrande/5, 1);
        this.cajaVerdeInferiorPosicion.position.y = -(this.guiControls.scaleYPenduloGrande+2.5);

        if(this.guiControls.animacion){
            if(this.crecePenduloPequeño){
                this.guiControls.scaleYPenduloPequeño += 0.1;
                if(this.guiControls.scaleYPenduloPequeño > 20){
                    this.crecePenduloPequeño = false;
                }
            }
            else{
                this.guiControls.scaleYPenduloPequeño -= 0.1;
                if(this.guiControls.scaleYPenduloPequeño < 10){
                    this.crecePenduloPequeño = true;
                }
            }

            if(this.rotaPenduloPequeño){
                this.guiControls.rotateZPenduloPequeño += Math.PI/180;
                if(this.guiControls.rotateZPenduloPequeño > Math.PI/4){
                    this.rotaPenduloPequeño = false;
                }
            }
            else{
                this.guiControls.rotateZPenduloPequeño -= Math.PI/180;
                if(this.guiControls.rotateZPenduloPequeño < -Math.PI/4){
                    this.rotaPenduloPequeño = true;
                }
            }

            if(this.crecePorcentaje){
                this.guiControls.porcentaje += 1;
                if(this.guiControls.porcentaje > 90){
                    this.crecePorcentaje = false;
                }
            }
            else{
                this.guiControls.porcentaje -= 1;
                if(this.guiControls.porcentaje < 10){
                    this.crecePorcentaje = true;
                }
            }

            if(this.crecePenduloGrande){
                this.guiControls.scaleYPenduloGrande += 0.1;
                if(this.guiControls.scaleYPenduloGrande > 10){
                    this.crecePenduloGrande = false;
                }
            }
            else{
                this.guiControls.scaleYPenduloGrande -= 0.1;
                if(this.guiControls.scaleYPenduloGrande < 5){
                    this.crecePenduloGrande = true;
                }
            }

            if(this.rotaPenduloGrande){
                this.guiControls.rotateZPenduloGrande -= Math.PI/180;
                if(this.guiControls.rotateZPenduloGrande < -Math.PI/4){
                    this.rotaPenduloGrande = false;
                }
            }
            else{
                this.guiControls.rotateZPenduloGrande += Math.PI/180;
                if(this.guiControls.rotateZPenduloGrande > Math.PI/4){
                    this.rotaPenduloGrande = true;
                }
            }

        }

    }
}

export { MyPendulo }