// Получаем все элементы с классом .size
var sizes = document.querySelectorAll('.size');

// Перебираем каждый элемент
sizes.forEach(function(size) {
    // Добавляем обработчик события клика
    size.addEventListener('click', function() {
        // Убираем класс active у всех размеров
        sizes.forEach(function(size) {
            size.classList.remove('active');
        });
        // Добавляем класс active только к текущему выбранному размеру
        size.classList.add('active');
    });
});
