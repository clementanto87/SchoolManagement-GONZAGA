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
    Spinner,
    Center,
    Container,
    Flex,
    Icon,
} from '@chakra-ui/react';
import { FiClock, FiMapPin, FiCalendar } from 'react-icons/fi';
import TeacherLayout from '../../components/Layout/TeacherLayout';
import { API_URL } from '../../config';
import { useAuth } from '../../context/AuthContext';

interface ScheduleItem {
    id: string;
    day: string;
    startTime: string;
    endTime: string;
    subject: string;
    className: string;
    room: string;
}

const DAYS = ['MONDAY', 'TUESDAY', 'WEDNESDAY', 'THURSDAY', 'FRIDAY'];

export default function TeacherTimetablePage() {
    const [schedule, setSchedule] = useState<ScheduleItem[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useAuth();
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const cardBg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.100', 'gray.700');
    const columnBg = useColorModeValue('gray.50', 'gray.900');

    useEffect(() => {
        const fetchSchedule = async () => {
            try {
                const response = await fetch(`${API_URL}/api/teachers/me/schedule`, {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                if (response.ok) {
                    const data = await response.json();
                    setSchedule(data);
                }
            } catch (error) {
                console.error('Failed to fetch schedule:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchSchedule();
    }, [token]);

    const getScheduleForDay = (day: string) => {
        return schedule.filter(item => item.day === day).sort((a, b) => a.startTime.localeCompare(b.startTime));
    };

    return (
        <TeacherLayout>
            <Box bg={bgColor} minH="calc(100vh - 100px)" py={8}>
                <Container maxW="container.xl">
                    <VStack align="start" spacing={2} mb={10}>
                        <Heading size="lg" fontWeight="800" letterSpacing="tight">
                            Weekly Timetable 🗓️
                        </Heading>
                        <Text color="gray.500" fontSize="lg">
                            Manage your weekly class schedule.
                        </Text>
                    </VStack>

                    {isLoading ? (
                        <Center py={20}>
                            <Spinner size="xl" color="blue.500" thickness="4px" />
                        </Center>
                    ) : (
                        <SimpleGrid columns={{ base: 1, lg: 5 }} spacing={6} alignItems="start">
                            {DAYS.map((day) => (
                                <Box key={day} w="full">
                                    <Flex
                                        bg="blue.500"
                                        color="white"
                                        p={3}
                                        roundedTop="xl"
                                        justify="center"
                                        align="center"
                                        shadow="md"
                                    >
                                        <Text fontWeight="bold" fontSize="sm" letterSpacing="wide">
                                            {day}
                                        </Text>
                                    </Flex>
                                    <VStack
                                        spacing={4}
                                        bg={columnBg}
                                        p={2}
                                        roundedBottom="xl"
                                        minH="200px"
                                    >
                                        {getScheduleForDay(day).length === 0 ? (
                                            <Center h="150px" w="full" flexDirection="column" color="gray.400">
                                                <Icon as={FiCalendar as any} w={8} h={8} mb={2} opacity={0.5} />
                                                <Text fontSize="sm">No classes</Text>
                                            </Center>
                                        ) : (
                                            getScheduleForDay(day).map((item) => (
                                                <Box
                                                    key={item.id}
                                                    bg={cardBg}
                                                    p={4}
                                                    rounded="lg"
                                                    shadow="sm"
                                                    border="1px solid"
                                                    borderColor={borderColor}
                                                    w="full"
                                                    _hover={{ transform: 'translateY(-2px)', shadow: 'md' }}
                                                    transition="all 0.2s"
                                                    position="relative"
                                                    overflow="hidden"
                                                >
                                                    <Box
                                                        position="absolute"
                                                        left={0}
                                                        top={0}
                                                        bottom={0}
                                                        w="4px"
                                                        bg="blue.400"
                                                    />
                                                    <VStack align="start" spacing={2} pl={2}>
                                                        <Badge colorScheme="blue" fontSize="xs">
                                                            {item.className}
                                                        </Badge>
                                                        <Heading size="sm" fontSize="md" fontWeight="bold">
                                                            {item.subject}
                                                        </Heading>
                                                        <HStack fontSize="xs" color="gray.500" spacing={3}>
                                                            <HStack>
                                                                <Icon as={FiClock as any} />
                                                                <Text>{item.startTime} - {item.endTime}</Text>
                                                            </HStack>
                                                        </HStack>
                                                        <HStack fontSize="xs" color="gray.500">
                                                            <Icon as={FiMapPin as any} />
                                                            <Text>Room {item.room}</Text>
                                                        </HStack>
                                                    </VStack>
                                                </Box>
                                            ))
                                        )}
                                    </VStack>
                                </Box>
                            ))}
                        </SimpleGrid>
                    )}
                </Container>
            </Box>
        </TeacherLayout>
    );
}
