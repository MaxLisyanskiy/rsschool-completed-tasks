"use strict";

let numberOfFilms = +prompt('Сколько фильмов вы посмотрели', 'Укажите количество');

    let personalMovieDB = {
        count: numberOfFilms,
        movies: {},
        actors: {},
        genres: [],
        privat: false
    };

    for (let i = 0; i < 2; i++){
        var question = prompt('Один из последних просмотренных фильмов?', ''),
            answer = prompt('На сколько оцените его?', '');

        if(question != "" && answer != "" && question != null && answer != null && question.length < 50 ){
            personalMovieDB.movies[question] = answer;
        } else {
            i--;
        }
        
    }

    if(personalMovieDB.count < 10) {
        document.write("Мало");
    } else if (personalMovieDB.count == 10 || personalMovieDB.count < 30) {
        document.write("Классика");
    } else if (personalMovieDB.count > 30) {
        document.write("Киноман");
    } else {
        document.write("Ошибка");
    }


    console.log(personalMovieDB);


