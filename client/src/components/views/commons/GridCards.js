import { Col, Popover } from "antd";
import '../PostboxPage/Sections/postboxpage.css';

function GridCards(props) {
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
        const content = (
            <div style={{ maxWidth: '200px' }}>
                <p>{props.message}</p>
            </div>
        )

        return (
            <Col lg={6} md={8} xs={8}>
                <div className='post'>
                    <Popover content={content} title={props.name} trigger="click">
                        <p>{props.name}</p>
                        <img className='post__img' src={props.image} alt={props.name} />
                    </Popover>
                </div>
            </Col>
        );
    }

    
}

export default GridCards;
