import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../_actions/user_action';
import { Button, Input } from 'antd';
import './registerpage.css';

function RegisterPage( props ) {
    const dispatch = useDispatch();

    const [Password, setPassword] = useState("");
    const [Name, setName] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [Confirm, setConfirm] = useState(false);

    let navigate = useNavigate();

    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value);

        if(ConfirmPassword !== event.currentTarget.value) {
            setConfirm(false)
        } else {
            setConfirm(true)
        }
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value);

        if(Password !== event.currentTarget.value) {
            setConfirm(false)
        } else {
            setConfirm(true)
        }
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        if(!Confirm){
            alert("비밀번호를 확인해주세요.")
        } else {
            let body = {
                name: Name,
                password: Password,
            }
    
            dispatch(registerUser(body))
            .then(response => {
                if(response.payload.success) {
                    navigate('/login');
                } else {
                    alert("회원가입에 실패했습니다.");
                }
            });
        }
    }

    return (
        <div className="app" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
                        width: '100%', height: '100vh', flexDirection: 'column',
        }}>
            <h2 className='sign-title'>회원 가입</h2>
            <form id='register-form' style={{ display: 'flex', flexDirection: 'column', textAlign: 'left' }}
                onSubmit={onSubmitHandler}
            >
                <label>닉네임</label>
                <Input
                    id="name" 
                    required
                    placeholder="2자리 이상"
                    type="text" 
                    value={ Name } 
                    onChange={onNameHandler}
                />

                <label>비밀번호</label>
                <Input 
                    id="password"
                    required
                    placeholder="4자리 이상"
                    type="password" 
                    value={ Password }
                    onChange={onPasswordHandler}
                />

                <label>비밀번호 확인</label>
                <Input
                    id="confirmPassword"
                    required
                    placeholder="비밀번호를 확인하세요."
                    type="password" 
                    value={ ConfirmPassword } 
                    onChange={onConfirmPasswordHandler} 
                />

                {Confirm ?
                    (<span className='confirm-text'></span>) : (<span className='confirm-text'>비밀번호가 일치하지 않습니다!</span>)
                }

                <br />
                <Button type="primary" htmlType="submit" className="register-form-button" style={{ minWidth: '100%' }}>
                    복주머니 생성
                </Button>
            </form>
        </div>
    );      
}

export default RegisterPage;