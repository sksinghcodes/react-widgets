import { useEffect, useState } from "react";

const Route = ({path, children}) => {
    const [currentPath, setCurrentPath] = useState(window.location.pathname);

    useEffect(() => {
        const onLocationChange = () => {
            console.log('location Change');
            setCurrentPath(window.location.pathname)
        }

        window.addEventListener('popstate', onLocationChange);

        return () => {
            window.addEventListener('popstate', onLocationChange);
        }
    }, []);

    return currentPath === path
    ? children
    : null;
}

export default Route;