
function publicarImagen() {
const imageInput = document.getElementById('imageInput');
const titleInput = document.getElementById('titleInput');
const priceInput = document.getElementById('priceInput');
const imagesContainer = document.getElementById('images');

if (imageInput.files.length === 0 || !titleInput.value || !priceInput.value) {
    alert('Por favor, completa todos los campos.');
    return;
}

const imageFile = imageInput.files[0];
const imageURL = URL.createObjectURL(imageFile);
const title = titleInput.value;
const price = parseFloat(priceInput.value).toFixed(2);

const imageCard = document.createElement('div');
imageCard.className = 'image-card';
imageCard.innerHTML = `
    <img src="${imageURL}" alt="${title}">
    <h3>${title}</h3>
    <p>Precio: $${price}</p>
`;

imagesContainer.appendChild(imageCard);

const imageData = { title, price, imageURL }; 
const existingImages = JSON.parse(localStorage.getItem('images')) || [];
existingImages.push(imageData);
localStorage.setItem('images', JSON.stringify(existingImages));
imageInput.value = '';
titleInput.value = '';
priceInput.value = '';
}

window.onload = function() {
const existingImages = JSON.parse(localStorage.getItem('images')) || [];
const imagesContainer = document.getElementById('images');

existingImages.forEach(imageData => {
    const { imageURL, title, price } = imageData;
    
    const imageCard = document.createElement('div');
    imageCard.className = 'image-card';
    imageCard.innerHTML = `
        <img src="${imageURL}" alt="${title}">
        <h3>${title}</h3>
        <p>Precio: $${price}</p>
    `;
    
    imagesContainer.appendChild(imageCard);
});
};

function eliminarImagen(index) {
    const existingImages = JSON.parse(localStorage.getItem('images')) || [];
    
    if (index >= 0 && index < existingImages.length) {
        existingImages.splice(index, 1);
        localStorage.setItem('images', JSON.stringify(existingImages));
        
        mostrarImagenes();
    }
}

function mostrarImagenes() {
    const existingImages = JSON.parse(localStorage.getItem('images')) || [];
    const imagesContainer = document.getElementById('images');
    imagesContainer.innerHTML = ''; 
    
    existingImages.forEach((imageData, index) => {
        const { imageURL, title, price } = imageData;
        
        const imageCard = document.createElement('div');
        imageCard.style.transition = "1s";
        imageCard.className = 'image-card';
        imageCard.innerHTML = `
            <img src="${imageURL}" alt="${title}">
            <h3>${title}</h3>
            <p>Precio: $${price}</p>
            <button type="button" class="btn btn-danger" onclick="eliminarImagen(${index})">Eliminar</button>
            
        `;
        
        imagesContainer.appendChild(imageCard);
    });
}

window.onload = function() {
    mostrarImagenes();
};