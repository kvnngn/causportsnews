"use strict";
const ApiTest = require("../libs/api-test");
const moment = require("moment");
const fs = require("fs");

const articles = [
    {
        title: "NBA news - Pacers muscle past 76ers for big road win",
        introduction: "Thaddeus Young had 26 points and 10 rebounds to carry the visiting Indiana Pacers past the Philadelphia 76ers 113-101 on Friday for their sixth straight win.",
        content: "Durant had a 3-pointer and a three-point play among his 14 points in what turned out to be a 35-11 burst that produced a 59-40 lead late in the half. The Warriors went on to lead by as many as 22 points in the third period before coasting home.\n" +
            "\n" +
            "Suns 116, Bucks 114\n" +
            "\n" +
            "Jamal Crawford connected on a free-throw line jumper with 0.8 seconds left to give Phoenix a victory over Milwaukee for their first road win of the season in nine attempts.\n" +
            "\n" +
            "Crawford's clutch basket capped a game-ending 8-0 run for the Suns, who snapped a three-game overall losing streak. Devin Booker registered 29 points and seven assists as one of seven Phoenix players in double digits.",
        type: 'Basket-ball',
    },
    {
        title: "NFL star somehow lands on his feet after mid-air flip",
        introduction: "You don't have to be an NFL fan to appreciate this stunning feat of athleticism.",
        content: "Our hero? Seattle Seahawks running back Chris Carson, whose decision to try and hurdle a Carolina defender looked like it was about to go very wrong when he got flipped around in the air.\n" +
            "\n" +
            "But then... well, just watch the clip.",
        type: 'American football',
    },
    {
        title: "5 Truths: Seattle Seahawks v Oakland Raiders generates huge buzz, Wembley still perfect for NFL",
        introduction: "The first NFL International Series game of 2018 saw European fans again show their unwavering dedication for the sport as the Seattle Seahawks took on the Oakland Raiders, writes Dan Quarrell at Wembley.",
        content: "Wembley still perfect venue for NFL\n" +
            "It had been very well advertised that the new Tottenham Hotspur stadium was supposed to be hosting this match, but Wembley stepped in at short notice after construction delays. For many fans, this was not an unwelcome move given how perfect the stadium remains as a home for NFL games in the UK. The atmosphere was surprisingly special as the Seahawks ran out 27-3 winners with the visitors reflecting afterwards on it feeling like a home game." +
            "\"It felt like a home game,” Seahawks coach Pete Carroll said. \"Not only were they so much for us, they made it hard on the other team as well. I know that Germany supports us well and the people here in Great Britain supported us as well, and I’m sure there’s a bunch of other people who came, as well as our own fans who made the trip. We’re grateful for them, it made it a very special event today.\"" +
            "The Jacksonville Jaguars have particularly made Wembley their second home, but there is no doubting its suitability for hosting the masses of UK and Europe-based NFL fans regardless of their team affiliation. From the 'tailgate' zones and the fan plazas to the stadium entertainment itself, Wembley is still the ideal place to enjoy the NFL's UK jaunts.",
        type: 'American football',
    },
    {
        title: "Paper Round: Chelsea confident over £30m Callum Wilson",
        introduction: "Chelsea want Callum Wilson but Ruben Loftus-Cheek may go the other way, Antonio Valencia could leave in January, and Denis Suarez could join Arsenal.",
        content: "The midfielder forced his way into the England World Cup squad after an excellent loan stint at Crystal Palace last term.\n" +
            "\n" +
            "Loftus-Cheek cut short his summer break to push for a place in Sarri’s starting line-up.\n" +
            "\n" +
            "However, with the arrival of Jorginho has seen N’Golo Kante in a more advanced role and Mateo Kovacic joining on loan from Real Madrid, Loftus-Cheek has fallen down the pecking order.\n" +
            "\n" +
            "The midfielder started the Europa League draw at Vidi, but could find himself back on the bench for the trip to Brighton on Sunday, to add to his frustration of not getting an extended run in the side.\n" +
            "\n" +
            "Chelsea blocked approaches from Monaco and Schalke in the summer as Loftus-Cheek was desperate to leave in order to play every after being one of the main men last term at Selhurst Park.\n" +
            "\n" +
            "And the Blues could do the same to frustrate the England international again next month who has started just one league game this season.\n" +
            "\n" +
            "The Blues face a decision next month boss Sarri having to decide if he allows the midfielder to leave or keep a frustrated player desperate to maintain his progression.",
        type: 'Football',
    },
    {
        title: "Football news - Ilkay Gundogan: I know how Raheem feels... we must stay strong to beat racism",
        introduction: "Ilkay Gundogan hopes there is no letting up in the fight against racism following team-mate Raheem Sterling’s bold stand on the issue.",
        content: "Gundogan can empathise with Sterling’s position having been targeted in his homeland of Germany last summer because of his Turkish heritage.\n" +
            "\n" +
            "The midfielder said: “Obviously it’s something we all have to fight, we all have to play our individual roles to make it better for everyone. We have to deal with it.\n" +
            "\n" +
            "\" It’s not easy because I lived it in the summer as well. I know how that feels and it hurts.\"\n" +
            "“But at the end we have no other choice but to stay strong and try to go through that period and try to do our best on the football pitch. To keep being successful, that’s what matters.”\n" +
            "\n" +
            "Sterling’s statement, which highlighted the way newspapers report stories about black players, has prompted a big debate within sport and the media.\n" +
            "\n" +
            "Gundogan believes Sterling has dealt with the matter well and has not been affected by the storm.\n" +
            "\n" +
            "Gundogan said: “He has been normal to be honest. I think he made his point clear through Instagram, giving a statement on that.\n" +
            "\n" +
            "\n" +
            "“This is obviously something that doesn’t belong anywhere in the world, but it happens.”\n" +
            "\n" +
            "That is a view shared by former City defender Nedum Onuoha, who told the Blue Moon Podcast: “I think the incident with Raheem is terrible, but I don’t think it’s the only incident. I think it’s the biggest one for a while because it involves a British player. This stuff goes on all the time.”\n" +
            "\n" +
            "City were back in action on Wednesday as they hosted Hoffenheim in the Champions League. They came from behind to beat the Bundesliga side 2-1 and secure top spot in Group F with two goals from Leroy Sane.\n" +
            "\n" +
            "Leroy Sane scored twice in City's victory over Hoffenheim\n" +
            "Leroy Sane scored twice in City's victory over HoffenheimPA Sport\n" +
            "\n" +
            "They will now look to carry that momentum into Saturday’s lunchtime game against Everton, in which victory could take them back to the top of the Premier League ahead of Liverpool’s next outing on Sunday.\n" +
            "\n" +
            "Manager Pep Guardiola’s biggest concern could be injuries with defender John Stones withdrawn at half-time against Hoffenheim with a knee problem. Sergio Aguero, Kevin De Bruyne, Danilo and Fernandinho will be assessed in the hope they could return but David Silva and Benjamin Mendy are out.\n" +
            "\n" +
            "Gundogan said: “That’s the thing we have to deal with to be honest but the season is so long that it’s normal to get injuries. You have to deal with them and Wednesday we showed we were able to do so.\n" +
            "\n" +
            "“We don’t have much time, the game is at 12.30 on Saturday, so we have to try and do our best in terms of recovery. It won’t be easy, but we will do our best. We’re playing at home and we want to get the three points and be successful.”",
        type: 'Football',
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
            articles.map((article) => {
                promises.push(api.post('/article/create', {
                    title: article.title,
                    introduction: article.introduction,
                    content: article.content,
                    img: img,
                    user_id: user_id,
                    type: article.type
                }))
            });
            return Promise.all(promises);

        }
    }
};

