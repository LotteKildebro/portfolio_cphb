



// referer til MySQL forbindelsen
const mysql = require('./config/mysql.js');



module.exports = (app) => {

    // henter alle
    app.get('/api/poster', (req, res) => {
        let db = mysql.connect();
        db.execute("SELECT * FROM poster", [], (err, rows) => {
            if (err) {
                console.og(err);
                res.sendStatus(500);
            } else {
                res.json(rows);
            }
        });
        db.end();

    });





    // henter en
    app.get('/api/poster/:id', (req, res) => {

        if (isNaN(req.params.id)) {
            res.sendStatus(400);
        } else {
            let db = mysql.connect();

            db.execute("SELECT * FROM poster WHERE post_id = ?", [req.params.id], (err, rows) => {
                if (err) {
                    console.log(err);
                    res.sendStatus(500);
                } else {
                    res.json(rows);
                }
            });
            db.end();
        }
    });

    // opretter en
    app.post('/api/poster', (req, res) => {

        // find titlen på posten, sæt en tom-streng værdi hvis titlen mangler
        let titel = req.body.title;
        if (titel == undefined) {
            titel = '';
        }
        // find postens indhold, sæt en tom-streng værdi hvis indholdet mangler
        let indhold = req.body.indhold;
        if (indhold == undefined) {
            indhold = '';
        }

        let afsluttet = (!req.body.afsluttet ? 0 : 1);

        // hvis enten titel eller indhold er en tom streng på nuværende tidspunkt
        // sendes status kode 400 tilbage til klienten, ellers udføres SQL kaldet
        if (titel == '' || indhold == '') {
            res.sendStatus(400);
        } else {
            // her klares database kaldet 

            let db = mysql.connect();
            db.execute("INSERT INTO poster SET title = ?, content = ?, afslut = ?",
                [titel, indhold, afsluttet], (err, rows) => {
                    if (err) {
                        console.log(err);
                        res.sendStatus(500);
                    } else {
                        res.json(rows);
                    }
                });
            db.end();
        }
    });



    // redigerer en
    app.put('/api/poster/:id', (req, res) => {

        if (isNaN(req.params.id)) {
            res.sendStatus(400);
        } else {


            // find titlen på posten, sæt en tom-streng værdi hvis titlen mangler
            let titel = req.body.title;
            if (titel == undefined) {
                titel = '';
            }
            // find postens indhold, sæt en tom-streng værdi hvis indholdet mangler
            let indhold = req.body.content;
            if (indhold == undefined) {
                indhold = '';
            }

            let afsluttet = (!req.body.afslut ? 0 : 1);

            // hvis enten titel eller indhold er en tom streng på nuværende tidspunkt
            // sendes status kode 400 tilbage til klienten, ellers udføres SQL kaldet
            if (titel == '' || indhold == '') {
                res.sendStatus(400);
            } else {
                // her klares database kaldet 

                let db = mysql.connect();
                db.execute("UPDATE poster SET title = ? , content = ?, afslut = ? WHERE post_id = ?",
                    [titel, indhold, afsluttet, req.params.id], (err, rows) => {
                        if (err) {
                            console.log(err);
                            res.sendStatus(500);
                        } else {
                            res.json(rows);
                        }
                    });
                db.end();
            }
        }
    });

    // sletter en
    app.delete('/api/poster/:id', (req, res) => {
        if (isNaN(req.params.id)) {
            res.sendStatus(400);
        } else {
            let db = mysql.connect();

            db.execute("DELETE FROM poster WHERE post_id = ?", [req.params.id], (err, rows) => {
                if (err) {
                    console.og(err);
                    res.sendStatus(500);
                } else {
                    res.json(rows);
                }
            });
            db.end();
        }
    });

};

