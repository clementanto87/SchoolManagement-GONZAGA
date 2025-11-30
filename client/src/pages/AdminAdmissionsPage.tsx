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
import { FiUsers, FiMail, FiPhone, FiMapPin, FiCalendar, FiChevronDown } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import AppLayout from '../components/Layout/AppLayout';

export default function AdminAdmissionsPage() {
    const { token } = useAuth();
    const [applications, setApplications] = useState<any[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const toast = useToast();

    const fetchApplications = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/applications`, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });
            const data = await response.json();
            if (Array.isArray(data)) {
                setApplications(data);
            } else {
                setApplications([]);
                console.error('API returned non-array data:', data);
            }
        } catch (error) {
            console.error('Failed to fetch applications:', error);
            toast({
                title: 'Error fetching applications',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchApplications();
    }, []);

    const handleStatusUpdate = async (id: string, newStatus: string) => {
        try {
            const response = await fetch(`${API_URL}/api/applications/${id}`, {
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
            fetchApplications(); // Refresh list
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
            case 'REVIEWING': return 'blue';
            case 'ACCEPTED': return 'green';
            case 'REJECTED': return 'red';
            default: return 'gray';
        }
    };

    return (
        <AppLayout>
            <Container maxW="container.xl" py={10}>
                {/* Header Section */}
                <Box
                    bgGradient="linear(to-r, teal.600, blue.600)"
                    rounded="2xl"
                    p={{ base: 6, md: 10 }}
                    mb={10}
                    shadow="xl"
                    color="white"
                    position="relative"
                    overflow="hidden"
                >
                    <Box position="absolute" top={0} right={0} opacity={0.1}>
                        <Icon as={FiUsers as any} w={64} h={64} />
                    </Box>
                    <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align={{ base: 'start', md: 'center' }} position="relative" zIndex={1} gap={4}>
                        <Box>
                            <Heading size="2xl" mb={2}>Admissions</Heading>
                            <Text fontSize="lg" opacity={0.9}>Review and manage incoming student applications.</Text>
                        </Box>
                    </Flex>
                </Box>

                {/* Applications List */}
                {isLoading ? (
                    <Flex justify="center" align="center" h="200px">
                        <Spinner size="xl" color="teal.500" />
                    </Flex>
                ) : (
                    <>
                        {/* Desktop View */}
                        <Box display={{ base: 'none', md: 'block' }} bg="white" shadow="xl" rounded="2xl" overflow="hidden" border="1px solid" borderColor="gray.100">
                            <Table variant="simple">
                                <Thead bg="gray.50">
                                    <Tr>
                                        <Th py={6}>Student Name</Th>
                                        <Th py={6}>Grade</Th>
                                        <Th py={6}>Parent Contact</Th>
                                        <Th py={6}>Submitted</Th>
                                        <Th py={6}>Status</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {applications.length === 0 ? (
                                        <Tr>
                                            <Td colSpan={5} textAlign="center" py={10} color="gray.500">
                                                No applications found.
                                            </Td>
                                        </Tr>
                                    ) : (
                                        applications.map((app) => (
                                            <Tr key={app.id} _hover={{ bg: 'teal.50' }} transition="all 0.2s">
                                                <Td py={6}>
                                                    <VStack align="start" spacing={0}>
                                                        <Text fontWeight="bold" fontSize="lg" color="teal.600">
                                                            {app.firstName} {app.lastName}
                                                        </Text>
                                                        <HStack fontSize="xs" color="gray.500">
                                                            <Text>{app.gender}</Text>
                                                            <Text>•</Text>
                                                            <Text>{new Date(app.dob).toLocaleDateString()}</Text>
                                                        </HStack>
                                                    </VStack>
                                                </Td>
                                                <Td py={6}>
                                                    <Badge colorScheme="purple" px={2} py={1} rounded="md">
                                                        Grade {app.grade}
                                                    </Badge>
                                                </Td>
                                                <Td py={6}>
                                                    <VStack align="start" spacing={1}>
                                                        <Text fontWeight="medium" color="gray.800">{app.parentName}</Text>
                                                        <HStack fontSize="sm" color="gray.500">
                                                            <Icon as={FiMail as any} />
                                                            <Text>{app.parentEmail}</Text>
                                                        </HStack>
                                                        <HStack fontSize="sm" color="gray.500">
                                                            <Icon as={FiPhone as any} />
                                                            <Text>{app.parentPhone}</Text>
                                                        </HStack>
                                                    </VStack>
                                                </Td>
                                                <Td py={6}>
                                                    <Text fontSize="sm" color="gray.600">
                                                        {new Date(app.createdAt).toLocaleDateString()}
                                                    </Text>
                                                </Td>
                                                <Td py={6}>
                                                    <Menu>
                                                        <MenuButton as={Button} size="sm" rightIcon={<Icon as={FiChevronDown as any} />} colorScheme={getStatusColor(app.status)} variant="outline" rounded="full">
                                                            {app.status}
                                                        </MenuButton>
                                                        <MenuList>
                                                            <MenuItem onClick={() => handleStatusUpdate(app.id, 'PENDING')}>Pending</MenuItem>
                                                            <MenuItem onClick={() => handleStatusUpdate(app.id, 'REVIEWING')}>Reviewing</MenuItem>
                                                            <MenuItem onClick={() => handleStatusUpdate(app.id, 'ACCEPTED')}>Accepted</MenuItem>
                                                            <MenuItem onClick={() => handleStatusUpdate(app.id, 'REJECTED')}>Rejected</MenuItem>
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
                            {applications.length === 0 ? (
                                <Box p={8} textAlign="center" color="gray.500" bg="white" rounded="xl" shadow="sm">
                                    No applications found.
                                </Box>
                            ) : (
                                applications.map((app) => (
                                    <Box key={app.id} bg="white" p={5} rounded="xl" shadow="md" border="1px solid" borderColor="gray.100">
                                        <Flex justify="space-between" align="start" mb={3}>
                                            <VStack align="start" spacing={0}>
                                                <Text fontWeight="bold" fontSize="lg" color="teal.600">
                                                    {app.firstName} {app.lastName}
                                                </Text>
                                                <Badge colorScheme="purple" mt={1}>
                                                    Grade {app.grade}
                                                </Badge>
                                            </VStack>
                                            <Badge colorScheme={getStatusColor(app.status)} px={2} py={1} rounded="full">
                                                {app.status}
                                            </Badge>
                                        </Flex>

                                        <VStack align="start" spacing={2} mb={3} bg="gray.50" p={3} rounded="lg">
                                            <Text fontSize="xs" fontWeight="bold" color="gray.500" textTransform="uppercase">Parent Details</Text>
                                            <Text fontWeight="medium" color="gray.800">{app.parentName}</Text>
                                            <HStack fontSize="sm" color="gray.600">
                                                <Icon as={FiMail as any} />
                                                <Text>{app.parentEmail}</Text>
                                            </HStack>
                                            <HStack fontSize="sm" color="gray.600">
                                                <Icon as={FiPhone as any} />
                                                <Text>{app.parentPhone}</Text>
                                            </HStack>
                                        </VStack>

                                        <HStack justify="space-between" fontSize="xs" color="gray.400" mt={2}>
                                            <HStack>
                                                <Icon as={FiCalendar as any} />
                                                <Text>Applied: {new Date(app.createdAt).toLocaleDateString()}</Text>
                                            </HStack>
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
