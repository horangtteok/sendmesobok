import { useState } from 'react';
import { useParams } from 'react-router-dom';
import Send from './Sections/Send';
import './Sections/writepage.css';
import { Button } from 'antd';

function WritePage() {
    let { userId } = useParams(); // get userId from URL;

    const [Stage, setStage] = useState(0);
    const [Deco, setDeco] = useState(1);
    
    const onPrevHandler = () => {
        if(Stage > 0) {
            setStage(Stage-1);
        }
    }

    const onNextHandler = () => {
        setStage(Stage+1);
    }

    const onClickHandler = index => {
        setDeco(index)
    }

    return (
        <div className="app" style={{ display: 'flex', flexDirection:'column',
                        justifyContent: 'center', alignItems: 'center',
                        width: '100%', height: '100vh'
        }}>
            {Stage < 1 ?
            <div className='deco'>
                <h2>어떤 물건에 복을 담아 보낼까요?</h2>
                <ul className='deco-grid'>
                {[1,2,3,4,5,6].map((n, idx) => {
                    return(
                        <li
                            key={n}
                            id={`deco-${n+1}`}
                            className={'deco-cell '+ (Deco === (idx+1) ?'deco-cell-border' : '')}
                            value={`deco-${idx+1}`}
                            onClick={() => onClickHandler(idx+1)}
                        >
                            <img loading='lazy' src={`${process.env.PUBLIC_URL}/img/posts/post${idx+1}.png`} alt={`deco ${idx+1}`} />
                        </li>
                    )
                })}
                </ul>
                
                <Button type="primary" htmlType="submit" size='large' onClick={onNextHandler}>
                    다음
                </Button>
            </div>
            :
            <>
            <Button className='prev_btn' href="#" onClick={onPrevHandler}>
                {'<  이전'}
            </Button>
            <Send userId={userId} deco={Deco} />
            </>
            }
            
        </div>
    )
}

export default WritePage
