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
    Badge,
    Flex,
    Image,
} from '@chakra-ui/react';
import {
    FiMapPin,
    FiUsers,
    FiBook,
    FiMonitor,
    FiCheckCircle,
    FiLayout,
    FiDroplet,
} from 'react-icons/fi';
import PublicHeader from '../components/Layout/PublicHeader';
import PublicFooter from '../components/Layout/PublicFooter';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionStack = motion(Stack);

const InfoCard = ({ title, value, icon, color, index }: { title: string, value: string, icon: any, color: string, index: number }) => (
    <MotionBox
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: index * 0.1 }}
        bg="white"
        p={6}
        rounded="2xl"
        shadow="lg"
        borderTop="4px solid"
        borderColor={`${color}.400`}
        _hover={{ transform: 'translateY(-5px)', shadow: '2xl' }}
        position="relative"
        overflow="hidden"
    >
        <Box
            position="absolute"
            top="-10px"
            right="-10px"
            w="80px"
            h="80px"
            bg={`${color}.50`}
            rounded="full"
            opacity={0.5}
            zIndex={0}
        />
        <HStack spacing={4} position="relative" zIndex={1}>
            <Flex
                w={14}
                h={14}
                align="center"
                justify="center"
                bgGradient={`linear(to-br, ${color}.400, ${color}.600)`}
                color="white"
                rounded="xl"
                shadow="md"
            >
                <Icon as={icon as any} w={7} h={7} />
            </Flex>
            <Box>
                <Text fontSize="xs" color="gray.500" fontWeight="bold" textTransform="uppercase" letterSpacing="wider">
                    {title}
                </Text>
                <Text fontSize="2xl" fontWeight="800" color="gray.800">
                    {value}
                </Text>
            </Box>
        </HStack>
    </MotionBox>
);

