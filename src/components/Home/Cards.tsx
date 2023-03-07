import { Grid, GridItem } from '@chakra-ui/react'
import Card, { CardContents } from '../Cards/Card'

export interface CardsProps {
  cards: CardContents[]
}

const Cards = ({ cards }: CardsProps) => (
  <Grid
    templateColumns={{
      base: '1fr',
      sm: 'repeat(2, 1fr)',
      lg: 'repeat(4, 1fr)',
    }}
  >
    {cards.map((card, index) => (
      <GridItem
        display='flex'
        justifyContent='center'
        alignItems='center'
        p={4}
        key={index}
      >
        <Card card={card} />
      </GridItem>
    ))}
  </Grid>
)
export default Cards
