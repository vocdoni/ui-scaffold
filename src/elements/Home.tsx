import { Box } from '@chakra-ui/react';
import Cards from '../components/Home/Cards';
import Header from '../components/Home/Header';

export interface CardProps {
  name: string;
  funded: string;
  rounds: string;
  imageURL: string;
}

const CARDS = [
  {
    name: 'DAO1',
    funded: '500',
    rounds: '29',
    imageURL:
      'https://images.pexels.com/photos/1550337/pexels-photo-1550337.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    name: 'Omnium Cultural',
    funded: '123',
    rounds: '20',
    imageURL:
      'https://images.pexels.com/photos/2115217/pexels-photo-2115217.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    name: 'Builder',
    funded: '165',
    rounds: '8',
    imageURL:
      'https://images.pexels.com/photos/390051/surfer-wave-sunset-the-indian-ocean-390051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    name: 'Another One',
    funded: '54',
    rounds: '7',
    imageURL:
      'https://images.pexels.com/photos/13759651/pexels-photo-13759651.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    name: 'UMA',
    funded: '170 UMA',
    rounds: '34',
    imageURL:
      'https://images.pexels.com/photos/1013326/pexels-photo-1013326.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    name: 'OnChainMonkey',
    funded: '49',
    rounds: '5',
    imageURL:
      'https://images.pexels.com/photos/63238/pexels-photo-63238.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    name: 'Meebits',
    funded: '13K APE',
    rounds: '3',
    imageURL:
      'https://images.pexels.com/photos/6898858/pexels-photo-6898858.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
  {
    name: 'Anata',
    funded: '18',
    rounds: '2',
    imageURL:
      'https://images.pexels.com/photos/4776/man-sunglasses-art-graffiti.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
  },
];

const Home = () => {
  return (
    <Box pt={6}>
      <Header />
      <Cards cards={CARDS} />
    </Box>
  );
};

export default Home;
