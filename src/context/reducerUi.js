const initial = {
  loading: false,
  error: null,
  lastQuery: '',
};

export default function uiReducer(state = initial, action) {
  switch (action.type) {
    case 'WEATHER_REQUEST':
      return { loading: true, error: null, lastQuery: action.meta?.query || '' };
    case 'FETCH_WEATHER': {
      // If payload is valid 200, clear error; else set error message
      const ok = action?.payload?.status === 200 && Array.isArray(action?.payload?.data?.list);
      return { ...state, loading: false, error: ok ? null : 'City not found or API error.' };
    }
    default:
      return state;
  }
}
