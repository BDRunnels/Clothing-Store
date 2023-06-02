import {CartItemContainer, Image, ItemDetails, Name} from './cart-item.jsx';

const CartItem = ({cartItem}) => {
    const {name, imageUrl, price, quantity} = cartItem;
    return (
        <CartItemContainer>
            <Image src={imageUrl} alt={`${name}`}/>
            <ItemDetails className="item-details">
                <Name className="name">{name}</Name>
                <span className="price">{quantity} x ${price}</span>
            </ItemDetails>
        </CartItemContainer>
    );
};

export default CartItem;