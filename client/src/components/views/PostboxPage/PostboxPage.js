import React from "react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Axios from "axios";
import { POST_SERVER, USER_SERVER } from "../../Config";
import { Button, notification, Row, Col } from "antd";
import { SmileOutlined } from "@ant-design/icons";
import GridCards from "../commons/GridCards";
import ShareKakao from "../commons/ShareKakao";
import "./Sections/postboxpage.css";

function PostboxPage() {
  const user = useSelector((state) => state.user);
  let { userId } = useParams(); // get userId from URL;
  const [Username, setUsername] = useState("");
  const [Posts, setPosts] = useState([]);
  const [Open, setOpen] = useState(false);

  useEffect(() => {
    fetchPosts();
    getUsername();
  }, []);

  const getUsername = () => {
    Axios.post(`${USER_SERVER}/getUsername`, { userId: userId }).then((res) => {
      if (res.data.success) {
        setUsername(res.data.name);
      } else {
        alert("사용자 정보를 불러올 수 없습니다. 관리자에 문의해주세요.");
      }
    });
  };

  const fetchPosts = () => {
    // userId: 받는 사람 userId
    // userId: localStorage.getItem('userId')
    Axios.post(`${POST_SERVER}/getposts`, {
      userId: userId,
    }).then((res) => {
      if (res.data.success) {
        setPosts(res.data.posts);
      } else {
        alert("복을 불러오는 데 실패했습니다.");
      }
    });
  };

  const copyUrl = () => {
    let tmp = document.createElement("input");
    const url = window.location.href;

    document.body.appendChild(tmp);
    tmp.value = url;
    tmp.select();

    document.execCommand("copy");
    document.body.removeChild(tmp);

    notification["info"]({
      message: "URL을 클립보드에 복사했습니다.",
    });
  };

  const PostboxOpener = () => {
    setOpen(true);
  };

  const renderBlank = () => {
    return (
      <>
      <React.Fragment key={-1}>              
        <Col lg={6} md={8} xs={8}>
            <div className="post_blank">
            </div>
        </Col>
      </React.Fragment>
      <React.Fragment key={-2}>              
        <Col lg={6} md={8} xs={8}>
            <div className="post_blank">
            </div>
        </Col>
      </React.Fragment>
      <React.Fragment key={-3}>              
        <Col lg={6} md={8} xs={8}>
            <div className="post_blank">
            </div>
        </Col>
      </React.Fragment>
      </>
    )
  }

  return (
    <div
      className={`app ${!Open ? "post__app" : "post_app_none"}`}
    >
      {Username && (
        <>
          <div className="post_number">
            <h2 id="title">{Username} 님의 복주머니에</h2>
            <h2>
              <span>{Posts.length}</span>개의 복이 쌓였어요.
            </h2>
            <p>
              💌 받은 연하장은 <span>설날</span>에 확인할 수 있어요
            </p>
          </div>

          <img
            id={Open ? "widepocket" : "pocket"}
            alt="복주머니"
            onClick={PostboxOpener}
          />

          {Posts.length < 1 ? (
            <div style={{ textAlign: "center", color: "#f5eee6" }}>
              <SmileOutlined size="large" />
              <p>
                복주머니가 비었어요! <br />
                주변 사람들에게 내 복주머니를 공유하세요!
              </p>
            </div>
          ) : (
            <div className="postBox">
              {/* 엽서를 grid로 rendering하는 부분 */}
              {Open && (
                <Row className="postBox__table" gutter={[3, Posts.length / 3]}>
                  {Posts &&
                  <>
                    {Posts.length <= 3 && renderBlank() }
                    {Posts.map((post, index) => (
                      <React.Fragment key={index}>
                        {user.userData && user.userData.isAuth ? (
                          <GridCards
                            userAuth
                            image={`${process.env.PUBLIC_URL}/img/posts/post${post.deco}.png`}
                            name={post.name}
                            message={post.message}
                          />
                        ) : (
                          <GridCards
                            image={`${process.env.PUBLIC_URL}/img/posts/post${post.deco}.png`}
                            name={post.name}
                          />
                        )}
                      </React.Fragment>
                    ))}
                  </>
                  }
                </Row>
              )}
            </div>
          )}
        </>
      )}

      {user.userData && user.userData.isAuth ? (
        <div
          className="share-div"
          style={{
            position: "fixed",
            bottom: "1.4em",
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Button id="copy-btn" type="primary" onClick={copyUrl} size="small">
            URL 복사하기
          </Button>
          <ShareKakao username={Username} />
        </div>
      ) : (
        <Button
          id="btnSend"
          type="primary"
          size="small"
          href={`/write/${userId}`}
        >
          복주머니 채워주기
        </Button>
      )}
    </div>
  );
}

export default PostboxPage;
