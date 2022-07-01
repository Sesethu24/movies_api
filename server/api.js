const bcrypt = require('bcrypt')

module.exports = function (app, db) {

    app.post('/api/login', async function (req, res) {

        try {

            const {
                username,
                password
            } = req.body;

            const logUser = await db.oneOrNone(`select * from users where username= $1`, [username])
            if (logUser == null) {
                res.json({
                    message: 'please register'
                })
            } else {
                res.json({
                    message: 'successfully logged in'
                })
            }

        } catch (err) {
            console.log(err);
            res.json({
                status: 'error',
                error: err.message
            })
        }
    });

    app.post('/api/signup', async function (req, res) {

        try {

            const {
                first_name,
                last_name,
                username,
                password
            } = req.body;
            const regUser = await db.oneOrNone(`select * from users where username=$1`, [username]);

            if (regUser !== null) {
                throw Error('user already exists!')
            }
            const hashedPassword = await bcrypt.hash('password', 10)
            await db.oneOrNone(`insert into users(first_name, last_name, username, password) values($1,$2,$3,$4) on conflict do nothing`, [first_name, last_name, username, hashedPassword]);
         
            res.json({
                message: 'User successfully registered',
                password: hashedPassword

            });


        } catch (err) {
            console.log(err);
            res.json({
                status: 'error',
                error: err.message
            })
        }
    });

     app.post("/api/playlist", async (res, req) => {

        try {
          const { user_id, movie_list } = req.body;

          const movieSelection = await db.oneOrNone(`SELECT * FROM user_playlist WHERE user_id = &1 AND movie_list = $2`,[user_id, movie_list]);

           if (movieSelection == null) {
            throw Error(`Please select a movie`);
          }

          await db.none(
            `INSERT INTO user_playlist (user_id, movie_list) VALUES ($1,$2)`,[user_id, movie_list]
          );

          res.status(200).json({
            message: "movie selected",
            the_user: movieSelection,
          });
        } catch (error) {
          res.status(500).json({
            error: error.message,
          });
        }

      })


}