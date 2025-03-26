import axios from "axios";
import { useEffect } from "react";
import { useHistory } from "react-router";

export const useRedirect = (userAuthStatus) => {
    const history = useHistory();

    useEffect(() => {
        const handleMount = async () => {
            try {
                await axios.post("/dj-rest-auth/token/refresh/");
                // if the user IS authorised, the code below will run.
                if (userAuthStatus === "loggedIn") {
                    history.push("/my-feed");
                }
            } catch (err) {
                // if the user IS NOT authorised, the code below will run.
                if (userAuthStatus === "loggedOut") {
                    history.push("/");
                }
            }
        };
        handleMount();
    }, [history, userAuthStatus]);
};
