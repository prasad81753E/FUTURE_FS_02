import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Star, ShoppingCart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppSelector';
import { fetchProductById, clearSelectedProduct } from '@/store/slices/productsSlice';
import { addToCart } from '@/store/slices/cartSlice';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { selectedProduct } = useAppSelector((state) => state.products);
  const [selectedImage, setSelectedImage] = useState(0);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(Number(id)));
    }
    
    return () => {
      dispatch(clearSelectedProduct());
    };
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      setSelectedImage(0);
    }
  }, [selectedProduct]);

  if (!selectedProduct) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-64">
          <div className="text-center">
            <p className="text-lg">Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    dispatch(addToCart(selectedProduct));
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        onClick={() => navigate(-1)}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-square overflow-hidden rounded-lg border">
            <img
              src={selectedProduct.images[selectedImage] || selectedProduct.thumbnail}
              alt={selectedProduct.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {selectedProduct.images.length > 1 && (
            <div className="flex space-x-2 overflow-x-auto">
              {selectedProduct.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`flex-shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden ${
                    selectedImage === index ? 'border-primary' : 'border-muted'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${selectedProduct.title} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="space-y-6">
          <div>
            <Badge className="mb-2">{selectedProduct.category}</Badge>
            <h1 className="text-3xl font-bold mb-2">{selectedProduct.title}</h1>
            <div className="flex items-center space-x-4 mb-4">
              <div className="flex items-center space-x-1">
                <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{selectedProduct.rating}</span>
              </div>
              <span className="text-muted-foreground">•</span>
              <span className="text-muted-foreground">{selectedProduct.brand}</span>
            </div>
          </div>

          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-primary">
                ${selectedProduct.price}
              </CardTitle>
              <CardDescription>
                {selectedProduct.stock > 0 ? (
                  <span className="text-green-600 font-medium">
                    In Stock ({selectedProduct.stock} available)
                  </span>
                ) : (
                  <span className="text-red-500 font-medium">Out of Stock</span>
                )}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button
                onClick={handleAddToCart}
                disabled={selectedProduct.stock === 0}
                className="w-full"
                size="lg"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Add to Cart
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Description</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground leading-relaxed">
                {selectedProduct.description}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;