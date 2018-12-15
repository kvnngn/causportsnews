"use strict";
const ApiTest = require("../libs/api-test");
const moment = require("moment");
const fs = require("fs");

const results = [
    {
        team1_name: "CAU FC",
        team2_name: "Libhero",
        score_1: 1,
        score_2: 2,
        logo_1: "./seeders/cau_logo.png",
        logo_2: "./seeders/cau_logo.png"
    },
    {
        team1_name: "CAU FC",
        team2_name: "Seoul FC",
        score_1: 2,
        score_2: 2,
        logo_1: "./seeders/cau_logo.png",
        logo_2: "./seeders/cau_logo.png"
    },
    {
        team1_name: "CAU FC",
        team2_name: "Gangnam FC",
        score_1: 3,
        score_2: 2,
        logo_1: "./seeders/cau_logo.png",
        logo_2: "./seeders/cau_logo.png"
    },
    {
        team1_name: "Japan",
        team2_name: "South Korea",
        score_1: 3,
        score_2: 4,
        logo_1: "./seeders/japan_logo.png",
        logo_2: "./seeders/south_korea_logo.png"
    }
];

module.exports = {
    up: function () {
        let user_id = null;
        let api = new ApiTest();

        return Promise.resolve()
            .then(authenticate)
            .then(createResults);

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

        function loadImg(img) {
            var bitmap = fs.readFileSync(img);
            return new Buffer(bitmap).toString('base64');
        }

        function createResults() {
            var promises = [];
            results.map((result) => {
                promises.push(api.post('/result/create', {
                    team1_name: result.team1_name,
                    team2_name: result.team2_name,
                    score_1: result.score_1,
                    score_2: result.score_2,
                    logo_1: loadImg(result.logo_1),
                    logo_2: loadImg(result.logo_2),
                }))
            });
            return Promise.all(promises);
        }
    }
};

