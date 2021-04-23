class Image extends React.Component{
    
    render(){

        let imgContainerAttributes = {
            className: "image-container",
            onClick: this.props.imgFunc,
        };

        let imgAttributes = {
            className: "mySlides",
            id: "tokyoimg",
            alt: "tokyo",
            src: this.props.imgSrc
        };
        
        let img = ele("img", imgAttributes, null);            
        let imgContainer = ele("div", imgContainerAttributes, img);
        
        return imgContainer;

    }
}