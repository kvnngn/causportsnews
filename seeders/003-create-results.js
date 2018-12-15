"use strict";
const ApiTest = require("../libs/api-test");
const moment = require("moment");
const fs = require("fs");

const results = [
    {
        team1_name: "CAU FC",
        team2_name: "Libhero",
        score_1: 1,
        score_2: 2
    },
    {
        team1_name: "CAU FC",
        team2_name: "Seoul FC",
        score_1: 2,
        score_2: 2
    },
    {
        team1_name: "CAU FC",
        team2_name: "Gangnam FC",
        score_1: 3,
        score_2: 2
    },
    {
        team1_name: "Japan",
        team2_name: "South Korea",
        score_1: 3,
        score_2: 4
    }
];

module.exports = {
    up: function () {
        let user_id = null;
        let api = new ApiTest();
        let img = null;

        return Promise.resolve()
            .then(authenticate)
            .then(loadImg)
            .then(createArticles);

        function authenticate() {
            return api.post('/user/auth/login', {
                email: 'victor.hugo@test.fr',
                password: 'aaa'
            })
                .then((res) => {
                    api.setToken(res.token);
                    user_id = res.user.id;
                });
        }

        function loadImg() {
            return new Promise((resolve, reject) => {
                fs.readFile('./seeders/img1.jpg', (err, data) => {
                    if (err) {
                        return reject(err);
                    }
                    img = data.toString('base64');
                    resolve(img)
                })
            });
        }

        function createArticles() {
            var promises = [];
            results.map((result) => {
                promises.push(api.post('/result/create', {
                    team1_name: result.team1_name,
                    team2_name: result.team2_name,
                    score_1: result.score_1,
                    score_2: result.score_2,
                    logo_1: img,
                    logo_2: img,
                }))
            });
            return Promise.all(promises);

        }
    }
};

