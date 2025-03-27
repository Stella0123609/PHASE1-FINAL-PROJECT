document.addEventListener('DOMContentLoaded', function() {
     animateElements();
     } )

    const userProfileForm = document.getElementById('userProfileForm');
    userProfileForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const height = document.getElementById('height').value;
        const weight = document.getElementById('weight').value;
        const bodyShape = document.getElementById('bodyShape').value;
        
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<span class="material-icons">hourglass_top</span> Saving...';
        submitBtn.disabled = true;
        
        
        setTimeout(() => {
            console.log(`Profile Saved: Height: ${height}, Weight: ${weight}, Body Shape: ${bodyShape}`);
            showNotification('Profile saved successfully!', 'success');

            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
            
            generateRecommendations(bodyShape);
        }, 1500);
    });
     const uploadArea = document.getElementById('uploadArea');
     const uploadInput = document.getElementById('uploadImage');
     const tryOnButton = document.getElementById('tryOnButton');
     const loadingSpinner = document.getElementById('loadingSpinner');
     const tryOnResult = document.getElementById('tryOnResult');
     
     uploadArea.addEventListener('dragover', (e) => {
         e.preventDefault();
         uploadArea.style.borderColor = '#6c5ce7';
         uploadArea.style.backgroundColor = 'rgba(108, 92, 231, 0.1)';
     });
     
     uploadArea.addEventListener('dragleave', () => {
         uploadArea.style.borderColor = 'rgba(255, 255, 255, 0.3)';
         uploadArea.style.backgroundColor = 'transparent';
     });
     
     uploadArea.addEventListener('drop', (e) => {
         e.preventDefault();
         uploadArea.style.borderColor = 'rgba(255, 255, 255, 0.3)';
         uploadArea.style.backgroundColor = 'transparent';
         
         if (e.dataTransfer.files.length) {
             uploadInput.files = e.dataTransfer.files;
             displayPreview(e.dataTransfer.files[0]);
         }
     });
     
     uploadInput.addEventListener('change', () => {
         if (uploadInput.files.length) {
             displayPreview(uploadInput.files[0]);
         }
     });
     
     tryOnButton.addEventListener('click', function() {
         if (!uploadInput.files.length) {
             showNotification('Please upload an image first!', 'error');
             return;
         }
        } ) 
        etTimeout(() => {
            loadingSpinner.style.display = 'none';
            tryOnButton.disabled = false;
            
            const resultContainer = document.createElement('div');
            resultContainer.className = 'try-on-comparison';
            
            const originalImg = document.createElement('img');
            originalImg.src = URL.createObjectURL(uploadInput.files[0]);
            originalImg.alt = 'Original Image';
            
            const resultImg = document.createElement('img');
        
            resultImg.src = 'images/dom-hill-nimElTcTNyY-unsplash.jpg';
            resultImg.alt = 'Virtual Try-On Result';
            
            resultContainer.appendChild(originalImg);
            resultContainer.appendChild(resultImg);
            tryOnResult.appendChild(resultContainer);
            
            showNotification('Virtual try-on completed!', 'success');
        }, 3000);