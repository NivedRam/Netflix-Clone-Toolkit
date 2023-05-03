import { Card, Grid, Typography } from "@mui/material";
import React from "react";

function GridCheck() {
  return (
    <Grid>
      <Grid
        container
        direction="row"
        justifyContent="flex-start"
        alignItems="center"
      >
        <Grid item>
          <Card>
            <Typography>hi hello</Typography>
          </Card>
        </Grid>
        <Grid item>
          <Card>
            <Typography>hi hello</Typography>
          </Card>
        </Grid>
        <Grid item>
          <Card>
            <Typography>hi hello</Typography>
          </Card>
        </Grid>
        <Grid item>
          <Card>
            <h3>Card Check</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          </Card>
          <Card>
            <h3>Card Check</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          </Card>
          <Card>
            <h3>Card Check</h3>{" "}
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          </Card>
          <Card>
            <h3>Card Check</h3>
            <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default GridCheck;
