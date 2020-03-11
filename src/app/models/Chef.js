const db = require('../../config/db');
const { date } = require('../../lib/utils');

module.exports = {
    all(callback) {
        query = `
            SELECT chefs.*, count(receipts) AS total_receipts
            FROM chefs 
            LEFT JOIN receipts ON (receipts.chef_id = chefs.id)
            GROUP BY chefs.id
        `

        db.query(query, function(err, results) {
            if (err) throw `Database: ${err}`;

            callback(results.rows);
        })
    },

    create(data, callback) {
        query = `
            INSERT INTO chefs (
                name,
                avatar_url,
                created_at
            ) VALUES ($1, $2, $3)
            RETURNING id
        `

        let { name, avatar_url } = data;

        const values = [
            name,
            avatar_url,
            date(Date.now()).iso
        ];

        db.query(query, values, function(err, results) {
            if (err) throw `Database: ${err}`;

            callback(results.rows[0]);
        });
    },

    find(id, callback) {
        query = `
            SELECT * FROM chefs WHERE id = $1
        `

        db.query(query, [id], function(err, results) {
            if (err) throw `Database: ${err}`;

            callback(results.rows[0]);
        });
    },

    chefReceipts(id, callback) {
        query = `SELECT * FROM receipts WHERE receipts.chef_id = $1`

        db.query(query, [id], function(err, results) {
            if (err) `Database: ${err}`;
                
            callback(results.rows);
        });
    },

    update(data, callback) {
        query = `
            UPDATE chefs SET 
                name=($1),
                avatar_url=($2)
            WHERE id = $3
        `
    
        const values = [
            data.name,
            data.avatar_url,
            data.id
        ]

        db.query(query, values, function(err, results) {
            if (err) throw `Database: ${err}`

            callback();
        })
    },

    remove(id, callback) {
        db.query(`DELETE FROM chefs WHERE id = $1`, [id], function(err, results) {
            if (err) throw `Database: ${err}`

            callback();
        })
    }
}