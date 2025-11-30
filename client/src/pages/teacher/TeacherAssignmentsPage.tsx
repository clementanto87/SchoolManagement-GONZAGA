import React, { useState, useEffect } from 'react';
import {
    Box,
    Heading,
    Button,
    SimpleGrid,
    Text,
    useColorModeValue,
    VStack,
    HStack,
    Badge,
    Icon,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Select,
    useToast,
    Spinner,
    Center
} from '@chakra-ui/react';
import { FiPlus, FiCalendar, FiFileText } from 'react-icons/fi';
import TeacherLayout from '../../components/Layout/TeacherLayout';
import { API_URL } from '../../config';
import { useAuth } from '../../context/AuthContext';

interface Assignment {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    totalMarks: number;
    class: { name: string; section: string };
    subject: { name: string };
    _count: { submissions: number };
}

interface ClassItem {
    id: string;
    name: string;
    section: string;
}

export default function TeacherAssignmentsPage() {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [classes, setClasses] = useState<ClassItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { token } = useAuth();
    const toast = useToast();
    const bgColor = useColorModeValue('gray.50', 'gray.900');

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        dueDate: '',
        totalMarks: '',
        classId: '',
        subjectId: '' // In a real app, we'd fetch subjects too
    });

    const fetchAssignments = async () => {
        try {
            const response = await fetch(`${API_URL}/api/assignments/teacher`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setAssignments(data);
            }
        } catch (error) {
            console.error('Failed to fetch assignments', error);
        } finally {
            setIsLoading(false);
        }
    };

    const fetchClasses = async () => {
        try {
            const response = await fetch(`${API_URL}/api/teachers/me/classes`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            if (response.ok) {
                const data = await response.json();
                setClasses(data);
            }
        } catch (error) {
            console.error('Failed to fetch classes', error);
        }
    };

    useEffect(() => {
        fetchAssignments();
        fetchClasses();
    }, [token]);

    const handleCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            // For now, hardcode a subject ID or fetch it. 
            // Since we seeded Math, let's try to find it or just pass a dummy if strict relation isn't enforced yet
            // Ideally we need a route to fetch subjects for a teacher.
            // For this demo, we'll assume the backend handles it or we pick the first subject of the class (if we had that endpoint)
            // Let's just send what we have. Note: subjectId is required by schema.
            // We'll need to fetch subjects first.

            // Quick fix: Fetch class details to get subjects
            const classRes = await fetch(`${API_URL}/api/classes/${formData.classId}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            const classData = await classRes.json();
            const subjectId = classData.subjects?.[0]?.id; // Pick first subject

            if (!subjectId) {
                toast({ title: 'No subjects found for this class', status: 'error' });
                return;
            }

            const response = await fetch(`${API_URL}/api/assignments`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ ...formData, subjectId })
            });

            if (response.ok) {
                toast({ title: 'Assignment created', status: 'success' });
                onClose();
                fetchAssignments();
                setFormData({ title: '', description: '', dueDate: '', totalMarks: '', classId: '', subjectId: '' });
            } else {
                throw new Error('Failed to create');
            }
        } catch (error) {
            toast({ title: 'Error creating assignment', status: 'error' });
        }
    };

    return (
        <TeacherLayout>
            <Box bg={bgColor} minH="calc(100vh - 100px)" p={6}>
                <HStack justify="space-between" mb={6}>
                    <Heading size="lg">Assignments</Heading>
                    <Button leftIcon={<FiPlus />} colorScheme="blue" onClick={onOpen}>
                        Create Assignment
                    </Button>
                </HStack>

                {isLoading ? (
                    <Center py={10}>
                        <Spinner size="xl" color="blue.500" />
                    </Center>
                ) : assignments.length === 0 ? (
                    <Text>No assignments created yet.</Text>
                ) : (
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                        {assignments.map((assignment) => (
                            <Box
                                key={assignment.id}
                                bg="white"
                                p={6}
                                rounded="xl"
                                shadow="md"
                                borderTop="4px solid"
                                borderTopColor="purple.500"
                                _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                                transition="all 0.2s"
                            >
                                <VStack align="start" spacing={3}>
                                    <HStack justify="space-between" w="full">
                                        <Badge colorScheme="purple">{assignment.subject.name}</Badge>
                                        <Badge colorScheme="gray">{assignment.class.name}-{assignment.class.section}</Badge>
                                    </HStack>

                                    <Heading size="md" noOfLines={2}>{assignment.title}</Heading>
                                    <Text color="gray.600" fontSize="sm" noOfLines={3}>{assignment.description}</Text>

                                    <HStack color="gray.500" fontSize="xs" w="full" pt={2} borderTop="1px solid" borderColor="gray.100">
                                        <HStack>
                                            <Icon as={FiCalendar} />
                                            <Text>Due: {new Date(assignment.dueDate).toLocaleDateString()}</Text>
                                        </HStack>
                                        <HStack ml="auto">
                                            <Icon as={FiFileText} />
                                            <Text>{assignment._count.submissions} Submissions</Text>
                                        </HStack>
                                    </HStack>
                                </VStack>
                            </Box>
                        ))}
                    </SimpleGrid>
                )}

                {/* Create Modal */}
                <Modal isOpen={isOpen} onClose={onClose} size="xl">
                    <ModalOverlay />
                    <ModalContent>
                        <ModalHeader>Create New Assignment</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody pb={6}>
                            <VStack spacing={4} as="form" onSubmit={handleCreate}>
                                <FormControl isRequired>
                                    <FormLabel>Title</FormLabel>
                                    <Input value={formData.title} onChange={e => setFormData({ ...formData, title: e.target.value })} />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Class</FormLabel>
                                    <Select placeholder="Select Class" value={formData.classId} onChange={e => setFormData({ ...formData, classId: e.target.value })}>
                                        {classes.map(cls => (
                                            <option key={cls.id} value={cls.id}>{cls.name}-{cls.section}</option>
                                        ))}
                                    </Select>
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Due Date</FormLabel>
                                    <Input type="date" value={formData.dueDate} onChange={e => setFormData({ ...formData, dueDate: e.target.value })} />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel>Total Marks</FormLabel>
                                    <Input type="number" value={formData.totalMarks} onChange={e => setFormData({ ...formData, totalMarks: e.target.value })} />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Description</FormLabel>
                                    <Textarea value={formData.description} onChange={e => setFormData({ ...formData, description: e.target.value })} />
                                </FormControl>
                                <Button type="submit" colorScheme="blue" w="full">Create Assignment</Button>
                            </VStack>
                        </ModalBody>
                    </ModalContent>
                </Modal>
            </Box>
        </TeacherLayout>
    );
}
