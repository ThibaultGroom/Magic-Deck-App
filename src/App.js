import React, {useState} from 'react';
import {
  ChakraProvider,
  Box,
  VStack,
  Grid,
  theme,
  Card,
  CardBody,
  Image,
  Stack,
  Heading,
  Flex
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { InputBar } from './components/input';
import { ColorSelect } from './components/checkbox';
import data from './magicCards.json'


/* var magicCards = data.map(); */


function App() {

  const [showWhiteOnly, setShowWhiteOnly] = useState(false)
  const [search, setSearch] = useState('')

  const visibleCards = data.filter((card) => {
    if (
      showWhiteOnly &&
      (!card.colors || !card.colors.includes('white'))
    ) {
      return false;
    }
    if (
      search &&
      (!card.name.toLowerCase().includes(search.toLowerCase()) &&
        !card.desc.toLowerCase().includes(search.toLowerCase()))
    ) {
      return false;
    }
    return true;
  });
  const displayCards = visibleCards.length > 0 ? visibleCards : data;
  


  return (
    <ChakraProvider theme={theme}>
      <Box textAlign="center" fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <h1>Magic Deck App</h1>
            <p>L'app qui permet de trier ses cartes</p>
            
            <SearchBar 
                search={search}
                onSearchChange={setSearch}
                showWhiteOnly={showWhiteOnly} 
                onWhiteOnlyChange={setShowWhiteOnly}/>
            <CardsList cards={displayCards}/>



            
            
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  );
};

function SearchBar ({showWhiteOnly, onWhiteOnlyChange, search, onSearchChange}) {
  return (
    <div>
      <InputBar 
          value={search} 
          onChange={onSearchChange} 
          placeholder="Rechercher une carte..." />
      <ColorSelect 
        id="white" 
        checked={showWhiteOnly} 
        onChange={onWhiteOnlyChange} 
        label="N'afficher que les cartes blanches"/>
    </div>
  )
}

function CardsList({ cards }) {
  const cardList = cards.map((magicCard) => (
    <Card maxW="xs" key={magicCard.id} m={2}> {/* Adjusted maxW and added margin (m) */}
      <CardBody>
        <Image
          src={magicCard.imglink}
          alt={magicCard.name}
          borderRadius="lg"
        />
        <Stack mt="4" spacing="2" textAlign="left"> {/* Adjusted spacing and margin-top */}
          <Heading size="sm">{magicCard.name}</Heading> {/* Adjusted heading size */}
          <Flex flexDirection="column" alignItems="start">
            {/* <Text fontSize='small'>
              {magicCard.type}
            </Text> */}
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  ));

  return (
    <Flex flexWrap="wrap" justifyContent="center" alignItems="flex-start">
      {cardList}
    </Flex>
  );
}



export default App;