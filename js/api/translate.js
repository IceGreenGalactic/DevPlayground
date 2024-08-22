//when api works - this can translate the text to norwegian, looking for a free api with less limitations 

// export async function translateText(text, targetLanguage = 'es') {
//     try {
//         const response = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLanguage}`);
//         if (!response.ok) {
//             throw new Error('Error translating text');
//         }
//         const data = await response.json();
//         return data.responseData.translatedText;
//     } catch (error) {
//         console.error('Error translating text:', error);
//         throw error;
//     }
// }

