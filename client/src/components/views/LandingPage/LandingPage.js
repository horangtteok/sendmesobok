import { useSelector } from "react-redux";
import './landingpage.css';

function LandingPage( props ) {  
    const user = useSelector(state => state.user);

    return (
        <>
            <div className="app">
                <div class="video-wrapper">
                    <video autoPlay muted id="back-video">
                        <source src="https://user-images.githubusercontent.com/43427380/148701456-dba9e7ce-afb3-4ad4-834a-c12574ad6403.mp4
" type="video/mp4" />
                        <strong>vieo tag를 지원하지 않는 브라우저입니다.</strong>
                    </video>
                </div>            
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