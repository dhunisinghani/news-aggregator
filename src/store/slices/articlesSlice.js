import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchNewsAPIArticles, fetchNYTimesArticles, fetchGnewsArticles  } from "../../config/api";
export const fetchArticles = createAsyncThunk(
  "articles/fetchArticles",
  async (params, { getState }) => {
    const { query, source } =
      getState().articles.filters;

      let articles = [];

      // Fetch from NYT API
      if (source.key === 'gnews-api' || source.key === 'all') {
        const nyTimesArticles = await fetchGnewsArticles(query, params);
        articles = [...articles, ...nyTimesArticles];
      }

      // Fetch from NewsAPI
      if (source.key === 'news-api' || source.key === 'all') {
        const newsAPIArticles = await fetchNewsAPIArticles(query, params);
        articles = [...articles, ...newsAPIArticles];
      }
      
      // Fetch from NYT API
      if (source.key === 'ny-times' || source.key === 'all') {
        const nyTimesArticles = await fetchNYTimesArticles(query, params);
        articles = [...articles, ...nyTimesArticles];
      }
      return articles;
  }
);
const articlesSlice = createSlice({
  name: "articles",
  initialState: {
    articles: [],
    status: "idle",
    error: null,
    filters: {
      query: "",
      category: "",
      date: "",
      source: "",
    },
  },
  reducers: {
    setQuery(state, action) {
      state.filters.query = action.payload;
    },
    setCategory(state, action) {
      state.filters.category = action.payload;
    },
    setDate(state, action) {
      state.filters.date = action.payload;
    },
    setSource(state, action) {
      state.filters.source = action.payload;
    }, 
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchArticles.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchArticles.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.articles = action.payload;
      })
      .addCase(fetchArticles.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  }
});

export const {
  setQuery,
  setCategory,
  setDate,
  setSource,
} = articlesSlice.actions;

export default articlesSlice.reducer;
