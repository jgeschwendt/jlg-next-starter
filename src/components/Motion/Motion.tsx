import type { HTMLChakraProps } from '@chakra-ui/react';
import { chakra } from '@chakra-ui/react';
import type { HTMLMotionProps } from 'framer-motion';
import { motion } from 'framer-motion';

type Merge<P, T> = Omit<P, keyof T> & T;
type MotionBoxProps = Merge<HTMLChakraProps<'div'>, HTMLMotionProps<'div'>>;

export const Motion: React.FC<MotionBoxProps> = motion(chakra.div);
