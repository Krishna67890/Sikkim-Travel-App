import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Initial state
const initialState = {
  // User preferences
  user: {
    isLoggedIn: false,
    name: '',
    email: '',
    preferences: {
      language: 'en',
      currency: 'INR',
      theme: 'light',
      notifications: true
    }
  },

  // Search state
  search: {
    query: '',
    category: 'all',
    results: [],
    recentSearches: [],
    isLoading: false
  },

  // Filter state
  filters: {
    priceRange: [0, 10000],
    categories: [],
    difficulty: '',
    duration: '',
    rating: 0,
    location: '',
    isFilterPanelOpen: false
  },

  // Map state
  map: {
    currentLocation: 'gangtok',
    viewMode: 'map', // 'map' or 'satellite'
    zoomLevel: 10,
    showMarkers: true,
    isFullscreen: false
  },

  // Booking state
  bookings: {
    cart: [],
    upcoming: [],
    past: [],
    wishlist: []
  },

  // App settings
  settings: {
    isLoading: false,
    error: null,
    offlineMode: false,
    lastSync: null
  },

  // Sikkim-specific data
  sikkimData: {
    destinations: [],
    activities: [],
    hotels: [],
    monasteries: [],
    weather: null,
    events: []
  }
};

// Action types
const ActionTypes = {
  // User actions
  SET_USER: 'SET_USER',
  UPDATE_USER_PREFERENCES: 'UPDATE_USER_PREFERENCES',
  LOGOUT: 'LOGOUT',

  // Search actions
  SET_SEARCH_QUERY: 'SET_SEARCH_QUERY',
  SET_SEARCH_CATEGORY: 'SET_SEARCH_CATEGORY',
  SET_SEARCH_RESULTS: 'SET_SEARCH_RESULTS',
  ADD_RECENT_SEARCH: 'ADD_RECENT_SEARCH',
  CLEAR_RECENT_SEARCHES: 'CLEAR_RECENT_SEARCHES',
  SET_LOADING: 'SET_LOADING',

  // Filter actions
  UPDATE_FILTERS: 'UPDATE_FILTERS',
  RESET_FILTERS: 'RESET_FILTERS',
  TOGGLE_FILTER_PANEL: 'TOGGLE_FILTER_PANEL',

  // Map actions
  SET_MAP_LOCATION: 'SET_MAP_LOCATION',
  SET_MAP_VIEW_MODE: 'SET_MAP_VIEW_MODE',
  SET_MAP_ZOOM: 'SET_MAP_ZOOM',
  TOGGLE_MAP_MARKERS: 'TOGGLE_MAP_MARKERS',
  TOGGLE_FULLSCREEN: 'TOGGLE_FULLSCREEN',

  // Booking actions
  ADD_TO_CART: 'ADD_TO_CART',
  REMOVE_FROM_CART: 'REMOVE_FROM_CART',
  CLEAR_CART: 'CLEAR_CART',
  ADD_TO_WISHLIST: 'ADD_TO_WISHLIST',
  REMOVE_FROM_WISHLIST: 'REMOVE_FROM_WISHLIST',

  // App state actions
  SET_ERROR: 'SET_ERROR',
  CLEAR_ERROR: 'CLEAR_ERROR',
  SET_OFFLINE_MODE: 'SET_OFFLINE_MODE',

  // Data actions
  SET_SIKKIM_DATA: 'SET_SIKKIM_DATA',
  UPDATE_WEATHER: 'UPDATE_WEATHER',
  UPDATE_EVENTS: 'UPDATE_EVENTS'
};

