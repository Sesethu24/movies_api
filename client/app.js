import axios from 'axios';
const URL_BASE = import.meta.env.VITE_SERVER_URL;

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
    
    init() {
      setInterval(() => {
        this.infomessage = ''
        this.loggedmessage = ''
    }, 5000)
    },


    loginFunc() {
      const { username } = this

      axios
      .post(`${URL_BASE}/api/login`,{
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
        .post(`${URL_BASE}/api/signup`, {
          first_name, last_name, username, password
        })
        .then(results => {
          console.log(results.data);
          this.infomessage = results.data.error
        })
        .catch(() => {
          console.log(this.message);
          
        })
    },

    moviePlaylist() {
     
      const { movie_list } = this

      axios.
        post(`${URL_BASE}/api/playlist`,{
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