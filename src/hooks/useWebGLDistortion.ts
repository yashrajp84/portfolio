import { useEffect, useRef } from 'react';

interface WebGLDistortionProps {
  cardImageElement: HTMLElement;
  gl: WebGLRenderingContext;
  canvas: HTMLCanvasElement;
  shaderProgram: WebGLProgram;
  programInfo: any;
  distortionStrength: number;
}

const vertexShaderSource = `
attribute vec4 aVertexPosition;
attribute vec2 aTextureCoord;

varying highp vec2 vTextureCoord;

void main(void) {
  gl_Position = aVertexPosition;
  vTextureCoord = aTextureCoord;
}
`;

const fragmentShaderSource = `
precision mediump float;

varying highp vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform float uDistortionStrength;

void main(void) {
  vec2 texCoord = vTextureCoord * 2.0 - 1.0;
  float r2 = dot(texCoord, texCoord);
  float distortionFactor = 1.0 + uDistortionStrength * r2;
  vec2 distortedCoord = texCoord * distortionFactor;
  distortedCoord = (distortedCoord + 1.0) * 0.5;
  
  if (distortedCoord.x >= 0.0 && distortedCoord.x <= 1.0 && 
      distortedCoord.y >= 0.0 && distortedCoord.y <= 1.0) {
    gl_FragColor = texture2D(uSampler, distortedCoord);
  } else {
    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
  }
}
`;

function initShaderProgram(gl: WebGLRenderingContext, vsSource: string, fsSource: string) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  const shaderProgram = gl.createProgram();
  if (!shaderProgram || !vertexShader || !fragmentShader) return null;

  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

function loadShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

export function useWebGLDistortion(imageRef: React.RefObject<HTMLDivElement | null>) {
  const distortionRef = useRef<WebGLDistortionProps | null>(null);

  useEffect(() => {
    if (!imageRef.current) return;

    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl');

    if (!gl) {
      console.error('Unable to initialize WebGL');
      return;
    }

    const style = window.getComputedStyle(imageRef.current);
    canvas.width = parseInt(style.width, 10);
    canvas.height = parseInt(style.height, 10);
    gl.viewport(0, 0, canvas.width, canvas.height);

    // Create and set up the texture
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);

    // Set texture parameters
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    // Create an image element and load the background image
    const image = new Image();
    image.crossOrigin = 'anonymous';
    image.src = imageRef.current.style.backgroundImage.replace(/url\(['"](.+)['"]\)/, '$1');
    
    image.onload = () => {
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
    };

    imageRef.current.innerHTML = '';
    imageRef.current.appendChild(canvas);

    const shaderProgram = initShaderProgram(gl, vertexShaderSource, fragmentShaderSource);
    if (!shaderProgram) return;

    const programInfo = {
      program: shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
        textureCoord: gl.getAttribLocation(shaderProgram, 'aTextureCoord'),
      },
      uniformLocations: {
        uSampler: gl.getUniformLocation(shaderProgram, 'uSampler'),
        uDistortionStrength: gl.getUniformLocation(shaderProgram, 'uDistortionStrength'),
      },
    };

    distortionRef.current = {
      cardImageElement: imageRef.current,
      gl,
      canvas,
      shaderProgram,
      programInfo,
      distortionStrength: 0,
    };

    return () => {
      if (distortionRef.current) {
        const { gl, shaderProgram } = distortionRef.current;
        gl.deleteProgram(shaderProgram);
      }
    };
  }, [imageRef]);

  const updateDistortion = (strength: number) => {
    if (!distortionRef.current) return;
    const { gl, programInfo, distortionStrength } = distortionRef.current;

    // Create position buffer
    const positions = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
       1.0,  1.0,
    ]);
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    // Create texture coordinate buffer
    const textureCoordinates = new Float32Array([
      0.0, 0.0,
      1.0, 0.0,
      0.0, 1.0,
      1.0, 1.0,
    ]);
    const textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, textureCoordinates, gl.STATIC_DRAW);

    // Clear canvas
    gl.clearColor(0.0, 0.0, 0.0, 0.0);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // Use shader program
    gl.useProgram(programInfo.program);

    // Set up vertex attributes
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.vertexAttribPointer(programInfo.attribLocations.vertexPosition, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);

    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
    gl.vertexAttribPointer(programInfo.attribLocations.textureCoord, 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(programInfo.attribLocations.textureCoord);

    // Set uniforms
    gl.uniform1f(programInfo.uniformLocations.uDistortionStrength, strength);

    // Draw
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

    // Clean up
    gl.deleteBuffer(positionBuffer);
    gl.deleteBuffer(textureCoordBuffer);
  };

  return { updateDistortion };
}