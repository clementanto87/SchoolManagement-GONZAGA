import React, { useState, useEffect } from 'react';
import {
    Box,
    Button,
    Container,
    Heading,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    IconButton,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    useDisclosure,
    Icon,
    VStack,
    HStack,
    Text,
    Badge,
    Spinner,
    Flex,
} from '@chakra-ui/react';
import { API_URL } from '../config';
import { FiPlus, FiTrash2, FiEdit, FiCalendar, FiClock, FiMapPin } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import AppLayout from '../components/Layout/AppLayout';

interface Event {
    id: string;
    title: string;
    date: string;
    time: string;
    location: string;
    description: string;
}

export default function AdminEventsPage() {
    const { token } = useAuth();
    const [events, setEvents] = useState<Event[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const [formData, setFormData] = useState({
        title: '',
        date: '',
        time: '',
        location: '',
        description: '',
    });
    const [editingId, setEditingId] = useState<string | null>(null);

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(`${API_URL}/api/events`);
            const data = await response.json();
            if (Array.isArray(data)) {
                setEvents(data);
            } else {
                setEvents([]);
            }
        } catch (error) {
            console.error('Failed to fetch events:', error);
            toast({
                title: 'Error fetching events',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleOpenCreate = () => {
        setEditingId(null);
        setFormData({
            title: '',
            date: new Date().toISOString().split('T')[0],
            time: '',
            location: '',
            description: '',
        });
        onOpen();
    };

    const handleEdit = (event: Event) => {
        setEditingId(event.id);
        setFormData({
            title: event.title,
            date: new Date(event.date).toISOString().split('T')[0],
            time: event.time,
            location: event.location,
            description: event.description,
        });
        onOpen();
    };

    const handleSubmit = async () => {
        try {
            const url = editingId
                ? `${API_URL}/api/events/${editingId}`
                : `${API_URL}/api/events`;
            const method = editingId ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                toast({
                    title: `Event ${editingId ? 'updated' : 'created'} successfully`,
                    status: 'success',
                    duration: 3000,
                    isClosable: true,
                });
                onClose();
                fetchEvents();
                setFormData({ title: '', date: '', time: '', location: '', description: '' });
                setEditingId(null);
            } else {
                throw new Error('Failed to save event');
            }
        } catch (error) {
            toast({
                title: 'Error saving event',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
        }
    };

    const handleDelete = async (id: string) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            try {
                const response = await fetch(`${API_URL}/api/events/${id}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.ok) {
                    toast({
                        title: 'Event deleted successfully',
                        status: 'success',
                        duration: 3000,
                        isClosable: true,
                    });
                    fetchEvents();
                } else {
                    throw new Error('Failed to delete event');
                }
            } catch (error) {
                toast({
                    title: 'Error deleting event',
                    status: 'error',
                    duration: 3000,
                    isClosable: true,
                });
            }
        }
    };

    return (
        <AppLayout>
            <Container maxW="container.xl" py={10}>
                {/* Header Section */}
                <Box
                    bgGradient="linear(to-r, blue.600, purple.600)"
                    rounded="2xl"
                    p={{ base: 6, md: 10 }}
                    mb={10}
                    shadow="xl"
                    color="white"
                    position="relative"
                    overflow="hidden"
                >
                    <Box position="absolute" top={0} right={0} opacity={0.1}>
                        <Icon as={FiCalendar as any} w={64} h={64} />
                    </Box>
                    <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align={{ base: 'start', md: 'center' }} position="relative" zIndex={1} gap={4}>
                        <Box>
                            <Heading size="2xl" mb={2}>Events Management</Heading>
                            <Text fontSize="lg" opacity={0.9}>Create and manage upcoming school events and schedules.</Text>
                        </Box>
                        <Button
                            leftIcon={<Icon as={FiPlus as any} />}
                            bg="white"
                            color="blue.600"
                            size="lg"
                            _hover={{ bg: 'gray.100', transform: 'translateY(-2px)', shadow: 'lg' }}
                            onClick={handleOpenCreate}
                            rounded="full"
                            px={8}
                            shadow="md"
                            w={{ base: 'full', md: 'auto' }}
                        >
                            Add Event
                        </Button>
                    </Flex>
                </Box>

                {/* Events List - Desktop (Table) */}
                {isLoading ? (
                    <Flex justify="center" align="center" h="200px">
                        <Spinner size="xl" color="blue.500" />
                    </Flex>
                ) : (
                    <>
                        <Box display={{ base: 'none', md: 'block' }} bg="white" shadow="xl" rounded="2xl" overflow="hidden" border="1px solid" borderColor="gray.100">
                            <Table variant="simple">
                                <Thead bg="gray.50">
                                    <Tr>
                                        <Th py={6} fontSize="sm" letterSpacing="wider" color="gray.500">Date</Th>
                                        <Th py={6} fontSize="sm" letterSpacing="wider" color="gray.500">Event Details</Th>
                                        <Th py={6} fontSize="sm" letterSpacing="wider" color="gray.500">Location</Th>
                                        <Th py={6} fontSize="sm" letterSpacing="wider" color="gray.500" isNumeric>Actions</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {events.length === 0 ? (
                                        <Tr>
                                            <Td colSpan={4} textAlign="center" py={10} color="gray.500">
                                                No events found. Click "Add Event" to get started.
                                            </Td>
                                        </Tr>
                                    ) : (
                                        events.map((event) => (
                                            <Tr key={event.id} _hover={{ bg: 'blue.50' }} transition="all 0.2s">
                                                <Td py={6}>
                                                    <VStack align="start" spacing={0}>
                                                        <Text fontWeight="bold" fontSize="lg" color="blue.600">
                                                            {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                        </Text>
                                                        <Text fontSize="sm" color="gray.500">
                                                            {new Date(event.date).getFullYear()}
                                                        </Text>
                                                    </VStack>
                                                </Td>
                                                <Td py={6}>
                                                    <VStack align="start" spacing={1}>
                                                        <Heading size="sm" color="gray.800">{event.title}</Heading>
                                                        <HStack fontSize="sm" color="gray.500">
                                                            <Icon as={FiClock as any} color="blue.400" />
                                                            <Text>{event.time}</Text>
                                                        </HStack>
                                                        <Text fontSize="sm" color="gray.600" noOfLines={1}>{event.description}</Text>
                                                    </VStack>
                                                </Td>
                                                <Td py={6}>
                                                    <HStack fontSize="sm" color="gray.600">
                                                        <Icon as={FiMapPin as any} color="red.400" />
                                                        <Text fontWeight="medium">{event.location}</Text>
                                                    </HStack>
                                                </Td>
                                                <Td py={6} isNumeric>
                                                    <HStack justify="flex-end" spacing={2}>
                                                        <IconButton
                                                            aria-label="Edit event"
                                                            icon={<Icon as={FiEdit as any} />}
                                                            colorScheme="blue"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleEdit(event)}
                                                            _hover={{ bg: 'blue.50', color: 'blue.600' }}
                                                        />
                                                        <IconButton
                                                            aria-label="Delete event"
                                                            icon={<Icon as={FiTrash2 as any} />}
                                                            colorScheme="red"
                                                            variant="ghost"
                                                            size="sm"
                                                            onClick={() => handleDelete(event.id)}
                                                            _hover={{ bg: 'red.50', color: 'red.600' }}
                                                        />
                                                    </HStack>
                                                </Td>
                                            </Tr>
                                        ))
                                    )}
                                </Tbody>
                            </Table>
                        </Box>

                        {/* Events List - Mobile (Cards) */}
                        <VStack display={{ base: 'flex', md: 'none' }} spacing={4} align="stretch">
                            {events.length === 0 ? (
                                <Box p={8} textAlign="center" color="gray.500" bg="white" rounded="xl" shadow="sm">
                                    No events found. Click "Add Event" to get started.
                                </Box>
                            ) : (
                                events.map((event) => (
                                    <Box key={event.id} bg="white" p={5} rounded="xl" shadow="md" border="1px solid" borderColor="gray.100">
                                        <Flex justify="space-between" align="start" mb={3}>
                                            <VStack align="start" spacing={0}>
                                                <Text fontWeight="bold" fontSize="lg" color="blue.600">
                                                    {new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                                                </Text>
                                                <Text fontSize="sm" color="gray.500">
                                                    {new Date(event.date).getFullYear()}
                                                </Text>
                                            </VStack>
                                            <HStack spacing={1}>
                                                <IconButton
                                                    aria-label="Edit event"
                                                    icon={<Icon as={FiEdit as any} />}
                                                    colorScheme="blue"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleEdit(event)}
                                                />
                                                <IconButton
                                                    aria-label="Delete event"
                                                    icon={<Icon as={FiTrash2 as any} />}
                                                    colorScheme="red"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(event.id)}
                                                />
                                            </HStack>
                                        </Flex>
                                        <Heading size="sm" color="gray.800" mb={2}>{event.title}</Heading>
                                        <VStack align="start" spacing={2} mb={3}>
                                            <HStack fontSize="sm" color="gray.500">
                                                <Icon as={FiClock as any} color="blue.400" />
                                                <Text>{event.time}</Text>
                                            </HStack>
                                            <HStack fontSize="sm" color="gray.600">
                                                <Icon as={FiMapPin as any} color="red.400" />
                                                <Text fontWeight="medium">{event.location}</Text>
                                            </HStack>
                                        </VStack>
                                        <Text fontSize="sm" color="gray.600" noOfLines={2}>{event.description}</Text>
                                    </Box>
                                ))
                            )}
                        </VStack>
                    </>
                )}

                {/* Add/Edit Event Modal */}
                <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'full', md: 'xl' }} isCentered>
                    <ModalOverlay backdropFilter="blur(5px)" />
                    <ModalContent rounded={{ base: 'none', md: '2xl' }} shadow="2xl">
                        <ModalHeader bg="gray.50" borderTopRadius={{ base: 'none', md: '2xl' }} borderBottom="1px solid" borderColor="gray.100" py={6}>
                            {editingId ? 'Edit Event' : 'Add New Event'}
                        </ModalHeader>
                        <ModalCloseButton mt={2} />
                        <ModalBody py={8}>
                            <VStack spacing={6}>
                                <FormControl isRequired>
                                    <FormLabel fontWeight="bold" color="gray.700">Event Title</FormLabel>
                                    <Input
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="e.g., Annual Sports Day"
                                        size="lg"
                                        rounded="lg"
                                        focusBorderColor="blue.500"
                                    />
                                </FormControl>

                                <HStack w="full" spacing={4}>
                                    <FormControl isRequired>
                                        <FormLabel fontWeight="bold" color="gray.700">Date</FormLabel>
                                        <Input
                                            type="date"
                                            name="date"
                                            value={formData.date}
                                            onChange={handleInputChange}
                                            size="lg"
                                            rounded="lg"
                                            focusBorderColor="blue.500"
                                        />
                                    </FormControl>
                                    <FormControl isRequired>
                                        <FormLabel fontWeight="bold" color="gray.700">Time</FormLabel>
                                        <Input
                                            name="time"
                                            value={formData.time}
                                            onChange={handleInputChange}
                                            placeholder="e.g., 9:00 AM - 2:00 PM"
                                            size="lg"
                                            rounded="lg"
                                            focusBorderColor="blue.500"
                                        />
                                    </FormControl>
                                </HStack>

                                <FormControl isRequired>
                                    <FormLabel fontWeight="bold" color="gray.700">Location</FormLabel>
                                    <Input
                                        name="location"
                                        value={formData.location}
                                        onChange={handleInputChange}
                                        placeholder="e.g., School Auditorium"
                                        size="lg"
                                        rounded="lg"
                                        focusBorderColor="blue.500"
                                    />
                                </FormControl>

                                <FormControl>
                                    <FormLabel fontWeight="bold" color="gray.700">Description</FormLabel>
                                    <Textarea
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="Event details..."
                                        rows={4}
                                        size="lg"
                                        rounded="lg"
                                        focusBorderColor="blue.500"
                                    />
                                </FormControl>
                            </VStack>
                        </ModalBody>

                        <ModalFooter bg="gray.50" borderBottomRadius={{ base: 'none', md: '2xl' }} borderTop="1px solid" borderColor="gray.100" py={6}>
                            <Button variant="ghost" mr={3} onClick={onClose} size="lg" rounded="lg">
                                Cancel
                            </Button>
                            <Button
                                colorScheme="blue"
                                onClick={handleSubmit}
                                size="lg"
                                rounded="lg"
                                bgGradient="linear(to-r, blue.500, blue.600)"
                                _hover={{ bgGradient: "linear(to-r, blue.600, blue.700)", shadow: 'md' }}
                            >
                                {editingId ? 'Update Event' : 'Create Event'}
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Container>
        </AppLayout>
    );
}
