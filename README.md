# GAS Freedom Finance Tradernet Portfolio
Google Apps Script для получения портфеля активов со счета Freedom Finance (Tradernet) прямо в Google Таблицу.

## Установка и использование
### Быстрый старт
* Скопировать себе гуглотаблицу [по ссылке](https://docs.google.com/spreadsheets/d/1L7r-2aWGWZBuUjcmlxpzPjvKYzyFeK-EyKs3T2bLM3o/copy)
* Вписать в ячейки B1 и B2 ключи API Tradernet [отсюда](https://tradernet.ru/tradernet-api/auth-api)
* Нажать _Обновить_ и разрешить выполнение скрипта

### Подробно
* Создать или открыть документ Google Spreadsheets http://drive.google.com
* В меню "Tools" выбрать "Script Editor"
* Дать проекту имя, например `TradernetPortfolio`
* Скопировать код из [Code.gs](https://raw.githubusercontent.com/ivazin/gas-freedom-finance-tradernet/master/Code.gs)
* Получить [ключи API Tradernet](https://tradernet.ru/tradernet-api/auth-api)
* Вписать в ячейки B1 и B2 ключи API Tradernet [отсюда](https://tradernet.ru/tradernet-api/auth-api)
* Нажать _Обновить_ и разрешить выполнение скрипта

На этом всё. Теперь при работе с этим документом на всех листах будут доступна функция displayPortfolio

## Функция
`=displayPortfolio(pubKey;secKey;refresh)`
требует на выход ключи API и необязательное случайное значение для рефреша данных.

## Особенности
Скрипт резервирует ячейку Z1 (самая правая ячейка первой строки), в которую вставляет текущее время на каждом нажатии Обновить. Данная ячейка используется в функции displayPortfolio в 3-ем необязательном аргументе - она позволяет автоматически перезапросить данные портфеля из API.

## Пример
![Get portfolio in action](https://github.com/ivazin/gas-freedom-finance-tradernet/master/portfolio.png)
