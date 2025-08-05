import { Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Product } from '@/store/slices/productsSlice';
import { useAppDispatch } from '@/hooks/useAppSelector';
import { addToCart } from '@/store/slices/cartSlice';
import { useNavigate } from 'react-router-dom';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(addToCart(product));
  };

  const handleCardClick = () => {
    navigate(`/product/${product.id}`);
  };

  return (
    <Card 
      className="h-full cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-[1.02]"
      onClick={handleCardClick}
    >
      <CardHeader className="p-0">
        <div className="relative overflow-hidden rounded-t-lg">
          <img
            src={product.thumbnail}
            alt={product.title}
            className="w-full h-48 object-cover transition-transform duration-200 hover:scale-110"
          />
          <Badge className="absolute top-2 right-2" variant="secondary">
            {product.category}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4">
        <CardTitle className="text-lg mb-2 line-clamp-2">{product.title}</CardTitle>
        <CardDescription className="text-sm mb-3 line-clamp-2">
          {product.description}
        </CardDescription>
        
        <div className="flex items-center justify-between mb-2">
          <span className="text-2xl font-bold text-primary">${product.price}</span>
          <div className="flex items-center space-x-1">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-sm text-muted-foreground">{product.rating}</span>
          </div>
        </div>
        
        <div className="text-sm text-muted-foreground">
          {product.stock > 0 ? (
            <span className="text-green-600">In Stock ({product.stock})</span>
          ) : (
            <span className="text-red-500">Out of Stock</span>
          )}
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleAddToCart}
          disabled={product.stock === 0}
          className="w-full"
        >
          <ShoppingCart className="h-4 w-4 mr-2" />
          Add to Cart
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;