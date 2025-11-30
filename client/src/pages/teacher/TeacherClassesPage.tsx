import React, { useEffect, useState } from 'react';
import {
    Box,
    Heading,
    SimpleGrid,
    Text,
    useColorModeValue,
    VStack,
    HStack,
    Badge,
    Button,
    Icon,
    Spinner,
    Center
} from '@chakra-ui/react';
import { FiUsers, FiArrowRight } from 'react-icons/fi';
import TeacherLayout from '../../components/Layout/TeacherLayout';
import { API_URL } from '../../config';
import { useAuth } from '../../context/AuthContext';

interface ClassItem {
    id: string;
    name: string;
    section: string;
    academicYear: string;
    _count: {
        students: number;
    };
}

export default function TeacherClassesPage() {
    const [classes, setClasses] = useState<ClassItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useAuth();
    const bgColor = useColorModeValue('gray.50', 'gray.900');

    useEffect(() => {
        const fetchClasses = async () => {
            try {
                const response = await fetch(`${API_URL}/api/teachers/me/classes`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setClasses(data);
                }
            } catch (error) {
                console.error('Failed to fetch classes:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchClasses();
    }, [token]);

    return (
        <TeacherLayout>
            <Box bg={bgColor} minH="calc(100vh - 100px)">
                <Heading mb={6} size="lg">My Classes</Heading>

                {isLoading ? (
                    <Center py={10}>
                        <Spinner size="xl" color="blue.500" />
                    </Center>
                ) : classes.length === 0 ? (
                    <Text>No classes assigned yet.</Text>
                ) : (
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
                        {classes.map((cls) => (
                            <Box
                                key={cls.id}
                                bg="white"
                                p={6}
                                rounded="xl"
                                shadow="md"
                                borderLeft="4px solid"
                                borderLeftColor="blue.500"
                                _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
                                transition="all 0.2s"
                            >
                                <VStack align="start" spacing={4}>
                                    <HStack justify="space-between" w="full">
                                        <Heading size="md">Class {cls.name}-{cls.section}</Heading>
                                        <Badge colorScheme="green">{cls.academicYear}</Badge>
                                    </HStack>

                                    <HStack color="gray.600">
                                        <Icon as={FiUsers as any} />
                                        <Text>{cls._count.students} Students</Text>
                                    </HStack>

                                    <Button
                                        rightIcon={<Icon as={FiArrowRight as any} />}
                                        colorScheme="blue"
                                        variant="ghost"
                                        size="sm"
                                        w="full"
                                        mt={2}
                                    >
                                        View Details
                                    </Button>
                                </VStack>
                            </Box>
                        ))}
                    </SimpleGrid>
                )}
            </Box>
        </TeacherLayout>
    );
}
