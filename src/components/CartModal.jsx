import { useCart } from '../contexts/CartContext';

const CartModal = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    getTotalPrice,
    isModalOpen,
    closeModal,
    clearCart
  } = useCart();

  const totalPrice = getTotalPrice();

  const handleQuantityChange = (productId, currentQuantity, change) => {
    console.log('Quantity change:', productId, currentQuantity, change);
    const newQuantity = currentQuantity + change;
    updateQuantity(productId, newQuantity);
  };

  const handleRemoveItem = (productId) => {
    removeFromCart(productId);
  };

  const handleCheckout = () => {
    alert(`Order placed successfully!\nTotal: $${totalPrice.toFixed(2)}\nItems: ${cartItems.length}`);
    clearCart(); // Clear the cart and close the modal
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleSwipeClose = (e) => {
    e.preventDefault();
    console.log('Swipe close triggered');
    closeModal();
  };

  return (
    <>
      {isModalOpen && (
        <div 
          className="modal show d-block fade" 
          tabIndex="-1" 
          style={{ 
            backgroundColor: 'rgba(0,0,0,0.6)',
            backdropFilter: 'blur(4px)',
            zIndex: 1050
          }}
          onClick={handleBackdropClick}
        >
          <div className="modal-dialog modal-dialog-scrollable modal-dialog-centered cart-modal-dialog">
            <div className="modal-content animate__animated animate__fadeInUp cart-modal-content">
              {/* Mobile swipe indicator */}
              <div className="swipe-indicator d-md-none" onClick={handleSwipeClose}>
                <div className="swipe-handle"></div>
              </div>
              
              <div className="modal-header cart-modal-header">
                <div className="d-flex align-items-center">
                  <div className="cart-icon-wrapper me-3">
                    <i className="bi bi-cart3"></i>
                    <span className="cart-badge">{cartItems.length}</span>
                  </div>
                  <div>
                    <h5 className="modal-title mb-0">
                      Shopping Cart
                    </h5>
                    <small className="text-muted">
                      {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                    </small>
                  </div>
                </div>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={closeModal}
                  aria-label="Close"
                ></button>
              </div>
              
              <div className="modal-body cart-modal-body">
                {cartItems.length === 0 ? (
                  <div className="empty-cart-state">
                    <div className="empty-cart-icon">
                      <i className="bi bi-cart-x"></i>
                    </div>
                    <h4 className="empty-cart-title">Your cart is empty</h4>
                    <p className="empty-cart-description">Add some products to get started!</p>
                    <button 
                      className="btn btn-primary btn-lg continue-shopping-btn"
                      onClick={closeModal}
                    >
                      <i className="bi bi-arrow-left me-2"></i>
                      Continue Shopping
                    </button>
                  </div>
                ) : (
                  <div className="cart-items">
                    {cartItems.map(item => (
                      <div key={item.id} className="cart-item-card">
                        <div className="cart-item-content">
                          <div className="cart-item-image-wrapper">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="cart-item-image"
                            />
                          </div>
                          
                          <div className="cart-item-details">
                            <h6 className="cart-item-name">{item.name}</h6>
                            <div className="cart-item-price">${item.price}</div>
                            {item.brand && (
                              <div className="cart-item-brand">
                                <i className="bi bi-tag"></i>
                                <span>{item.brand}</span>
                              </div>
                            )}
                          </div>
                          
                          <div className="cart-item-controls">
                            <div className="quantity-controls">
                              <button
                                className="quantity-btn quantity-decrease"
                                onClick={() => handleQuantityChange(item.id, item.quantity, -1)}
                                disabled={item.quantity <= 1}
                                title="Decrease quantity"
                              >
                                <i className="bi bi-dash"></i>
                              </button>
                              
                              <span className="quantity-display">{item.quantity}</span>
                              
                              <button
                                className="quantity-btn quantity-increase"
                                onClick={() => handleQuantityChange(item.id, item.quantity, 1)}
                                title="Increase quantity"
                              >
                                <i className="bi bi-plus"></i>
                              </button>
                            </div>
                            
                            <div className="cart-item-actions">
                              <div className="cart-item-total">${(item.price * item.quantity).toFixed(2)}</div>
                              <button
                                className="remove-item-btn"
                                onClick={() => handleRemoveItem(item.id)}
                                title="Remove item from cart"
                              >
                                <i className="bi bi-trash"></i>
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              
              {cartItems.length > 0 && (
                <div className="modal-footer cart-modal-footer">
                  <div className="checkout-section">
                    <div className="order-summary">
                      <div className="summary-header">
                        <h5 className="summary-title">Order Summary</h5>
                        <div className="item-count">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</div>
                      </div>
                      <div className="summary-details">
                        <div className="summary-row">
                          <span>Subtotal</span>
                          <span>${totalPrice.toFixed(2)}</span>
                        </div>
                        <div className="summary-row">
                          <span>Shipping</span>
                          <span className="text-success">Free</span>
                        </div>
                        <div className="summary-row summary-total">
                          <span>Total</span>
                          <span className="total-amount">${totalPrice.toFixed(2)}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="checkout-actions">
                      <button
                        type="button"
                        className="btn btn-outline-secondary continue-shopping-btn"
                        onClick={closeModal}
                      >
                        <i className="bi bi-arrow-left me-2"></i>
                        Continue Shopping
                      </button>
                      <button
                      style={{border: '1px solid #fff'}}
                        type="button"
                        className="btn btn-primary btn-lg checkout-btn"
                        onClick={handleCheckout}
                      >
                        <i className="bi bi-credit-card me-2"></i>
                        Proceed to Checkout
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CartModal;
