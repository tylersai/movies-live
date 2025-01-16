import React from 'react';
import { Grid, GridCol } from '@mantine/core';
import { RegisterForm } from '@/components/RegisterForm';

const page = () => {
  return (
    <div className="LoginPage">
      <Grid gutter={0} justify="center" p={12}>
        <GridCol span={{ base: 12, sm: 8, md: 6, lg: 4, xl: 3 }}>
          <RegisterForm />
        </GridCol>
      </Grid>
    </div>
  );
};

export default page;
