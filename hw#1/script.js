function counter() {
    let counter = 0;
    return () => {
        return ++counter;
    };
}
const mainCounter = counter();
const aboutCounter = counter();
const http = require('http');
const server = http.createServer((req, res) => {
    console.log('Запрос получен');
    if (req.url === '/') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(`<h1>Добро пожаловать на мой сайт!</h1>
                    <p>Количество посещений: ${mainCounter()} </p>`);
    } else if (req.url === '/about') {
        res.writeHead(200, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end(`<h1>Обо мне </h1>
        <p>Количество посещений: ${aboutCounter()} </p>`);
    } else {
        res.writeHead(404, { 'Content-Type': 'text/html; charset=UTF-8' });
        res.end('<h1>Страница не найдена!</h1>');
    };

});
const port = 3000;
server.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});