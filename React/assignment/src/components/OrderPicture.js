import React from "react"
import steel from "../images/steel.jpg";
import plastic from "../images/plastic.jpg";
import wooden from "../images/wooden.png";



class OrderPicture extends React.Component {
    constructor(props) {
        super(props)
    }

    getOrderImage(shutterMaterial) {
        switch (shutterMaterial) {
            case "acél":
                return steel;
            case "műanyag":
                return plastic
            case "fa":
                return wooden
            default:
                return steel
        }
    }

    getBannerColor(color) {
        switch (color) {
            case "fekete":
                return {"background-color": "black"}
            case "szürke":
                return {"background-color": "grey"}
            case "barna":
                return {"background-color": "brown"}
            case "narancssárga":
                return {"background-color": "orange"}
            default:
                return {"background-color": "black"}
        }
    }

    render() {
        return <tr>
            <td className="col-md-2">
                <img className="orderPicture" src={this.getOrderImage(this.props.shutterMaterial)} alt="OrderPicture"/>
            </td>
            <td className="col-md-2">
                <div className="colorBanner" style={this.getBannerColor(this.props.shutterColor)}/>
            </td>
        </tr>
    }

}

export default OrderPicture