import { dictionary } from './dictionary.js'; 

// Obtener el idioma
function getSelectedLanguage() {
  const languageOne = document.getElementById("language-one").value;
  const languageTwo = document.getElementById("language-two").value;
  return { languageOne, languageTwo };
}

// Obtener traducción
function getTranslation(word, languageOne, languageTwo) {
    for (let category in dictionary.categories) {
      const words = dictionary.categories[category];
      
      // Buscar la palabra y compararla
      const wordObj = words.find(item => {
        // Comparar la palabra en inglés o español
        if (languageOne === 'en' && item.english.toLowerCase() === word.toLowerCase()) {
          return item;
        } else if (languageOne === 'es' && item.spanish.toLowerCase() === word.toLowerCase()) {
          return item;
        }
      });
      
      if (wordObj) {
            if (languageTwo === 'en') {
                return wordObj.english;
            }
            else {
            return wordObj.spanish;
            }
        }
    }
}
  
// Función para traducir
function translate() {
  const inputText = document.getElementById("text-input").value.trim();

  const { languageOne, languageTwo } = getSelectedLanguage();

  // Buscar la traducción
  const translation = getTranslation(inputText, languageOne, languageTwo);

  if (translation) {
    document.getElementById("text-output").value = translation;
  } else {
    document.getElementById("text-output").value = "La palabra no se encuentra";
  }
}

// Cambiar los selectores de idioma
document.getElementById("btn-change").addEventListener("click", () => {
  const languageOne = document.getElementById("language-one");
  const languageTwo = document.getElementById("language-two");

  // Intercambiar los valores del selector
  const temp = languageOne.value;
  languageOne.value = languageTwo.value;
  languageTwo.value = temp;
});

document.getElementById("btn-traslate").addEventListener("click", translate);

