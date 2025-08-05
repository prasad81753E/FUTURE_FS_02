import { useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import ProductCard from './ProductCard';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppSelector';
import { fetchProducts } from '@/store/slices/productsSlice';

const ProductGrid = () => {
  const dispatch = useAppDispatch();
  const { filteredProducts, loading, error } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <Loader2 className="h-8 w-8 animate-spin" />
        <span className="ml-2">Loading products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <p className="text-red-500 mb-2">Error loading products</p>
          <p className="text-muted-foreground">{error}</p>
        </div>
      </div>
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <p className="text-lg font-medium mb-2">No products found</p>
          <p className="text-muted-foreground">Try adjusting your search or filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {filteredProducts.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;