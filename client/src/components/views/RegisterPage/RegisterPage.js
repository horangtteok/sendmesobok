import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../../../_actions/user_action';
import { Button, Input } from 'antd';

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

        let body = {
            name: Name,
            password: Password,
        }

        dispatch(registerUser(body))
        .then(response => {
            if(response.payload.success) {
                navigate('/login');
            } else {
                alert(response.payload.message);
            }
        });
    }


    return (
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center',
                        width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column' }}
                onSubmit={onSubmitHandler}
            >
                <label>닉네임</label>
                <Input
                    id="name" 
                    placeholder="2자리 이상"
                    type="text" 
                    value={ Name } 
                    onChange={onNameHandler}
                />

                <label>비밀번호</label>
                <Input 
                    id="password"
                    placeholder="4자리 이상"
                    type="password" 
                    value={ Password }
                    onChange={onPasswordHandler} 
                />

                <label>비밀번호 확인</label>
                <Input
                    id="confrimPassword"
                    placeholder="비밀번호를 확인하세요."
                    type="password" 
                    value={ ConfirmPassword } 
                    onChange={onConfirmPasswordHandler} 
                />

                {Confirm ?
                    (<span></span>) : (<span style={{ color: 'red' }}>일치하지 않습니다!</span>)
                }

                <br />
                <Button type="primary" htmlType="submit" className="register-form-button" style={{ minWidth: '100%' }}>
                    Register
                </Button>
            </form>
        </div>
    );      
}

export default RegisterPage;