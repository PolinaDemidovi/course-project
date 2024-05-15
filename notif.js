document.querySelector('.checkout-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    // Ваш код для отправки данных на сервер

    // Показываем уведомление об успешном заказе
    document.getElementById('successNotification').style.display = 'block';

    // Скрытие уведомления через 5 секунд
    setTimeout(function(){
        document.getElementById('successNotification').style.display = 'none';
    }, 5000);
});