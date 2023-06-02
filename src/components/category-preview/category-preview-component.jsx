import { Link } from 'react-router-dom';

import {CategoryPreviewContainer, Title, Preview} from './category-preview.jsx';
import ProductCard from '../product-card/product-card-component';

const CategoryPreview = ({title, products}) => {
    return(
        <CategoryPreviewContainer>
            <h2> 
                <Title to={title}>{title.toUpperCase()}</Title>
            </h2>
            <Preview>
                {
                    products
                        .filter((_, idx) => idx < 4)
                        .map((product) => {
                        return(
                        <ProductCard key={product.id} product={product} />
                        )})
                }
            </Preview>
        </CategoryPreviewContainer>
    );
};

export default CategoryPreview;