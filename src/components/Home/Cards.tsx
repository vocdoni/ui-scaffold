import { Grid, GridItem } from '@chakra-ui/react'
import { CardProps } from '../../elements/Home'
import Card from '../Cards/Card'

interface Props {
  cards: CardProps[]
}

const Cards = ({ cards }: Props) => (
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
      >
        <Card key={index} card={card} />
      </GridItem>
    ))}
  </Grid>
)
export default Cards
