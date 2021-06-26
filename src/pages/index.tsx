import { Box, Center, Flex, Heading, Link, List, ListItem, Text } from '@chakra-ui/react';
import { AnimateSharedLayout } from 'framer-motion';
import Head from 'next/head';
import type { KeyboardEventHandler, MouseEventHandler } from 'react';
import { useCallback, useState } from 'react';
import { Motion } from '../components';

/**
 * 001 002 010 011
 * 020 021 022 100
 * 101 102 110 111
 * 112 120 121 222
 */
const colors = [
  ['rgba(255, 255, 128, 1)', 'rgba(255, 255,   0, 1)', 'rgba(255, 128, 255, 1)', 'rgba(255, 128, 128, 1)'],
  ['rgba(255, 0,   255, 1)', 'rgba(255, 0,   128, 1)', 'rgba(255, 0,     0, 1)', 'rgba(128, 255, 255, 1)'],
  ['rgba(128, 255, 128, 1)', 'rgba(128, 255,   0, 1)', 'rgba(128, 128, 255, 1)', 'rgba(128, 128, 128, 1)'],
  ['rgba(128, 128, 0,   1)', 'rgba(128, 0,   255, 1)', 'rgba(128, 0,    128, 1)', 'rgba(0,   0,   0,   1)'],
];

const spring = {
  damping: 15,
  stiffness: 600,
  type: 'spring',
};

const Item = ({ color, isSelected, onClick }: {
  color: string;
  isSelected: boolean;
  onClick: KeyboardEventHandler<HTMLElement> | MouseEventHandler<HTMLElement>;
}): JSX.Element => (
  <Box
    as="li"
    backgroundColor={color}
    borderRadius="50%"
    cursor="pointer"
    display="block"
    flex-shrink={0}
    height="100px"
    margin="20px"
    position="relative"
    width="100px"
  >
    <Flex
      flex={1}
      h="full"
      onClick={onClick as MouseEventHandler<HTMLElement>}
      onKeyPress={onClick as KeyboardEventHandler<HTMLElement>}
      role="button"
      tabIndex={0}
    >
      {
        isSelected && (
          <Motion
            animate={{ borderColor: color }}
            border="10px solid white"
            borderRadius="50%"
            bottom="-20px"
            initial={false}
            layoutId="outline"
            left="-20px"
            position="absolute"
            right="-20px"
            top="-20px"
            transition={spring}
          />
        )
      }
    </Flex>
  </Box>
);

// eslint-disable-next-line max-lines-per-function, react/no-multi-comp -- todo
const Home = (): JSX.Element => {
  const [position, setPosition] = useState([0, 0]);

  const setColor = useCallback(([x, y]) => (): void => {
    setPosition([x, y]);
  }, []);

  return (
    <>
      <Head>
        <title>
          Starter Project
        </title>
      </Head>

      <Center bg="blackAlpha.100" flex={1} flexDir="column" h="full">
        <Heading my={4}>
          React Boilerplate
        </Heading>

        <Text>
          Built with best-in-class Open Source technologies.
        </Text>

        <List>
          {
            [
              ['Chakra-UI', 'https://'],
              ['Emotion', 'https://'],
              ['ESLint', 'https://'],
              ['Framer Motion', 'https://'],
              ['Next.js', 'https://'],
            ].map(([title, href]) => (
              <ListItem key={href}>
                <Link key={href}>
                  {title}
                </Link>
              </ListItem>
            ))
          }
        </List>

        <AnimateSharedLayout>
          <Flex flexDirection="column">
            {colors.map((row, x) => (
              // eslint-disable-next-line react/no-array-index-key -- animation key
              <Flex key={x} wrap="nowrap">
                {row.map((color, y) => (
                  <Item
                    color={color}
                    isSelected={position[0] === x && position[1] === y}
                    // eslint-disable-next-line react/no-array-index-key -- animation key
                    key={`${x}-${y}`}
                    onClick={setColor([x, y])}
                  />
                ))}
              </Flex>
            ))}
          </Flex>
        </AnimateSharedLayout>
      </Center>
    </>
  );
};

export default Home;
