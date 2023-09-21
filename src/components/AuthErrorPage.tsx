import {useParams} from "react-router-dom";

function AuthErrorPage() {
    const { reason } = useParams();
    return <h1>{reason}</h1>;
}

export default AuthErrorPage;
