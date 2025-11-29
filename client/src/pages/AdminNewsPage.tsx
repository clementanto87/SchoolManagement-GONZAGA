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
    Flex,
} from '@chakra-ui/react';
import { FiPlus, FiTrash2, FiEdit } from 'react-icons/fi';
import { useAuth } from '../context/AuthContext';
import AppLayout from '../components/Layout/AppLayout';

export default function AdminNewsPage() {
    const { token } = useAuth();
    const [newsItems, setNewsItems] = useState<any[]>([]);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const toast = useToast();

    const [formData, setFormData] = useState({
        id: '',
        title: '',
        excerpt: '',
        content: '',
        date: '',
        author: 'Admin',
    });
    const [isEditing, setIsEditing] = useState(false);

    const fetchNews = async () => {
        try {
            const response = await fetch('http://localhost:5001/api/news');
            const data = await response.json();
            setNewsItems(data);
        } catch (error) {
            console.error('Failed to fetch news:', error);
        }
    };

    useEffect(() => {
        fetchNews();
    }, []);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleOpenCreate = () => {
        setIsEditing(false);
        setFormData({ id: '', title: '', excerpt: '', content: '', date: new Date().toISOString().split('T')[0], author: 'Admin' });
        onOpen();
    };

    const handleEdit = (news: any) => {
        setIsEditing(true);
        setFormData({
            id: news.id,
            title: news.title,
            excerpt: news.excerpt,
            content: news.content || '',
            date: new Date(news.date).toISOString().split('T')[0],
            author: news.author,
        });
        onOpen();
    };

    const handleSubmit = async () => {
        try {
            const url = isEditing
                ? `http://localhost:5001/api/news/${formData.id}`
                : 'http://localhost:5001/api/news';

            const method = isEditing ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error(`Failed to ${isEditing ? 'update' : 'create'} news`);

            toast({
                title: `News ${isEditing ? 'updated' : 'created'} successfully`,
                status: 'success',
                duration: 3000,
                isClosable: true
            });
            onClose();
            fetchNews();
            setFormData({ id: '', title: '', excerpt: '', content: '', date: '', author: 'Admin' });
            setIsEditing(false);
        } catch (error) {
            toast({
                title: `Error ${isEditing ? 'updating' : 'creating'} news`,
                status: 'error',
                duration: 3000,
                isClosable: true
            });
        }
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this news item?')) return;
        try {
            const response = await fetch(`http://localhost:5001/api/news/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`,
                },
            });

            if (!response.ok) throw new Error('Failed to delete news');

            toast({ title: 'News deleted successfully', status: 'success', duration: 3000, isClosable: true });
            fetchNews();
        } catch (error) {
            toast({ title: 'Error deleting news', status: 'error', duration: 3000, isClosable: true });
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
                        <Icon as={FiPlus as any} w={64} h={64} />
                    </Box>
                    <Flex direction={{ base: 'column', md: 'row' }} justify="space-between" align={{ base: 'start', md: 'center' }} position="relative" zIndex={1} gap={4}>
                        <Box>
                            <Heading size="2xl" mb={2}>News Feed</Heading>
                            <Text fontSize="lg" opacity={0.9}>Manage the latest announcements and updates for the school.</Text>
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
                            Add New Post
                        </Button>
                    </Flex>
                </Box>

                {/* News List - Desktop (Table) */}
                <Box display={{ base: 'none', md: 'block' }} bg="white" shadow="xl" rounded="2xl" overflow="hidden" border="1px solid" borderColor="gray.100">
                    <Table variant="simple">
                        <Thead bg="gray.50">
                            <Tr>
                                <Th py={6} fontSize="sm" letterSpacing="wider" color="gray.500">Title & Excerpt</Th>
                                <Th py={6} fontSize="sm" letterSpacing="wider" color="gray.500">Date</Th>
                                <Th py={6} fontSize="sm" letterSpacing="wider" color="gray.500">Author</Th>
                                <Th py={6} fontSize="sm" letterSpacing="wider" color="gray.500" isNumeric>Actions</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {newsItems.length === 0 ? (
                                <Tr>
                                    <Td colSpan={4} textAlign="center" py={10} color="gray.500">
                                        No news items found. Click "Add New Post" to get started.
                                    </Td>
                                </Tr>
                            ) : (
                                newsItems.map((news) => (
                                    <Tr key={news.id} _hover={{ bg: 'blue.50' }} transition="all 0.2s">
                                        <Td py={6}>
                                            <Box>
                                                <Heading size="sm" color="gray.800" mb={1}>{news.title}</Heading>
                                                <Text fontSize="sm" color="gray.500" noOfLines={1}>{news.excerpt}</Text>
                                            </Box>
                                        </Td>
                                        <Td py={6}>
                                            <Box bg="blue.100" color="blue.700" px={3} py={1} rounded="full" display="inline-block" fontSize="xs" fontWeight="bold">
                                                {new Date(news.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                            </Box>
                                        </Td>
                                        <Td py={6}>
                                            <Box display="flex" alignItems="center">
                                                <Box w={8} h={8} rounded="full" bgGradient="linear(to-br, orange.400, red.500)" color="white" display="flex" alignItems="center" justifyContent="center" mr={3} fontSize="xs" fontWeight="bold">
                                                    {news.author.charAt(0).toUpperCase()}
                                                </Box>
                                                <Text fontWeight="medium" color="gray.700">{news.author}</Text>
                                            </Box>
                                        </Td>
                                        <Td py={6} isNumeric>
                                            <HStack justify="flex-end" spacing={2}>
                                                <IconButton
                                                    aria-label="Edit"
                                                    icon={<Icon as={FiEdit as any} />}
                                                    colorScheme="blue"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleEdit(news)}
                                                    _hover={{ bg: 'blue.50', color: 'blue.600' }}
                                                />
                                                <IconButton
                                                    aria-label="Delete"
                                                    icon={<Icon as={FiTrash2 as any} />}
                                                    colorScheme="red"
                                                    variant="ghost"
                                                    size="sm"
                                                    onClick={() => handleDelete(news.id)}
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

                {/* News List - Mobile (Cards) */}
                <VStack display={{ base: 'flex', md: 'none' }} spacing={4} align="stretch">
                    {newsItems.length === 0 ? (
                        <Box p={8} textAlign="center" color="gray.500" bg="white" rounded="xl" shadow="sm">
                            No news items found. Click "Add New Post" to get started.
                        </Box>
                    ) : (
                        newsItems.map((news) => (
                            <Box key={news.id} bg="white" p={5} rounded="xl" shadow="md" border="1px solid" borderColor="gray.100">
                                <Flex justify="space-between" align="start" mb={3}>
                                    <Box>
                                        <Heading size="sm" color="gray.800" mb={1}>{news.title}</Heading>
                                        <Box bg="blue.100" color="blue.700" px={2} py={0.5} rounded="md" display="inline-block" fontSize="xs" fontWeight="bold">
                                            {new Date(news.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })}
                                        </Box>
                                    </Box>
                                    <HStack spacing={1}>
                                        <IconButton
                                            aria-label="Edit"
                                            icon={<Icon as={FiEdit as any} />}
                                            colorScheme="blue"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleEdit(news)}
                                        />
                                        <IconButton
                                            aria-label="Delete"
                                            icon={<Icon as={FiTrash2 as any} />}
                                            colorScheme="red"
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleDelete(news.id)}
                                        />
                                    </HStack>
                                </Flex>
                                <Text fontSize="sm" color="gray.600" noOfLines={2} mb={4}>
                                    {news.excerpt}
                                </Text>
                                <Flex align="center">
                                    <Box w={6} h={6} rounded="full" bgGradient="linear(to-br, orange.400, red.500)" color="white" display="flex" alignItems="center" justifyContent="center" mr={2} fontSize="xs" fontWeight="bold">
                                        {news.author.charAt(0).toUpperCase()}
                                    </Box>
                                    <Text fontSize="xs" fontWeight="medium" color="gray.500">{news.author}</Text>
                                </Flex>
                            </Box>
                        ))
                    )}
                </VStack>

                {/* Add/Edit News Modal */}
                <Modal isOpen={isOpen} onClose={onClose} size={{ base: 'full', md: 'xl' }} isCentered>
                    <ModalOverlay backdropFilter="blur(5px)" />
                    <ModalContent rounded={{ base: 'none', md: '2xl' }} shadow="2xl">
                        <ModalHeader bg="gray.50" borderTopRadius={{ base: 'none', md: '2xl' }} borderBottom="1px solid" borderColor="gray.100" py={6}>
                            {isEditing ? 'Edit News Item' : 'Add New News Item'}
                        </ModalHeader>
                        <ModalCloseButton mt={2} />
                        <ModalBody py={8}>
                            <VStack spacing={6}>
                                <FormControl isRequired>
                                    <FormLabel fontWeight="bold" color="gray.700">Title</FormLabel>
                                    <Input
                                        name="title"
                                        value={formData.title}
                                        onChange={handleInputChange}
                                        placeholder="Enter a catchy title"
                                        size="lg"
                                        rounded="lg"
                                        focusBorderColor="blue.500"
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel fontWeight="bold" color="gray.700">Date</FormLabel>
                                    <Input
                                        name="date"
                                        type="date"
                                        value={formData.date}
                                        onChange={handleInputChange}
                                        size="lg"
                                        rounded="lg"
                                        focusBorderColor="blue.500"
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel fontWeight="bold" color="gray.700">Excerpt</FormLabel>
                                    <Textarea
                                        name="excerpt"
                                        value={formData.excerpt}
                                        onChange={handleInputChange}
                                        placeholder="A short summary..."
                                        size="lg"
                                        rounded="lg"
                                        focusBorderColor="blue.500"
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel fontWeight="bold" color="gray.700">Content</FormLabel>
                                    <Textarea
                                        name="content"
                                        value={formData.content}
                                        onChange={handleInputChange}
                                        rows={8}
                                        placeholder="Full details..."
                                        size="lg"
                                        rounded="lg"
                                        focusBorderColor="blue.500"
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel fontWeight="bold" color="gray.700">Author</FormLabel>
                                    <Input
                                        name="author"
                                        value={formData.author}
                                        onChange={handleInputChange}
                                        size="lg"
                                        rounded="lg"
                                        focusBorderColor="blue.500"
                                    />
                                </FormControl>
                            </VStack>
                        </ModalBody>
                        <ModalFooter bg="gray.50" borderBottomRadius={{ base: 'none', md: '2xl' }} borderTop="1px solid" borderColor="gray.100" py={6}>
                            <Button variant="ghost" mr={3} onClick={onClose} size="lg" rounded="lg">Cancel</Button>
                            <Button
                                colorScheme="blue"
                                onClick={handleSubmit}
                                size="lg"
                                rounded="lg"
                                bgGradient="linear(to-r, blue.500, blue.600)"
                                _hover={{ bgGradient: "linear(to-r, blue.600, blue.700)", shadow: 'md' }}
                            >
                                {isEditing ? 'Update Post' : 'Publish Post'}
                            </Button>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Container>
        </AppLayout>
    );
}


