const db = require('../../config/db');
const { date } = require('../../lib/utils');

module.exports = {
    allReceipts(filter, callback) {
        let query = "",
            filteredQuery = ""

        console.log(`Filtro: ${filter}`);
        console.log(`Callback: ${callback}`);

        if (filter) {
            filteredQuery = `WHERE receipts.title ILIKE '%${filter}%'`
        }

        query = `
            SELECT receipts.* FROM receipts ${filteredQuery}
        `

        db.query(query, function(err, results) {
            if (err) throw `Database: ${err}`;

            callback(results.rows);
        })
    },

    create(data, callback) {
        query = `
            INSERT INTO receipts (
                chef_id,
                image,
                title,
                ingredients,
                preparation,
                information,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6, $7)
            RETURNING id
        `
        const { title, chef_id, image, ingredients, preparation, information } = data;

        const values = [
            chef_id,
            image,
            title,
            ingredients,
            preparation,
            information,
            date(Date.now()).iso
        ];

        db.query(query, values, function(err, results) {
            if (err) throw `Database: ${err}`;

            callback(results.rows[0]);
        });
    },

    find(id, callback) {
        db.query(`SELECT * FROM receipts WHERE id = $1`, [id], function(err, results) {
            if (err) throw `Database: ${err}`;

            callback(results.rows[0]);
        });
    },

    chefSelectOptions(callback) {
        db.query(`SELECT name, id FROM chefs`, function(err, results) {
            if (err) `Database: ${err}`;
            
            callback(results.rows);
        });
    },

    update(data, callback) {
        query = `
            UPDATE receipts SET 
                chef_id=($1),
                image=($2),
                title=($3),
                ingredients=($4),
                preparation=($5),
                information=($6)
            WHERE id = $7
        `
    
        const values = [
            data.chef_id,
            data.image,
            data.title,
            data.ingredients,
            data.preparation,
            data.information,
            data.id
        ]

        db.query(query, values, function(err, results) {
            if (err) throw `Database: ${err}`

            callback();
        })
    },

    remove(id, callback) {
        db.query(`DELETE FROM receipts WHERE id = $1`, [id], function(err, results) {
            if (err) throw `Database: ${err}`

            callback();
        })
    }
}