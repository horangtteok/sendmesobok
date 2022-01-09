import { useSelector } from "react-redux";
import './landingpage.css';

function LandingPage( props ) {  
    const user = useSelector(state => state.user);

    return (
        <>
        
            <div className="app" style={{ backgroundImage: "url('img/back-repeat-red.gif')" }}>             
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