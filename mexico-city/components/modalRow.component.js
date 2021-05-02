class ModalRow extends React.Component{

    render(){

        let columnAttributes = {
            className: "column"
        };

        let columnImgAttributes = {
            className: "demo cursor",
            src: this.props.imgSrc,
            onClick: this.props.imgFunc,
            alt: "tokyo",
            style: {
                width: "100%",
            },
        };

        let foregroundLayerAttributes = {
            className: "layer",
        };

        let foreLayer = ele("div", foregroundLayerAttributes, null);
        let columnImg = ele("img", columnImgAttributes, null);
        let column = ele("div", columnAttributes, foreLayer, columnImg);
        return column;
    }
}