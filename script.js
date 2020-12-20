"use strict";

let numberOfFilms;


function start() {
    numberOfFilms = +prompt('Сколько фильмов вы посмотрели', 'Укажите количество');

    while (numberOfFilms == '' || numberOfFilms == null || isNaN(numberOfFilms)) {
        numberOfFilms = +prompt('Сколько фильмов вы посмотрели', 'Укажите количество');
    }
}

// start();

//Global Object
let personalMovieDB = {
    count: numberOfFilms,
    movies: {},
    actors: {},
    genres: [],
    privat: false
};

function detectiveFilms(){
    for (let i = 0; i < 2; i++){
        var question = prompt('Один из последних просмотренных фильмов?', ''),
            answer = prompt('На сколько оцените его?', '');

        if(question != "" && answer != "" && question != null && answer != null && question.length < 50 ){
            personalMovieDB.movies[question] = answer;
        } else {
            i--;
        }
        
    }
}
// detectiveFilms();

function personalLevel(){
    if(personalMovieDB.count < 10) {
        document.write("Мало");
    } else if (personalMovieDB.count == 10 || personalMovieDB.count < 30) {
        document.write("Классика");
    } else if (personalMovieDB.count > 30) {
        document.write("Киноман");
    } else {
        document.write("Ошибка");
    }
}
// personalLevel();
let writeYourGenres = () =>{
    for(let i = 1; i < 4; i++){
        personalMovieDB.genres[i - 1] = prompt(`Ваш любимый жанр под номером ${i}`, '');
    }
}
writeYourGenres();

let showMyBD = function(){
    if (personalMovieDB.privat == false){
        console.log(personalMovieDB);
    }
}
showMyBD();



