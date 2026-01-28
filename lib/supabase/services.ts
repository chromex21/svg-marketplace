import { supabase } from '@/lib/supabase/client';

export interface Listing {
  id: string;
  user_id: string;
  title: string;
  description: string;
  price: number;
  condition: string;
  category: string;
  listing_type: string;
  specs: any;
  images: string[];
  location: string;
  parish: string;
  business_hours: string | null;
  views: number;
  favorites: number;
  is_active: boolean;
  posted_date: string;
  expires_date: string;
  seller?: any;
}

export const listingsService = {
  async getListings(filters?: {
    category?: string;
    location?: string;
    parish?: string;
    condition?: string;
    minPrice?: number;
    maxPrice?: number;
    search?: string;
  }) {
    let query = supabase
      .from('listings')
      .select(`
        *,
        seller:profiles!listings_user_id_fkey(*)
      `)
      .eq('is_active', true)
      .order('posted_date', { ascending: false });

    if (filters?.category && filters.category !== 'All') {
      query = query.eq('category', filters.category);
    }

    if (filters?.location && filters.location !== 'All Locations') {
      query = query.eq('location', filters.location);
    }

    if (filters?.parish && filters.parish !== 'All Parishes') {
      query = query.eq('parish', filters.parish);
    }

    if (filters?.condition && filters.condition !== 'All') {
      query = query.eq('condition', filters.condition);
    }

    if (filters?.minPrice !== undefined) {
      query = query.gte('price', filters.minPrice);
    }

    if (filters?.maxPrice !== undefined) {
      query = query.lte('price', filters.maxPrice);
    }

    if (filters?.search) {
      query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data as Listing[];
  },

  async getListing(id: string) {
    const { data, error } = await supabase
      .from('listings')
      .select(`
        *,
        seller:profiles!listings_user_id_fkey(*)
      `)
      .eq('id', id)
      .single();

    if (error) throw error;
    
    // Increment view count (ignore errors)
    try {
      await supabase.rpc('increment_listing_views', { listing_id: id });
    } catch {}
    
    return data as Listing;
  },

  async getUserListings(userId: string) {
    const { data, error } = await supabase
      .from('listings')
      .select('*')
      .eq('user_id', userId)
      .order('posted_date', { ascending: false });

    if (error) throw error;
    return data as Listing[];
  },

  async createListing(listing: any) {
    const { data, error } = await supabase
      .from('listings')
      .insert(listing as any)
      .select()
      .single();

    if (error) throw error;
    return data as Listing;
  },

  async updateListing(id: string, updates: any) {
    const { data, error } = await supabase
      .from('listings')
      .update(updates as any)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Listing;
  },

  async deleteListing(id: string) {
    const { error } = await supabase
      .from('listings')
      .delete()
      .eq('id', id);

    if (error) throw error;
  },

  async renewListing(id: string) {
    const newExpiryDate = new Date();
    newExpiryDate.setDate(newExpiryDate.getDate() + 30);

    const { data, error } = await supabase
      .from('listings')
      .update({ expires_date: newExpiryDate.toISOString() } as any)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Listing;
  },

  async markAsSold(id: string) {
    const { data, error } = await supabase
      .from('listings')
      .update({ is_active: false } as any)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Listing;
  },
};

export const favoritesService = {
  async toggleFavorite(userId: string, listingId: string) {
    const { data: existing } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('listing_id', listingId)
      .single();

    if (existing) {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('listing_id', listingId);

      if (error) throw error;
      return false;
    } else {
      const { error } = await supabase
        .from('favorites')
        .insert({ user_id: userId, listing_id: listingId } as any);

      if (error) throw error;
      return true;
    }
  },

  async getUserFavorites(userId: string) {
    const { data, error } = await supabase
      .from('favorites')
      .select(`
        listing_id,
        listings (
          *,
          seller:profiles!listings_user_id_fkey(*)
        )
      `)
      .eq('user_id', userId);

    if (error) throw error;
    return data.map((f: any) => f.listings) as Listing[];
  },

  async isFavorited(userId: string, listingId: string) {
    const { data } = await supabase
      .from('favorites')
      .select('id')
      .eq('user_id', userId)
      .eq('listing_id', listingId)
      .single();

    return !!data;
  },
};

export const messagesService = {
  async getOrCreateConversation(buyerId: string, sellerId: string, listingId: string) {
    const { data: existing } = await supabase
      .from('conversations')
      .select('*')
      .eq('listing_id', listingId)
      .eq('buyer_id', buyerId)
      .eq('seller_id', sellerId)
      .single();

    if (existing) return existing;

    const { data, error } = await supabase
      .from('conversations')
      .insert({
        listing_id: listingId,
        buyer_id: buyerId,
        seller_id: sellerId,
      } as any)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async sendMessage(conversationId: string, senderId: string, receiverId: string, listingId: string, message: string) {
    const { data, error } = await supabase
      .from('messages')
      .insert({
        conversation_id: conversationId,
        sender_id: senderId,
        receiver_id: receiverId,
        listing_id: listingId,
        message,
      } as any)
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getMessages(conversationId: string) {
    const { data, error } = await supabase
      .from('messages')
      .select('*')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: true });

    if (error) throw error;
    return data;
  },

  async getUserConversations(userId: string) {
    const { data, error } = await supabase
      .from('conversations')
      .select(`
        *,
        listing:listings(*),
        buyer:profiles!conversations_buyer_id_fkey(*),
        seller:profiles!conversations_seller_id_fkey(*)
      `)
      .or(`buyer_id.eq.${userId},seller_id.eq.${userId}`)
      .order('last_message_at', { ascending: false, nullsFirst: false });

    if (error) throw error;
    return data;
  },

  async markAsRead(conversationId: string, userId: string) {
    const { error } = await supabase
      .from('messages')
      .update({ read: true } as any)
      .eq('conversation_id', conversationId)
      .eq('receiver_id', userId);

    if (error) throw error;
  },

  subscribeToMessages(conversationId: string, callback: (message: any) => void) {
    return supabase
      .channel(`messages:${conversationId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'messages',
          filter: `conversation_id=eq.${conversationId}`,
        },
        (payload) => callback(payload.new)
      )
      .subscribe();
  },
};

export const notificationsService = {
  async getNotifications(userId: string) {
    const { data, error } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;
    return data;
  },

  async markAsRead(notificationId: string) {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true } as any)
      .eq('id', notificationId);

    if (error) throw error;
  },

  async markAllAsRead(userId: string) {
    const { error } = await supabase
      .from('notifications')
      .update({ read: true } as any)
      .eq('user_id', userId);

    if (error) throw error;
  },

  subscribeToNotifications(userId: string, callback: (notification: any) => void) {
    return supabase
      .channel(`notifications:${userId}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'notifications',
          filter: `user_id=eq.${userId}`,
        },
        (payload) => callback(payload.new)
      )
      .subscribe();
  },
};

export const createProfile = async (profileData: any) => {
  const { data, error } = await supabase
    .from('profiles')
    .insert(profileData as any)
    .select()
    .single();

  if (error) throw error;
  return data;
};
