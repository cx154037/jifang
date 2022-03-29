<template>
  <div class="app-container home">
    <div class="card-content">
      <div ref="threeDom" class="model" />
      <div id="label" />
    </div>
    <div>
      {{jigui.name}}
    </div>
  </div>
</template>

<script>
//import axios from 'axios';
import * as THREE from "three";
import * as ThreeStats from "three-stats";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { OutlinePass } from "three/examples/jsm/postprocessing/OutlinePass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";
import { FXAAShader } from "three/examples/jsm/shaders/FXAAShader.js";
import { offset } from "@/utils/ruoyi";
const OrbitControls = require("three-orbit-controls")(THREE);
const ThreeBSP = require("jthreebsp")(THREE);
export default {
  name: "Index",
  data() {
    return {
      renderer: "", //渲染器
      scene: "", //场景
      light: "", //光源
      camera: "", //相机
      controls: "", //控制器
      stats: "", //性能监控器
      mygroup: "", //模型组
      action: "", //控制动画的值
      clock: "", //时钟
      mixer: "", //混合实例
      rotateAnimate: "", //旋转动画
      isRotate: 1, //是否开启旋转
      boxa: "",
      composer: "",
      renderPass: "",
      width: "",
      height: "",
      jigui:{
        name:''
      }
    };
  },
  mounted() {
    this.init();
    this.animate();
  },
  methods: {
    init() {
      this.initScene();
      this.initCamera();
      this.initRenderer();
      this.click();
      this.initContent();
      this.initLight();
      this.initStats();
          this.initBox(-1400, 180, 0, -1400, 180, 80, '机柜1');
      this.initBox(-700, 180, 0, 300, 180, 80, '机柜2');
      this.initBox(0, 180, -500, 0, 180, -420, '机柜3');
      this.createDoor(-1400, 180, 108, '机柜1');
      this.createDoor(-700, 180, 108, '机柜2');
      this.createDoor(0, 180, -392, '机柜3');
      this.initControls();
    },
    initScene() {
      this.scene = new THREE.Scene();
      this.scene.fog = new THREE.Fog(this.scene.background, 3000, 5000);
    },
    initCamera() {
      this.camera = new THREE.PerspectiveCamera(
        45,
        window.innerWidth / window.innerHeight,
        0.1,
        10000
      );
      this.camera.position.set(0, 900, 3600);
      this.camera.lookAt(new THREE.Vector3(0, 0, 0));
    },
    createFloor() {
      var loader = new THREE.TextureLoader();
      var _this = this;
      loader.load(require("../assets/3d/floor.jpg"), function (texture) {
        texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        texture.repeat.set(10, 10);
        var floorGeometry = new THREE.BoxGeometry(3500, 3500, 50);
        var floorMaterial = new THREE.MeshBasicMaterial({
          map: texture,
          side: THREE.DoubleSide,
        });
        var floor = new THREE.Mesh(floorGeometry, floorMaterial);
        floor.position.y = -0.5;
        floor.position.z = -1200;
        floor.rotation.x = Math.PI / 2;
        floor.name = "地面";
        // console.log(this)
        _this.scene.add(floor);
      });
    },
    initLight() {
      var directionalLight = new THREE.DirectionalLight(0xffffff, 0.3); //模拟远处类似太阳的光源
      directionalLight.color.setHSL(0.1, 1, 0.95);
      directionalLight.position.set(0, 200, 0).normalize();
      this.scene.add(directionalLight);

      var ambient = new THREE.AmbientLight(0xffffff, 1); //AmbientLight,影响整个场景的光源
      ambient.position.set(0, 0, 0);
      this.scene.add(ambient);
    },
    initStats() {
      this.stats = new ThreeStats.Stats();

      // this.stats.domElement.style.position = 'absolute';
      // this.stats.domElement.style.left = '0px';
      // this.stats.domElement.style.top = '0px';
      this.stats.dom.style.position = "absolute";
      this.stats.dom.style.top = "-4px";
      //  console.log(this.$refs.property)
      // this.$refs.property.appendChild(this.stats.dom);
      this.stats.update();
      this.$refs.threeDom.appendChild(this.renderer.domElement);
    },
    initRenderer() {
      this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      this.renderer.setSize(900, 700);
      this.renderer.setClearColor(0x4682b4, 1.0);
      this.$refs.threeDom.appendChild(this.renderer.domElement);
    },
    initContent() {
      this.createFloor();
    },
    initControls() {
      this.controls = new OrbitControls(this.camera, this.$refs.threeDom);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.5;
      // 视角最小距离
      this.controls.minDistance = 100;
      // 视角最远距离
      this.controls.maxDistance = 2500;
      // 最大角度
    },
    animate() {
      //循环渲染
      this.rotateAnimate = requestAnimationFrame(this.animate);
      this.renderer.render(this.scene, this.camera);
      this.composer.render();
      this.update();
    },
    update() {
      this.stats.update();
      this.controls.update();
    },
    //创建箱子
    initBox(x, y, z, x1, y1, z1, name) {
      var loader = new THREE.TextureLoader();
      var _this = this;
      loader.load(require("../assets/3d/zhenmian.jpg"), function (texture) {
        //  texture.wrapS = texture.wrapT = THREE.RepeatWrapping;
        //texture.repeat.set(100, 100);
       var boxGeometry = new THREE.BoxGeometry(300, 220, 350);
        var boxGeometry1 = new THREE.BoxGeometry(220, 280, 220);
        var boxMaterial = new THREE.MeshBasicMaterial({
          map: texture,
        });
        var boxs = new THREE.Mesh(boxGeometry, boxMaterial);
        var box2 = new THREE.Mesh(boxGeometry1, boxMaterial);
        box2.position.y = y1;
        box2.position.z = z1;
        box2.position.x = x1;
        boxs.position.y = y;
        boxs.position.x = x;
        boxs.position.z = z;
        boxs.rotation.x = Math.PI / 2;
        boxs.name = name;
        const sphereBSP = new ThreeBSP(boxs);
        const cubeBSP = new ThreeBSP(box2);
        const resultBSP = sphereBSP.subtract(cubeBSP);
        const result = resultBSP.toMesh(boxMaterial);
        result.name = name;
        _this.scene.add(result);
      });
    },
    createDoor(x, y, z, name) {
      var loader = new THREE.TextureLoader();
      var _this = this;
      loader.load(require("../assets/3d/door.jpg"), function (texture) {
        var boxGeometry = new THREE.BoxGeometry(210, 290, 10);
        var boxMaterial = new THREE.MeshBasicMaterial({
          map: texture,
        });
        var boxs = new THREE.Mesh(boxGeometry, boxMaterial);
        boxs.position.z = z;
        boxs.position.y = y;
        boxs.position.x = x;
        boxs.name = name;
        _this.scene.add(boxs);
      });
    },
    click() {
      var model = document.getElementsByClassName("model")[0];
      var a = offset(model, "left");
      var b = offset(model, "top");
      var mouse = new THREE.Vector2();
      this.composer = new EffectComposer(this.renderer);
      const effectFXAA = new ShaderPass(FXAAShader);
      // 新建一个场景通道  为了覆盖到原理来的场景上
      this.renderPass = new RenderPass(this.scene, this.camera);
      this.composer.addPass(this.renderPass);
      var outlinePass = new OutlinePass(
        new THREE.Vector2(
          this.renderer.domElement.clientWidth,
          this.renderer.domElement.clientHeight,
          1
        ),
        this.scene,
        this.camera
      );
      outlinePass.edgeStrength = 5; //包围线浓度
      outlinePass.edgeGlow = 0.5; //边缘线范围
      outlinePass.edgeThickness = 2; //边缘线浓度
      outlinePass.pulsePeriod = 2; //包围线闪烁频率

      outlinePass.visibleEdgeColor.set("#ffffff"); //包围线颜色
      outlinePass.hiddenEdgeColor = new THREE.Color(0, 0, 0);
      outlinePass.edgeGlow = 0;
      this.composer.addPass(outlinePass);
      window.addEventListener("click", onMouseClick);
      var _this = this;
      function onMouseClick(event) {
        var x, y;
        if (event.changedTouches) {
          x = event.changedTouches[0].pageX;
          y = event.changedTouches[0].pageY;
        } else {
          x = event.clientX;
          y = event.clientY;
        }
        mouse.x = ((x - a) / _this.renderer.domElement.clientWidth) * 2 - 1;
        mouse.y = -((y - b) / _this.renderer.domElement.clientHeight) * 2 + 1;
        const standardVector = new THREE.Vector3(mouse.x, mouse.y);
        const worldVector = standardVector.unproject(_this.camera);
        const ray = worldVector.sub(_this.camera.position).normalize();
        var raycaster = new THREE.Raycaster(_this.camera.position, ray);
        raycaster.setFromCamera(mouse, _this.camera);

        // outlinePass.clear = true;
        var selectedObjects = [];
        var intersects = raycaster.intersectObjects([_this.scene], true);

        var label = document.getElementById("label");
        console.log(intersects);
        if (intersects.length === 0) {
          label.style.display = "none"; //隐藏说明性标签
          outlinePass.selectedObjects = [];
          return;
        }
        if (
          intersects[0].object.name === "地面" ||
          intersects[0].object.name === "" ||
          intersects[0].object.name === "墙面"
        ) {
          label.style.display = "none"; //隐藏说明性标签
          selectedObjects.pop();
          outlinePass.selectedObjects = selectedObjects;
        } else {
          label.style.display = "block"; // 显示说明性标签
          label.style.left = x - a + "px";
          label.style.top = y - 40 + "px";
          // 修改标签的位置
          label.innerText = intersects[0].object.name; // 显示模型信息
          _this.jigui.name = intersects[0].object.name
          selectedObjects = [];
          selectedObjects.push(intersects[0].object);
          outlinePass.selectedObjects = selectedObjects; //给选中的线条和物体加发光特效
          effectFXAA.uniforms["resolution"].value.set(
            1 / _this.renderer.domElement.clientWidth,
            1 / _this.renderer.domElement.clientHeight
          );
          effectFXAA.renderToScreen = true;
          _this.composer.addPass(effectFXAA);
        }
      }
    },
    onresize() {
      var model = document.getElementsByClassName("model")[0];
      var a = offset(model, "left");
      var b = offset(model, "top");
      this.width = document.body.scrollWidth - a;
      this.height = document.body.scrollHeight - b - 21;
    },
  },
};
</script>

<style scoped lang="scss">
.app-container{
  display: flex;
}
.model {
  border: 1px solid #dcdfe6;
  width: 700px;
  height: 600px;
}
.card-content {
  display: flex;
  flex-direction: row;
  width: 1200px;
  height: 580px;
}
#label {
  position: absolute;
  padding: 10px;
  background: rgba(255, 255, 255, 0.6);
  line-height: 1;
  border-radius: 5px;
}
</style>

