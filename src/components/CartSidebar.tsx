import { Minus, Plus, X, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppSelector';
import { toggleCart, removeFromCart, updateQuantity } from '@/store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

const CartSidebar = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { items, isOpen, total } = useAppSelector((state) => state.cart);

  const handleCheckout = () => {
    dispatch(toggleCart());
    navigate('/checkout');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex">
      <div 
        className="flex-1 bg-black/50" 
        onClick={() => dispatch(toggleCart())}
      />
      
      <div className="w-full max-w-md bg-background border-l shadow-lg">
        <Card className="h-full rounded-none border-0">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
            <CardTitle className="flex items-center space-x-2">
              <ShoppingBag className="h-5 w-5" />
              <span>Shopping Cart</span>
            </CardTitle>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => dispatch(toggleCart())}
            >
              <X className="h-4 w-4" />
            </Button>
          </CardHeader>
          
          <CardContent className="flex flex-col h-full">
            {items.length === 0 ? (
              <div className="flex-1 flex items-center justify-center">
                <div className="text-center">
                  <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-lg font-medium mb-2">Your cart is empty</p>
                  <p className="text-muted-foreground">Add some products to get started!</p>
                </div>
              </div>
            ) : (
              <>
                <div className="flex-1 space-y-4 overflow-y-auto">
                  {items.map((item) => (
                    <div key={item.product.id} className="flex space-x-3 p-3 border rounded-lg">
                      <img
                        src={item.product.thumbnail}
                        alt={item.product.title}
                        className="w-16 h-16 object-cover rounded"
                      />
                      
                      <div className="flex-1 space-y-2">
                        <h4 className="font-medium text-sm line-clamp-2">
                          {item.product.title}
                        </h4>
                        
                        <div className="flex items-center justify-between">
                          <span className="font-semibold">${item.product.price}</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => dispatch(removeFromCart(item.product.id))}
                            className="text-red-500 hover:text-red-700"
                          >
                            <X className="h-3 w-3" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => dispatch(updateQuantity({ 
                              id: item.product.id, 
                              quantity: item.quantity - 1 
                            }))}
                          >
                            <Minus className="h-3 w-3" />
                          </Button>
                          
                          <Badge variant="secondary" className="px-3">
                            {item.quantity}
                          </Badge>
                          
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => dispatch(updateQuantity({ 
                              id: item.product.id, 
                              quantity: item.quantity + 1 
                            }))}
                          >
                            <Plus className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="border-t pt-4 space-y-4">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                  
                  <Button onClick={handleCheckout} className="w-full" size="lg">
                    Proceed to Checkout
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CartSidebar;