const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 50,
        unique: 1
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
    },
    role: { // user와 manager를 구분하기 위함
        type: Number,
        default: 0
    },
    image: String,
    token: { // 유효성 등을 관리
        type: String
    }, 
    tokenExp: { // token 유효 기한
        type: Number
    }
})

userSchema.pre('save', function( next ) {
    var user = this;

    if(user.isModified('password')) { // user스키마의 password field가 변경될 때만 암호화
        // 비밀번호 암호화
        bcrypt.genSalt(saltRounds, function(err, salt) { // genSalt: Salt 생성
            if(err) return next(err);

            bcrypt.hash(user.password, salt, function(err, hash) { // hash: hash 생성
                if(err) return next(err);

                user.password = hash; // user.password를 palinText에서 hash된 password로 변경
                next();
            });
        });
    } else { // 다른 field를 바꾸는 경우는 그냥 next()
        next();
    }
});


userSchema.methods.comparePassword = function(plainPassword, cb) {
    // plainPassword 1234567    암호화된 비밀번호 $2b$10$qzkDmpe//Z7XN8yxD7BTtee1CGB6kv6jVD7YIOnr.dCBdz9lGpnMy
    bcrypt.compare(plainPassword, this.password, function(err, isMatch) {
        if(err) return cb(err);
        cb(null, isMatch); // isMatch == true
    });
};

userSchema.methods.generateToken = function(cb) {
    var user = this;

    // jsonwebtoken을 이용해서 token 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken'); // payload 매개변수로는 plain object가 들어와야 하므로 user._id가 아니라 .toHexString()까지 해줘야 오류가 없다.
    // user.id + 'secretToken' = token
    // ->
    // 'secretToken' -> user._id

    user.token = token;
    user.save(function(err, user) {
        if(err) return cb(err);
        cb(null, user); // err는 없고 user 정보만 전달
    });
};

userSchema.statics.findByToken = function(token, cb) {
    var user = this;

    // user._id + 'secretToken' => token
    // 토큰을 decode
    jwt.verify(token, 'secretToken', function(err, decoded) { // decoded = 디코드된 것 == user._id
        // user._id를 이용해 user를 찾고
        // 클라이언트에서 가져온 token과 DB에 보관된 token이 일치하는 지 확인
        user.findOne({ '_id': decoded, 'token': token }, function(err, user) {
            if(err) return cb(err);
            cb(null, user);
        })

    });
};

const User = mongoose.model('User', userSchema);

// 다른 파일에서 해당 모델을 사용 가능하게
module.exports = { User };