export default function AboutPage() {
    const bgColor = useColorModeValue('gray.50', 'gray.900');

    return (
        <Box bg={bgColor} minH="100vh" overflowX="hidden">
            <PublicHeader />

            {/* Hero Section */}
            <Box bg="blue.900" color="white" pt={32} pb={40} position="relative" overflow="hidden">
                {/* Abstract Background Shapes */}
                <Box
                    position="absolute"
                    top="-20%"
                    right="-10%"
                    w="60%"
                    h="140%"
                    bgGradient="linear(to-bl, blue.400, blue.900)"
                    rounded="full"
                    opacity={0.2}
                    filter="blur(60px)"
                />
                <Box
                    position="absolute"
                    bottom="-10%"
                    left="-10%"
                    w="40%"
                    h="80%"
                    bgGradient="linear(to-tr, purple.500, blue.800)"
                    rounded="full"
                    opacity={0.2}
                    filter="blur(40px)"
                />

                <Container maxW="7xl" position="relative" zIndex={1}>
                    <VStack spacing={8} align="center" textAlign="center" maxW="4xl" mx="auto">
                        <MotionBox
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Badge colorScheme="cyan" variant="solid" px={4} py={1} rounded="full" fontSize="sm" textTransform="uppercase" letterSpacing="wide">
                                Established 2009
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
                            About <Text as="span" bgGradient="linear(to-r, cyan.400, blue.200)" bgClip="text">GONZAGA</Text>
                        </MotionHeading>

                        <MotionText
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            fontSize="xl"
                            color="blue.100"
                            maxW="2xl"
                            lineHeight="relaxed"
                        >
                            A co-educational institution committed to excellence, located in the rural heart of Krishnagiri, Tamil Nadu. We believe in nurturing every child's potential.
                        </MotionText>
                    </VStack>
                </Container>
            </Box>

            <Container maxW="7xl" py={16} position="relative" zIndex={2}>
                {/* Quick Stats Grid */}
                <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={8} mt={-28} mb={20}>
                    <InfoCard title="Grades" value="1 to 12" icon={FiUsers} color="blue" index={0} />
                    <InfoCard title="Classrooms" value="22 Rooms" icon={FiLayout} color="green" index={1} />
                    <InfoCard title="Library Books" value="3,258" icon={FiBook} color="purple" index={2} />
                    <InfoCard title="Computers" value="31 Systems" icon={FiMonitor} color="orange" index={3} />
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, lg: 12 }} spacing={12}>
                    {/* Main Content - Left Column */}
                    <Box gridColumn={{ lg: "span 8" }}>
                        <VStack spacing={12} align="stretch">
                            {/* Overview Section */}
                            <MotionBox
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                            >
                                <Heading size="lg" mb={6} color="gray.800" borderLeft="4px solid" borderColor="blue.500" pl={4}>
                                    School Overview
                                </Heading>
                                <Text color="gray.600" fontSize="lg" lineHeight="1.8" mb={8}>
                                    GONZAGA MATRIC HIGHER SEC SCHOOL was established in 2009 and is managed by Pvt. Unaided.
                                    Located in the rural area of Bargur block, Krishnagiri district, Tamil Nadu, the school
                                    provides education from Grades 1 to 12. It is a co-educational institution with an
                                    attached pre-primary section. English is the medium of instruction, and the academic
                                    session begins in April.
                                </Text>

                                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                                    {[
                                        { label: "Management", value: "Pvt. Unaided" },
                                        { label: "Location", value: "Rural, Bargur Block" },
                                        { label: "District", value: "Krishnagiri, Tamil Nadu" },
                                        { label: "Medium", value: "English" }
                                    ].map((item, idx) => (
                                        <HStack key={idx} bg="white" p={4} rounded="xl" shadow="sm" border="1px solid" borderColor="gray.100">
                                            <Icon as={FiCheckCircle as any} color="green.500" w={5} h={5} />
                                            <Box>
                                                <Text fontSize="xs" color="gray.500" fontWeight="bold" textTransform="uppercase">{item.label}</Text>
                                                <Text fontWeight="semibold" color="gray.800">{item.value}</Text>
                                            </Box>
                                        </HStack>
                                    ))}
                                </SimpleGrid>
                            </MotionBox>

                            {/* Infrastructure Section */}
                            <MotionBox
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <Heading size="lg" mb={6} color="gray.800" borderLeft="4px solid" borderColor="green.500" pl={4}>
                                    Infrastructure & Facilities
                                </Heading>
                                <Text color="gray.600" fontSize="lg" mb={8}>
                                    The school operates in a private building with excellent facilities designed to support
                                    both academic and non-academic activities.
                                </Text>

                                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                                    <Box p={6} bg="white" rounded="xl" shadow="md" borderLeft="4px solid" borderColor="blue.400" _hover={{ shadow: 'lg' }} transition="all 0.3s">
                                        <Heading size="md" mb={3} display="flex" alignItems="center" color="gray.800">
                                            <Icon as={FiLayout as any} mr={3} color="blue.500" />
                                            Classrooms
                                        </Heading>
                                        <Text color="gray.600">
                                            22 instructional classrooms in good condition, plus 2 rooms for non-teaching activities.
                                            Separate room available for Head Master/Teacher.
                                        </Text>
                                    </Box>
                                    <Box p={6} bg="white" rounded="xl" shadow="md" borderLeft="4px solid" borderColor="orange.400" _hover={{ shadow: 'lg' }} transition="all 0.3s">
                                        <Heading size="md" mb={3} display="flex" alignItems="center" color="gray.800">
                                            <Icon as={FiMonitor as any} mr={3} color="orange.500" />
                                            Technology
                                        </Heading>
                                        <Text color="gray.600">
                                            Computer Aided Learning Lab with 31 functional computers for teaching and learning purposes.
                                        </Text>
                                    </Box>
                                    <Box p={6} bg="white" rounded="xl" shadow="md" borderLeft="4px solid" borderColor="purple.400" _hover={{ shadow: 'lg' }} transition="all 0.3s">
                                        <Heading size="md" mb={3} display="flex" alignItems="center" color="gray.800">
                                            <Icon as={FiBook as any} mr={3} color="purple.500" />
                                            Library
                                        </Heading>
                                        <Text color="gray.600">
                                            Well-stocked library with 3,258 books available for students and staff.
                                        </Text>
                                    </Box>
                                    <Box p={6} bg="white" rounded="xl" shadow="md" borderLeft="4px solid" borderColor="cyan.400" _hover={{ shadow: 'lg' }} transition="all 0.3s">
                                        <Heading size="md" mb={3} display="flex" alignItems="center" color="gray.800">
                                            <Icon as={FiDroplet as any} mr={3} color="cyan.500" />
                                            Amenities
                                        </Heading>
                                        <Text color="gray.600">
                                            Functional tap water source. 15 boys' toilets and 15 girls' toilets, all functional.
                                            Playground available.
                                        </Text>
                                    </Box>
                                </SimpleGrid>
                            </MotionBox>
                        </VStack>
                    </Box>

                    {/* Sidebar Info - Right Column */}
                    <Box gridColumn={{ lg: "span 4" }}>
                        <Box position="sticky" top="100px">
                            <MotionBox
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                bg="white"
                                p={8}
                                rounded="2xl"
                                shadow="xl"
                                border="1px solid"
                                borderColor="gray.100"
                            >
                                <Heading size="md" mb={6} color="gray.800" pb={4} borderBottom="1px solid" borderColor="gray.100">
                                    Quick Facts
                                </Heading>
                                <VStack align="stretch" spacing={6}>
                                    {[
                                        { label: "School Type", value: "Co-educational" },
                                        { label: "Building Status", value: "Private Building" },
                                        { label: "Boundary Wall", value: "Pucca Wall" },
                                        { label: "Electricity", value: "Available" },
                                        { label: "Accessibility", value: "All weather road" }
                                    ].map((fact, idx) => (
                                        <Box key={idx}>
                                            <Text fontSize="xs" color="gray.400" fontWeight="bold" textTransform="uppercase" letterSpacing="wider" mb={1}>
                                                {fact.label}
                                            </Text>
                                            <Text fontWeight="semibold" color="gray.800" fontSize="md">
                                                {fact.value}
                                            </Text>
                                        </Box>
                                    ))}
                                </VStack>
                            </MotionBox>
                        </Box>
                    </Box>
                </SimpleGrid>
            </Container>

            <PublicFooter />
        </Box>
    );
}
