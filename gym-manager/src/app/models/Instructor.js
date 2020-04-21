const db = require('../../config/db')

module.exports = {
    all(callback) {
        db.query(`SELECT * FROM instructors`, function (err, results) {
            if (err) throw `Database error! ${err}`

            callback(results.rows)
        })
    },
    create(data, callback) {
        const query = `
            INSERT INTO instructors (
                avatar_url,
                name,
                birth,
                gender,
                degree,
                services,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `

        db.query(query, data, function (err, results) {
            if (err) throw `Database error! ${err}`

            callback(results.rows[0])
        })
    },
    find(id, callback) {
        db.query(`SELECT * FROM instructors WHERE id = ${id}`, function (err, results) {
            if (err) throw `Database error! ${err}`

            callback(results.rows[0])
        })
    },
    update(data, callback) {
        const query = `
            UPDATE instructors SET
                avatar_url=($1),
                name=($2),
                birth=($3),
                gender=($4),
                degree=($5),
                services=($6)
            WHERE id = $7
        `

        db.query(query, data, function (err, results) {
            if (err) throw `Database error! ${err}`

            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM instructors WHERE id = ${id}`, function (err, results) {
            if (err) throw `Database error! ${err}`

            callback()
        })
    }
}