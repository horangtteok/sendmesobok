import { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { POST_SERVER, USER_SERVER } from '../../Config';
import { Button, notification, Empty, Popover } from 'antd';
import './postboxpage.css';

function PostboxPage() {
    const user = useSelector(state => state.user);

    let { userId } = useParams(); // get userId from URL;
    const [Username, setUsername] = useState("")

    const [Posts, setPosts] = useState([])
    
    useEffect(() => {
        fetchPosts();
        getUsername();

        // Kakao.init('179e1817290185a23a3c83d03da61a2e');
    }, [])

    const getUsername = () => {
        Axios.post(`${USER_SERVER}/getUsername`, { userId: userId })
            .then(res => {
                if(res.data.success) {
                    setUsername(res.data.name)
                } else {
                    alert("user 정보를 불러올 수 없습니다. 관리자에 문의해주세요.")
                }
            })
    }

    const fetchPosts = () => {
        // userId: 받는 사람 userId
        // userId: localStorage.getItem('userId') 
        Axios.post(`${POST_SERVER}/getposts`, { 
            userId: userId
        })
            .then(res => {
                if(res.data.success) {
                    setPosts(res.data.posts)
                } else {
                    alert('엽서를 불러오는 데 실패했습니다.')
                }
            })
    }

    const copyUrl = () => {
        let tmp = document.createElement('input');
        let url = window.location.href;

        document.body.appendChild(tmp);
        tmp.value = url;
        tmp.select();
	    document.execCommand("copy");
        document.body.removeChild(tmp);

        notification['info']({
            message: 'URL을 복사했습니다.',
        });
    };

    // const shareKakao = () => {
    //     const desc = `${Username}님께 연하장을 보내주세요!`;

    //     Kakao.Link.sendDefault({
    //       objectType: "feed",
    //         content: {
    //           title: "새해 복 많이 받으세요 📮",
    //           description: desc,
    //           imageUrl: '../img/background.png',
    //           link: {
    //             mobileWebUrl: "http://localhost:3000/",
    //             androidExecParams: "test",
    //           },
    //         },
    //         buttons: [
    //           {
    //             title: "엽서보내러 가기",
    //             link: {
    //               mobileWebUrl: "http://localhost:3000/",
    //             },
    //           },
    //         ],
    //     });
    //   }


    const renderPosts = Posts.map((post, index) => {
        const content = (
            <div style={{ maxWidth: '200px' }}>
                <p>{post.message}</p>
            </div>
        )

        return (
            <div className='post' key={index}>
            {user.userData && user.userData.isAuth ?
                <Popover content={content} title={post.name} trigger="click">
                    <img className='post__img' src={`${process.env.PUBLIC_URL}/img/posts/post${post.deco}.png`} alt={post.name} />
                    <br />
                    <span>{post.name}</span>
                </Popover>
            :
                <>
                    <img className='post__img' src={`${process.env.PUBLIC_URL}/img/posts/post${post.deco}.png`} alt={post.name} />
                    <br />
                    <span>{post.name}</span>
                </>
            }
                
            </div>
        )
    })

    return (
        <div className="app" style={{ display: 'flex', flexDirection:'column',
                        justifyContent: 'center', alignItems: 'center',
                        width: '100%', height: '100vh'
        }}>
            {Username &&
            <>
                <h2 id='title'>{Username} 님의 우체통</h2>
                <div className='post_number'>
                    <h3><span>{Posts.length}</span>개의 엽서가 도착했습니다.</h3>
                </div>

                {(Posts.length < 1) ?
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
                :<div className='postBox'>
                    {renderPosts}
                </div>
                }
            </>
            }

            {user.userData && user.userData.isAuth ? 
            <>
                <Button type='primary' onClick={copyUrl} size='small'>URL 복사하기</Button>
                <Button type='primary' size='small'>카카오톡 공유하기</Button>
            </>
            : <Button type='primary' size='small' href={`/write/${userId}`}>엽서 보내기</Button>
            }
            
        </div>
    )
}

export default PostboxPage
