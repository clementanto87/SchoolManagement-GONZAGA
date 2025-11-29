import React from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    SimpleGrid,
    Stack,
    Icon,
    VStack,
    HStack,
    useColorModeValue,
    Tabs,
    TabList,
    TabPanels,
    Tab,
    TabPanel,
    List,
    ListItem,
    ListIcon,
    Flex,
    Badge,
} from '@chakra-ui/react';
import {
    FiBook,
    FiAward,
    FiCheckCircle,
    FiCpu,
    FiGlobe,
    FiActivity,
    FiMusic,
    FiMonitor,
} from 'react-icons/fi';
import PublicHeader from '../components/Layout/PublicHeader';
import PublicFooter from '../components/Layout/PublicFooter';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

const DepartmentCard = ({ title, description, icon, color, index }: { title: string, description: string, icon: any, color: string, index: number }) => (
    <MotionBox
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        bg="white"
        p={8}
        rounded="2xl"
        shadow="lg"
        position="relative"
        overflow="hidden"
        _hover={{ shadow: '2xl', transform: 'translateY(-5px)' }}
        sx={{ transition: 'all 0.3s ease' }}
    >
        <Box
            position="absolute"
            top={0}
            left={0}
            w="full"
            h="6px"
            bgGradient={`linear(to-r, ${color}.400, ${color}.600)`}
        />
        <Flex
            w={14}
            h={14}
            align="center"
            justify="center"
            bg={`${color}.50`}
            color={`${color}.500`}
            rounded="xl"
            mb={6}
            shadow="sm"
        >
            <Icon as={icon as any} w={7} h={7} />
        </Flex>
        <Heading size="md" mb={4} color="gray.800">{title}</Heading>
        <Text fontSize="md" color="gray.600" lineHeight="relaxed">
            {description}
        </Text>
    </MotionBox>
);

