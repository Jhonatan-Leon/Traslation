import { dictionary } from './dictionary.js'; 

// Función para mostrar las palabras del diccionario
function ShowDictionary() {
    const showContainer = document.getElementById('show-dictionary'); // El contenedor donde se mostrarán las palabras
  
    // Mostrar todas las categorias
    for (let category in dictionary.categories) {

        // Sacamos el titulo de cada cateogria
        const categoryTitle = document.createElement('h2');
        categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        showContainer.appendChild(categoryTitle);
  
        const categoryList = document.createElement('ul');
      
        // Creamos las palabras de la categoría
        dictionary.categories[category].forEach(item => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
            <strong>English:</strong> ${item.english}<br>
            <strong>Español:</strong> ${item.spanish}<br>
            <strong>Example:</strong> ${item.example}
            `;
            categoryList.appendChild(listItem);
        });
  
        // Añadimos la lista de la categoría al contenedor
        showContainer.appendChild(categoryList);
    }
  }
  
document.addEventListener('DOMContentLoaded', ShowDictionary);
  
  // Función para ordenar alfabéticamente las palabras
function sortDictionary() {

    // Crear contenedor donde va ir las categorias ordenadas
    const categoryContent = document.createElement('section');
    categoryContent.id = 'Content_categories';
  
    // Recorrer todas las categorias del diccionario
    for (let category in dictionary.categories) {
      const words = dictionary.categories[category];
      
      const sortedWords = words.sort((a, b) => {
        // Ordenamos por la palabra en inglés
        return a.english.localeCompare(b.english); 
      });
  
        // Palabras organizadas 
        const wordList = document.createElement('ul');
        sortedWords.forEach(word => {
          const listItem = document.createElement('li');
          listItem.innerHTML = `<strong>${word.english}</strong> - ${word.spanish}`;
          wordList.appendChild(listItem);
        });
        
        // Suir la lista ordenada
        categoryContent.appendChild(wordList); 
    }
}
  
document.getElementById('order_word').addEventListener('click', sortDictionary());

// filtración por la categoría seleccionada
function showWords(category) {

  const showDictionaryContainer = document.getElementById('show-dictionary');
  // Vaciar el contenedor para poder mostrar las nuevas palabras
  showDictionaryContainer.innerHTML = ''; 

  if (!category) {
    for (let cat in dictionary.categories) {
         // Mostrar todas las categorías (Por default va estar aquí)
      displayCategory(cat, showDictionaryContainer); 
    }
  } else {
    // Mostrar solo las palabras de la categoría seleccionada
    displayCategory(category, showDictionaryContainer);
  }
}

// mostrar las palabras la categoria selecionada
function displayCategory(category, showDictionaryContainer) {
    // Obtener las palabras de la categoría
    const words = dictionary.categories[category];
    
    // Crear el elemento que las va a contener
    const categoryContainer = document.createElement('div');

    // Agregamos el titulo de la categoria selecionada
    const categoryTitle = document.createElement('h2');
    categoryTitle.textContent = category.charAt(0).toUpperCase() + category.slice(1);  // Capitalizar el nombre de la categoría
    categoryContainer.appendChild(categoryTitle);

    // Crear una lista de palabras
    const wordList = document.createElement('ul');
        words.forEach(word => {
            const listItem = document.createElement('li');
            // Mostrar las palabras de la categoria
            listItem.innerHTML = `
            <strong>${word.english}</strong> - ${word.spanish}<br>
            <em>Example:</em> ${word.example}  <!-- Mostrar el ejemplo -->`;

            wordList.appendChild(listItem);
    });
    // Agregamos al contenedor  padre
    categoryContainer.appendChild(wordList);  
    // Mostramos el contenedor
    showDictionaryContainer.appendChild(categoryContainer);  
}

// Categoria selecionada
function filterByCategory() {
  const categorySelect = document.getElementById('category-select');
  const selectedCategory = categorySelect.value;
   // Mostrar las palabras por la categoria seleccionada
  showWords(selectedCategory);
}

document.getElementById('category-select').addEventListener('change', filterByCategory);
