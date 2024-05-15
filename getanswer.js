// Получаем все элементы с классом "question-title"
const questionTitles = document.querySelectorAll('.question-title');

// Перебираем полученные элементы
questionTitles.forEach(title => {
    // Назначаем обработчик события клика
    title.addEventListener('click', () => {
        // Находим ближайший элемент с классом "question" (родительский элемент для вопроса и ответа)
        const question = title.closest('.question');
        
        // Находим элемент ответа внутри найденного родительского элемента
        const answer = question.querySelector('.answer');

        // Проверяем, отображен ли ответ
        if (answer.classList.contains('show')) {
            // Если ответ отображен, скрываем его
            answer.classList.remove('show');
        } else {
            // Если ответ скрыт, отображаем его и скрываем все остальные ответы
            const allAnswers = document.querySelectorAll('.answer');
            allAnswers.forEach(ans => ans.classList.remove('show'));
            answer.classList.add('show');
        }
    });
});
