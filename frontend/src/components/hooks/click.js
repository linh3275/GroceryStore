import { useState } from "react";

export default function useClick () {
    const [clicked, setClicked] = useState(false);

    const toggleClick = () => {
        setClicked(true);
        setTimeout(() => setClicked(false), 300);
    };

    return { clicked, toggleClick };
}