// Fetch the menu data from the backend
fetch('http://localhost:5000/menu')
  .then(response => response.json())
  .then(data => {
    const menuContainer = document.getElementById('menu');
    data.forEach(item => {
      const itemElement = document.createElement('div');
      itemElement.classList.add('menu-item');
      itemElement.innerHTML = `
        <strong>${item.name}</strong><br>
        <p>${item.description}</p>
        <p>Price: €${item.price}</p>
      `;
      menuContainer.appendChild(itemElement);
    });
  })
  .catch(error => console.error('Error fetching menu data:', error));
