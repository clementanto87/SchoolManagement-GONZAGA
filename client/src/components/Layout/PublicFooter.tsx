import React from 'react';
import {
    Box,
    Container,
    SimpleGrid,
    Stack,
    Text,
    Link,
    HStack,
    Flex,
    Icon,
    Heading,
} from '@chakra-ui/react';
import { FiBook, FiFacebook, FiTwitter } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';

export default function PublicFooter() {
    const navigate = useNavigate();

    return (
        <Box bg={'gray.900'} color={'white'} py={16}>
            <Container maxW={'7xl'}>
                <SimpleGrid columns={{ base: 1, md: 4 }} spacing={10}>
                    <Box>
                        <HStack spacing={2} mb={6}>
                            <Flex w={8} h={8} align="center" justify="center" bgGradient="linear(to-r, blue.500, purple.600)" rounded="md" color="white">
                                <Icon as={FiBook as any} w={4} h={4} />
                            </Flex>
                            <Heading size={'md'}>GONZAGA MATRIC HIGHER SEC SCHOOL</Heading>
                        </HStack>
                        <Text fontSize={'sm'} color={'gray.400'}>
                            G7RQ+JJ3, Kathanpallam, Krishnagiri,<br />
                            Palepalle, Tamil Nadu 635108
                        </Text>
                        <Text fontSize={'sm'} color={'gray.400'} mt={2}>
                            contact@gonzaga.edu
                        </Text>
                    </Box>
                    <Box>
                        <Heading size={'sm'} mb={6} color="gray.300">Quick Links</Heading>
                        <Stack spacing={3} fontSize={'sm'} color={'gray.400'}>
                            <Link onClick={() => navigate('/about')} _hover={{ color: 'white' }}>About Us</Link>
                            <Link onClick={() => navigate('/academics')} _hover={{ color: 'white' }}>Academics</Link>
                            <Link onClick={() => navigate('/admissions')} _hover={{ color: 'white' }}>Admissions</Link>
                            <Link href="#" _hover={{ color: 'white' }}>Careers</Link>
                            <Link onClick={() => navigate('/contact')} _hover={{ color: 'white' }}>Contact Us</Link>
                        </Stack>
                    </Box>
                    <Box>
                        <Heading size={'sm'} mb={6} color="gray.300">Portals</Heading>
                        <Stack spacing={3} fontSize={'sm'} color={'gray.400'}>
                            <Link onClick={() => navigate('/login')} _hover={{ color: 'white' }}>Admin Login</Link>
                        </Stack>
                    </Box>
                    <Box>
                        <Heading size={'sm'} mb={6} color="gray.300">Follow Us</Heading>
                        <HStack spacing={4}>
                            <Box as="a" href="#" bg="gray.800" p={3} rounded="full" _hover={{ bg: 'blue.600', color: 'white' }} transition="all 0.3s">
                                <Icon as={FiFacebook as any} w={5} h={5} color={'gray.400'} />
                            </Box>
                            <Box as="a" href="#" bg="gray.800" p={3} rounded="full" _hover={{ bg: 'blue.400', color: 'white' }} transition="all 0.3s">
                                <Icon as={FiTwitter as any} w={5} h={5} color={'gray.400'} />
                            </Box>
                        </HStack>
                    </Box>
                </SimpleGrid>
                <Box borderTopWidth={1} borderColor={'gray.800'} mt={16} pt={8} textAlign={'center'}>
                    <Text fontSize={'sm'} color={'gray.500'}>
                        © 2025 GONZAGA MATRIC HIGHER SEC SCHOOL. All Rights Reserved.
                    </Text>
                </Box>
            </Container>
        </Box>
    );
}
