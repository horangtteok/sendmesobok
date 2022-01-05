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
                                        backgroundImage: "url('img/back-repeat.gif')",
                                        backgroundPosition: 'center',
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
            }}>                
                {user.userData && user.userData.isAuth  ?
                    <a className="btn_start" href={`/post/${user.userData._id}`}>복주머니로 이동</a>
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
