class LinkContainer extends React.Component{

    render(){

        let imageLinkAttributes = {
            href: this.props.Href
        }

        let imageAttributes = {
            src: this.props.Src
        }

        let headerLinkAttributes = {
            href: this.props.HeaderHref
        }

        let text = this.props.h3Text;

        let image = ele("img", imageAttributes, null);
        let imageLink = ele("a", imageLinkAttributes, image);
        let header = ele("h3", null, text);
        let headerLink = ele("a", headerLinkAttributes, header);
        let container = ele("div", null, imageLink, headerLink);
        return container;

    }
}