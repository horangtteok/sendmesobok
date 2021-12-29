import { useState, useEffect } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { POST_SERVER } from '../../../Config';

import { Button, Input, notification } from "antd";

function Message( props ) {
    const { userId, deco } = props;
    let navigate = useNavigate();

    const decos = {
        1: '떡국',
        2: '복주머니',
        3: '검호',
        4: '세뱃돈',
        5: '윷놀이',
        6: '까치'
    }

    const [Name, setName] = useState("")
    const [Message, setMessage] = useState("")
    
    const onNameHandler = (event) => {
        setName(event.currentTarget.value);
    }

    const onMessageHandler = (event) => {
        setMessage(event.currentTarget.value);
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            userid: userId,
            name: Name,
            message: Message,
            deco: deco,
        }
        console.log(body);
        
        Axios.post(`${POST_SERVER}/send`, body)
            .then(res => {
                if(res.data.success) {
                    notification['success']({
                        message: '엽서를 무사히 전달했습니다.',
                    });
                    setName("");
                    setMessage("");
                    navigate(`/post/${userId}`);
                } else {
                    notification['error']({
                        message: '엽서 전송에 실패했습니다.',
                    });
                }
            })
    }

    return (
        <div className='message_form' >
            <h3>나이 한 살 품은 <span>{decos[deco]}</span></h3>
            <form id='' 
                    onSubmit={onSubmitHandler} 
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto' }}
            >
                <img src={`${process.env.PUBLIC_URL}/img/posts/post${deco}.png`} alt='final choice' />
                <Input
                    id="name" 
                    placeholder="닉네임을 입력하세요." 
                    type="text" 
                    value={ Name }
                    onChange={onNameHandler} 
                />
                <Input.TextArea 
                    id="message"
                    placeholder='메시지를 입력하세요.'
                    type='text'
                    value={ Message }
                    onChange={onMessageHandler}
                />
                <Button type="primary" htmlType="submit" size='large'>
                    보내기
                </Button>
            </form>
        </div>
    )
}

export default Message
