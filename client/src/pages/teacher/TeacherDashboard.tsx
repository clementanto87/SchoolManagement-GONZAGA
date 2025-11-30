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
} from '@chakra-ui/react';
import { FiUsers, FiBook, FiCheckSquare, FiClock } from 'react-icons/fi';
import TeacherLayout from '../../components/Layout/TeacherLayout';
import { useAuth } from '../../context/AuthContext';

interface StatsCardProps {
    title: string;
    stat: string;
    icon: any;
    helpText?: string;
}

function StatsCard(props: StatsCardProps) {
    const { title, stat, icon, helpText } = props;
    return (
        <Stat
            px={{ base: 2, md: 4 }}
            py={'5'}
            shadow={'xl'}
            border={'1px solid'}
            borderColor={useColorModeValue('gray.800', 'gray.500')}
            rounded={'lg'}
            bg={useColorModeValue('white', 'gray.800')}
        >
            <Flex justifyContent={'space-between'}>
                <Box pl={{ base: 2, md: 4 }}>
                    <StatLabel fontWeight={'medium'} isTruncated>
                        {title}
                    </StatLabel>
                    <StatNumber fontSize={'2xl'} fontWeight={'bold'}>
                        {stat}
                    </StatNumber>
                    {helpText && <StatHelpText>{helpText}</StatHelpText>}
                </Box>
                <Box
                    my={'auto'}
                    color={useColorModeValue('gray.800', 'gray.200')}
                    alignContent={'center'}>
                    <Icon as={icon} w={8} h={8} color="blue.500" />
                </Box>
            </Flex>
        </Stat>
    );
}

export default function TeacherDashboard() {
    const { user } = useAuth();
    const bgColor = useColorModeValue('gray.50', 'gray.900');

    return (
        <TeacherLayout>
            <Box bg={bgColor} minH="calc(100vh - 100px)">
                <Heading mb={6} size="lg">Welcome back, {user?.firstName}!</Heading>

                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={{ base: 5, lg: 8 }}>
                    <StatsCard
                        title={'My Classes'}
                        stat={'1'}
                        icon={FiUsers}
                        helpText={'Active classes'}
                    />
                    <StatsCard
                        title={'Assignments'}
                        stat={'5'}
                        icon={FiBook}
                        helpText={'Pending grading'}
                    />
                    <StatsCard
                        title={'Attendance'}
                        stat={'98%'}
                        icon={FiCheckSquare}
                        helpText={'Average this week'}
                    />
                    <StatsCard
                        title={'Next Class'}
                        stat={'10-A'}
                        icon={FiClock}
                        helpText={'Mathematics - 10:00 AM'}
                    />
                </SimpleGrid>

                <Box mt={10} p={6} bg="white" rounded="lg" shadow="md">
                    <Heading size="md" mb={4}>Today's Schedule</Heading>
                    <Text color="gray.500">No classes scheduled for the rest of the day.</Text>
                </Box>
            </Box>
        </TeacherLayout>
    );
}
