"use strict";

var types = require('../types');

class WordManager {

    getWordsInCategoryById(categoryID, callback) {
        let query = types.Word.find({category: categoryID}).sort({word: 1});
        query.exec((err, words) => {
            if (err) {
                console.log(err);
            }
            callback(words);
        });
    }

    /* Will callback 'true' if the word is added successfully, or 'false' if not
     * word: The 'foreign' version of a word
     * username: The username for the User who created the word
     * language: Which language it is in
     * translations: An array of Strings representing the 'English' versions of the word
     * categoryID: The category to insert the word into
     */
    createWord(word, username, language, translations, categoryID, callback) {
        this.checkIfWordExistsInCategory(word, categoryID, (exists) => {
            if (!exists) {
                let newWord = new types.Word({word: word, username: username, language: language, translations: translations, category: categoryID});
                newWord.save((err) => {
                    if (err) {
                        console.log(err);
                        callback(false);
                    } else {
                        callback(true);
                    }
                })
            } else {
                callback(false);
            }
        });
    };

    checkIfWordExistsInCategory(word, category, callback) {
        var query = types.Word.find({word: word, category: category});
        query.exec((err, words) => {
            if (err) {
                console.log(err);
            }
            callback(words.length != 0);
        });
    };

    getAllWordsForUserInLanguage(username, language, cb) {
        var query = types.Word.find({username: username, language: language}).sort({'word': 1});
        query.exec((err, words) => {
            if (err) {
                console.log(err);
            }
            cb(words);
        });
    }
}

module.exports = WordManager;
