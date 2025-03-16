// WebGL Distortion Implementation

class WebGLDistortion {
  constructor(cardImageElement) {
    this.cardImageElement = cardImageElement;
    this.canvas = document.createElement('canvas');
    this.gl = this.canvas.getContext('webgl');
    
    if (!this.gl) {
      console.error('Unable to initialize WebGL. Your browser may not support it.');
      return;
    }
    
    // Set canvas size to match the card image
    this.resize();
    
    // Replace the card image with the canvas
    this.cardImageElement.innerHTML = '';
    this.cardImageElement.appendChild(this.canvas);
    
    // Initialize the WebGL context
    this.initWebGL();
    
    // Create a texture with a placeholder color
    this.createPlaceholderTexture();
    
    // Set initial distortion strength
    this.distortionStrength = 0;
  }
  
  resize() {
    // Get the computed style of the card image
    const style = window.getComputedStyle(this.cardImageElement);
    const width = parseInt(style.width, 10);
    const height = parseInt(style.height, 10);
    
    // Set canvas size
    this.canvas.width = width;
    this.canvas.height = height;
    
    // Update viewport
    if (this.gl) {
      this.gl.viewport(0, 0, this.canvas.width, this.canvas.height);
    }
  }
  
  initWebGL() {
    const gl = this.gl;
    
    // Initialize shader program
    this.shaderProgram = ShaderUtils.initShaderProgram(gl, 
      ShaderUtils.vertexShaderSource, 
      ShaderUtils.fragmentShaderSource);
    
    if (!this.shaderProgram) {
      console.error('Failed to initialize shader program');
      return;
    }
    
    // Collect all the info needed to use the shader program
    this.programInfo = {
      program: this.shaderProgram,
      attribLocations: {
        vertexPosition: gl.getAttribLocation(this.shaderProgram, 'aVertexPosition'),
        textureCoord: gl.getAttribLocation(this.shaderProgram, 'aTextureCoord'),
      },
      uniformLocations: {
        uSampler: gl.getUniformLocation(this.shaderProgram, 'uSampler'),
        uDistortionStrength: gl.getUniformLocation(this.shaderProgram, 'uDistortionStrength'),
      },
    };
    
    // Create the buffers we'll need
    this.initBuffers();
  }
  
  initBuffers() {
    const gl = this.gl;
    
    // Create a buffer for the square's positions
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    
    // Create a square
    const positions = [
      -1.0,  1.0, // Top left
       1.0,  1.0, // Top right
      -1.0, -1.0, // Bottom left
       1.0, -1.0, // Bottom right
    ];
    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
    
    // Create a buffer for texture coordinates
    const textureCoordBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, textureCoordBuffer);
    
    const textureCoordinates = [
      0.0, 0.0, // Top left
      1.0, 0.0, // Top right
      0.0, 1.0, // Bottom left
      1.0, 1.0, // Bottom right
    ];
    
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoordinates), gl.STATIC_DRAW);
    
    this.buffers = {
      position: positionBuffer,
      textureCoord: textureCoordBuffer,
    };
  }
  
  createPlaceholderTexture() {
    const gl = this.gl;
    
    // Create a texture
    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    
    // Fill the texture with a solid color (white)
    const level = 0;
    const internalFormat = gl.RGBA;
    const width = 1;
    const height = 1;
    const border = 0;
    const srcFormat = gl.RGBA;
    const srcType = gl.UNSIGNED_BYTE;
    const pixel = new Uint8Array([255, 255, 255, 255]); // white
    gl.texImage2D(gl.TEXTURE_2D, level, internalFormat,
                  width, height, border, srcFormat, srcType,
                  pixel);
    
    // Set texture parameters
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    
    this.texture = texture;
  }
  
  setDistortionStrength(strength) {
    this.distortionStrength = strength;
    this.render();
  }
  
  render() {
    const gl = this.gl;
    
    // Clear the canvas with transparent background
    gl.clearColor(0.0, 0.0, 0.0, 0.0); // Transparent background
    gl.clearDepth(1.0);
    
    // Enable alpha blending
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    
    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
    
    // Tell WebGL to use our program when drawing
    gl.useProgram(this.programInfo.program);
    
    // Set up the vertex position attribute
    {
      const numComponents = 2; // pull out 2 values per iteration
      const type = gl.FLOAT; // the data in the buffer is 32bit floats
      const normalize = false; // don't normalize
      const stride = 0; // how many bytes to get from one set of values to the next
      const offset = 0; // how many bytes inside the buffer to start from
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.position);
      gl.vertexAttribPointer(
          this.programInfo.attribLocations.vertexPosition,
          numComponents,
          type,
          normalize,
          stride,
          offset);
      gl.enableVertexAttribArray(
          this.programInfo.attribLocations.vertexPosition);
    }
    
    // Set up the texture coordinate attribute
    {
      const numComponents = 2;
      const type = gl.FLOAT;
      const normalize = false;
      const stride = 0;
      const offset = 0;
      gl.bindBuffer(gl.ARRAY_BUFFER, this.buffers.textureCoord);
      gl.vertexAttribPointer(
          this.programInfo.attribLocations.textureCoord,
          numComponents,
          type,
          normalize,
          stride,
          offset);
      gl.enableVertexAttribArray(
          this.programInfo.attribLocations.textureCoord);
    }
    
    // Tell WebGL we want to affect texture unit 0
    gl.activeTexture(gl.TEXTURE0);
    
    // Bind the texture to texture unit 0
    gl.bindTexture(gl.TEXTURE_2D, this.texture);
    
    // Tell the shader we bound the texture to texture unit 0
    gl.uniform1i(this.programInfo.uniformLocations.uSampler, 0);
    
    // Set the distortion strength uniform
    gl.uniform1f(this.programInfo.uniformLocations.uDistortionStrength, this.distortionStrength);
    
    // Draw the square
    {
      const offset = 0;
      const vertexCount = 4;
      gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
    }
  }
}

// Initialize WebGL distortion for all card images
function initWebGLDistortion() {
  const cardImages = document.querySelectorAll('.card-image');
  const distortionInstances = [];
  
  cardImages.forEach(cardImage => {
    distortionInstances.push(new WebGLDistortion(cardImage));
  });
  
  return distortionInstances;
}

// Update distortion strength for all instances
function updateWebGLDistortion(instances, strength) {
  instances.forEach(instance => {
    instance.setDistortionStrength(strength);
  });
}

// Export functions
window.WebGLDistortionUtils = {
  initWebGLDistortion,
  updateWebGLDistortion
};