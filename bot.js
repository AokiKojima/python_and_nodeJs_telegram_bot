
const telegram_bot = require("node-telegram-bot-api");

const token = "5547322422:AAEwArE33Q_E2ItMzeWwRZlbkX8H3yUIhIw";

const bot = new telegram_bot(token, {
    polling: true
});

// Массивы для хранения ключей и значений
let keysArray = [];
let valuesArray = [];

// Функция для отправки сообщения частями
function sendLongMessage(chatId, message) {
    const maxLength = 4000; // Максимальная длина сообщения Telegram
    const messageParts = [];
    for (let i = 0; i < message.length; i += maxLength) {
        messageParts.push(message.substring(i, i + maxLength));
    }
    messageParts.forEach(part => {
        bot.sendMessage(chatId, part); // Отправляем каждую часть сообщения
    });
}



bot.on('message', msg => {
    // Текст сообщения от пользователя
    const text = msg.text;

    // ID чата
    const chatId = msg.chat.id;

    // Проверяем, что текст определен 
    if (typeof text !== 'undefined') {

        const { spawn } = require('child_process');

        // Путь к файлу Python
        const pythonScriptPath = 'output.py';

        // Аргументы для передачи в Python скрипт
        const pythonScriptArgs = [text];

        // Запускаем Python скрипт
        const pythonProcess = spawn('python', [pythonScriptPath, ...pythonScriptArgs]);

        // Обработка события вывода данных из Python
        let pythonOutput = '';
            pythonProcess.stdout.on('data', (data) => {
            pythonOutput += data.toString(); // Сохраняем вывод Python скрипта
        });

        // Обработка события завершения выполнения Python скрипта
        pythonProcess.on('close', (code) => {
            console.log('Python скрипт завершился с кодом ${code}');
            // Проверка длины сообщения
            if (pythonOutput.length > 4000) {
                sendLongMessage(chatId, pythonOutput);
            } else {
                bot.sendMessage(chatId, pythonOutput);
            }
        });
      

        if (typeof text !== 'undefined') {
          const { spawn } = require('child_process');
        
          // Путь к вашему файлу Python
          const pythonScriptPath = 'links.py';
        
          // Аргументы для передачи в Python скрипт
          const pythonScriptArgs = [text];
        
          // Запускаем Python скрипт
          const pythonProcess2 = spawn('python', [pythonScriptPath, ...pythonScriptArgs]);
        
          
        
          // Обработка события вывода данных из Python
          pythonProcess2.stdout.on('data', (data) => {
              const lines = data.toString().split('\n'); // Разбиваем вывод на строки
              lines.forEach(line => {
                  const parts = line.split(':'); // Предполагаем, что разделитель между ключом и значением - символ ":"
                  if (parts.length === 2) { // Проверяем, что строка содержит и ключ, и значение
                      keysArray.push(parts[0].trim()); // Добавляем ключ в массив ключей
                      valuesArray.push(parts[1].trim()); // Добавляем значение в массив значений
                        
                  }
              });
          });
        } else {
          // Если текст не определен, отправляем сообщение об ошибке в чат
          bot.sendMessage(chatId, 'Текст не определен');
        }


      } else {
        // Если текст не определен, отправляем сообщение об ошибке в чат
        bot.sendMessage(chatId, 'Текст не определен');
    }

    // Вывод информации в консоль
    console.log(msg);
    console.log(keysArray);
    bot.sendMessage(chatId, keysArray);
    

});
