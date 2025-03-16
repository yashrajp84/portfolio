// WebGL Shader implementation for barrel/pincushion distortion effect

// Vertex shader program
const vertexShaderSource = `
attribute vec4 aVertexPosition;
attribute vec2 aTextureCoord;

varying highp vec2 vTextureCoord;

void main(void) {
  gl_Position = aVertexPosition;
  vTextureCoord = aTextureCoord;
}
`;

// Fragment shader program with barrel/pincushion distortion
const fragmentShaderSource = `
precision mediump float;

varying highp vec2 vTextureCoord;

uniform sampler2D uSampler;
uniform float uDistortionStrength; // Distortion parameter: negative for barrel, positive for pincushion

void main(void) {
  // Convert texture coordinates to range [-1, 1]
  vec2 texCoord = vTextureCoord * 2.0 - 1.0;
  
  // Calculate distance from center (squared)
  float r2 = dot(texCoord, texCoord);
  
  // Apply barrel/pincushion distortion formula
  // For barrel: negative strength, for pincushion: positive strength
  float distortionFactor = 1.0 + uDistortionStrength * r2;
  
  // Apply the distortion
  vec2 distortedCoord = texCoord * distortionFactor;
  
  // Convert back to range [0, 1]
  distortedCoord = (distortedCoord + 1.0) * 0.5;
  
  // Sample the texture with the distorted coordinates
  // Check if the distorted coordinates are within the valid range [0, 1]
  if (distortedCoord.x >= 0.0 && distortedCoord.x <= 1.0 && 
      distortedCoord.y >= 0.0 && distortedCoord.y <= 1.0) {
    gl_FragColor = texture2D(uSampler, distortedCoord);
  } else {
    // If outside the valid range, use transparent color
    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
  }
}
`;

// Helper function to initialize a shader program
function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program
  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert
  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    console.error('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

// Helper function to load a shader
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  // See if it compiled successfully
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}

// Export the shader sources and helper functions
window.ShaderUtils = {
  vertexShaderSource,
  fragmentShaderSource,
  initShaderProgram,
  loadShader
};