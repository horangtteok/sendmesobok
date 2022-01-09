import { useState } from 'react';
import { Col } from "antd";
import Modal from './Modal.js';
import '../PostboxPage/Sections/postboxpage.css';

function GridCards(props) {
    const [modalOpen, setModalOpen] = useState(false)

    const modalClose = () => {
        setModalOpen(!modalOpen)
    }

    const onNotuserHandler = () => {
        alert("복주머니 주인만 읽을 수 있어요!")
    }

    if (!props.userAuth) {
        return (
            <Col lg={6} md={8} xs={8}>
                <div className='post' onClick={onNotuserHandler}>    
                    <p>{props.name}</p>
                    <img
                        className='post__img'
                        src={props.image}
                        alt={props.name}
                    />
                </div>
            </Col>
        )
    } else {
        return (
            <>
            <Col lg={6} md={8} xs={8}>
                <div className='post' onClick={modalClose} >
                    <p>{props.name}</p>
                    <img className='post__img' src={props.image} alt={props.name} />
                </div>
            </Col>

            { modalOpen && 
                <Modal modalClose={modalClose} title={props.name} message={props.message} deco={props.image} />
            }
            </>
        );
    }

    
}

export default GridCards;
