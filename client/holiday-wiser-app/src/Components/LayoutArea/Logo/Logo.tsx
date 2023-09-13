import "./Logo.css";
import logoImage from "../../../Assets/Image/Logo.jpg"
import { Component } from "react";


class Logo extends Component {
    public render(): JSX.Element{
        return(
            <div className="Logo">
                <img src={logoImage} alt="Logo"/>
            </div>
        );
    }
}

export default Logo;