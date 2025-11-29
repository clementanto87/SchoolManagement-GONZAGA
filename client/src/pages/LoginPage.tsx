import React, { useState } from 'react';
import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Checkbox,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast,
} from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';
import { API_URL } from '../config';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { login } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            import { API_URL } from '../config';

            // ... imports

            const response = await axios.post(`${API_URL}/api/auth/login`, {
                email,
                password,
            });
            login(response.data.token, response.data.user);
            toast({
                title: 'Login successful.',
                status: 'success',
                duration: 3000,
                isClosable: true,
            });
            if (response.data.user.role === 'ADMIN') {
                navigate('/admin/news');
            } else {
                navigate('/dashboard');
            }
        } catch (error: any) {
            toast({
                title: 'Login failed.',
                description: error.response?.data?.message || 'Something went wrong',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}>
            <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
                <Stack align={'center'}>
                    <Heading fontSize={'4xl'}>Sign in to GONZAGA</Heading>
                    <Text fontSize={'lg'} color={'gray.600'}>
                        School Management System
                    </Text>
                </Stack>
                <Box
                    rounded={'lg'}
                    bg={useColorModeValue('white', 'gray.700')}
                    boxShadow={'lg'}
                    p={8}>
                    <Stack spacing={4}>
                        <FormControl id="email">
                            <FormLabel>Email address</FormLabel>
                            <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        </FormControl>
                        <Stack spacing={10}>
                            <Stack
                                direction={{ base: 'column', sm: 'row' }}
                                align={'start'}
                                justify={'space-between'}>
                                <Checkbox>Remember me</Checkbox>
                                <Text color={'brand.400'}>Forgot password?</Text>
                            </Stack>
                            <Button
                                bg={'brand.400'}
                                color={'white'}
                                _hover={{
                                    bg: 'brand.500',
                                }}
                                onClick={handleSubmit}>
                                Sign in
                            </Button>
                        </Stack>
                    </Stack>
                </Box>
            </Stack>
        </Flex>
    );
}
