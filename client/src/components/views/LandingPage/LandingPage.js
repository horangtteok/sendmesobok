import { useSelector } from "react-redux";
import { Button } from 'antd';
import './landingpage.css';

function LandingPage( props ) {  
    const user = useSelector(state => state.user);

    return (
        <>
            <div className="app" style={{ display: 'flex', justifyContent: 'center',
                                        flexDirection: 'column', alignItems: 'center',
                                        width: '100%', height: '100vh',
                                        backgroundImage: "url('img/new-year-card.png')",
                                        backgroundPosition: 'center',
                                        // backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        // backgroundSize: 'contain',
                                        backgroundSize: '120px'
            }}>                
                {user.userData && user.userData.isAuth  ?
                    <Button type="primary" size="default" href={`/post/${user.userData._id}`}>엽서함으로 이동</Button>
                    : 
                    <a href="/login" className="btn_start">
                        <span>시작하기</span>
                    </a>
                }

            </div>
        </>
    );
}

export default LandingPage;
