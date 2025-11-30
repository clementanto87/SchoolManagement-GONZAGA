import React, { useState } from 'react';
import {
    Button,
    Checkbox,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Link,
    Stack,
    Image,
    Text,
    useColorModeValue,
    useToast,
    Box,
    Icon,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';
import axios from 'axios';
import { useNavigate, Link as RouterLink } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async () => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${API_URL}/api/auth/login`, {
                email,
                password,
            });
            login(response.data.token, response.data.user);
            toast({
                title: 'Welcome back!',
                description: "You've successfully logged in.",
                status: 'success',
                duration: 3000,
                isClosable: true,
                position: 'top-right',
            });
            if (response.data.user.role === 'ADMIN') {
                navigate('/admin/dashboard');
            } else if (response.data.user.role === 'TEACHER') {
                navigate('/teacher/dashboard');
            } else {
                navigate('/teacher/dashboard');
            }
        } catch (error: any) {
            toast({
                title: 'Login failed',
                description: error.response?.data?.message || 'Please check your credentials and try again.',
                status: 'error',
                duration: 4000,
                isClosable: true,
                position: 'top-right',
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Flex minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
            {/* Left Side - Image & Branding */}
            <Flex
                flex={1}
                bg={'blue.600'}
                position="relative"
                display={{ base: 'none', md: 'flex' }}
                alignItems="center"
                justifyContent="center"
            >
                <Image
                    alt={'Login Image'}
                    objectFit={'cover'}
                    src={
                        'https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1350&q=80'
                    }
                    position="absolute"
                    w="full"
                    h="full"
                    opacity={0.4}
                />
                <Box position="relative" zIndex={1} color="white" textAlign="center" px={8}>
                    <Heading fontSize={'5xl'} fontWeight={'bold'} mb={4}>
                        GONZAGA
                    </Heading>
                    <Text fontSize={'xl'} fontWeight={'medium'}>
                        Empowering Future Leaders & Innovators
                    </Text>
                    <Text mt={4} fontSize={'md'} opacity={0.8}>
                        Access your dashboard to manage classes, assignments, and more.
                    </Text>
                </Box>
            </Flex>

            {/* Right Side - Login Form */}
            <Flex p={8} flex={1} align={'center'} justify={'center'} bg={useColorModeValue('white', 'gray.800')}>
                <Stack spacing={8} w={'full'} maxW={'md'}>
                    <Box mb={4}>
                        <Link as={RouterLink} to="/" color="blue.500" display="inline-flex" alignItems="center" _hover={{ textDecoration: 'none', color: 'blue.600' }}>
                            <Icon as={FiArrowLeft as any} mr={2} /> Back to Home
                        </Link>
                    </Box>

                    <Stack spacing={2}>
                        <Heading fontSize={'3xl'} fontWeight="bold">Sign in to your account</Heading>
                        <Text fontSize={'md'} color={'gray.600'}>
                            Welcome back! Please enter your details.
                        </Text>
                    </Stack>

                    <Box
                        rounded={'xl'}
                        bg={useColorModeValue('white', 'gray.700')}
                        // boxShadow={'lg'}
                        p={0}
                    >
                        <Stack spacing={5}>
                            <FormControl id="email">
                                <FormLabel fontWeight="medium">Email address</FormLabel>
                                <Input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    size="lg"
                                    rounded="md"
                                    focusBorderColor="blue.500"
                                />
                            </FormControl>
                            <FormControl id="password">
                                <FormLabel fontWeight="medium">Password</FormLabel>
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    size="lg"
                                    rounded="md"
                                    focusBorderColor="blue.500"
                                />
                            </FormControl>
                            <Stack spacing={6}>
                                <Stack
                                    direction={{ base: 'column', sm: 'row' }}
                                    align={'start'}
                                    justify={'space-between'}>
                                    <Checkbox colorScheme="blue">Remember me</Checkbox>
                                    <Link color={'blue.500'}>Forgot password?</Link>
                                </Stack>
                                <Button
                                    bg={'blue.600'}
                                    color={'white'}
                                    size="lg"
                                    fontSize="md"
                                    rounded="md"
                                    _hover={{
                                        bg: 'blue.700',
                                    }}
                                    isLoading={isLoading}
                                    loadingText="Signing in..."
                                    onClick={handleSubmit}>
                                    Sign in
                                </Button>
                            </Stack>
                        </Stack>
                    </Box>
                </Stack>
            </Flex>
        </Flex>
    );
}
