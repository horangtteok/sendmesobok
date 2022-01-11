import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { confirmName, registerUser } from '../../../_actions/user_action';
import { Button, Input, Tooltip, notification } from 'antd';
import { CheckCircleFilled } from '@ant-design/icons';
import './registerpage.css';

function RegisterPage( props ) {
    const dispatch = useDispatch();

    const [Name, setName] = useState("");
    const [ConfirmName, setConfirmName] = useState(false);
    const [confirmNameCmt, setconfirmNameCmt] = useState("✔ 닉네임 중복을 확인하세요.")
    const [Password, setPassword] = useState("");
    const [ConfirmPassword, setConfirmPassword] = useState("");
    const [Confirm, setConfirm] = useState(false);

    let navigate = useNavigate();

    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
        setConfirmName(false);
        setconfirmNameCmt("✔ 닉네임 중복을 확인하세요.");
    }

    const onConfirmNameHandler = () => {
        if(Name === ""){
            alert("닉네임을 입력하세요.");
        } else {
            let body = {
                name: Name,
            }

            dispatch(confirmName(body))
            .then(response => {
                if(response.payload.success) {
                    setConfirmName(true);
                    setconfirmNameCmt("사용가능한 닉네임입니다.")
                } else {
                    setConfirmName(false);
                    setconfirmNameCmt("이미 사용 중인 닉네임입니다.")
                }
            });
        }
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
        
        if(!ConfirmName){
            alert("닉네임 중복을 확인해주세요.");
        }
        else if(!Confirm){
            alert("비밀번호를 확인해주세요.");
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
                    if(response.payload.message){
                        notification['error']({
                            message: '회원가입 실패!',
                            description:
                              '잠시 후 다시 시도해주세요.',
                          });
                    }
                }
            });
        }
    }

    return (
        <div className="app">
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
                        suffix={
                            <Tooltip title="✔ 닉네임 중복을 확인하세요.">
                                <button type="button" id="ConfirmName" onClick={onConfirmNameHandler}>
                                    <CheckCircleFilled className={ConfirmName? "confirmed" : "confirm-text"} />
                                </button>
                            </Tooltip>
                        }
                    />
                {ConfirmName ?
                    <span className='confirmed confirm-name'>{confirmNameCmt}</span>
                    :
                    <span className='confirm-text confirm-name'>{confirmNameCmt}</span>
                }
                
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
                    (<span></span>) : (<span className='confirm-text'>비밀번호가 일치하지 않습니다!</span>)
                }

                <br />
                <Button type="primary" htmlType="submit" className="register-form-button">
                    복주머니 생성
                </Button>
            </form>
        </div>
    );      
}

export default RegisterPage;