// Reducer function
const appReducer = (state, action) => {
  switch (action.type) {
    // User actions
    case ActionTypes.SET_USER:
      return {
        ...state,
        user: { ...state.user, ...action.payload }
      };

    case ActionTypes.UPDATE_USER_PREFERENCES:
      return {
        ...state,
        user: {
          ...state.user,
          preferences: {
            ...state.user.preferences,
            ...action.payload
          }
        }
      };

    case ActionTypes.LOGOUT:
      return {
        ...state,
        user: initialState.user,
        bookings: {
          ...initialState.bookings,
          wishlist: state.bookings.wishlist // Keep wishlist on logout
        }
      };

    // Search actions
    case ActionTypes.SET_SEARCH_QUERY:
      return {
        ...state,
        search: { ...state.search, query: action.payload }
      };

    case ActionTypes.SET_SEARCH_CATEGORY:
      return {
        ...state,
        search: { ...state.search, category: action.payload }
      };

    case ActionTypes.SET_SEARCH_RESULTS:
      return {
        ...state,
        search: { ...state.search, results: action.payload, isLoading: false }
      };

    case ActionTypes.ADD_RECENT_SEARCH:
      const recentSearches = [
        action.payload,
        ...state.search.recentSearches.filter(
          search => search.query !== action.payload.query
        )
      ].slice(0, 10);
      return {
        ...state,
        search: { ...state.search, recentSearches }
      };

    case ActionTypes.CLEAR_RECENT_SEARCHES:
      return {
        ...state,
        search: { ...state.search, recentSearches: [] }
      };

    // Filter actions
    case ActionTypes.UPDATE_FILTERS:
      return {
        ...state,
        filters: { ...state.filters, ...action.payload }
      };

    case ActionTypes.RESET_FILTERS:
      return {
        ...state,
        filters: initialState.filters
      };

    case ActionTypes.TOGGLE_FILTER_PANEL:
      return {
        ...state,
        filters: {
          ...state.filters,
          isFilterPanelOpen: !state.filters.isFilterPanelOpen
        }
      };

    // Map actions
    case ActionTypes.SET_MAP_LOCATION:
      return {
        ...state,
        map: { ...state.map, currentLocation: action.payload }
      };

    case ActionTypes.SET_MAP_VIEW_MODE:
      return {
        ...state,
        map: { ...state.map, viewMode: action.payload }
      };

    case ActionTypes.SET_MAP_ZOOM:
      return {
        ...state,
        map: { ...state.map, zoomLevel: action.payload }
      };

    case ActionTypes.TOGGLE_MAP_MARKERS:
      return {
        ...state,
        map: { ...state.map, showMarkers: !state.map.showMarkers }
      };

    case ActionTypes.TOGGLE_FULLSCREEN:
      return {
        ...state,
        map: { ...state.map, isFullscreen: !state.map.isFullscreen }
      };

    // Booking actions
    case ActionTypes.ADD_TO_CART:
      return {
        ...state,
        bookings: {
          ...state.bookings,
          cart: [...state.bookings.cart, action.payload]
        }
      };

    case ActionTypes.REMOVE_FROM_CART:
      return {
        ...state,
        bookings: {
          ...state.bookings,
          cart: state.bookings.cart.filter(item => item.id !== action.payload)
        }
      };

    case ActionTypes.CLEAR_CART:
      return {
        ...state,
        bookings: { ...state.bookings, cart: [] }
      };

    case ActionTypes.ADD_TO_WISHLIST:
      return {
        ...state,
        bookings: {
          ...state.bookings,
          wishlist: [...state.bookings.wishlist, action.payload]
        }
      };

    case ActionTypes.REMOVE_FROM_WISHLIST:
      return {
        ...state,
        bookings: {
          ...state.bookings,
          wishlist: state.bookings.wishlist.filter(item => item.id !== action.payload)
        }
      };

    // App state actions
    case ActionTypes.SET_LOADING:
      return {
        ...state,
        settings: { ...state.settings, isLoading: action.payload }
      };

    case ActionTypes.SET_ERROR:
      return {
        ...state,
        settings: { ...state.settings, error: action.payload }
      };

    case ActionTypes.CLEAR_ERROR:
      return {
        ...state,
        settings: { ...state.settings, error: null }
      };

    case ActionTypes.SET_OFFLINE_MODE:
      return {
        ...state,
        settings: { ...state.settings, offlineMode: action.payload }
      };

    // Data actions
    case ActionTypes.SET_SIKKIM_DATA:
      return {
        ...state,
        sikkimData: { ...state.sikkimData, ...action.payload }
      };

    case ActionTypes.UPDATE_WEATHER:
      return {
        ...state,
        sikkimData: { ...state.sikkimData, weather: action.payload }
      };

    case ActionTypes.UPDATE_EVENTS:
      return {
        ...state,
        sikkimData: { ...state.sikkimData, events: action.payload }
      };

    default:
      return state;
  }
};

// Create context
const AppContext = createContext();

