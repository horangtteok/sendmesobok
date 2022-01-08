import { useEffect } from "react";
import { Button } from 'antd';

const ShareKakao = ( props ) => {
    const { Kakao, location } = window;
    const { username } = props;

    useEffect(() => {
        Kakao.init(process.env.REACT_APP_KAKAO_KEY);
    }, []);

    const shareKakao = () => {
        const url = location.href;

        Kakao.Link.sendDefault({
            objectType: "feed",
            content: {
                title: "소복소복 🌅",
                description: `${username}님에게 복을 전해주세요! 💌`,
                imageUrl: "https://user-images.githubusercontent.com/43427380/148138585-a49628d5-49c9-4cb8-ad7b-42a7f6ad6822.PNG",
                link: {
                    mobileWebUrl: url,
                    webUrl: url,
                },
            },
            buttons: [
                {
                    title: "복주머니 채워주기",
                    link: {
                        mobileWebUrl: url,
                        webUrl: url,
                    },
                },
            ],
        });
    };

    return (
        <Button id="share-btn" type="primary" size="small" onClick={shareKakao}>
            카카오톡 공유하기
        </Button>
    );
};

export default ShareKakao;