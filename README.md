## Програмне забезпечення. (І рівень)
Розробити програму для роботи із базою даних, що містить дані про Програмне забезпечення, виробників ПЗ тощо.
Програма повинна дозволяти працювати з наступною інформацією:
*	Про виробників ПЗ
*	Про програмне забезпечення
*	Про умови ліцензіювання та поширення ПЗ
## Програма повинна дозволяти:
*	Добавляти, редагувати та видаляти інформацію про виробників.
*	Добавляти, редагувати та видаляти інформацію про умови ліцензіювання та поширення.
*	Добавляти, редагувати та видаляти інформацію про програмне забезпечення.
*	При роботі із даними про ПЗ інформація про виробників та умови ліцензіювання повинна відображатися у вигляді назви. При редагуванні, користувач повинен бачити випадаючі списки із назвами виробників та ліцензії доступних для вибору.
*	Користувач не може видалити інформацію про виробника чи умову ліцензіювання, якщо вона використовується. В даному випадку повинно вивестися повідомлення на екран.
*	Користувач повинен мати змогу ввести інформацію про адрес та порт сервера при старті програми або у файлі (щось одне треба реалізувати).
*	Виводити список виробників, умов ліцензіювання та програм.
*	Виводити список програм для вказаного виробника. Користувач повинен мати можливість зберегти у файлі дану інформацію у вигляді звіту. Звіт повинен містити точну дату моменту, коли він був сформований.
*	Виводити список програм для вказаної ліцензії. Користувач повинен мати можливість зберегти у файлі дану інформацію у вигляді звіту. Звіт повинен містити точну дату моменту, коли він був сформований.
## Виробник:
*	Назва виробника. Рядок, максимальна довжина 200 символів.
*	Адреса: вулиця, місто, країна, поштовий код. Всі поля рядкового типу, максимальна довжина кожного 50 символів.
*	Електронна адреса виробника. Рядок, максимальна довжина 200 символів.
*	Адреса офіційного веб-сайту виробника. Рядок, максимальна довжина 200 символів.
*	Номер телефону виробника. Рядок, максимальна довжина 20 символів.
*	Номер факсу виробника. Рядок, максимальна довжина 20 символів.
*	Інше.
## Умови ліцензіювання та поширення:
*	Назва ліцензії. Рядок, максимальна довжина 250 символів.
*	Тип ліцензії: платна, безкоштовна та умовно безкоштовна.
*	Мінімальна кількість користувачів. Ціле число.
*	Максимальна кількість користувачів. Ціле число.
*	Період дії ліцензії в днях. Ціле число.
*	Вартість однієї ліцензії.
*	Вартість 10 ліцензій.
*	Вартість 100 і більше ліцензій.
*	Інше.
## Програмне забезпечення:
*	Назва програми. Рядок, максимальна довжина 250 символів.
*	Версія програми.
*	Дата випуску версії.
*	Виробник програми.
*	Ліцензія програми.
*	Чи доступна версія під Windows. Булеве поле.
*	Чи доступна версія під Linux/Unix/BSD. Булеве поле.
*	Чи доступна версія під MacOS. Булеве поле.
*	Інше.
