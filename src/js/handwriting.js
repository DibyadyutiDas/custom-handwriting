// Handwriting state
const state = {
  text: '',
  selectedStyle: 'casual',
  customStyle: null,
  processing: false
};

// Font mappings
const fonts = {
  casual: "'Caveat', cursive",
  elegant: "'Parisienne', cursive",
  neat: "'Kalam', cursive",
  artistic: "'Homemade Apple', cursive",
  custom: "'Caveat', cursive", // Default fallback for custom
};

export function initHandwriting() {
  initTextInput();
  initStyleSelector();
  initPreview();
}

function initTextInput() {
  const textInput = document.getElementById('text-input');
  const charCount = document.querySelector('.char-count');
  const clearButton = document.getElementById('clear-button');
  const convertButton = document.getElementById('convert-button');
  const textForm = document.querySelector('.text-form');
  
  // Update character count on input
  textInput.addEventListener('input', () => {
    state.text = textInput.value;
    charCount.textContent = `${state.text.length} characters`;
    
    // Enable/disable clear and convert buttons
    clearButton.disabled = !state.text.length;
    convertButton.disabled = !state.text.trim().length;
  });
  
  // Clear text button
  clearButton.addEventListener('click', () => {
    textInput.value = '';
    state.text = '';
    charCount.textContent = '0 characters';
    clearButton.disabled = true;
    convertButton.disabled = true;
    
    // Reset preview
    resetPreview();
  });
  
  // Form submission - Convert to handwriting
  textForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!state.text.trim()) return;
    
    // Start processing
    state.processing = true;
    convertButton.disabled = true;
    convertButton.textContent = 'Converting...';
    
    // Update preview status
    updatePreviewStatus('loading');
    
    // Generate handwriting with typing effect
    generateHandwriting();
  });
}

function initStyleSelector() {
  const styleOptions = document.querySelectorAll('.style-option');
  const uploadInput = document.getElementById('handwriting-upload');
  const uploadContainer = document.getElementById('upload-container');
  const uploadSuccess = document.getElementById('upload-success');
  
  // Select style option
  styleOptions.forEach(option => {
    option.addEventListener('click', () => {
      const styleId = option.getAttribute('data-style');
      
      // Update selected style
      state.selectedStyle = styleId;
      
      // Update visual selection
      styleOptions.forEach(opt => {
        opt.classList.remove('selected');
        opt.querySelector('.check-icon').classList.add('hidden');
      });
      
      option.classList.add('selected');
      option.querySelector('.check-icon').classList.remove('hidden');
    });
  });
  
  // Set initial selection
  const defaultOption = document.querySelector('[data-style="casual"]');
  defaultOption.classList.add('selected');
  defaultOption.querySelector('.check-icon').classList.remove('hidden');
  
  // Handle custom handwriting upload
  uploadInput.addEventListener('change', (e) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      
      reader.onloadend = () => {
        state.customStyle = reader.result;
        state.selectedStyle = 'custom';
        
        // Update UI
        uploadContainer.classList.add('hidden');
        uploadSuccess.classList.remove('hidden');
        
        // Update style selection
        styleOptions.forEach(opt => {
          opt.classList.remove('selected');
          opt.querySelector('.check-icon').classList.add('hidden');
        });
        
        const customOption = document.querySelector('[data-style="custom"]');
        customOption.classList.add('selected');
        customOption.querySelector('.check-icon').classList.remove('hidden');
      };
      
      reader.readAsDataURL(file);
    }
  });
}

function initPreview() {
  const downloadButton = document.getElementById('download-button');
  
  // Download button functionality
  downloadButton.addEventListener('click', () => {
    // In a real app, this would download the actual handwritten image
    alert("In a real app, this would download the handwritten image");
  });
}

function updatePreviewStatus(status) {
  const statusIndicator = document.getElementById('status-indicator');
  const statusText = document.getElementById('status-text');
  const previewEmpty = document.getElementById('preview-empty');
  const previewLoading = document.getElementById('preview-loading');
  const handwritingResult = document.getElementById('handwriting-result');
  const downloadButton = document.getElementById('download-button');
  
  switch (status) {
    case 'waiting':
      statusIndicator.className = 'status-indicator';
      statusText.textContent = 'Waiting for input';
      previewEmpty.classList.remove('hidden');
      previewLoading.classList.add('hidden');
      handwritingResult.classList.add('hidden');
      downloadButton.disabled = true;
      break;
      
    case 'loading':
      statusIndicator.className = 'status-indicator loading';
      statusText.textContent = 'Generating handwriting...';
      previewEmpty.classList.add('hidden');
      previewLoading.classList.remove('hidden');
      handwritingResult.classList.add('hidden');
      downloadButton.disabled = true;
      break;
      
    case 'success':
      statusIndicator.className = 'status-indicator success';
      statusText.textContent = 'Handwriting generated';
      previewEmpty.classList.add('hidden');
      previewLoading.classList.add('hidden');
      handwritingResult.classList.remove('hidden');
      downloadButton.disabled = false;
      break;
  }
}

function resetPreview() {
  const handwritingResult = document.getElementById('handwriting-result');
  handwritingResult.textContent = '';
  updatePreviewStatus('waiting');
  
  // Reset convert button
  const convertButton = document.getElementById('convert-button');
  convertButton.disabled = true;
  convertButton.textContent = 'Convert to Handwriting';
  convertButton.innerHTML = `
    Convert to Handwriting
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <line x1="22" y1="2" x2="11" y2="13"></line>
      <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
  `;
}

function generateHandwriting() {
  const handwritingResult = document.getElementById('handwriting-result');
  handwritingResult.textContent = '';
  
  // Apply the selected font style
  handwritingResult.style.fontFamily = fonts[state.selectedStyle];
  
  // Adjust font size for elegant style
  if (state.selectedStyle === 'elegant') {
    handwritingResult.style.fontSize = '28px';
  } else {
    handwritingResult.style.fontSize = '24px';
  }
  
  // Simulate generating handwriting with a typing effect
  let currentIndex = 0;
  
  const typeNextChar = () => {
    if (currentIndex === 0) {
      // Just starting, change status to loading
      updatePreviewStatus('loading');
    }
    
    if (currentIndex < state.text.length) {
      handwritingResult.textContent += state.text[currentIndex];
      currentIndex++;
      setTimeout(typeNextChar, 50);
    } else {
      // Finished typing
      state.processing = false;
      updatePreviewStatus('success');
      
      // Reset convert button
      const convertButton = document.getElementById('convert-button');
      convertButton.disabled = !state.text.trim().length;
      convertButton.innerHTML = `
        Convert to Handwriting
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="22" y1="2" x2="11" y2="13"></line>
          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
        </svg>
      `;
    }
  };
  
  // Start the typing effect with a slight delay
  setTimeout(typeNextChar, 500);
}