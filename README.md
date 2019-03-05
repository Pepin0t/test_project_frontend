# Как это работает?

### Ниже представлено описание запуска приложения в режиме development!

**Для полноценной работы Вам потребуется Telegram-бот, который будет отправлять сообщения о совершенных покупках. Для того, чтобы узнать, как его создать используйте Google.**

#### Порядок запуска:

1.  Клонируйте данный репозиторий в папку `some_dir/client`

2.  Клонируйте репозиторий [test_project_backend](https://github.com/Pepin0t/test_project_backend) в папку `some_dir/server`

3.  Установите все требуемые зависимости

4.  О том, как запустить приложение (клиент + сервер), Вы узнатете из описания к [test_project_backend](https://github.com/Pepin0t/test_project_backend)

#### Переменные окружения:

```sh
SERVER_URL_DEV=

Адрес сервера, где будут храниться изображения товаров и тому подобное...
Должен совпадать с адресом, указанным в файле webpack.config.js:

{
    ...
    proxy: {
        "/api": {
	        target: "http://localhost:5000",
            ...
            }
}
```

```sh
REACT_APP_TELEGRAM_GROUP_CHAT_ID=

Id Telegram-бота для чата группы. Позволит боту отправлять сообщения в группу в Telegram.
Пример: -212783961
```

```sh
REACT_APP_TELEGRAM_BOT_CHAT_ID=

Id Telegram-бота для личного чата. Позволит боту отправлять Вам личные сообщения.
Пример: 202113936
```

```sh
REACT_APP_TELEGRAM_TOKEN=

Токен Telegram-бота.
Пример: 325814221:DAFDr7wVt1PXdlF43rrUV8OWcetHX9YkexQ
```

```sh
REACT_APP_GOOGLE_MAPS_EMBED_CODE=

Адрес Google-карты для указания вашего местоположения в разделе "Контакты"
Пример: https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d55701.20511239879!2d-21.92248116791158!3d64.1334735449944!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x48d674b9eedcedc3%3A0xec912ca230d26071!2z0KDQtdC50LrRjNGP0LLQuNC6LCDQmNGB0LvQsNC90LTQuNGP!5e0!3m2!1sru!2sua!4v1541625875359
```

#### Курс валют:

Для того, чтобы иметь возможность выбирать валюту:

1.  Войдите как администратор. Инструкция [здесь](https://github.com/Pepin0t/test_project_backend).

2.  Нажмите на кнопку "Обновить курс валют", после чего текущий курс добавится в БД (или обновится).
