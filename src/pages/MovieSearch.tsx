import { Box, Stack, TextField } from "@mui/material";
import uiConfigs from "../configs/ui.config";
import Container from "../components/common/Container";
import { useCallback, useEffect, useState } from "react";
import {
  GenreType,
  MovieOverviewType,
  MovieSearchRequestType,
} from "../types/MovieType";
import { GeneralType } from "../types/GeneralType";
import { movieAPI } from "../api/modules/movie.api";
import { toast } from "react-toastify";
import Select, { ActionMeta, SingleValue } from "react-select";
import MovieGrid from "../components/common/MovieGrid";
import { LoadingButton } from "@mui/lab";

type FilterProps = {
  sort_by: any;
  with_genres: any;
};

let timer: any;
const timeout = 500;

const sortbyData: any = [
  { value: "popularity.desc", label: "Popularity Descending" },
  { value: "popularity.asc", label: "Popularity Ascending" },
  { value: "voteAverage.desc", label: "Rating Descending" },
  { value: "voteAverage.asc", label: "Rating Ascending" },
  {
    value: "releaseDate.desc",
    label: "Release Date Descending",
  },
  { value: "releaseDate.asc", label: "Release Date Ascending" },
  { value: "title.asc", label: "Title (A-Z)" },
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
  const [filter, setFilter] = useState<FilterProps>({
    sort_by: null,
    with_genres: null,
  });

  const onLoadMore = () => setPage(page + 1);

  const search = useCallback(async () => {
    setOnSearch(true);

    // Search API
    const request: MovieSearchRequestType = {
      query: query,
      limit: 10,
      filter: filter.with_genres,
      order: filter.sort_by || {
        label: "id.asc",
        value: "id.asc",
      },
    };

    const response: GeneralType<MovieOverviewType[]> = (
      await movieAPI.getMovieSearch(request)
    ).data;

    if (response.status.statusCode !== 200)
      toast.error(response.status.message);
    else setMovies(response.data);

    setOnSearch(false);
  }, [query]);

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
      setFilter((filter) => ({ ...filter, with_genres: genreId }));
    } else {
      setFilter((filter) => ({ ...filter, with_genres: null }));
    }
  };

  const onChangeSort = (
    selectedItems: SingleValue<string>,
    action: ActionMeta<string>
  ) => {
    setSortby(selectedItems);

    if (action.name !== "clear") {
      setFilter((filter) => ({ ...filter, sort_by: selectedItems }));
    } else {
      setFilter((filter) => ({ ...filter, sort_by: null }));
    }
  };

  useEffect(() => {
    const getGenres = async () => {
      const response: GeneralType<GenreType[]> = (await movieAPI.getGenreList())
        .data;

      if (response.status.statusCode !== 200) {
        toast.error(response.status.message);
      } else {
        setGenres(response.data);
        getMovieList();
      }
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
    search();
  }, [query]);

  useEffect(() => {
    const searchOnFilterChange = async () => {
      const request: MovieSearchRequestType = {
        query: query,
        limit: 10,
        filter: filter.with_genres,
        order: filter.sort_by || {
          label: "id.asc",
          value: "id.asc",
        },
      };

      const response: GeneralType<MovieOverviewType[]> = (
        await movieAPI.getMovieSearch(request)
      ).data;

      if (response.status.statusCode !== 200)
        toast.error(response.status.message);
      else setMovies(response.data);
    };
    console.log(filter);
    searchOnFilterChange();
  }, [filter]);

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
              size="small"
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
              {/* <LoadingButton
                sx={{ marginTop: 8 }}
                fullWidth
                color="primary"
                loading={movieLoading}
                onClick={onLoadMore}
              >
                Load more
              </LoadingButton> */}
            </>
          )}
        </>
      </Container>
    </Box>
  );
};

export default MovieSearch;
