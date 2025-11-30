import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Badge,
    Spinner,
    Flex,
    Text,
    VStack,
    HStack,
    Icon,
    useToast,
    Menu,
    MenuButton,
    MenuList,
    MenuItem,
    Button,
} from '@chakra-ui/react';
import { API_URL } from '../config';
import { FiMail, FiMessageSquare, FiCalendar, FiChevronDown } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import AppLayout from '../components/Layout/AppLayout';

export default function AdminContactPage() {
    const { token } = useAuth();
    const [messages, setMessages] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast();

    const fetchMessages = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/contact`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (Array.isArray(data)) {
                setMessages(data);
            } else {
                setMessages([]);
                console.error('API returned non-array data:', data);
            }
        } catch (error) {
            console.error('Failed to fetch messages:', error);
            toast({
                title: 'Error fetching messages',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchMessages();
    }, []);

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            const response = await fetch(`${API_URL}/api/contact/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!response.ok) throw new Error('Failed to update status');

            toast({
                title: 'Status updated',
                status: 'success',
                duration: 2000,
                isClosable: true,
            });
            fetchMessages(); // Refresh list
        } catch (error) {
            toast({
                title: 'Error updating status',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'PENDING': return 'yellow';
            case 'READ': return 'blue';
            case 'REPLIED': return 'green';
            default: return 'gray';
        }
    };

    return (
        <AppLayout>
            <Container maxW="container.xl" py={10}>
                {/* Header Section */}
                <Box
                    bgGradient="linear(to-r, cyan.600, blue.600)"
                    rounded="2xl"
                    p={{ base: 6, md: 10 }}
                    mb={10}
                    shadow="xl"
                    color="white"
                    position="relative"
                    overflow="hidden"
                >
                    <Box position="absolute" top={0} right={0} opacity={0.1}>
                        <Icon as={FiMessageSquare as any} w={64} h={64} />
                    </Box>
                    <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align={{ base: 'start', md: 'center' }} position="relative" zIndex={1} gap={4}>
                        <Box>
                            <Heading size="2xl" mb={2}>Messages</Heading>
                            <Text fontSize="lg" opacity={0.9}>View and manage inquiries from the contact form.</Text>
                        </Box>
                    </Flex>
                </Box>

                {/* Messages List */}
                {isLoading ? (
                    <Flex justify="center" align="center" h="200px">
                        <Spinner size="xl" color="cyan.500" />
                    </Flex>
                ) : (
                    <>
                        {/* Desktop View */}
                        <Box display={{ base: 'none', md: 'block' }} bg="white" shadow="xl" rounded="2xl" overflow="hidden" border="1px solid" borderColor="gray.100">
                            <Table variant="simple">
                                <Thead bg="gray.50">
                                    <Tr>
                                        <Th py={6}>Sender</Th>
                                        <Th py={6}>Subject</Th>
                                        <Th py={6}>Message</Th>
                                        <Th py={6}>Date</Th>
                                        <Th py={6}>Status</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {messages.length === 0 ? (
                                        <Tr>
                                            <Td colSpan={5} textAlign="center" py={10} color="gray.500">
                                                No messages found.
                                            </Td>
                                        </Tr>
                                    ) : (
                                        messages.map((msg) => (
                                            <Tr key={msg.id} _hover={{ bg: 'cyan.50' }} transition="all 0.2s">
                                                <Td py={6}>
                                                    <VStack align="start" spacing={0}>
                                                        <Text fontWeight="bold" fontSize="lg" color="gray.800">
                                                            {msg.name}
                                                        </Text>
                                                        <HStack fontSize="sm" color="gray.500">
                                                            <Icon as={FiMail as any} />
                                                            <Text>{msg.email}</Text>
                                                        </HStack>
                                                    </VStack>
                                                </Td>
                                                <Td py={6}>
                                                    <Text fontWeight="medium" color="gray.700">{msg.subject}</Text>
                                                </Td>
                                                <Td py={6}>
                                                    <Text fontSize="sm" color="gray.600" noOfLines={2} maxW="300px">
                                                        {msg.message}
                                                    </Text>
                                                </Td>
                                                <Td py={6}>
                                                    <Text fontSize="sm" color="gray.600">
                                                        {new Date(msg.createdAt).toLocaleDateString()}
                                                    </Text>
                                                </Td>
                                                <Td py={6}>
                                                    <Menu>
                                                        <MenuButton as={Button} size="sm" rightIcon={<Icon as={FiChevronDown as any} />} colorScheme={getStatusColor(msg.status)} variant="outline" rounded="full">
                                                            {msg.status}
                                                        </MenuButton>
                                                        <MenuList>
                                                            <MenuItem onClick={() => handleStatusUpdate(msg.id, 'PENDING')}>Pending</MenuItem>
                                                            <MenuItem onClick={() => handleStatusUpdate(msg.id, 'READ')}>Read</MenuItem>
                                                            <MenuItem onClick={() => handleStatusUpdate(msg.id, 'REPLIED')}>Replied</MenuItem>
                                                        </MenuList>
                                                    </Menu>
                                                </Td>
                                            </Tr>
                                        ))
                                    )}
                                </Tbody>
                            </Table>
                        </Box>

                        {/* Mobile View */}
                        <VStack display={{ base: 'flex', md: 'none' }} spacing={4} align="stretch">
                            {messages.length === 0 ? (
                                <Box p={8} textAlign="center" color="gray.500" bg="white" rounded="xl" shadow="sm">
                                    No messages found.
                                </Box>
                            ) : (
                                messages.map((msg) => (
                                    <Box key={msg.id} bg="white" p={5} rounded="xl" shadow="md" border="1px solid" borderColor="gray.100">
                                        <Flex justify="space-between" align="start" mb={3}>
                                            <VStack align="start" spacing={0}>
                                                <Text fontWeight="bold" fontSize="lg" color="gray.800">
                                                    {msg.name}
                                                </Text>
                                                <HStack fontSize="sm" color="gray.500">
                                                    <Icon as={FiMail as any} />
                                                    <Text>{msg.email}</Text>
                                                </HStack>
                                            </VStack>
                                            <Badge colorScheme={getStatusColor(msg.status)} px={2} py={1} rounded="full">
                                                {msg.status}
                                            </Badge>
                                        </Flex>

                                        <Box bg="gray.50" p={3} rounded="lg" mb={3}>
                                            <Text fontWeight="bold" fontSize="sm" mb={1}>{msg.subject}</Text>
                                            <Text fontSize="sm" color="gray.600">
                                                {msg.message}
                                            </Text>
                                        </Box>

                                        <HStack justify="space-between" fontSize="xs" color="gray.400" mt={2}>
                                            <HStack>
                                                <Icon as={FiCalendar as any} />
                                                <Text>{new Date(msg.createdAt).toLocaleDateString()}</Text>
                                            </HStack>
                                            <Menu>
                                                <MenuButton as={Button} size="xs" rightIcon={<Icon as={FiChevronDown as any} />} variant="ghost">
                                                    Update Status
                                                </MenuButton>
                                                <MenuList>
                                                    <MenuItem onClick={() => handleStatusUpdate(msg.id, 'PENDING')}>Pending</MenuItem>
                                                    <MenuItem onClick={() => handleStatusUpdate(msg.id, 'READ')}>Read</MenuItem>
                                                    <MenuItem onClick={() => handleStatusUpdate(msg.id, 'REPLIED')}>Replied</MenuItem>
                                                </MenuList>
                                            </Menu>
                                        </HStack>
                                    </Box>
                                ))
                            )}
                        </VStack>
                    </>
                )}
            </Container>
        </AppLayout>
    );
}
