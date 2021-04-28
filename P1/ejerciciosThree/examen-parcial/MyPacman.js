import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'

import { MyLinea } from './MyLinea.js'
import { MyPersonaje } from './MyPersonaje.js';

class MyPacman extends THREE.Object3D{
    constructor(){
        super();

        // Creamos el material que usaremos
        var matAmarillo = new THREE.MeshPhongMaterial ( { color: 0xffff00 } );
        matAmarillo.flatShading = true;

        // Definimos y creamos la linea que recorre la animación de nuestro personaje
        this.splineSuperior = new THREE.CatmullRomCurve3 ([
    
            new THREE.Vector3 (-4,4,0),
    
            new THREE.Vector3 (-4,4,-20), new THREE.Vector3 (12,4,-20),

            new THREE.Vector3 (12,4,-8), new THREE.Vector3 (4,4,-8),
    
            new THREE.Vector3 (4,4,0)
        ]);

        this.splineInferior = new THREE.CatmullRomCurve3 ([
    
            new THREE.Vector3 (4,4,0),
    
            new THREE.Vector3 (4,4,4), new THREE.Vector3 (-4,4,4),
    
            new THREE.Vector3 (-4,4,0)
        ]);

        this.lineaPSuperior = new MyLinea(this.splineSuperior);
        this.lineaPInferior = new MyLinea(this.splineInferior);

        this.add(this.lineaPSuperior);
        this.add(this.lineaPInferior);

        // Creamos al personaje

        this.personaje = new MyPersonaje(matAmarillo);
        this.personaje.position.set(4,4,0);

        this.add(this.personaje);

        // Animacion del personaje

        var origen = { p : 0 } ;
        var destino = { p : 1 } ;
        var that = this;
    
        var movimientoInferior = new TWEEN.Tween(origen)
          .to(destino, 4000) //4 segundos
          .easing (TWEEN.Easing.Quartic.InOut)
          .onUpdate (function(){
                var t = origen.p;
                var posicion = that.splineInferior.getPointAt(t);
                that.personaje.position.copy(posicion);
                var tangente = that.splineInferior.getTangentAt(t);
                posicion.add(tangente);
                that.personaje.lookAt(posicion);
          })
          .onComplete (function(){
                origen.p = 0;
          })
          .start();
    
          var movimientoSuperior = new TWEEN.Tween(origen)
            .to(destino, 6000) //6 segundos
            .easing (TWEEN.Easing.Quartic.InOut)
            .onUpdate (function(){
                  var t = origen.p;
                  var posicion = that.splineSuperior.getPointAt(t);
                  that.personaje.position.copy(posicion);
                  var tangente = that.splineSuperior.getTangentAt(t);
                  posicion.add(tangente);
                  that.personaje.lookAt(posicion);
            })
            .onComplete (function(){
                  origen.p = 0;
            });
    
            movimientoInferior.chain(movimientoSuperior);
            movimientoSuperior.chain(movimientoInferior);
    }

    update(){
        this.personaje.update();
        TWEEN.update();
    }
}

export { MyPacman }