export default function AcademicsPage() {
    const bgColor = useColorModeValue('gray.50', 'gray.900');

    return (
        <Box bg={bgColor} minH="100vh" overflowX="hidden">
            <PublicHeader />

            {/* Hero Section */}
            <Box bg="purple.900" color="white" pt={32} pb={40} position="relative" overflow="hidden">
                <Box
                    position="absolute"
                    top="-20%"
                    left="-10%"
                    w="60%"
                    h="140%"
                    bgGradient="linear(to-br, purple.400, purple.900)"
                    rounded="full"
                    opacity={0.3}
                    filter="blur(60px)"
                />
                <Box
                    position="absolute"
                    bottom="-10%"
                    right="-10%"
                    w="40%"
                    h="80%"
                    bgGradient="linear(to-tl, blue.500, purple.800)"
                    rounded="full"
                    opacity={0.3}
                    filter="blur(40px)"
                />

                <Container maxW="7xl" position="relative" zIndex={1}>
                    <VStack spacing={8} align="center" textAlign="center" maxW="4xl" mx="auto">
                        <MotionBox
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Badge colorScheme="purple" variant="solid" px={4} py={1} rounded="full" fontSize="sm" textTransform="uppercase" letterSpacing="wide">
                                Holistic Education
                            </Badge>
                        </MotionBox>

                        <MotionHeading
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            size="3xl"
                            lineHeight="1.2"
                            fontWeight="900"
                        >
                            Academic <Text as="span" bgGradient="linear(to-r, purple.300, pink.300)" bgClip="text">Excellence</Text>
                        </MotionHeading>

                        <MotionText
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            fontSize="xl"
                            color="purple.100"
                            maxW="2xl"
                            lineHeight="relaxed"
                        >
                            Fostering intellectual curiosity and critical thinking through a comprehensive and holistic curriculum designed for the future.
                        </MotionText>
                    </VStack>
                </Container>
            </Box>

            <Container maxW="7xl" py={16} mt={-24} position="relative" zIndex={2}>
                {/* Curriculum Levels */}
                <MotionBox
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    bg="white"
                    rounded="3xl"
                    shadow="2xl"
                    p={{ base: 6, md: 10 }}
                    mb={20}
                    overflow="hidden"
                >
                    <Heading size="lg" mb={10} textAlign="center" color="gray.800">Our Curriculum</Heading>
                    <Tabs isFitted variant="soft-rounded" colorScheme="purple" size="lg">
                        <TabList mb="2em" bg="gray.50" p={2} rounded="full">
                            <Tab _selected={{ bg: 'purple.500', color: 'white', shadow: 'md' }} fontWeight="bold">Primary (1-5)</Tab>
                            <Tab _selected={{ bg: 'purple.500', color: 'white', shadow: 'md' }} fontWeight="bold">Middle (6-8)</Tab>
                            <Tab _selected={{ bg: 'purple.500', color: 'white', shadow: 'md' }} fontWeight="bold">High School (9-12)</Tab>
                        </TabList>
                        <TabPanels>
                            <TabPanel>
                                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12} alignItems="center">
                                    <Box>
                                        <Heading size="lg" mb={6} color="purple.600">Foundation Years</Heading>
                                        <Text color="gray.600" mb={6} fontSize="lg">
                                            Our primary curriculum focuses on building strong foundational skills in literacy and numeracy while encouraging creativity and social development.
                                        </Text>
                                        <List spacing={4}>
                                            <ListItem display="flex" alignItems="center" fontSize="md" color="gray.700">
                                                <ListIcon as={FiCheckCircle as any} color="green.500" w={5} h={5} />
                                                Activity-based learning approach
                                            </ListItem>
                                            <ListItem display="flex" alignItems="center" fontSize="md" color="gray.700">
                                                <ListIcon as={FiCheckCircle as any} color="green.500" w={5} h={5} />
                                                Holistic language development
                                            </ListItem>
                                            <ListItem display="flex" alignItems="center" fontSize="md" color="gray.700">
                                                <ListIcon as={FiCheckCircle as any} color="green.500" w={5} h={5} />
                                                Basic environmental science awareness
                                            </ListItem>
                                        </List>
                                    </Box>
                                    <Box display="flex" alignItems="center" justifyContent="center" bg="purple.50" rounded="2xl" p={10}>
                                        <Icon as={FiBook as any} w={32} h={32} color="purple.200" />
                                    </Box>
                                </SimpleGrid>
                            </TabPanel>
                            <TabPanel>
                                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12} alignItems="center">
                                    <Box>
                                        <Heading size="lg" mb={6} color="purple.600">Exploratory Years</Heading>
                                        <Text color="gray.600" mb={6} fontSize="lg">
                                            Students are introduced to specialized subjects, fostering independent thinking and problem-solving skills through project-based learning.
                                        </Text>
                                        <List spacing={4}>
                                            <ListItem display="flex" alignItems="center" fontSize="md" color="gray.700">
                                                <ListIcon as={FiCheckCircle as any} color="green.500" w={5} h={5} />
                                                Introduction to Lab Sciences
                                            </ListItem>
                                            <ListItem display="flex" alignItems="center" fontSize="md" color="gray.700">
                                                <ListIcon as={FiCheckCircle as any} color="green.500" w={5} h={5} />
                                                Computer Education & Coding
                                            </ListItem>
                                            <ListItem display="flex" alignItems="center" fontSize="md" color="gray.700">
                                                <ListIcon as={FiCheckCircle as any} color="green.500" w={5} h={5} />
                                                Social Studies & Civics
                                            </ListItem>
                                        </List>
                                    </Box>
                                    <Box display="flex" alignItems="center" justifyContent="center" bg="purple.50" rounded="2xl" p={10}>
                                        <Icon as={FiCpu as any} w={32} h={32} color="purple.200" />
                                    </Box>
                                </SimpleGrid>
                            </TabPanel>
                            <TabPanel>
                                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12} alignItems="center">
                                    <Box>
                                        <Heading size="lg" mb={6} color="purple.600">Preparatory Years</Heading>
                                        <Text color="gray.600" mb={6} fontSize="lg">
                                            A rigorous academic program preparing students for board exams and higher education, with a focus on deep conceptual understanding.
                                        </Text>
                                        <List spacing={4}>
                                            <ListItem display="flex" alignItems="center" fontSize="md" color="gray.700">
                                                <ListIcon as={FiCheckCircle as any} color="green.500" w={5} h={5} />
                                                Advanced Sciences (Physics, Chemistry, Biology)
                                            </ListItem>
                                            <ListItem display="flex" alignItems="center" fontSize="md" color="gray.700">
                                                <ListIcon as={FiCheckCircle as any} color="green.500" w={5} h={5} />
                                                Higher Mathematics & Calculus
                                            </ListItem>
                                            <ListItem display="flex" alignItems="center" fontSize="md" color="gray.700">
                                                <ListIcon as={FiCheckCircle as any} color="green.500" w={5} h={5} />
                                                Commerce & Humanities Streams
                                            </ListItem>
                                        </List>
                                    </Box>
                                    <Box display="flex" alignItems="center" justifyContent="center" bg="purple.50" rounded="2xl" p={10}>
                                        <Icon as={FiAward as any} w={32} h={32} color="purple.200" />
                                    </Box>
                                </SimpleGrid>
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </MotionBox>

                {/* Departments */}
                <Box mb={16}>
                    <MotionHeading
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        size="xl"
                        mb={12}
                        textAlign="center"
                        color="gray.800"
                    >
                        Academic Departments
                    </MotionHeading>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                        <DepartmentCard
                            title="Sciences"
                            description="State-of-the-art laboratories for Physics, Chemistry, and Biology to encourage practical learning."
                            icon={FiCpu}
                            color="blue"
                            index={0}
                        />
                        <DepartmentCard
                            title="Mathematics"
                            description="Focusing on logical reasoning and analytical skills through innovative teaching methods."
                            icon={FiActivity}
                            color="red"
                            index={1}
                        />
                        <DepartmentCard
                            title="Humanities"
                            description="Exploring history, geography, and society to create well-informed global citizens."
                            icon={FiGlobe}
                            color="green"
                            index={2}
                        />
                        <DepartmentCard
                            title="Languages"
                            description="Proficiency in English, Tamil, and other languages with a focus on literature and communication."
                            icon={FiBook}
                            color="yellow"
                            index={3}
                        />
                        <DepartmentCard
                            title="Computer Science"
                            description="Modern computer labs with the latest software to equip students with digital skills."
                            icon={FiMonitor}
                            color="purple"
                            index={4}
                        />
                        <DepartmentCard
                            title="Arts & Culture"
                            description="Encouraging creativity through visual arts, music, and dance programs."
                            icon={FiMusic}
                            color="pink"
                            index={5}
                        />
                    </SimpleGrid>
                </Box>
            </Container>

            <PublicFooter />
        </Box>
    );
}
