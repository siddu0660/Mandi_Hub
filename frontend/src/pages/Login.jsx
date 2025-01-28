import { useState } from "react";
import SignIn from "../components/signIn";
import SignUp from "../components/signUp";

function Login () {
    const [showSignIn, setShowSignIn] = useState(true);

    return (
        <>
            {showSignIn ? <SignIn setShowSignIn={setShowSignIn}/> : <SignUp setShowSignIn={setShowSignIn}/>}
        </>
    )
}

export default Login