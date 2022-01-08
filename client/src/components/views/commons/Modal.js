// import { Button } from 'antd';
import "./Modal.css";

const Modal = ( props ) => {
    let { modalClose, title, message, deco } = props;

    const onCloseModal = (event) => {
        if (event.target === event.currentTarget) {
            modalClose();
        }
    };

    // const deleteMessage = () => {
    //     alert("삭제합니다.");
    // }

    return (
      <div
        className="modal__container"
        onClick={onCloseModal}
        style={{
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          width: "100%",
          height: "100vh",
        }}
      >
        <div className="modal">
            <div
                className="modal__button"
                style={{ background: "none", border: "none" }}
                onClick={modalClose}
            >
                <img
                    src="https://user-images.githubusercontent.com/43427380/147858020-e0a6fcb7-389a-458f-9f5c-00a9752ce9d9.png"
                    alt="close pocket"
                />
            </div>

            <img className='modal__img' src={deco} alt={title} />
            <div className="modal_title">{title}</div>
            <div className="modal_content">{message}</div>

            {/* <Button className='btn_delete' onClick={deleteMessage}>삭제하기</Button> */}
        </div>
      </div>
    );
};

export default Modal;
