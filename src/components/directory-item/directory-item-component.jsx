import { useNavigate } from "react-router-dom";

import {Body, BackgroundImage, DirectoryItemContainer} from "./directory-item.jsx";

const DirectoryItem = ({category}) => {

    const {imageUrl, title, route} = category;
    const nav = useNavigate();

    const onNavigateHandler = () => nav(route);
    return (
        <DirectoryItemContainer onClick={onNavigateHandler}>
            <BackgroundImage
              imageUrl={imageUrl}
              /* style={{
              backgroundImage: `url(${imageUrl})`
            }} *//>
            <Body>
              <h2> {title} </h2>
              <p> Shop Now </p>
            </Body>
        </DirectoryItemContainer>
    );
};

export default DirectoryItem;