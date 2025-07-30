// когда будет бэк, заменить на реальный API
const loadProductsFromJson = async () => {
  try {
    const response = await fetch('/json/products.json');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Ошибка загрузки товаров:', error);
    return [];
  }
};

export const getFilterOptions = (products) => {
  const uniqueCategories = [...new Set(products.map(product => product.category))].sort();
  const uniqueBrands = [...new Set(products.map(product => product.brand))].sort();
  const uniqueSizes = [...new Set(products.flatMap(product => product.sizes))].sort((a, b) => {
    const numA = Number(a);
    const numB = Number(b);
    return numA - numB;
  });
  
  const maxPriceLimit = Math.max(...products.map((product) => product.price));
  
  return {
    uniqueCategories,
    uniqueBrands,
    uniqueSizes,
    maxPriceLimit
  };
};

export const filterProducts = (products, filters) => {
  return products.filter(
    (product) =>
      product.price >= filters.minPrice &&
      product.price <= filters.maxPrice &&
      (filters.genders.length === 0 || filters.genders.includes(product.gender)) &&
      (filters.categories.length === 0 || filters.categories.includes(product.category)) &&
      (filters.brands.length === 0 || filters.brands.includes(product.brand)) &&
      (filters.sizes.length === 0 || filters.sizes.some(size => product.sizes.includes(size)))
  );
};

export const paginateProducts = (products, page, limit) => {
  const totalPages = Math.ceil(products.length / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const productsToDisplay = products.slice(startIndex, endIndex);
  
  return {
    products: productsToDisplay,
    totalPages,
    currentPage: page,
    totalProducts: products.length
  };
};

export const fetchProducts = async (allProducts, filters, page, limit) => {
  console.log('Вызов fetchProducts с параметрами:', { filters, page, limit });

  const filteredProducts = filterProducts(allProducts, filters);
  
  const paginationResult = paginateProducts(filteredProducts, page, limit);
  
  return {
    products: paginationResult.products,
    totalProducts: paginationResult.totalProducts,
    totalPages: paginationResult.totalPages,
    currentPage: paginationResult.currentPage,
  };
};

export const initializeProducts = async () => {
  const allProducts = await loadProductsFromJson();
  const filterOptions = getFilterOptions(allProducts);
  
  return {
    allProducts,
    ...filterOptions
  };
};