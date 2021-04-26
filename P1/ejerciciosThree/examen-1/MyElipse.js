import * as THREE from '../libs/three.module.js'
import * as TWEEN from '../libs/tween.esm.js'

class MyElipse extends THREE.Object3D {
    constructor(gui) {
      super();
  
      this.createGUI(gui);
  
      this.elipse2D = new THREE.EllipseCurve(
        0,  0,            // ax, aY
        15, 10           // xRadius, yRadius
      );
  
      var shape = new THREE.Shape (this.elipse2D.getPoints(100));
  
      var extrudeSettings = {
        depth: 5,
        bevelEnabled: false
      };
  
      var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
      var material = new THREE.MeshNormalMaterial({opacity:0.35,transparent:true});
      this.elipse = new THREE.Mesh( geometry, material ) ;
  
      this.add(this.elipse);
  
      //Crear spline de la elipse
  
      this.splineElipse3D = this.crearSplineElipse(this.elipse2D); //Convertir la elipse2D en 3D
  
      //Esfera
  
      var sphereGeom = new THREE.SphereGeometry( 1, 20.0, 20.0);
      // Como material se crea uno a partir de un color
      var sphereMat = new THREE.MeshNormalMaterial();
  
      // Ya podemos construir el Mesh
      this.esfera = new THREE.Mesh (sphereGeom, sphereMat);
      // Y añadirlo como hijo del Object3D (el this)
      this.add(this.esfera);
  
      //Animaciones con TWEEN
      var origen = { p : 0 } ;
      var destino = { p : 1 } ;
      var that = this;
  
      var movimiento = new TWEEN.Tween(origen)
        .to(destino, 4000) //4 segundos
        .repeat(Infinity)
        .onUpdate (function(){
              var t = origen.p;
              var posicion = that.splineElipse3D.getPointAt(t);
              that.esfera.position.copy(posicion);
              var tangente = that.splineElipse3D.getTangentAt(t);
              posicion.add(tangente);
              that.esfera.lookAt(posicion);
        })
        .onComplete (function(){
              origen.p = 0;
        })
        .start();
    }
  
    crearSplineElipse(elipse2D){
      var array3D = [];
  
      for(var i=0; i<=1; i+=0.01){
        var puntoAux = elipse2D.getPoint(i);
        var punto3D = new THREE.Vector3( puntoAux.x, puntoAux.y, 2.5);
        array3D.push(punto3D);
      }
  
      var splineElipse3D = new THREE.CatmullRomCurve3 (array3D, true);
      return splineElipse3D;
    }
  
    createGUI (gui) {
      // Controles para el tamaño, la orientación y la posición de la caja
      this.guiControls = new function () {
        this.radioX = 15;
        this.radioY = 10;
      }
  
  
  
      // Se crea una sección para los controles de la caja
      var folder = gui.addFolder ("Controles Elipse");
      var that = this;
  
      folder.add (this.guiControls, 'radioX', 5.0, 30.0, 0.5).name ('Radio X: ').onChange(function(value){that.crearNueva()});
      folder.add (this.guiControls, 'radioY', 5.0, 30.0, 0.5).name ('Radio Y: ').onChange(function(value){that.crearNueva()});
    }
  
    crearNueva(){
      this.elipse2D = new THREE.EllipseCurve(
        0,  0,            // ax, aY
        this.guiControls.radioX, this.guiControls.radioY          // xRadius, yRadius
      );
  
      this.splineElipse3D = this.crearSplineElipse(this.elipse2D);
  
      var shape = new THREE.Shape (this.elipse2D.getPoints(100));
      var extrudeSettings = {
        depth: 5,
        bevelEnabled: false
      };
  
      var geometry = new THREE.ExtrudeGeometry( shape, extrudeSettings );
      this.elipse.geometry = geometry;
    }
  
    update () {
      TWEEN.update();
    }
  }

  export { MyElipse }