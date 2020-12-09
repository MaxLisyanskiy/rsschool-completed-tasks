"use strict";

let numberOfFilms = +prompt('Сколько фильмов вы посмотрели', 'Укажите количество'),
    movies1 = prompt('Один из последних просмотренных фильмов?', ''),
    answer1 = prompt('На сколько оцените его?', ''),
    movies2 = prompt('Один из последних просмотренных фильмов?', ''),
    answer2 = prompt('На сколько оцените его?', ''),
    personalMovieDB = {
        count: numberOfFilms,
        movies: {},
        actors: {},
        genres: [],
        privat: false
    };

    personalMovieDB.movies[movies1] = answer1;
    personalMovieDB.movies[movies2] = answer2;

    console.log(personalMovieDB);


