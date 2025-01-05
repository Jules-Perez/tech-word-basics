const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(express.json());
app.use(cors());

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "tech_word_basics_db",
  port: "3306",
});

db.connect((err) => {
  if (err) {
    throw err;
  }
  console.log("MySql Connected");
});

app.get("/login", (req, res) => {
  let { email, password } = { ...req.query };

  db.query(
    "SELECT * FROM `users` WHERE email = ? AND pass = MD5(?)",
    [email, password],
    (err, result) => {
      if (err) throw err;
      if (result.length == 0) {
        res.send("User credentials might be incorrect or does not exist!");
        return;
      }
      let UserData = result[0];
      console.log("UserData", UserData);

      if (!UserData.is_verified) {
        if (UserData.user_type == "instructor") {
          db.query(
            "SELECT COUNT(user_id) as userCount FROM `users` WHERE is_verified = 1 AND user_type = 'instructor'",
            (err, result) => {
              if (err) throw err;
              if (result[0].userCount <= 0) {
                db.query(
                  "UPDATE users set is_verified = 1 WHERE id = ?",
                  [UserData.id],
                  (err, result) => {
                    console.log("UserData.id", UserData.id);
                    if (err) throw err;
                    res.send(UserData);
                  }
                );
              } else {
                res.send("User not verified!");
              }
            }
          );
        } else {
          res.send("User not verified!");
        }
      } else {
        res.send(UserData);
      }
    }
  );
});

app.get("/users", (req, res) => {
  db.query("SELECT * FROM `users`", (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.get("/users/:user_id", (req, res) => {
  let { user_id } = req.params;

  db.query(
    "SELECT * FROM `users` WHERE user_id = ?",
    [user_id],
    (err, result) => {
      if (err) throw err;
      res.send(result[0]);
    }
  );
});

app.get("/unverifiedUsers", (req, res) => {
  db.query("SELECT * FROM `users` WHERE is_verified = 0", (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

app.post("/user/add", (req, res) => {
  let { user_type, user_id, name, email, pass, section } = { ...req.body };

  let randomProfileIndex = Math.floor(Math.random() * 12);

  db.query(
    "INSERT INTO users (user_type,user_id,name,email,pass,section,user_img_index) VALUES (?,?,?,?,MD5(?),?,?)",
    [user_type, user_id, name, email, pass, section, randomProfileIndex],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.post("/user/edit/:id", (req, res) => {
  let { id } = req.params;
  let { name, email, pass, section, user_img_index } = {
    ...req.body,
  };

  if (pass != "") {
    db.query(
      "UPDATE users SET name = ?,section = ?,email =?,pass=MD5(?),user_img_index=? WHERE id =?",
      [name, section, email, pass, user_img_index, id],
      (err, result) => {
        if (err) throw err;
        res.send("User Successfully Updated!");
      }
    );
  } else {
    db.query(
      "UPDATE users SET name = ?,section = ?,email =?,user_img_index=? WHERE id =?",
      [name, section, email, user_img_index, id],
      (err, result) => {
        if (err) throw err;
        res.send("User Successfully Updated!");
      }
    );
  }
});

app.get("/user/transactions/:id", (req, res) => {
  let { id } = req.params;
  db.query(
    "SELECT byte_coins,byte_power FROM `users` WHERE id = ?",
    [id],
    (err, result) => {
      if (err) throw err;
      res.send(result[0]);
    }
  );
});

app.post("/user/verify/:id", (req, res) => {
  let { id } = req.params;
  console.log("id", id);
  db.query(
    "UPDATE users SET is_verified = 1 WHERE id = ?",
    [id],
    (err, result) => {
      if (err) throw err;
      res.send("successfully registered!");
    }
  );
});

app.post("/user/reward/:id", (req, res) => {
  let { id } = req.params;
  let { bytePowerReward, coinReward, category_id } = {
    ...req.body,
  };
  if (id <= 0) {
    res.send("error user");
    return;
  }
  db.query(
    `UPDATE users SET byte_coins = (SELECT byte_coins FROM users WHERE id = ?
    ) + ?, byte_power = (SELECT byte_power FROM users WHERE id = ?
    ) + ? WHERE id = ?`,
    [id, coinReward, id, bytePowerReward, id],
    (err, result) => {
      if (err) throw err;
      if (category_id) {
        db.query(
          `INSERT INTO user_reward_log (user_id,category_id) VALUES (?,?)`,
          [id, category_id],
          (err, result) => {
            if (err) throw err;
            res.send("successfully rewarded user!");
          }
        );
      } else {
        res.send("successfully rewarded user!");
      }
    }
  );
});

app.get("/user/hasRewarded/:id/:category_id", (req, res) => {
  let { id, category_id } = req.params;
  db.query(
    `SELECT * FROM user_reward_log WHERE user_id = ? AND category_id = ?`,
    [id, category_id],
    (err, result) => {
      if (err) throw err;
      res.send(result[0]);
    }
  );
});

app.post("/user/purchase/:id", (req, res) => {
  let { id } = req.params;
  let { coinSpent } = {
    ...req.body,
  };
  db.query(
    `UPDATE users SET byte_coins = (SELECT byte_coins FROM users WHERE id = ?
    ) - ? WHERE id = ?`,
    [id, coinSpent, id],
    (err, result) => {
      if (err) throw err;
      res.send("successfully registered!");
    }
  );
});

app.post("/answer", (req, res) => {
  let {
    user_id,
    level_id,
    category_id,
    is_correct,
    duration_seconds,
    new_score,
    is_skipped,
  } = {
    ...req.body,
  };

  console.log("req.body", req.body);
  db.query(
    "SELECT * FROM  answers_log WHERE user_id = ? AND category_id = ? AND level_id = ? LIMIT 1",
    [user_id, category_id, level_id],
    (err, result) => {
      if (err) throw err;
      if (result.length <= 0) {
        db.query(
          "INSERT INTO answers_log VALUES ('',?,?,?,?,?,?)",
          [
            user_id,
            level_id,
            category_id,
            is_correct,
            duration_seconds,
            is_skipped,
          ],
          (err, result) => {
            if (err) throw err;
            db.query(
              "UPDATE users SET byte_power = ? WHERE id = ?",
              [new_score, user_id],
              (err, result) => {
                if (err) throw err;
                res.send("answer logged!");
              }
            );
          }
        );
      } else {
        res.send("user already answered!");

        //SHOULD UPDATE THE LOGGED ANSWER?
        // db.query(
        //   "UPDATE answers_log SET is_correct = ?, duration_seconds = ? WHERE user_id = ? AND level_id = ? AND category_id = ?",
        //   [is_correct, duration_seconds, user_id, level_id, category_id],
        //   (err, result) => {
        //     if (err) throw err;
        //     db.query(
        //       "UPDATE users SET byte_power = ? WHERE id = ?",
        //       [new_score, user_id],
        //       (err, result) => {
        //         if (err) throw err;
        //         res.send("answer logged!");
        //       }
        //     );
        //   }
        // );
      }
    }
  );
});

app.get("/answer_log/:id", (req, res) => {
  let { id } = req.params;
  db.query(
    "SELECT * FROM answers_log WHERE user_id = ?",
    [id],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.get("/answer_log/category/:user_id/:category_id", (req, res) => {
  let { user_id, category_id } = req.params;
  db.query(
    "SELECT * FROM answers_log WHERE user_id = ? AND category_id = ?",
    [user_id, category_id],
    (err, result) => {
      if (err) throw err;
      res.send(result);
    }
  );
});

app.listen(3000, () => {
  console.log("listening");
});
