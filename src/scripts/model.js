import callApi from './services/callApi';

export default class Model {
  constructor() {
    //fields with films
    this.queryFilmList = [], //last 10 film showed after search querry
      this.viewLaterFilms = [],
      this.viewedFilms = [],
      this.favoriteFilms = [];
    //last viewed film in detailed form
    this.lastFilm = {};
    //last query for search
    this.lastQuery = '';
    //total results in last query
    this.lastQueryTotal = '';
    //object for writtting/reading to storage
    this.filmoteka = {
      queryFilmList: this.queryFilmList,
      viewLaterFilms: this.viewLaterFilms,
      viewedFilms: this.viewedFilms,
      favoriteFilms: this.favoriteFilms,
      lastQuery: this.lastQuery,
      lastFilm: this.lastFilm
    };
  };
  //check if local storage exists
  localStorageAvailable(type = 'localStorage') {
    try {
      let storage = window[type];
      let x = '__storage_test__';
      storage.setItem(x, x);
      storage.removeItem(x);
      return true;
    } catch (e) {
      return false;
    }
  }
  //write to local storage
  localStorageWrite(filmoteka) {
    if (this.localStorageAvailable) {
      try {
        localStorage.setItem('filmoteka', JSON.stringify(this.filmoteka));
      } catch (error) {
        console.log('Error during writing from local storage');
        return null;
      }

    }
  }
  //read from local storage
  localStorageRead() {
    if (this.localStorageAvailable) {
      try {
        let filmotekaFromLocalStorage = JSON.parse(localStorage.getItem("filmoteka"));
        this.filmoteka = filmotekaFromLocalStorage;
        return arrayOfFilms;
      } catch (error) {
        console.log('Local Storage is empty');
        return null;
      }
    }
  }
  //add film to list
  addFilmToList(listName, film) {
    this[listName].push(film);
    console.log('listName=', this[listName]);
    return this[listName].reverse();
  }
  //delete film from list
  deleteFilmFromList(listName, id) {
    return list.filter(film => id !== film.id);
  }
  //get queryFilmList from server
  handleSearchQuery(query) {
    // console.log('query=', query);
    this.lastQuery = query;
    this.filmoteka.lastQuery = this.lastQuery;
    // console.log('this.lastQuery =', this.lastQuery);
    const searchResults = callApi(query, 100);
    searchResults.then(data => {
      // console.log('data=', data);
      // console.log('data.totalResults=', data.totalResults);
      // console.log('data.Search=', data.Search);
      if (data.Response) {
        this.queryFilmList = data.Search;
        this.lastQueryTotal = data.totalResults;
        // console.log('data.Search=', data.Search);
        // console.log('this.queryFilmList =', this.queryFilmList);
        // console.log('this.lastQuery =', this.lastQuery);
        // console.log('this.filmoteka =', this.filmoteka);
        this.filmoteka.queryFilmList = this.queryFilmList;
        this.localStorageWrite(this.filmoteka);
      }
    });
    return searchResults;
  }
}