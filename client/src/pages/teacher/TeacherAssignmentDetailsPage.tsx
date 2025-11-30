import React, { useEffect, useState } from 'react';
import {
    Box,
    Heading,
    Text,
    useColorModeValue,
    VStack,
    HStack,
    Badge,
    Spinner,
    Center,
    Container,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    Button,
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
    useToast,
    Icon,
    Link,
} from '@chakra-ui/react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft, FiDownload, FiCheckCircle, FiXCircle } from 'react-icons/fi';
import TeacherLayout from '../../components/Layout/TeacherLayout';
import { API_URL } from '../../config';
import { useAuth } from '../../context/AuthContext';

interface Submission {
    id: string;
    student: {
        user: {
            firstName: string;
            lastName: string;
            email: string;
        };
    };
    submittedAt: string;
    content?: string;
    attachments: string[];
    grade?: number;
    feedback?: string;
}

interface AssignmentDetails {
    id: string;
    title: string;
    description: string;
    totalMarks: number;
    dueDate: string;
}

export default function TeacherAssignmentDetailsPage() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { token } = useAuth();
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();

    const [assignment, setAssignment] = useState<AssignmentDetails | null>(null);
    const [submissions, setSubmissions] = useState<Submission[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
    const [gradeData, setGradeData] = useState({ grade: '', feedback: '' });

    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const cardBg = useColorModeValue('white', 'gray.800');

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch submissions (which ideally should also return assignment details or we fetch separately)
                // For now, let's assume we might need a separate call for assignment details if not included
                // But let's try to get submissions first.

                // We actually need assignment details too. 
                // Let's reuse the fetch all assignments and filter (inefficient but works for now) 
                // OR create a get single assignment endpoint. 
                // For speed, let's just fetch submissions and maybe the assignment details are needed.
                // Actually, let's just fetch submissions and show them. The title might be missing if we don't fetch assignment.
                // Let's assume we can get assignment details from a new endpoint or just list submissions.

                const response = await fetch(`${API_URL}/api/assignments/${id}/submissions`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });

                if (response.ok) {
                    const data = await response.json();
                    setSubmissions(data);
                }

                // Fetch assignment details (we might need to add this endpoint or just rely on list)
                // Let's just mock the title for now or fetch from list if we had state management.
                // Better: Add GET /api/assignments/:id to backend.
                // For now, let's just show "Assignment Details" generic title if we can't fetch it easily without new endpoint.

            } catch (error) {
                console.error('Failed to fetch data', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchData();
    }, [id, token]);

    const handleGradeClick = (submission: Submission) => {
        setSelectedSubmission(submission);
        setGradeData({
            grade: submission.grade?.toString() || '',
            feedback: submission.feedback || ''
        });
        onOpen();
    };

    const handleGradeSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!selectedSubmission) return;

        try {
            const response = await fetch(`${API_URL}/api/assignments/submissions/${selectedSubmission.id}/grade`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(gradeData)
            });

            if (response.ok) {
                toast({ title: 'Grade saved', status: 'success' });
                // Update local state
                setSubmissions(prev => prev.map(sub =>
                    sub.id === selectedSubmission.id
                        ? { ...sub, grade: parseFloat(gradeData.grade), feedback: gradeData.feedback }
                        : sub
                ));
                onClose();
            } else {
                throw new Error('Failed to save grade');
            }
        } catch (error) {
            toast({ title: 'Error saving grade', status: 'error' });
        }
    };

    return (
        <TeacherLayout>
            <Box bg={bgColor} minH="calc(100vh - 100px)" py={8}>
                <Container maxW="container.xl">
                    <Button
                        leftIcon={<Icon as={FiArrowLeft as any} />}
                        variant="ghost"
                        mb={6}
                        onClick={() => navigate('/teacher/assignments')}
                    >
                        Back to Assignments
                    </Button>

                    <VStack align="start" spacing={6}>
                        <Heading size="lg">Assignment Submissions</Heading>

                        {isLoading ? (
                            <Center w="full" py={20}>
                                <Spinner size="xl" color="blue.500" />
                            </Center>
                        ) : submissions.length === 0 ? (
                            <Text color="gray.500">No submissions found for this assignment.</Text>
                        ) : (
                            <Box w="full" bg={cardBg} rounded="xl" shadow="sm" overflow="hidden" border="1px solid" borderColor="gray.100">
                                <Table variant="simple">
                                    <Thead bg="gray.50">
                                        <Tr>
                                            <Th>Student</Th>
                                            <Th>Submitted At</Th>
                                            <Th>Status</Th>
                                            <Th>Grade</Th>
                                            <Th>Action</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {submissions.map((submission) => (
                                            <Tr key={submission.id}>
                                                <Td>
                                                    <VStack align="start" spacing={0}>
                                                        <Text fontWeight="bold">{submission.student.user.firstName} {submission.student.user.lastName}</Text>
                                                        <Text fontSize="xs" color="gray.500">{submission.student.user.email}</Text>
                                                    </VStack>
                                                </Td>
                                                <Td>{new Date(submission.submittedAt).toLocaleString()}</Td>
                                                <Td>
                                                    <Badge colorScheme="green">Submitted</Badge>
                                                </Td>
                                                <Td>
                                                    {submission.grade !== undefined && submission.grade !== null ? (
                                                        <Badge colorScheme="purple" fontSize="md">{submission.grade}</Badge>
                                                    ) : (
                                                        <Text color="gray.400">-</Text>
                                                    )}
                                                </Td>
                                                <Td>
                                                    <Button size="sm" colorScheme="blue" onClick={() => handleGradeClick(submission)}>
                                                        Grade
                                                    </Button>
                                                </Td>
                                            </Tr>
                                        ))}
                                    </Tbody>
                                </Table>
                            </Box>
                        )}
                    </VStack>

                    {/* Grading Modal */}
                    <Modal isOpen={isOpen} onClose={onClose}>
                        <ModalOverlay />
                        <ModalContent>
                            <ModalHeader>Grade Submission</ModalHeader>
                            <ModalCloseButton />
                            <ModalBody pb={6}>
                                <VStack spacing={4} as="form" onSubmit={handleGradeSubmit}>
                                    <Box w="full" p={4} bg="gray.50" rounded="md">
                                        <Text fontWeight="bold" mb={2}>Student Content:</Text>
                                        <Text fontSize="sm" color="gray.700">{selectedSubmission?.content || 'No text content.'}</Text>
                                        {selectedSubmission?.attachments && selectedSubmission.attachments.length > 0 && (
                                            <Text fontSize="sm" color="blue.500" mt={2}>
                                                {selectedSubmission.attachments.length} Attachment(s)
                                            </Text>
                                        )}
                                    </Box>

                                    <FormControl isRequired>
                                        <FormLabel>Grade</FormLabel>
                                        <Input
                                            type="number"
                                            value={gradeData.grade}
                                            onChange={e => setGradeData({ ...gradeData, grade: e.target.value })}
                                            placeholder="Enter marks"
                                        />
                                    </FormControl>
                                    <FormControl>
                                        <FormLabel>Feedback</FormLabel>
                                        <Textarea
                                            value={gradeData.feedback}
                                            onChange={e => setGradeData({ ...gradeData, feedback: e.target.value })}
                                            placeholder="Enter feedback for the student"
                                        />
                                    </FormControl>
                                    <Button type="submit" colorScheme="blue" w="full">Save Grade</Button>
                                </VStack>
                            </ModalBody>
                        </ModalContent>
                    </Modal>
                </Container>
            </Box>
        </TeacherLayout>
    );
}
