import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useAppDispatch, useAppSelector } from '@/hooks/useAppSelector';
import { setSelectedCategory } from '@/store/slices/productsSlice';

const FilterBar = () => {
  const dispatch = useAppDispatch();
  const { categories, selectedCategory } = useAppSelector((state) => state.products);

  const handleCategoryChange = (value: string) => {
    dispatch(setSelectedCategory(value === 'all' ? '' : value));
  };

  const clearFilters = () => {
    dispatch(setSelectedCategory(''));
  };

  return (
    <div className="flex items-center space-x-4 mb-6">
      <div className="flex items-center space-x-2">
        <span className="text-sm font-medium">Category:</span>
        <Select value={selectedCategory || 'all'} onValueChange={handleCategoryChange}>
          <SelectTrigger className="w-48">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category.charAt(0).toUpperCase() + category.slice(1)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {selectedCategory && (
        <Button variant="outline" size="sm" onClick={clearFilters}>
          Clear Filters
        </Button>
      )}
    </div>
  );
};

export default FilterBar;