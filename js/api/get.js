const API_URL = 'https://opentdb.com/api.php';

export async function fetchQuestions(amount = 10, category = '', difficulty = '') {
    try {
        let url = `${API_URL}?amount=${amount}`;
        if (category) url += `&category=${category}`;
        if (difficulty) url += `&difficulty=${difficulty}`;

        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        
        const data = await response.json();
        

        
        return data.results;
    } catch (error) {
        console.error('Error fetching questions:', error);
        return [];
    }
}
