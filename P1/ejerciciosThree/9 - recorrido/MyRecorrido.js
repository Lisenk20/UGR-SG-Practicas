import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'

class MyRecorrido extends THREE.Object3D{
    constructor() {
        super();
    
        this.bucleDerecha = true;
    
        //Definición de la curva
    
        this.splineDer = new THREE.CatmullRomCurve3 ([
    
            new THREE.Vector3 (0,0,0),
    
            new THREE.Vector3 (13,0,13), new THREE.Vector3 (16,0,16),
            new THREE.Vector3 (20,0,18), new THREE.Vector3 (24,0,13),
    
            new THREE.Vector3 (25,0,10), new THREE.Vector3 (26,0,0),
    
            new THREE.Vector3 (24,0,-13), new THREE.Vector3 (20,0,-18),
            new THREE.Vector3 (16,0,-16), new THREE.Vector3 (13,0,-13),
    
            new THREE.Vector3 (0,0,0)
        ]);
    
        this.splineIzq = new THREE.CatmullRomCurve3 ([
    
            new THREE.Vector3 (0,0,0),
    
            new THREE.Vector3 (-13,0,13), new THREE.Vector3 (-16,0,16),
            new THREE.Vector3 (-20,0,18), new THREE.Vector3 (-24,0,13),
    
            new THREE.Vector3 (-25,0,10), new THREE.Vector3 (-26,0,0),
    
            new THREE.Vector3 (-24,0,-13), new THREE.Vector3 (-20,0,-18),
            new THREE.Vector3 (-16,0,-16), new THREE.Vector3 (-13,0,-13),
    
            new THREE.Vector3 (0,0,0)
    
        ]);
    
        var geometryLineDer = new THREE.Geometry();
        geometryLineDer.vertices = this.splineDer.getPoints(100);
    
        var geometryLineIzq = new THREE.Geometry();
        geometryLineIzq.vertices = this.splineIzq.getPoints(100);
    
        var material = new THREE.LineBasicMaterial( { color : 0xff0000 } );
    
        // Create the final object to add to the scene
        var curveObjectDer = new THREE.Line( geometryLineDer, material );
        var curveObjectIzq = new THREE.Line( geometryLineIzq, material );
    
        this.add(curveObjectDer);
        this.add(curveObjectIzq);
    
        // Creación de la nave
    
        var coneGeom = new THREE.ConeGeometry( 0.75, 3, 5.0);
        // Como material se crea uno a partir de un color
        var coneMat = new THREE.MeshPhongMaterial({color: 0x00CF00});
    
        // Ya podemos construir el Mesh
        this.coneA = new THREE.Mesh (coneGeom, coneMat);
    
        this.coneA.rotation.x = Math.PI/2;
    
        this.coneB = new THREE.Object3D();
        this.coneB.add(this.coneA);
    
        // Y añadirlo como hijo del Object3D (el this)
        this.add(this.coneB);
    
        //Animaciones con TWEEN
        var origen = { p : 0 } ;
        var destino = { p : 1 } ;
        var that = this;
    
        var movimientoDer = new TWEEN.Tween(origen)
          .to(destino, 8000) //8 segundos
          .easing (TWEEN.Easing.Quartic.InOut)
          .onUpdate (function(){
                var t = origen.p;
                var posicion = that.splineDer.getPointAt(t);
                that.coneB.position.copy(posicion);
                var tangente = that.splineDer.getTangentAt(t);
                posicion.add(tangente);
                that.coneB.lookAt(posicion);
          })
          .onComplete (function(){
                origen.p = 0;
          })
          .start();
    
          var movimientoIzq = new TWEEN.Tween(origen)
            .to(destino, 4000) //4 segundos
            .easing (TWEEN.Easing.Quartic.InOut)
            .onUpdate (function(){
                  var t = origen.p;
                  var posicion = that.splineIzq.getPointAt(t);
                  that.coneB.position.copy(posicion);
                  var tangente = that.splineIzq.getTangentAt(t);
                  posicion.add(tangente);
                  that.coneB.lookAt(posicion);
            })
            .onComplete (function(){
                  origen.p = 0;
            });
    
            movimientoDer.chain(movimientoIzq);
            movimientoIzq.chain(movimientoDer);
      }
    
      update () {
        TWEEN.update();
      }
}

export { MyRecorrido }