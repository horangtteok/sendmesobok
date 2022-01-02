import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../../../_actions/user_action';
import { Input, Button } from 'antd';
import './loginpage.css';

function LoinPage( props ) {
    const dispatch = useDispatch();

    const [Name, setName] = useState("");
    const [Password, setPassword] = useState("");

    let navigate = useNavigate();

    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            name: Name,
            password: Password
        }


        dispatch(loginUser(body))
        .then(response => {
            if(response.payload.loginSuccess) {
                localStorage.setItem("userId", response.payload.userId);
                localStorage.setItem("x_auth", response.payload.token);
                cookieParser.set('x_auth', response.data.token);
                navigate('/');
            } else {
                alert(response.payload.message);
            }
        });
    }

    return (
        <div className="app">
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
                        width: '100%', height: '100vh'
            }}>
                <form style={{ display: 'flex', flexDirection: 'column' }}
                    onSubmit={onSubmitHandler}
                >
                    <label className="label">닉네임</label>
                    <Input
                        id="name" 
                        placeholder="닉네임을 입력하세요." 
                        type="text" 
                        value={ Name }
                        onChange={onNameHandler} 
                    />
                    <label className="label">비밀번호</label>
                    <Input 
                        id="password"
                        placeholder="비밀번호를 입력하세요."
                        type="password" 
                        value={ Password }
                        onChange={onPasswordHandler} 
                    />

                    <br />
                    <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }}>
                        로그인
                    </Button>

                    <a className="gotoRegister" href="/register">지금 회원가입하세요!</a>
                </form>
            </div>
        </div>
    );    
}

export default LoinPage;
