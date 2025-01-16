'use client';

import React, { useState } from 'react';
import { Grid, GridCol } from '@mantine/core';
import { useMovies } from '@/hooks/use-movies';
import { Filters } from './Filters';
import MovieCard from './MovieCard';

const MovieList = () => {
  const [filters, setFilters] = useState<Record<string, string>>({});
  const { loading, error, data, fetchData } = useMovies(filters);

  return (
    <div>
      <Grid gutter={0} p={12}>
        <GridCol span={{ base: 12 }} p={12}>
          <h2 style={{ margin: 0 }}>Movie List</h2>
        </GridCol>
        {loading ? (
          <GridCol span={{ base: 12 }} p={12}>
            Loading...
          </GridCol>
        ) : error ? (
          <GridCol span={{ base: 12 }} p={12}>
            Error!
          </GridCol>
        ) : (
          <>
            <GridCol span={{ base: 12 }} p={12}>
              <Filters filters={filters} setFilters={setFilters} />
            </GridCol>
            {data.length > 0 ? (
              data.map((movie) => (
                <GridCol key={movie._id} span={{ base: 6, sm: 6, md: 4, lg: 3, xl: 2 }}>
                  <MovieCard {...movie} fetchData={fetchData} />
                </GridCol>
              ))
            ) : (
              <GridCol span={{ base: 12 }} p={12}>
                No Data
              </GridCol>
            )}
          </>
        )}
      </Grid>
    </div>
  );
};

export default MovieList;