// Context provider component
export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  // Load state from localStorage on mount
  useEffect(() => {
    const savedState = localStorage.getItem('sikkimTravelAppState');
    if (savedState) {
      try {
        const parsedState = JSON.parse(savedState);
        dispatch({ type: ActionTypes.SET_SIKKIM_DATA, payload: parsedState.sikkimData });
        if (parsedState.user) {
          dispatch({ type: ActionTypes.SET_USER, payload: parsedState.user });
        }
        if (parsedState.search?.recentSearches) {
          // Only load recent searches, not the entire search state
          dispatch({
            type: ActionTypes.ADD_RECENT_SEARCH,
            payload: { recentSearches: parsedState.search.recentSearches }
          });
        }
      } catch (error) {
        console.error('Error loading saved state:', error);
      }
    }
  }, []);

  // Save state to localStorage on changes
  useEffect(() => {
    const stateToSave = {
      user: state.user,
      search: { recentSearches: state.search.recentSearches },
      sikkimData: state.sikkimData
    };
    localStorage.setItem('sikkimTravelAppState', JSON.stringify(stateToSave));
  }, [state.user, state.search.recentSearches, state.sikkimData]);

  // Action creators
  const actions = {
    // User actions
    setUser: (userData) => dispatch({ type: ActionTypes.SET_USER, payload: userData }),
    updateUserPreferences: (preferences) =>
      dispatch({ type: ActionTypes.UPDATE_USER_PREFERENCES, payload: preferences }),
    logout: () => dispatch({ type: ActionTypes.LOGOUT }),

    // Search actions
    setSearchQuery: (query) => dispatch({ type: ActionTypes.SET_SEARCH_QUERY, payload: query }),
    setSearchCategory: (category) =>
      dispatch({ type: ActionTypes.SET_SEARCH_CATEGORY, payload: category }),
    setSearchResults: (results) =>
      dispatch({ type: ActionTypes.SET_SEARCH_RESULTS, payload: results }),
    addRecentSearch: (searchData) =>
      dispatch({ type: ActionTypes.ADD_RECENT_SEARCH, payload: searchData }),
    clearRecentSearches: () => dispatch({ type: ActionTypes.CLEAR_RECENT_SEARCHES }),
    setLoading: (isLoading) => dispatch({ type: ActionTypes.SET_LOADING, payload: isLoading }),

    // Filter actions
    updateFilters: (filters) =>
      dispatch({ type: ActionTypes.UPDATE_FILTERS, payload: filters }),
    resetFilters: () => dispatch({ type: ActionTypes.RESET_FILTERS }),
    toggleFilterPanel: () => dispatch({ type: ActionTypes.TOGGLE_FILTER_PANEL }),

    // Map actions
    setMapLocation: (location) =>
      dispatch({ type: ActionTypes.SET_MAP_LOCATION, payload: location }),
    setMapViewMode: (viewMode) =>
      dispatch({ type: ActionTypes.SET_MAP_VIEW_MODE, payload: viewMode }),
    setMapZoom: (zoomLevel) =>
      dispatch({ type: ActionTypes.SET_MAP_ZOOM, payload: zoomLevel }),
    toggleMapMarkers: () => dispatch({ type: ActionTypes.TOGGLE_MAP_MARKERS }),
    toggleFullscreen: () => dispatch({ type: ActionTypes.TOGGLE_FULLSCREEN }),

    // Booking actions
    addToCart: (item) => dispatch({ type: ActionTypes.ADD_TO_CART, payload: item }),
    removeFromCart: (itemId) => dispatch({ type: ActionTypes.REMOVE_FROM_CART, payload: itemId }),
    clearCart: () => dispatch({ type: ActionTypes.CLEAR_CART }),
    addToWishlist: (item) => dispatch({ type: ActionTypes.ADD_TO_WISHLIST, payload: item }),
    removeFromWishlist: (itemId) =>
      dispatch({ type: ActionTypes.REMOVE_FROM_WISHLIST, payload: itemId }),

    // App state actions
    setError: (error) => dispatch({ type: ActionTypes.SET_ERROR, payload: error }),
    clearError: () => dispatch({ type: ActionTypes.CLEAR_ERROR }),
    setOfflineMode: (offlineMode) =>
      dispatch({ type: ActionTypes.SET_OFFLINE_MODE, payload: offlineMode }),

    // Data actions
    setSikkimData: (data) => dispatch({ type: ActionTypes.SET_SIKKIM_DATA, payload: data }),
    updateWeather: (weather) => dispatch({ type: ActionTypes.UPDATE_WEATHER, payload: weather }),
    updateEvents: (events) => dispatch({ type: ActionTypes.UPDATE_EVENTS, payload: events })
  };

  // Context value
  const value = {
    state,
    actions,
    // Helper functions
    isUserLoggedIn: state.user.isLoggedIn,
    getUserPreferences: () => state.user.preferences,
    getCartTotal: () => state.bookings.cart.reduce((total, item) => total + item.price, 0),
    getWishlistCount: () => state.bookings.wishlist.length,
    getFilteredResults: (items) => {
      // Helper to filter items based on current filters
      return items.filter(item => {
        const meetsPrice = item.price >= state.filters.priceRange[0] &&
          item.price <= state.filters.priceRange[1];
        const meetsCategory = state.filters.categories.length === 0 ||
          state.filters.categories.includes(item.category);
        const meetsDifficulty = !state.filters.difficulty ||
          item.difficulty === state.filters.difficulty;
        const meetsRating = item.rating >= state.filters.rating;
        const meetsLocation = !state.filters.location ||
          item.location === state.filters.location;

        return meetsPrice && meetsCategory && meetsDifficulty && meetsRating && meetsLocation;
      });
    }
  };

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to use the context
export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};

// Export action types for external use
export { ActionTypes };

export default AppContext;