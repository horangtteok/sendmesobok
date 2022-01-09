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
                navigate('/');
            } else {
                alert(response.payload.message);
            }
        });
    }

    return (
        <div className="app">
            <div className="login-div">
                <h2 className='sign-title'>로그인</h2>
                <form id='login-form'
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
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        로그인
                    </Button>

                    <a className="gotoRegister" href="/register">회원가입으로 슝!</a>
                </form>
            </div>
        </div>
    );    
}

export default LoinPage;
