import { useState } from "react";


function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [fail_msg, setFailMsg] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!username || !password) {
            setFailMsg("Please fill in username and password");
            return;
        }

        const endpoint = `${import.meta.env.VITE_REACT_SERVER_URL}/login`;
        const data = { username, password };

        fetch(endpoint, {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(data),
        })
            .then((res) => {
                if (res.ok) {
                    setFailMsg("");
                    window.location.replace("/");
                } else {
                    return res.text().then((data) => {
                        throw new Error(data);
                    });
                }
            })
            .catch((err) => {
                if (err instanceof TypeError)
                    setFailMsg("Cannot connect to the server");
                else setFailMsg(JSON.parse(err.message)["detail"]);
            });
    };

    return (
        <div className="form-container">
            <div className="card">
                <div className="card-header bg-dark">
                    <p className="text-light">Login</p>
                </div>
                <div className="card-body">
                    <div className="input-container">
                        <label htmlFor="uname">Username </label>
                        <input
                            type="text"
                            name="uname"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="input-container">
                        <label htmlFor="pwd">Password </label>
                        <input
                            type="password"
                            name="pwd"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>
                    <div className="button-container">
                        <button
                            className="login-submit bg-dark text-light"
                            onClick={(e) => handleSubmit(e)}
                        >
                            Submit
                        </button>
                    </div>

                    {fail_msg && <p className="fail-msg">{fail_msg}</p>}
                </div>
            </div>
        </div>
    );
}

export default Login;
