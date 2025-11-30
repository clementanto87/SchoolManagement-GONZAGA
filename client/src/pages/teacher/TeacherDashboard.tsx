import React from 'react';
import {
    Box,
    SimpleGrid,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    Heading,
    Text,
    useColorModeValue,
    Icon,
    Flex,
    Container,
    VStack,
    HStack,
    Badge,
    Circle,
} from '@chakra-ui/react';
import { FiUsers, FiBook, FiCheckSquare, FiClock, FiCalendar } from 'react-icons/fi';
import TeacherLayout from '../../components/Layout/TeacherLayout';
import { useAuth } from '../../context/AuthContext';

interface StatsCardProps {
    title: string;
    stat: string;
    icon: any;
    helpText?: string;
    colorScheme: string;
}

function StatsCard(props: StatsCardProps) {
    const { title, stat, icon, helpText, colorScheme } = props;
    const bg = useColorModeValue('white', 'gray.800');
    const borderColor = useColorModeValue('gray.100', 'gray.700');

    return (
        <Stat
            px={{ base: 4, md: 6 }}
            py={'6'}
            shadow={'lg'}
            border={'1px solid'}
            borderColor={borderColor}
            rounded={'2xl'}
            bg={bg}
            position="relative"
            overflow="hidden"
            _hover={{
                transform: 'translateY(-4px)',
                shadow: '2xl',
                borderColor: `${colorScheme}.200`,
            }}
            transition="all 0.3s ease"
        >
            <Flex justifyContent={'space-between'} alignItems="center">
                <Box pl={{ base: 2, md: 0 }}>
                    <StatLabel fontWeight={'medium'} color="gray.500" fontSize="sm" mb={1}>
                        {title}
                    </StatLabel>
                    <StatNumber fontSize={'3xl'} fontWeight={'800'} color="gray.800" lineHeight="1">
                        {stat}
                    </StatNumber>
                    {helpText && (
                        <StatHelpText fontSize="xs" color="gray.400" mt={2} mb={0}>
                            {helpText}
                        </StatHelpText>
                    )}
                </Box>
                <Circle size="50px" bg={`${colorScheme}.50`} color={`${colorScheme}.500`}>
                    <Icon as={icon as any} w={6} h={6} />
                </Circle>
            </Flex>
        </Stat>
    );
}

export default function TeacherDashboard() {
    const { user } = useAuth();
    const bgColor = useColorModeValue('gray.50', 'gray.900');

    return (
        <TeacherLayout>
            <Box bg={bgColor} minH="calc(100vh - 100px)" py={8}>
                <Container maxW="container.xl">
                    <VStack align="start" spacing={2} mb={10}>
                        <Heading size="lg" fontWeight="800" letterSpacing="tight">
                            Welcome back, {user?.firstName}! 👋
                        </Heading>
                        <Text color="gray.500" fontSize="lg">
                            Here's what's happening in your classes today.
                        </Text>
                    </VStack>

                    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={{ base: 5, lg: 8 }} mb={12}>
                        <StatsCard
                            title={'My Classes'}
                            stat={'1'}
                            icon={FiUsers}
                            helpText={'Active classes'}
                            colorScheme="blue"
                        />
                        <StatsCard
                            title={'Assignments'}
                            stat={'5'}
                            icon={FiBook}
                            helpText={'Pending grading'}
                            colorScheme="purple"
                        />
                        <StatsCard
                            title={'Attendance'}
                            stat={'98%'}
                            icon={FiCheckSquare}
                            helpText={'Average this week'}
                            colorScheme="green"
                        />
                        <StatsCard
                            title={'Next Class'}
                            stat={'10-A'}
                            icon={FiClock}
                            helpText={'Mathematics - 10:00 AM'}
                            colorScheme="orange"
                        />
                    </SimpleGrid>

                    <Box
                        bg="white"
                        rounded="2xl"
                        shadow="xl"
                        border="1px solid"
                        borderColor="gray.100"
                        overflow="hidden"
                    >
                        <Flex p={6} borderBottom="1px solid" borderColor="gray.100" justify="space-between" align="center">
                            <HStack spacing={3}>
                                <Circle size="40px" bg="blue.50" color="blue.500">
                                    <Icon as={FiCalendar as any} />
                                </Circle>
                                <Heading size="md" fontWeight="700">Today's Schedule</Heading>
                            </HStack>
                            <Badge colorScheme="blue" px={3} py={1} rounded="full">
                                {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
                            </Badge>
                        </Flex>

                        <Box p={8} textAlign="center">
                            <VStack spacing={4} py={10}>
                                <Circle size="60px" bg="gray.50" color="gray.300">
                                    <Icon as={FiClock as any} w={8} h={8} />
                                </Circle>
                                <Heading size="sm" color="gray.500">No classes scheduled</Heading>
                                <Text color="gray.400" maxW="md">
                                    You don't have any classes scheduled for the rest of the day. Enjoy your free time!
                                </Text>
                            </VStack>
                        </Box>
                    </Box>
                </Container>
            </Box>
        </TeacherLayout>
    );
}
