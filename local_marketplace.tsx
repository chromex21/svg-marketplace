import React, { useState, useEffect } from 'react';
import { Search, Plus, X, ChevronLeft, ChevronRight, MessageCircle, Phone, MapPin, Calendar, Package, AlertCircle, Filter, Heart, Share2, Bell, User, Menu, Home, List, Clock, Eye, CheckCircle, XCircle, Store } from 'lucide-react';

const LocalMarketplace = () => {
  const [currentView, setCurrentView] = useState('home');
  const [currentScreen, setCurrentScreen] = useState('browse');
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [priceFilter, setPriceFilter] = useState({ min: '', max: '' });
  const [conditionFilter, setConditionFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [userListings, setUserListings] = useState([]);

  const svgLocations = ['All Locations', 'Kingstown', 'Calliaqua', 'Georgetown', 'Barrouallie', 'Chateaubelair', 'Layou', 'Bequia', 'Mustique', 'Canouan', 'Union Island', 'Mayreau'];
  
  const parishes = ['All Parishes', 'Saint George', 'Saint Andrew', 'Saint David', 'Saint Patrick', 'Charlotte', 'Grenadines'];

  const categories = ['All', 'iPhones', 'Samsung Phones', 'Other Phones', 'Tablets', 'Laptops', 'Electronics', 'Vehicles', 'Furniture', 'Appliances', 'Clothing', 'Food & Wholesale', 'Other'];

  const conditions = ['All', 'Brand New', 'Like New', 'Good', 'Fair', 'For Parts'];

  useEffect(() => {
    const sampleProducts = [
      {
        id: 1,
        title: 'iPhone 13 Pro 256GB',
        price: 2500,
        condition: 'Like New',
        category: 'iPhones',
        description: 'iPhone 13 Pro in excellent condition. Battery health 95%. No scratches on screen. Original box included.',
        images: ['https://images.unsplash.com/photo-1632661674596-df8be070a5c5?w=800'],
        seller: {
          name: 'John Doe',
          whatsapp: '+1758-555-0123',
          phone: '+1758-555-0123',
          location: 'Kingstown',
          parish: 'Saint George',
          rating: 4.8,
          responseTime: '< 1 hour',
          verified: true
        },
        specs: {
          'Storage': '256GB',
          'Battery Health': '95%',
          'Color': 'Graphite',
          'Original Box': 'Yes'
        },
        postedDate: '2025-01-20T10:00:00',
        expiresDate: '2025-02-19T10:00:00',
        views: 156,
        favorites: 23,
        isActive: true
      },
      {
        id: 2,
        title: 'Fresh Produce Wholesale',
        price: 0,
        condition: 'Brand New',
        category: 'Food & Wholesale',
        description: 'Fresh dasheen, yams, plantains. Daily delivery across SVG. Call for current prices.',
        images: ['https://images.unsplash.com/photo-1488459716781-31db52582fe9?w=800'],
        seller: {
          name: 'SVG Fresh Farms',
          businessName: 'SVG Fresh Farms',
          whatsapp: '+1758-555-0456',
          phone: '+1758-555-0456',
          location: 'Georgetown',
          parish: 'Saint Andrew',
          rating: 4.9,
          responseTime: '< 30 min',
          verified: true,
          businessHours: 'Mon-Sat: 6am-6pm'
        },
        specs: {
          'Business Type': 'Wholesale',
          'Delivery': 'Available',
          'Payment': 'Cash, Transfer'
        },
        postedDate: '2025-01-10T07:00:00',
        expiresDate: '2025-04-10T07:00:00',
        views: 542,
        favorites: 87,
        isActive: true,
        isBusiness: true
      }
    ];
    
    setProducts(sampleProducts);
    setUserListings([sampleProducts[0]]);

    setNotifications([
      {
        id: 1,
        type: 'expiring',
        title: 'Listing Expiring Soon',
        message: 'Your "iPhone 13 Pro 256GB" expires in 5 days',
        timestamp: '2025-01-25T08:00:00',
        read: false
      },
      {
        id: 2,
        type: 'message',
        title: 'New Message',
        message: 'Someone asked about your iPhone',
        timestamp: '2025-01-24T15:30:00',
        read: false
      }
    ]);
  }, []);

  const ProductCard = ({ product, onClick }) => (
    <div onClick={onClick} className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer overflow-hidden">
      <div className="aspect-square bg-gray-100 relative">
        {product.images?.[0] ? (
          <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
        ) : (
          <div className="flex items-center justify-center h-full">
            <Package size={48} className="text-gray-400" />
          </div>
        )}
        <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-semibold">
          {product.condition}
        </div>
        {product.isBusiness && (
          <div className="absolute top-2 left-2 bg-blue-600 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
            <Store size={12} />
            Business
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
        <p className="text-2xl font-bold text-blue-600 mb-2">
          {product.price > 0 ? `EC$${product.price.toLocaleString()}` : 'Contact for price'}
        </p>
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <MapPin size={14} />
            {product.seller.location}
          </span>
          <span>{new Date(product.postedDate).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );

  const ProductDetail = ({ product }) => {
    const estimateValue = () => {
      if (!product.price || product.isBusiness) return null;
      const multipliers = { 'Brand New': 1.0, 'Like New': 0.85, 'Good': 0.65, 'Fair': 0.45, 'For Parts': 0.20 };
      const multiplier = multipliers[product.condition] || 0.5;
      const market = product.price / multiplier;
      if (product.price > market * 1.3) return { status: 'high', msg: 'Priced higher than typical market value for this condition' };
      if (product.price < market * 0.7) return { status: 'deal', msg: 'Great deal! Below typical market price' };
      return { status: 'fair', msg: 'Price is in line with market value' };
    };

    const valueCheck = estimateValue();
    const daysLeft = Math.ceil((new Date(product.expiresDate) - new Date()) / (86400000));

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-6xl mx-auto p-4 md:p-6">
          <button onClick={() => setSelectedProduct(null)} className="flex items-center gap-2 mb-6 text-blue-600">
            <ChevronLeft size={20} />
            Back
          </button>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <div className="relative bg-gray-100 rounded-lg overflow-hidden aspect-square">
                {product.images?.[0] ? (
                  <>
                    <img src={product.images[currentImageIndex]} alt={product.title} className="w-full h-full object-cover" />
                    {product.images.length > 1 && (
                      <>
                        <button onClick={() => setCurrentImageIndex((currentImageIndex - 1 + product.images.length) % product.images.length)} className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full">
                          <ChevronLeft size={24} />
                        </button>
                        <button onClick={() => setCurrentImageIndex((currentImageIndex + 1) % product.images.length)} className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full">
                          <ChevronRight size={24} />
                        </button>
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/60 text-white px-3 py-1 rounded text-sm">
                          {currentImageIndex + 1} / {product.images.length}
                        </div>
                      </>
                    )}
                  </>
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Package size={64} className="text-gray-400" />
                  </div>
                )}
              </div>
            </div>

            <div className="bg-white rounded-lg p-6">
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                <span className="flex items-center gap-1">
                  <Calendar size={16} />
                  {new Date(product.postedDate).toLocaleDateString()}
                </span>
                <span className="flex items-center gap-1">
                  <Eye size={16} />
                  {product.views} views
                </span>
              </div>

              <div className="text-4xl font-bold text-blue-600 mb-4">
                {product.price > 0 ? `EC$${product.price.toLocaleString()}` : 'Contact for pricing'}
              </div>

              <div className="flex gap-3 mb-6">
                <span className={`px-4 py-2 rounded-full text-sm font-semibold ${
                  product.condition === 'Brand New' ? 'bg-green-100 text-green-800' :
                  product.condition === 'Like New' ? 'bg-blue-100 text-blue-800' :
                  'bg-yellow-100 text-yellow-800'
                }`}>
                  {product.condition}
                </span>
                <span className="px-4 py-2 bg-gray-100 rounded-full text-sm font-semibold">
                  {product.category}
                </span>
              </div>

              {valueCheck && (
                <div className={`p-4 rounded-lg mb-6 ${
                  valueCheck.status === 'high' ? 'bg-red-50 border border-red-200' :
                  valueCheck.status === 'deal' ? 'bg-green-50 border border-green-200' :
                  'bg-blue-50 border border-blue-200'
                }`}>
                  <div className="flex gap-2">
                    <AlertCircle size={20} className={valueCheck.status === 'high' ? 'text-red-600' : valueCheck.status === 'deal' ? 'text-green-600' : 'text-blue-600'} />
                    <div>
                      <p className="font-semibold">{valueCheck.status === 'high' ? 'Price Alert' : valueCheck.status === 'deal' ? 'Great Deal!' : 'Fair Price'}</p>
                      <p className="text-sm mt-1">{valueCheck.msg}</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="border-t border-b py-6 my-6">
                <h2 className="font-bold text-lg mb-3">Description</h2>
                <p className="text-gray-700">{product.description}</p>
              </div>

              {product.specs && (
                <div className="mb-6">
                  <h2 className="font-bold text-lg mb-3">Specifications</h2>
                  <div className="grid grid-cols-2 gap-3">
                    {Object.entries(product.specs).map(([key, val]) => (
                      <div key={key} className="bg-gray-50 p-3 rounded">
                        <p className="text-sm text-gray-600">{key}</p>
                        <p className="font-semibold">{val}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-gray-50 rounded-lg p-6">
                <h2 className="font-bold text-lg mb-4">Seller Information</h2>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-lg">{product.seller.businessName || product.seller.name}</span>
                    <span className="text-yellow-600 flex items-center gap-1">
                      ⭐ {product.seller.rating}
                      {product.seller.verified && <CheckCircle size={16} className="text-blue-600" />}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-700">
                    <MapPin size={18} />
                    {product.seller.location}, {product.seller.parish}
                  </div>
                  <div className="text-sm text-green-600">
                    ⚡ Responds in {product.seller.responseTime}
                  </div>
                  {product.seller.businessHours && (
                    <div className="text-sm text-gray-600">
                      <Clock size={16} className="inline mr-1" />
                      {product.seller.businessHours}
                    </div>
                  )}
                  
                  <div className="pt-4 space-y-2">
                    <a
                      href={`https://wa.me/${product.seller.whatsapp.replace(/[^0-9]/g, '')}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700"
                    >
                      <MessageCircle size={20} />
                      WhatsApp
                    </a>
                    <a
                      href={`tel:${product.seller.phone}`}
                      className="flex items-center justify-center gap-2 w-full border-2 border-blue-600 text-blue-600 py-3 rounded-lg font-semibold hover:bg-blue-50"
                    >
                      <Phone size={20} />
                      Call
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const NotificationsScreen = () => (
    <div className="max-w-3xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Notifications</h2>
      <div className="space-y-3">
        {notifications.map(n => (
          <div key={n.id} className={`p-4 rounded-lg border ${n.read ? 'bg-white' : 'bg-blue-50 border-blue-200'}`}>
            <div className="flex gap-3">
              <div className={`p-2 rounded-full ${n.type === 'expiring' ? 'bg-orange-100' : 'bg-green-100'}`}>
                {n.type === 'expiring' ? <Clock size={20} className="text-orange-600" /> : <MessageCircle size={20} className="text-green-600" />}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{n.title}</h3>
                <p className="text-sm text-gray-600 mt-1">{n.message}</p>
                <p className="text-xs text-gray-400 mt-2">{new Date(n.timestamp).toLocaleString()}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const MyListingsScreen = () => (
    <div className="max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">My Listings</h2>
        <button onClick={() => setCurrentView('create')} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold">
          <Plus size={20} />
          New
        </button>
      </div>

      <div className="space-y-4">
        {userListings.map(p => {
          const daysLeft = Math.ceil((new Date(p.expiresDate) - new Date()) / 86400000);
          return (
            <div key={p.id} className="bg-white rounded-lg shadow p-4">
              <div className="flex gap-4">
                <div className="w-32 h-32 bg-gray-100 rounded flex-shrink-0">
                  {p.images?.[0] ? (
                    <img src={p.images[0]} alt={p.title} className="w-full h-full object-cover rounded" />
                  ) : (
                    <div className="flex items-center justify-center h-full">
                      <Package size={32} className="text-gray-400" />
                    </div>
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-xl font-semibold">{p.title}</h3>
                    <span className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm font-semibold ${
                      p.isActive ? 'bg-green-100 text-green-700' : 'bg-gray-100'
                    }`}>
                      {p.isActive ? <><CheckCircle size={16} />Active</> : <><XCircle size={16} />Inactive</>}
                    </span>
                  </div>
                  <p className="text-2xl font-bold text-blue-600 mb-3">
                    {p.price > 0 ? `EC$${p.price.toLocaleString()}` : 'Contact for price'}
                  </p>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm">
                    <div className="flex items-center gap-2">
                      <Eye size={16} className="text-gray-400" />
                      {p.views} views
                    </div>
                    <div className="flex items-center gap-2">
                      <Heart size={16} className="text-gray-400" />
                      {p.favorites} saves
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar size={16} className="text-gray-400" />
                      {new Date(p.postedDate).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={16} className={daysLeft <= 7 ? 'text-orange-500' : 'text-gray-400'} />
                      <span className={daysLeft <= 7 ? 'text-orange-600 font-semibold' : ''}>{daysLeft}d left</span>
                    </div>
                  </div>
                  {daysLeft <= 7 && (
                    <div className="p-2 bg-orange-50 border border-orange-200 rounded mb-3 text-sm text-orange-800">
                      ⚠️ Expiring soon. Renew to keep active.
                    </div>
                  )}
                  <div className="flex gap-2 flex-wrap">
                    <button className="px-3 py-1.5 border rounded hover:bg-gray-50 text-sm font-semibold">Edit</button>
                    <button className="px-3 py-1.5 border rounded hover:bg-gray-50 text-sm font-semibold">Renew</button>
                    <button className="px-3 py-1.5 border rounded hover:bg-gray-50 text-sm font-semibold">Mark Sold</button>
                    <button className="px-3 py-1.5 border border-red-300 text-red-600 rounded hover:bg-red-50 text-sm font-semibold">Delete</button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  const BrowseScreen = () => {
    const filtered = products.filter(p => {
      const search = p.title.toLowerCase().includes(searchQuery.toLowerCase()) || p.description.toLowerCase().includes(searchQuery.toLowerCase());
      const cat = selectedCategory === 'All' || p.category === selectedCategory;
      const loc = selectedLocation === 'All Locations' || p.seller.location === selectedLocation;
      const cond = conditionFilter === 'All' || p.condition === conditionFilter;
      const price = (!priceFilter.min || p.price >= parseFloat(priceFilter.min)) && (!priceFilter.max || p.price <= parseFloat(priceFilter.max));
      return search && cat && loc && cond && price;
    });

    return (
      <>
        <div className="bg-white shadow-sm sticky top-0 z-10 p-4">
          <div className="max-w-7xl mx-auto">
            <div className="flex gap-4 mb-3">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border rounded-lg"
                />
              </div>
              <button onClick={() => setShowFilters(!showFilters)} className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
                <Filter size={20} />
                Filters
              </button>
            </div>

            {showFilters && (
              <div className="p-4 bg-gray-50 rounded-lg grid grid-cols-2 md:grid-cols-4 gap-3">
                <select value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)} className="p-2 border rounded">
                  {categories.map(c => <option key={c}>{c}</option>)}
                </select>
                <select value={selectedLocation} onChange={(e) => setSelectedLocation(e.target.value)} className="p-2 border rounded">
                  {svgLocations.map(l => <option key={l}>{l}</option>)}
                </select>
                <select value={conditionFilter} onChange={(e) => setConditionFilter(e.target.value)} className="p-2 border rounded">
                  {conditions.map(c => <option key={c}>{c}</option>)}
                </select>
                <div className="flex gap-2">
                  <input type="number" placeholder="Min $" value={priceFilter.min} onChange={(e) => setPriceFilter({...priceFilter, min: e.target.value})} className="w-1/2 p-2 border rounded" />
                  <input type="number" placeholder="Max $" value={priceFilter.max} onChange={(e) => setPriceFilter({...priceFilter, max: e.target.value})} className="w-1/2 p-2 border rounded" />
                </div>
              </div>
            )}
          </div>
        </div>

        <main className="max-w-7xl mx-auto p-4">
          {filtered.length === 0 ? (
            <div className="text-center py-16">
              <Package size={64} className="mx-auto text-gray-400 mb-4" />
              <h3 className="text-xl font-semibold text-gray-600">No products found</h3>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {filtered.map(p => <ProductCard key={p.id} product={p} onClick={() => setSelectedProduct(p)} />)}
            </div>
          )}
        </main>
      </>
    );
  };

  const CreateListingForm = () => {
    const [step, setStep] = useState(1);
    const [formData, setFormData] = useState({
      title: '',
      price: '',
      condition: 'Brand New',
      category: 'Electronics',
      description: '',
      listingType: 'regular',
      specs: {},
      seller: {
        name: '',
        businessName: '',
        whatsapp: '',
        phone: '',
        location: 'Kingstown',
        parish: 'Saint George',
        businessHours: ''
      }
    });

    const [newSpecKey, setNewSpecKey] = useState('');
    const [newSpecValue, setNewSpecValue] = useState('');

    const addSpec = () => {
      if (newSpecKey && newSpecValue) {
        setFormData({ ...formData, specs: { ...formData.specs, [newSpecKey]: newSpecValue } });
        setNewSpecKey('');
        setNewSpecValue('');
      }
    };

    const removeSpec = (key) => {
      const newSpecs = { ...formData.specs };
      delete newSpecs[key];
      setFormData({ ...formData, specs: newSpecs });
    };

    const handleSubmit = () => {
      const newProduct = {
        id: Date.now(),
        ...formData,
        price: parseFloat(formData.price) || 0,
        images: ['https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800'],
        postedDate: new Date().toISOString(),
        expiresDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        views: 0,
        favorites: 0,
        isActive: true,
        isBusiness: formData.listingType !== 'regular',
        seller: {
          ...formData.seller,
          rating: 5.0,
          responseTime: '< 1 hour',
          verified: false
        }
      };

      setProducts([newProduct, ...products]);
      setUserListings([newProduct, ...userListings]);
      setCurrentView('home');
      setCurrentScreen('my-listings');
    };

    return (
      <div className="min-h-screen bg-gray-50">
        <div className="max-w-3xl mx-auto p-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold">Create Listing</h2>
            <button onClick={() => setCurrentView('home')} className="text-gray-600 hover:text-gray-900">
              <X size={24} />
            </button>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-between mb-8">
            {[1, 2, 3].map((s) => (
              <React.Fragment key={s}>
                <div className={`flex items-center justify-center w-10 h-10 rounded-full font-semibold ${
                  step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  {s}
                </div>
                {s < 3 && <div className={`flex-1 h-1 mx-2 ${
                  step > s ? 'bg-blue-600' : 'bg-gray-200'
                }`} />}
              </React.Fragment>
            ))}
          </div>

          <div className="bg-white rounded-lg shadow p-6 space-y-6">
            {/* Step 1: Basic Info */}
            {step === 1 && (
              <>
                <div>
                  <label className="block text-sm font-semibold mb-2">Listing Type *</label>
                  <div className="grid grid-cols-3 gap-3">
                    {[['regular', 'Single Item'], ['business', 'Business/Store'], ['wholesale', 'Wholesale']].map(([type, label]) => (
                      <button
                        key={type}
                        type="button"
                        onClick={() => setFormData({ ...formData, listingType: type })}
                        className={`p-3 border-2 rounded-lg text-center font-semibold ${
                          formData.listingType === type ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Title *</label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    className="w-full p-3 border rounded-lg"
                    placeholder="e.g., iPhone 13 Pro 256GB"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold mb-2">Price (EC$) *</label>
                    <input
                      type="number"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full p-3 border rounded-lg"
                      placeholder="0.00"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold mb-2">Condition *</label>
                    <select
                      value={formData.condition}
                      onChange={(e) => setFormData({ ...formData, condition: e.target.value })}
                      className="w-full p-3 border rounded-lg"
                    >
                      {conditions.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Category *</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full p-3 border rounded-lg"
                  >
                    {categories.filter(c => c !== 'All').map(c => <option key={c}>{c}</option>)}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2">Description *</label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full p-3 border rounded-lg h-32"
                    placeholder="Provide detailed information..."
                  />
                  <p className="text-sm text-gray-600 mt-1">Be honest and detailed to help buyers decide.</p>
                </div>

                <button
                  onClick={() => setStep(2)}
                  disabled={!formData.title || !formData.price || !formData.description}
                  className="w-full px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                >
                  Next: Specifications
                </button>
              </>
            )}

            {/* Step 2: Specifications */}
            {step === 2 && (
              <>
                <div>
                  <label className="block text-sm font-semibold mb-3">Product Specifications</label>
                  <div className="space-y-2 mb-4">
                    {Object.entries(formData.specs).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-2 p-3 bg-gray-50 rounded">
                        <span className="font-medium">{key}:</span>
                        <span className="flex-1">{value}</span>
                        <button
                          type="button"
                          onClick={() => removeSpec(key)}
                          className="text-red-600 hover:text-red-700"
                        >
                          <X size={18} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={newSpecKey}
                      onChange={(e) => setNewSpecKey(e.target.value)}
                      className="flex-1 p-2 border rounded"
                      placeholder="Name (e.g., Storage)"
                    />
                    <input
                      type="text"
                      value={newSpecValue}
                      onChange={(e) => setNewSpecValue(e.target.value)}
                      className="flex-1 p-2 border rounded"
                      placeholder="Value (e.g., 256GB)"
                    />
                    <button
                      type="button"
                      onClick={addSpec}
                      className="px-4 py-2 bg-blue-600 text-white rounded font-semibold"
                    >
                      Add
                    </button>
                  </div>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(1)}
                    className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold"
                  >
                    Back
                  </button>
                  <button
                    onClick={() => setStep(3)}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold"
                  >
                    Next: Contact Info
                  </button>
                </div>
              </>
            )}

            {/* Step 3: Contact Info */}
            {step === 3 && (
              <>
                <div className="space-y-4">
                  {formData.listingType !== 'regular' && (
                    <div>
                      <label className="block text-sm font-semibold mb-2">Business Name</label>
                      <input
                        type="text"
                        value={formData.seller.businessName}
                        onChange={(e) => setFormData({ ...formData, seller: { ...formData.seller, businessName: e.target.value } })}
                        className="w-full p-3 border rounded-lg"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-semibold mb-2">Your Name *</label>
                    <input
                      type="text"
                      value={formData.seller.name}
                      onChange={(e) => setFormData({ ...formData, seller: { ...formData.seller, name: e.target.value } })}
                      className="w-full p-3 border rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">WhatsApp *</label>
                      <input
                        type="tel"
                        value={formData.seller.whatsapp}
                        onChange={(e) => setFormData({ ...formData, seller: { ...formData.seller, whatsapp: e.target.value } })}
                        className="w-full p-3 border rounded-lg"
                        placeholder="+1758-555-0123"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Phone *</label>
                      <input
                        type="tel"
                        value={formData.seller.phone}
                        onChange={(e) => setFormData({ ...formData, seller: { ...formData.seller, phone: e.target.value } })}
                        className="w-full p-3 border rounded-lg"
                        placeholder="+1758-555-0123"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold mb-2">Location *</label>
                      <select
                        value={formData.seller.location}
                        onChange={(e) => setFormData({ ...formData, seller: { ...formData.seller, location: e.target.value } })}
                        className="w-full p-3 border rounded-lg"
                      >
                        {svgLocations.filter(l => l !== 'All Locations').map(l => <option key={l}>{l}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold mb-2">Parish *</label>
                      <select
                        value={formData.seller.parish}
                        onChange={(e) => setFormData({ ...formData, seller: { ...formData.seller, parish: e.target.value } })}
                        className="w-full p-3 border rounded-lg"
                      >
                        {parishes.filter(p => p !== 'All Parishes').map(p => <option key={p}>{p}</option>)}
                      </select>
                    </div>
                  </div>

                  {formData.listingType !== 'regular' && (
                    <div>
                      <label className="block text-sm font-semibold mb-2">Business Hours</label>
                      <input
                        type="text"
                        value={formData.seller.businessHours}
                        onChange={(e) => setFormData({ ...formData, seller: { ...formData.seller, businessHours: e.target.value } })}
                        className="w-full p-3 border rounded-lg"
                        placeholder="e.g., Mon-Sat: 8am-6pm"
                      />
                    </div>
                  )}
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={() => setStep(2)}
                    className="flex-1 px-6 py-3 border border-gray-300 rounded-lg font-semibold"
                  >
                    Back
                  </button>
                  <button
                    onClick={handleSubmit}
                    disabled={!formData.seller.name || !formData.seller.whatsapp || !formData.seller.phone}
                    className="flex-1 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Publish Listing
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    );
  };

  const MessagesScreen = () => (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6">Messages</h2>
      <div className="bg-white rounded-lg shadow divide-y">
        {[
          { id: 1, from: 'Sarah Johnson', product: 'iPhone 13 Pro', message: 'Is this still available?', time: '2h ago', unread: true },
          { id: 2, from: 'Mike Peters', product: 'Samsung Galaxy S23', message: 'Can you deliver to Bequia?', time: '1d ago', unread: false }
        ].map(msg => (
          <div key={msg.id} className={`p-4 hover:bg-gray-50 cursor-pointer ${
            msg.unread ? 'bg-blue-50' : ''
          }`}>
            <div className="flex items-start gap-3">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                <User size={24} className="text-gray-600" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <h3 className="font-semibold">{msg.from}</h3>
                  <span className="text-xs text-gray-500">{msg.time}</span>
                </div>
                <p className="text-sm text-gray-600">Re: {msg.product}</p>
                <p className="text-sm mt-1">{msg.message}</p>
              </div>
              {msg.unread && (
                <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const BottomNav = () => (
    <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
      <div className="grid grid-cols-5 gap-1 p-2">
        {[
          { screen: 'browse', icon: Home, label: 'Browse' },
          { screen: 'my-listings', icon: List, label: 'My Items' },
          { screen: 'messages', icon: Mail, label: 'Messages' },
          { screen: 'notifications', icon: Bell, label: 'Alerts' },
          { screen: 'profile', icon: User, label: 'Profile' }
        ].map(({ screen, icon: Icon, label }) => (
          <button
            key={screen}
            onClick={() => setCurrentScreen(screen)}
            className={`flex flex-col items-center py-2 ${currentScreen === screen ? 'text-blue-600' : 'text-gray-600'}`}
          >
            <Icon size={24} />
            <span className="text-xs mt-1">{label}</span>
            {screen === 'notifications' && notifications.filter(n => !n.read).length > 0 && (
              <span className="absolute top-1 right-1/4 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
            {screen === 'messages' && (
              <span className="absolute top-1 right-1/4 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                1
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );

  if (selectedProduct) return <ProductDetail product={selectedProduct} />;
  if (currentView === 'create') return <CreateListingForm />;

  return (
    <div className="min-h-screen bg-gray-50 pb-20 md:pb-0">
      <header className="bg-blue-600 text-white p-4 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold">SVG Market</h1>
            <span className="hidden md:inline text-sm bg-blue-700 px-2 py-1 rounded">Saint Vincent & the Grenadines</span>
          </div>
          <button onClick={() => setCurrentView('create')} className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold">
            <Plus size={20} />
            <span className="hidden md:inline">Sell Item</span>
          </button>
        </div>
      </header>

      {currentScreen === 'browse' && <BrowseScreen />}
      {currentScreen === 'my-listings' && <MyListingsScreen />}
      {currentScreen === 'messages' && <MessagesScreen />}
      {currentScreen === 'notifications' && <NotificationsScreen />}
      {currentScreen === 'profile' && (
        <div className="max-w-3xl mx-auto p-4">
          <h2 className="text-2xl font-bold mb-4">Profile</h2>
          <p className="text-gray-600">Profile management coming soon...</p>
        </div>
      )}

      <BottomNav />
    </div>
  );
};

export default LocalMarketplace;