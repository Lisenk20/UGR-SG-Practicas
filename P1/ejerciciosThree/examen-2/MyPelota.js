import * as THREE from '../libs/three.module.js'

class MyPelota extends THREE.Object3D {
    constructor(gui) {
      super();
  
      this.createGUI(gui);
  
      this.momento = 0;
  
      this.variacion = new THREE.Vector2(0,20);
      this.tiempo = new THREE.Vector2(0,1);
  
      this.subiendo = true;
  
      this.tiempoAnterior = Date.now();
  
      this.velocidadRotacion = Math.PI/2;
  
      var cylinderGeom = new THREE.CylinderGeometry(this.guiControls.radius, this.guiControls.radius, 20, 20);
      var cylinderMat = new THREE.MeshNormalMaterial({opacity:0.35,transparent:true});
      this.cylinder = new THREE.Mesh (cylinderGeom, cylinderMat);
      this.add(this.cylinder);
  
      var pelotaGeom = new THREE.SphereGeometry(1, 10, 10);
      var materialPelota = new THREE.MeshNormalMaterial();
      this.pelotaA = new THREE.Mesh(pelotaGeom, materialPelota);
  
      this.pelotaB = new THREE.Object3D();
      this.pelotaB.add(this.pelotaA);
  
      this.add(this.pelotaB);
  
    }
  
    createGUI (gui) {
      // Controles para el tamaño, la orientación y la posición de la caja
      this.guiControls = new function () {
        this.radius = 10;
      }
  
      // Se crea una sección para los controles de la caja
      var folder = gui.addFolder ("Controles Cilindro :");
      var that = this;
      // Estas lineas son las que añaden los componentes de la interfaz
      // Las tres cifras indican un valor mínimo, un máximo y el incremento
      // El método   listen()   permite que si se cambia el valor de la variable en código, el deslizador de la interfaz se actualice
      folder.add (this.guiControls, 'radius', 5, 20.0, 0.1).name ('Radio : ').onChange(function(value){that.crearNueva()});
    }
  
    crearNueva(){
      var cylinderGeom = new THREE.CylinderGeometry( this.guiControls.radius,this.guiControls.radius, 20, 20);
      this.cylinder.geometry = cylinderGeom;
    }
  
    funcionAD(landa){
      return -2 * landa*landa*landa + 3 * landa*landa;
    }
  
    valor(t){
      var landa = ( t - this.tiempo.x ) / ( this.tiempo.y - this.tiempo.x );
      var valor = this.variacion.x + this.funcionAD(landa) * (this.variacion.y - this.variacion.x);
      return valor;
    }
  
    update () {
      this.cylinder.position.y = 10;
  
      this.pelotaA.position.x = this.guiControls.radius;
  
      var tiempoActual = Date.now();
      var segundos = (tiempoActual - this.tiempoAnterior)/1000;
      this.pelotaB.rotation.y  += segundos * this.velocidadRotacion;
  
      this.pelotaB.position.y = this.valor(this.momento);
  
      if(this.momento < this.tiempo.y && this.subiendo){
        this.momento += segundos;
        if(this.momento >= this.tiempo.y) this.subiendo = false;
      }
      else{
        this.momento -= segundos;
        if(this.momento <= this.tiempo.x) this.subiendo = true;
      }
  
      this.tiempoAnterior = tiempoActual;
    }
}

export { MyPelota }