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
    const words = [
        "복을 가득담은",
        "까치에게서 뺏어온",
        "나이 한 살 품은",
        "검은 호랑이가 빌려준",
        "행복한",
    ]

    const [Word, setWord] = useState(0)
    const [Name, setName] = useState("")
    const [Message, setMessage] = useState("")
    
    useEffect(() => {
        setWord(Math.floor(Math.random() * words.length));
    }, [])

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
        
        Axios.post(`${POST_SERVER}/send`, body)
            .then(res => {
                if(res.data.success) {
                    notification['success']({
                        message: '복을 무사히 전달했습니다.',
                        description: ' 잠시 후 다시시도해주세요.'
                    });
                    setName("");
                    setMessage("");
                    navigate(`/post/${userId}`);
                } else {
                    notification['error']({
                        message: '헉! 까치에게 복을 뺏겼어요.',
                        description: ' 잠시 후 다시시도해주세요.'
                    });
                }
            })
    }

    return (
        <div className='message_form' >
            <h2>{Word !== 0 && words[Word] } {decos[deco]}</h2>
            <form id='send_form' 
                    onSubmit={onSubmitHandler} 
                    style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '0 auto' }}
            >
                <img src={`${process.env.PUBLIC_URL}/img/posts/post${deco}.png`} alt='final choice' />
                <Input
                    id="name" 
                    required
                    placeholder="닉네임을 입력하세요." 
                    type="text" 
                    value={ Name }
                    onChange={onNameHandler} 
                />
                <Input.TextArea 
                    id="message"
                    required
                    placeholder='복을 담은 메시지를 입력하세요.'
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