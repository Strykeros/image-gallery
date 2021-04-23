class Modal extends React.Component{
    render(){

        let modalContainerAttributes = {
            className: "mySlides2",
            onClick: this.props.func,
        };

        let nrTextAttributes = {
            className: "numbertext",
            dangerouslySetInnerHTML: {__html: this.props.number},
        };

        let modalImgAttributes = {
            src: this.props.imgSrc
        };
        
        let modalImg = ele("img", modalImgAttributes, null);
        //let nr = ele("div", nrTextAttributes, null);
        let modalContainer = ele("div", modalContainerAttributes, modalImg);
        return modalContainer;
    }
}