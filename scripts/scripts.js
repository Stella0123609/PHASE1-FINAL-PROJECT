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