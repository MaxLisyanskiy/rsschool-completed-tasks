"use strict";


//Global Object
let personalMovieDB = {
    count: 0,
    movies: {},
    actors: {},
    genres: [],
    privat: false,
    start() {
        this.count = prompt('Сколько фильмов вы посмотрели', 'Укажите количество');
    
        while (this.count == '' || this.count == null || isNaN(this.count)) {
            this.count = prompt('Сколько фильмов вы посмотрели', 'Укажите количество');
        }

    },
    detectiveFilms: function (){
        for (let i = 0; i < 2; i++){
            let question = prompt('Один из последних просмотренных фильмов?', '').toLowerCase(),
                answer = prompt('На сколько оцените его?', '');
    
            if(question != "" && answer != "" && question != null && answer != null && question.length < 50 ){
                this.movies[question] = answer;
            } else {
                i--;
            }
            
        }
    },
    personalLevel() {
        if(this.count < 10) {
            document.write("Мало");
        } else if (this.count == 10 || this.count < 30) {
            document.write("Классика");
        } else if (this.count > 30) {
            document.write("Киноман");
        } else {
            document.write("Ошибка");
        }
    },
    writeYourGenres(){
        // for(let i = 1; i < 4; i++){
        //     this.genres[i - 1] = prompt(`Ваш любимый жанр под номером ${i}`, '');

        //     while (this.genres[i - 1] == '' || this.genres[i - 1] == null) {
        //         this.genres[i - 1] = prompt(`Ваш любимый жанр под номером ${i}`, '');
        //     }
        // }


        //2
        let genresQ = prompt('Введите ваши любимые жанры через запятую', '').toLowerCase();

        while (genresQ == '' || genresQ == null) {
            genresQ = prompt('Введите ваши любимые жанры через запятую', '').toLowerCase();
        }
        
        this.genres = genresQ.split(', ');

        this.genres.forEach(function(item, i){
            console.log(`Любимый жанр под №${i + 1} - это ${item}`);
        });


    },
    showMyBD: function(){
        if (this.privat == false){
            console.log(this);
        }
    },
    toogleVisibleMyBD(){
        if(!this.privat){
            this.privat = true;
        } else {
            this.privat = false;
        }
    }
};

personalMovieDB.start();
personalMovieDB.detectiveFilms();
personalMovieDB.personalLevel();
personalMovieDB.writeYourGenres();
personalMovieDB.showMyBD();
personalMovieDB.toogleVisibleMyBD();
