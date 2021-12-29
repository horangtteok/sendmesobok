const { User } = require("../models/User");

let auth = (req, res, next) => {
    // 인증 처리를 하는 곳

    // 클라이언트 cookie에서 토큰 가져오기: cookie-parser 이용
    let token = req.cookies.x_auth; // x_auth 이름의 cookie를 가져옴

    console.log("prev auth");
    // 토큰을 복호화 -> user 찾기
    User.findByToken(token, (err, user) => {
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true });

        req.token = token;
        req.user = user;
        console.log("auth_req success");
        next(); // middleware에서 할 거 다하면 다음으로 넘어갈 수 있게 next 해주기
    })

    // user가 있으면, 인증 Yes
    // user가 없으면, 인증 No
};

module.exports = { auth };