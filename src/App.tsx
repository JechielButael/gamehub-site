import { Grid, GridItem } from "@chakra-ui/react";
import NavBar from "./components/NavBar";
import GameGrid from "./components/GameGrid";
import { useState } from "react";

function App() {
  const [gameQuery, setGameQuery] = useState("");

  return (
    <>
      <Grid>
        <GridItem w="100%" gap="1">
          <NavBar onSearch={(searchText) => setGameQuery(searchText)} />
        </GridItem>
        <GridItem w="100%" gap="1">
          <GameGrid gameQuery={gameQuery} />
        </GridItem>
      </Grid>
    </>
  );
}

export default App;
