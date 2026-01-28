'use client';

import React, { useState, useEffect } from 'react';
import { Search, Plus, X, ChevronLeft, ChevronRight, MessageCircle, Phone, MapPin, Calendar, Package, AlertCircle, Filter, Heart, Bell, User, Home, List, Clock, Eye, CheckCircle, XCircle, Store, LogOut, Menu } from 'lucide-react';
import { useAuth } from './auth/AuthProvider';
import AuthModal from './auth/AuthModal';
import { supabase } from '@/lib/supabase/client';

const MarketplaceClient = () => {
  const { user, profile, signOut } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [currentScreen, setCurrentScreen] = useState('browse');
  const [products, setProducts] = useState([]);
  const [myListings, setMyListings] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [loading, setLoading] = useState(true);

  // Categories for filters
  const categories = ['All', 'Mobile Phones', 'Electronics', 'Vehicles', 'Home & Garden', 'Fashion', 'Food & Wholesale', 'Other'];
  const [selectedCategory, setSelectedCategory] = useState('All');

  // Reset to browse when user logs in
  useEffect(() => {
    if (user) {
      setCurrentScreen('browse');
    }
  }, [user]);

  // Load listings from Supabase
  useEffect(() => {
    loadListings();
  }, [selectedCategory, searchQuery]);

  // Load user's listings
  useEffect(() => {
    if (user) {
      loadMyListings();
    }
  }, [user]);

  const loadListings = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('listings')
        .select('*, profiles(full_name, whatsapp, phone, location, parish)')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (selectedCategory !== 'All') {
        query = query.eq('category', selectedCategory);
      }

      if (searchQuery) {
        query = query.or(`title.ilike.%${searchQuery}%,description.ilike.%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error loading listings:', error);
      setProducts([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMyListings = async () => {
    if (!user) return;
    
    try {
      const { data, error } = await supabase
        .from('listings')
        .select('*')
        .eq('seller_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setMyListings(data || []);
    } catch (error) {
      console.error('Error loading my listings:', error);
      setMyListings([]);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    setCurrentScreen('browse');
  };

  // Browse Screen Component
  const BrowseScreen = () => (
    <div className="pb-20 md:pb-4">
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative max-w-2xl">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Search for items..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 border rounded-lg"
          />
        </div>
      </div>

      {/* Category Filter */}
      <div className="mb-6 overflow-x-auto">
        <div className="flex gap-2">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white border hover:border-blue-600'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Create Listing Button */}
      {user && (
        <button
          onClick={() => setCurrentScreen('create-listing')}
          className="mb-6 max-w-md bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          <Plus size={20} />
          Sell an Item
        </button>
      )}

      {/* Products Grid */}
      {loading ? (
        <div className="text-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading listings...</p>
        </div>
      ) : products.length === 0 ? (
        <div className="text-center py-12">
          <Package size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">No listings found</h3>
          <p className="text-gray-600">Be the first to post an item!</p>
          {user && (
            <button
              onClick={() => setCurrentScreen('create-listing')}
              className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Create Listing
            </button>
          )}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {products.map(product => (
            <div
              key={product.id}
              onClick={() => {
                setSelectedProduct(product);
                setCurrentScreen('product-detail');
              }}
              className="bg-white rounded-lg shadow hover:shadow-lg transition cursor-pointer overflow-hidden"
            >
              <div className="aspect-square bg-gray-100 relative">
                {product.images && product.images.length > 0 ? (
                  <img src={product.images[0]} alt={product.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Package size={48} className="text-gray-400" />
                  </div>
                )}
                <div className="absolute top-2 right-2 bg-white/90 px-2 py-1 rounded text-xs font-semibold">
                  {product.condition}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
                <p className="text-2xl font-bold text-blue-600 mb-2">
                  EC${product.price.toLocaleString()}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <MapPin size={14} />
                    {product.location}
                  </span>
                  <span>{new Date(product.created_at).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // My Listings Screen
  const MyListingsScreen = () => (
    <div className="pb-20 md:pb-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">My Listings</h2>
        <button
          onClick={() => setCurrentScreen('create-listing')}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-700 flex items-center gap-2"
        >
          <Plus size={20} />
          New Listing
        </button>
      </div>

      {myListings.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-lg">
          <List size={64} className="mx-auto text-gray-400 mb-4" />
          <h3 className="text-xl font-bold mb-2">No listings yet</h3>
          <p className="text-gray-600 mb-4">Start selling your items today!</p>
          <button
            onClick={() => setCurrentScreen('create-listing')}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
          >
            Create Your First Listing
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          {myListings.map(listing => (
            <div key={listing.id} className="bg-white rounded-lg shadow p-4 flex gap-4">
              <div className="w-24 h-24 bg-gray-100 rounded flex-shrink-0">
                {listing.images && listing.images.length > 0 ? (
                  <img src={listing.images[0]} alt={listing.title} className="w-full h-full object-cover rounded" />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <Package size={32} className="text-gray-400" />
                  </div>
                )}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-1">{listing.title}</h3>
                <p className="text-xl font-bold text-blue-600 mb-2">EC${listing.price.toLocaleString()}</p>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span className="flex items-center gap-1">
                    <Eye size={14} />
                    {listing.views || 0} views
                  </span>
                  <span className={listing.is_active ? 'text-green-600' : 'text-gray-400'}>
                    {listing.is_active ? 'Active' : 'Inactive'}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  // Messages Screen
  const MessagesScreen = () => (
    <div className="pb-20 md:pb-4">
      <h2 className="text-2xl font-bold mb-6">Messages</h2>
      <div className="text-center py-12 bg-white rounded-lg">
        <MessageCircle size={64} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-bold mb-2">No messages yet</h3>
        <p className="text-gray-600">Your conversations will appear here</p>
      </div>
    </div>
  );

  // Notifications Screen
  const NotificationsScreen = () => (
    <div className="pb-20 md:pb-4">
      <h2 className="text-2xl font-bold mb-6">Notifications</h2>
      <div className="text-center py-12 bg-white rounded-lg">
        <Bell size={64} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-bold mb-2">No notifications</h3>
        <p className="text-gray-600">You're all caught up!</p>
      </div>
    </div>
  );

  // Profile Screen
  const ProfileScreen = () => (
    <div className="pb-20 md:pb-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Profile</h2>
        <button
          onClick={() => setCurrentScreen('browse')}
          className="text-blue-600 hover:underline text-sm font-semibold"
        >
          ← Back to Browse
        </button>
      </div>
      <div className="bg-white rounded-lg shadow p-6 max-w-2xl">
        <div className="flex items-center gap-4 mb-6 pb-6 border-b">
          <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center">
            <User size={40} className="text-blue-600" />
          </div>
          <div>
            <h3 className="text-xl font-bold">{profile?.full_name}</h3>
            <p className="text-gray-600">{user?.email}</p>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-600">Location</label>
            <p className="font-semibold">{profile?.location}, {profile?.parish}</p>
          </div>
          {profile?.whatsapp && (
            <div>
              <label className="text-sm text-gray-600">WhatsApp</label>
              <p className="font-semibold">{profile.whatsapp}</p>
            </div>
          )}
          {profile?.phone && (
            <div>
              <label className="text-sm text-gray-600">Phone</label>
              <p className="font-semibold">{profile.phone}</p>
            </div>
          )}
        </div>

        <button
          onClick={handleSignOut}
          className="mt-6 w-full bg-red-50 text-red-600 py-3 rounded-lg font-semibold hover:bg-red-100 flex items-center justify-center gap-2"
        >
          <LogOut size={20} />
          Sign Out
        </button>
      </div>
    </div>
  );

  // Create Listing Placeholder
  const CreateListingScreen = () => (
    <div className="pb-20 md:pb-4">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setCurrentScreen('browse')}
          className="text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold">Create Listing</h2>
      </div>
      <div className="bg-white rounded-lg shadow p-6 text-center">
        <Package size={64} className="mx-auto text-gray-400 mb-4" />
        <h3 className="text-xl font-bold mb-2">Listing Form Coming Soon</h3>
        <p className="text-gray-600 mb-4">
          Full listing creation with image upload will be available here.
        </p>
        <button
          onClick={() => setCurrentScreen('browse')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Back to Browse
        </button>
      </div>
    </div>
  );

  // Product Detail Placeholder
  const ProductDetailScreen = () => (
    <div className="pb-20 md:pb-4">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => setCurrentScreen('browse')}
          className="text-gray-600 hover:text-gray-900"
        >
          <ChevronLeft size={24} />
        </button>
        <h2 className="text-2xl font-bold line-clamp-1">{selectedProduct?.title}</h2>
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <p className="text-gray-600 mb-4">Full product details coming soon.</p>
        <button
          onClick={() => setCurrentScreen('browse')}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700"
        >
          Back to Browse
        </button>
      </div>
    </div>
  );

  // Render current screen
  const renderScreen = () => {
    switch (currentScreen) {
      case 'browse':
        return <BrowseScreen />;
      case 'my-listings':
        return <MyListingsScreen />;
      case 'messages':
        return <MessagesScreen />;
      case 'notifications':
        return <NotificationsScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'create-listing':
        return <CreateListingScreen />;
      case 'product-detail':
        return <ProductDetailScreen />;
      default:
        return <BrowseScreen />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div 
            className="flex items-center gap-3 cursor-pointer"
            onClick={() => user && setCurrentScreen('browse')}
          >
            <h1 className="text-2xl font-bold">SVG Market</h1>
          </div>
          <div className="flex items-center gap-4">
            {user ? (
              <>
                <span className="text-sm hidden md:inline">
                  {profile?.full_name || user.email}
                </span>
                {/* Desktop Navigation */}
                <div className="hidden md:flex items-center gap-2">
                  <button
                    onClick={() => setCurrentScreen('profile')}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-700"
                  >
                    <User size={20} />
                    Profile
                  </button>
                  <button 
                    onClick={handleSignOut}
                    className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50"
                  >
                    <LogOut size={20} />
                    Sign Out
                  </button>
                </div>
                {/* Mobile Profile Icon */}
                <button 
                  onClick={() => setCurrentScreen('profile')}
                  className="md:hidden"
                >
                  <User size={24} />
                </button>
              </>
            ) : (
              <button 
                onClick={() => setShowAuthModal(true)}
                className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-4">
        {!user ? (
          <div className="text-center py-16">
            <Package size={64} className="mx-auto text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Welcome to SVG Marketplace</h2>
            <p className="text-gray-600 mb-6">
              Sign in to start buying and selling in Saint Vincent and the Grenadines.
            </p>
            <button
              onClick={() => setShowAuthModal(true)}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700"
            >
              Get Started - Sign Up Free
            </button>
          </div>
        ) : (
          renderScreen()
        )}
      </main>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={() => {
          setShowAuthModal(false);
          setCurrentScreen('browse');
          loadListings();
        }}
      />

      {/* Bottom Navigation for Mobile */}
      {user && (
        <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg">
          <div className="grid grid-cols-5 gap-1 p-2">
            {[
              { screen: 'browse', icon: Home, label: 'Browse' },
              { screen: 'my-listings', icon: List, label: 'My Items' },
              { screen: 'messages', icon: MessageCircle, label: 'Messages' },
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
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MarketplaceClient;
