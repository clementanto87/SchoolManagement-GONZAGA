import React from 'react';
import {
    Box,
    Container,
    Flex,
    Heading,
    HStack,
    Link,
    Button,
    IconButton,
    Icon,
    useColorModeValue,
    useDisclosure,
    Collapse,
    VStack,
} from '@chakra-ui/react';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiBook, FiMenu, FiX } from 'react-icons/fi';

const NavLink = ({ children, path }: { children: React.ReactNode; path: string }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const isActive = location.pathname === path;

    return (
        <Link
            onClick={() => navigate(path)}
            px={3}
            py={2}
            rounded={'md'}
            fontSize={'sm'}
            fontWeight={isActive ? 'bold' : 'medium'}
            color={isActive ? 'blue.600' : 'gray.600'}
            bg={isActive ? 'blue.50' : 'transparent'}
            _hover={{
                textDecoration: 'none',
                color: 'blue.600',
                bg: 'blue.50',
            }}
        >
            {children}
        </Link>
    );
};

export default function PublicHeader() {
    const navigate = useNavigate();
    const { isOpen, onToggle } = useDisclosure();

    return (
        <Box
            bg={useColorModeValue('rgba(255, 255, 255, 0.8)', 'rgba(26, 32, 44, 0.8)')}
            css={{ backdropFilter: 'blur(10px)' }}
            shadow={'sm'}
            py={4}
            position={'sticky'}
            top={0}
            zIndex={100}
        >
            <Container maxW={'7xl'}>
                <Flex justify={'space-between'} align={'center'}>
                    <HStack spacing={3} cursor="pointer" onClick={() => navigate('/')}>
                        <Flex w={10} h={10} align="center" justify="center" bgGradient="linear(to-r, blue.500, purple.600)" rounded="lg" color="white">
                            <Icon as={FiBook as any} w={6} h={6} />
                        </Flex>
                        <Heading size={'md'} color={'gray.800'} letterSpacing="tight">GONZAGA MATRIC HIGHER SEC SCHOOL</Heading>
                    </HStack>

                    <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
                        <NavLink path="/">Home</NavLink>
                        <NavLink path="/about">About Us</NavLink>
                        <NavLink path="/academics">Academics</NavLink>
                        <NavLink path="/admissions">Admissions</NavLink>
                        <NavLink path="/contact">Contact</NavLink>
                    </HStack>

                    <HStack spacing={4} display={{ base: 'none', md: 'flex' }}>
                        <Button
                            size={'sm'}
                            bgGradient="linear(to-r, blue.500, purple.600)"
                            color="white"
                            _hover={{ bgGradient: "linear(to-r, blue.600, purple.700)", shadow: 'md' }}
                            onClick={() => navigate('/login')}
                        >
                            Admin Login
                        </Button>
                    </HStack>

                    {/* Mobile Menu Toggle */}
                    <IconButton
                        display={{ base: 'flex', md: 'none' }}
                        onClick={onToggle}
                        icon={isOpen ? <Icon as={FiX as any} w={5} h={5} /> : <Icon as={FiMenu as any} w={5} h={5} />}
                        variant={'ghost'}
                        aria-label={'Toggle Navigation'}
                    />
                </Flex>

                {/* Mobile Menu */}
                <Collapse in={isOpen} animateOpacity>
                    <VStack
                        bg={useColorModeValue('white', 'gray.800')}
                        p={4}
                        display={{ md: 'none' }}
                        rounded={'xl'}
                        shadow={'lg'}
                        mt={4}
                        spacing={2}
                        align="stretch"
                    >
                        <NavLink path="/">Home</NavLink>
                        <NavLink path="/about">About Us</NavLink>
                        <NavLink path="/academics">Academics</NavLink>
                        <NavLink path="/admissions">Admissions</NavLink>
                        <NavLink path="/contact">Contact</NavLink>
                        <Box pt={2}>
                            <Button
                                w="full"
                                bgGradient="linear(to-r, blue.500, purple.600)"
                                color="white"
                                _hover={{ bgGradient: "linear(to-r, blue.600, purple.700)" }}
                                onClick={() => navigate('/login')}
                            >
                                Admin Login
                            </Button>
                        </Box>
                    </VStack>
                </Collapse>
            </Container>
        </Box>
    );
}
