import { Autocomplete, Box, Stack, TextField } from "@mui/material";
import uiConfigs from "../configs/ui.config";
import Container from "../components/common/Container";
import { useCallback, useEffect, useState } from "react";
import { GenreType, MovieOverviewType } from "../types/MovieType";
import { GeneralType } from "../types/GeneralType";
import { movieAPI } from "../api/modules/movie.api";
import { toast } from "react-toastify";
import Select, { ActionMeta, MultiValue, SingleValue } from "react-select";
import MovieGrid from "../components/common/MovieGrid";
import { LoadingButton } from "@mui/lab";

type sortbyProp = {
  value: string;
  label: string;
};

type FilterProps = {
  sort_by: any;
  with_genres: any;
};

let timer: any;
const timeout = 500;
let filter: FilterProps = {
  sort_by: null,
  with_genres: null,
};

const sortbyData: any = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "vote_average.desc", label: "Rating Descending" },
  { value: "vote_average.asc", label: "Rating Ascending" },
  {
    value: "primary_release_date.desc",
    label: "Release Date Descending",
  },
  { value: "primary_release_date.asc", label: "Release Date Ascending" },
  { value: "original_title.asc", label: "Title (A-Z)" },
];

const MovieSearch = () => {
  const [query, setQuery] = useState("");
  const [onSearch, setOnSearch] = useState(false);
  const [movieLoading, setMovieLoading] = useState(false);
  const [movies, setMovies] = useState<MovieOverviewType[]>([]);
  const [page, setPage] = useState(0);
  const [genres, setGenres] = useState<GenreType[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<readonly GenreType[]>(
    []
  );
  const [sortby, setSortby] = useState<any>();

  const onLoadMore = () => setPage(page + 1);

  const search = useCallback(async () => {
    setOnSearch(true);

    // Search API
    console.log(query, page);

    setOnSearch(false);
  }, [query, page]);

  const onQueryChange = (e: React.ChangeEvent<any>) => {
    const newQuery = e.target.value;
    clearTimeout(timer);

    timer = setTimeout(() => {
      setQuery(newQuery);
    }, timeout);
  };

  const onChangeGenres = (
    selectedItems: readonly GenreType[],
    action: ActionMeta<GenreType>
  ) => {
    setSelectedGenres(selectedItems);

    if (action.action !== "clear") {
      let genreId = selectedItems.map((genre) => genre.id);
      filter.with_genres = genreId;
    } else {
      filter.with_genres = null;
    }
  };

  const onChangeSort = (
    selectedItems: SingleValue<string>,
    action: ActionMeta<string>
  ) => {
    setSortby(selectedItems);

    if (action.name !== "clear") {
      filter.sort_by = selectedItems;
    } else {
      filter.sort_by = selectedItems;
    }
  };

  useEffect(() => {
    const getGenres = async () => {
      setOnSearch(true);
      const response: GeneralType<GenreType[]> = (await movieAPI.getGenreList())
        .data;

      if (response.status.statusCode !== 200) {
        toast.error(response.status.message);
      } else {
        setGenres(response.data);
        getMovieList();
      }
      setOnSearch(false);
    };

    const getMovieList = async () => {
      const response: GeneralType<MovieOverviewType[]> = (
        await movieAPI.getMovieList(page)
      ).data;

      if (response.status.statusCode !== 200) {
        toast.error(response.status.message);
      } else {
        setMovies((prevMovies) => [...prevMovies, ...response.data]);
      }
    };

    getGenres();
  }, []);

  useEffect(() => {
    if (query.trim.length === 0) {
      setMovies([]);
      setPage(1);
    } else search();
  }, [search, query, page]);

  return (
    <Box sx={{ ...uiConfigs.style.mainContent }}>
      <Container header="Searching">
        <>
          <Box
            display="flex"
            flexDirection={{
              xs: "column",
              md: "row",
              lg: "row",
            }}
            justifyContent="space-between"
            gap={5}
          >
            <TextField
              sx={{
                width: {
                  xs: "100%",
                  md: "80%",
                  lg: "80%",
                },
              }}
              className="searchText"
              label="Search"
              name="search"
              type="search"
              onChange={onQueryChange}
            />

            <Stack direction="row" spacing={3} className="filters" width="100%">
              <Select
                isMulti
                name="genres"
                value={selectedGenres}
                closeMenuOnSelect={false}
                options={genres}
                getOptionValue={(option) => option.id.toString()}
                getOptionLabel={(option) => option.name}
                onChange={onChangeGenres}
                placeholder="Select genres"
                className="react-select-container genresDD"
                classNamePrefix="react-select"
              />

              <Select
                name="sortby"
                value={sortby}
                options={sortbyData}
                onChange={onChangeSort}
                isClearable={true}
                placeholder="Sort by"
                className="react-select-container sortbyDD"
                classNamePrefix="react-select"
              />
            </Stack>
          </Box>

          {movies && (
            <>
              <MovieGrid movies={movies} />
              <LoadingButton
                sx={{ marginTop: 8 }}
                fullWidth
                color="primary"
                loading={movieLoading}
                onClick={onLoadMore}
              >
                Load more
              </LoadingButton>
            </>
          )}
        </>
      </Container>
    </Box>
  );
};

export default MovieSearch;
