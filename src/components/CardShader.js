import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

const vertexShader = `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D uTexture;
  uniform float uTime;
  uniform float uDistortionStrength;
  varying vec2 vUv;

  void main() {
    vec2 uv = vUv - vec2(0.5);
    float uva = atan(uv.x, uv.y);
    float uvd = sqrt(dot(uv, uv));
    float k = sin(uTime) * uDistortionStrength;
    uvd = uvd * (1.0 + k * uvd * uvd);
    vec2 distortedUv = vec2(0.5) + vec2(sin(uva), cos(uva)) * uvd;
    vec4 tex = texture2D(uTexture, distortedUv);
    gl_FragColor = tex;
  }
`;

const CardShader = ({ imageUrl, distortionStrength = 0 }) => {
  const containerRef = useRef();
  const sceneRef = useRef();
  const cameraRef = useRef();
  const rendererRef = useRef();
  const materialRef = useRef();
  const timeRef = useRef(0);
  const frameRef = useRef();

  useEffect(() => {
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    // Camera setup
    const camera = new THREE.OrthographicCamera(-0.5, 0.5, 0.5, -0.5, 0.1, 1000);
    camera.position.z = 1;
    cameraRef.current = camera;

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(width, height);
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Load texture
    const textureLoader = new THREE.TextureLoader();
    textureLoader.load(imageUrl, (texture) => {
      // Material setup
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uTexture: { value: texture },
          uTime: { value: 0 },
          uDistortionStrength: { value: distortionStrength }
        },
        vertexShader,
        fragmentShader,
      });
      materialRef.current = material;

      // Mesh setup
      const geometry = new THREE.PlaneGeometry(1, 1);
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
    });

    // Animation
    const animate = () => {
      if (materialRef.current) {
        timeRef.current += 0.016;
        materialRef.current.uniforms.uTime.value = timeRef.current;
        materialRef.current.uniforms.uDistortionStrength.value = distortionStrength;
      }
      renderer.render(scene, camera);
      frameRef.current = requestAnimationFrame(animate);
    };
    animate();

    // Cleanup
    return () => {
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, [imageUrl]);

  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uDistortionStrength.value = distortionStrength;
    }
  }, [distortionStrength]);

  return <div ref={containerRef} style={{ width: '100%', height: '100%' }} />;
};

export default CardShader;
