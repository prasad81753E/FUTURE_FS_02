import Header from '@/components/Header';
import FilterBar from '@/components/FilterBar';
import ProductGrid from '@/components/ProductGrid';
import CartSidebar from '@/components/CartSidebar';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CartSidebar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Shop Our Collection</h1>
          <p className="text-muted-foreground">
            Discover amazing products at great prices
          </p>
        </div>
        
        <FilterBar />
        <ProductGrid />
      </main>
    </div>
  );
};

export default Index;
