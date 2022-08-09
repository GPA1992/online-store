import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getProductsFromID } from '../services/api';

class ProductDetails extends Component {
    state = {
      productName: '',
      productImage: '',
      productPrice: 0,
    };

    async componentDidMount() {
      this.getProduct();
    }

    getProduct = async () => {
      const { match } = this.props;
      const { params } = match;
      const { id } = params;
      const thisProduct = await getProductsFromID(id);
      console.log(thisProduct);
      const { thumbnail, price, title } = thisProduct;
      this.setState({
        productName: title,
        productImage: thumbnail,
        productPrice: price,
      });
    }

    render() {
      const { productName, productImage, productPrice } = this.state;
      return (
        <div>
          <img
            src={ productImage }
            alt={ productName }
            data-testid="product-detail-image"
          />
          <br />
          <h2 data-testid="product-detail-name">{ productName }</h2>
          <span data-testid="product-detail-price">{ productPrice }</span>
          <Link to="/cart" data-testid="shopping-cart-button">Adicionar ao Carrinho</Link>
        </div>
      );
    }
}
ProductDetails.propTypes = {
  match: PropTypes.shape({ params: PropTypes
    .shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
    }) }).isRequired,
};
export default ProductDetails;
