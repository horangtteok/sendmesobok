import { Button, Menu } from 'antd';
import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../../../../_actions/user_action';


function RightMenu(props) {
  const dispatch = useDispatch();
  let navigate = useNavigate();

  const user = useSelector(state => state.user);

  const logoutHandler = () => {
    let body = {
        x_auth: localStorage.getItem('x_auth'),
    }

    dispatch(logoutUser(body))
        .then(response => {
            if(response.payload.success) {
                localStorage.removeItem('userId');
                localStorage.removeItem('x_auth');
                navigate('/login');
            } else {
                alert('Log Out Failed...');
            }
        });
  };

  if (user.userData && !user.userData.isAuth) {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="mail">
          <a href="/login">로그인</a>
        </Menu.Item>
        <Menu.Item key="app">
          <a href="/register">회원가입</a>
        </Menu.Item>
      </Menu>
    );
  } else {
    return (
      <Menu mode={props.mode}>
        <Menu.Item key="logout">
          <Button onClick={logoutHandler}>Logout</Button>
        </Menu.Item>
      </Menu>
    );
  }
}

export default RightMenu;