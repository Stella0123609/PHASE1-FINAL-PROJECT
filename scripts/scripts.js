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

    const menuItems = document.querySelectorAll('.menu-content a');
    menuItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            menuItems.forEach(i => i.classList.remove('active'));
            this.classList.add('active');
            
            const menuItemText = this.querySelector('span').innerText;
            showNotification(`Navigating to ${menuItemText}`, 'info');
        });
    });
    
    const categoryItems = document.querySelectorAll('.category-item');
    categoryItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
    

    generateRecommendations();


function displayPreview(file) {
    const uploadArea = document.getElementById('uploadArea');
    if (file.type.match('image.*')) {
        const reader = new FileReader();
        
        reader.onload = function(e) {
            uploadArea.innerHTML = `
                <img src="${e.target.result}" alt="Preview" class="upload-preview">
                <p>Click to change image</p>
            `;
        };
        
        reader.readAsDataURL(file);
    } else {
        showNotification('Please upload an image file!', 'error');
    }
}

function generateRecommendations(bodyShape = 'rectangle') {
    const recommendationGrid = document.getElementById('recommendationGrid');
    recommendationGrid.innerHTML = '';
    
    const recommendations = [
        {
            id: 1,
            name: 'Slim Fit Shirt',
            description: 'Perfect for rectangle body types',
            price: '$49.99',
            image: 'https://source.unsplash.com/random/300x300/?shirt'
        },
        {
            id: 2,
            name: 'Tailored Pants',
            description: 'Designed to complement your shape',
            price: '$59.99',
            image: 'https://source.unsplash.com/random/300x300/?pants'
        },
        {
            id: 3,
            name: 'Fitted Blazer',
            description: 'Enhances your silhouette',
            price: '$89.99',
            image: 'https://source.unsplash.com/random/300x300/?blazer'
        },
        {
            id: 4,
            name: 'Stylish Jeans',
            description: 'Comfortable and fashionable',
            price: '$39.99',
            image: 'https://source.unsplash.com/random/300x300/?jeans'
        },
        {
            id: 5,
            name: 'Casual T-Shirt',
            description: 'Great for everyday wear',
            price: '$24.99',
            image: 'https://source.unsplash.com/random/300x300/?tshirt'
        },
        {
            id: 6,
            name: 'Formal Dress',
            description: 'Elegant and sophisticated',
            price: '$79.99',
            image: 'https://source.unsplash.com/random/300x300/?dress'
        }
    ];
    
    recommendations.forEach(item => {
        const itemElement = document.createElement('div');
        itemElement.className = 'recommendation-item';
        itemElement.innerHTML = `
            <img src="${item.image}" alt="${item.name}">
            <div class="recommendation-info">
                <h3>${item.name}</h3>
                <p>${item.description}</p>
                <p class="recommendation-price">${item.price}</p>
            </div>
        `;
        
        itemElement.addEventListener('click', function() {
            showNotification(`Added ${item.name} to your cart!`, 'success');
        });
        
        recommendationGrid.appendChild(itemElement);
    });
}

function showNotification(message, type = 'info') {
    const notification = document.getElementById('notification');
    notification.textContent = message;
    notification.className = 'notification';
   
    switch(type) {
        case 'success':
            notification.style.background = '#00b894';
            break;
        case 'error':
            notification.style.background = '#d63031';
            break;
        case 'warning':
            notification.style.background = '#fdcb6e';
            break;
        default:
            notification.style.background = '#6c5ce7';
    }
    
    notification.classList.add('show');
    
    
    setTimeout(() => {
        notification.classList.remove('show');
    }, 3000);
}

function animateElements() {
   
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 200);
    });

    const header = document.querySelector('.main-header');
    setTimeout(() => {
        header.style.transform = 'scale(1.02)';
        setTimeout(() => {
            header.style.transform = 'scale(1)';
        }, 300);
    }, 1000);
}