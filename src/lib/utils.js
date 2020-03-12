module.exports = {
    date(timestamp) {
        const date = new Date(timestamp);

        const year = date.getUTCFullYear();
        const month = `0${date.getUTCMonth() + 1}`.slice(-2);
        const day = `0${date.getUTCDate()}`.slice(-2);

        return {
            day,
            month,
            year,
            iso: `${year}-${month}-${day}`
        };
    },

    objectToString(obj) {
        let countQuotationMarks = 0;
        let text = "";
        let textVector = [];

        for (key of obj) {
            if (key != `{` && key != `}`) {
                if (key != `"` && key != `,`) {
                    text += key;
                };
                
                if (key == `"`) {
                    countQuotationMarks += 1;
                };

                if (countQuotationMarks == 2) {
                    textVector.push(text);
                    text = "";
                    countQuotationMarks = 0;
                };
            };
        };

        return textVector;
    }
}