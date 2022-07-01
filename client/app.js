import axios from 'axios';

export default function usersFunc() {

  return {

    login: [],
    first_name: '',
    last_name: '',
    username: '',
    password: '',
    infomessage: '',
    loggedmessage:'',
    movie_list: '',
    playlistElement: '',
    allMovies: '',
    // isLoggedIn: false,
    // state: 'LOGIN',

    loginFunc() {
      const { username } = this

      axios
      .post("http://localhost:5000/api/login",{
        username
      })
       .then(results => {
        console.log(results.data);
        this.loggedmessage = results.data.message
       })

    },
    signUpFunc() {

      const { first_name, last_name, username, password } = this
     
      axios
        .post("http://localhost:5000/api/signup", {
          first_name, last_name, username, password
        })
        .then(results => {
          console.log(results.data);
          this.infomessage = results.data.status
        })
        .catch(() => {
          console.log(this.message);
          
        })
    },

    moviePlaylist() {
     
      const { movie_list } = this

      axios.
        post("http://localhost:5000/api/playlist",{
          movie_list
        })
        .then(results =>{
          this.playlistElement = results.data.status
        })
        .catch(() => {
          console.log(this.message);
        })
      }
    ,
    getMovies(){

      axios
      .get(`https://api.themoviedb.org/3/search/movie?api_key=1bbc04a64cd06c90084f2e701e11b941&query=${this.allMovies}`,{

      })
      .then(results =>{
        console.log(results.data.results);
        this.playlistElement = results.data.results
      })
    }

  }

}