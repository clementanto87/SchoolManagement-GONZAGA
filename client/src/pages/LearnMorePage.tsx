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
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Button,
} from '@chakra-ui/react';
import {
    FiTarget,
    FiEye,
    FiHeart,
    FiActivity,
    FiMusic,
    FiAward,
    FiArrowRight,
    FiCheckCircle,
} from 'react-icons/fi';
import PublicHeader from '../components/Layout/PublicHeader';
import PublicFooter from '../components/Layout/PublicFooter';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

const VisionCard = ({ title, text, icon, color, delay }: { title: string, text: string, icon: any, color: string, delay: number }) => (
    <MotionBox
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        bg="white"
        p={8}
        rounded="2xl"
        shadow="xl"
        borderTop="4px solid"
        borderColor={`${color}.500`}
        textAlign="center"
        _hover={{ transform: 'translateY(-5px)', shadow: '2xl' }}
    >
        <Box
            w={16}
            h={16}
            mx="auto"
            mb={6}
            bg={`${color}.50`}
            color={`${color}.600`}
            rounded="full"
            display="flex"
            alignItems="center"
            justifyContent="center"
        >
            <Icon as={icon as any} w={8} h={8} />
        </Box>
        <Heading size="lg" mb={4} color="gray.800">{title}</Heading>
        <Text color="gray.600" fontSize="lg" lineHeight="relaxed">
            {text}
        </Text>
    </MotionBox>
);

const ActivityCard = ({ title, text, icon, color }: { title: string, text: string, icon: any, color: string }) => (
    <HStack
        bg="white"
        p={6}
        rounded="xl"
        shadow="md"
        align="start"
        spacing={4}
        transition="all 0.3s"
        _hover={{ shadow: 'lg', transform: 'translateX(5px)' }}
    >
        <Box
            p={3}
            bg={`${color}.100`}
            color={`${color}.600`}
            rounded="lg"
        >
            <Icon as={icon as any} w={6} h={6} />
        </Box>
        <Box>
            <Heading size="md" mb={2} color="gray.800">{title}</Heading>
            <Text color="gray.600" fontSize="sm">{text}</Text>
        </Box>
    </HStack>
);

export default function LearnMorePage() {
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
                    opacity={0.2}
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
                    opacity={0.2}
                    filter="blur(40px)"
                />

                <Container maxW="7xl" position="relative" zIndex={1}>
                    <VStack spacing={8} align="center" textAlign="center" maxW="4xl" mx="auto">
                        <MotionHeading
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            size="3xl"
                            lineHeight="1.2"
                            fontWeight="900"
                        >
                            Discover Our <Text as="span" bgGradient="linear(to-r, purple.300, pink.300)" bgClip="text">Vision</Text>
                        </MotionHeading>
                        <MotionText
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                            fontSize="xl"
                            color="purple.100"
                            maxW="2xl"
                            lineHeight="relaxed"
                        >
                            At Gonzaga, we go beyond traditional education. We shape character, ignite curiosity, and build the leaders of tomorrow.
                        </MotionText>
                    </VStack>
                </Container>
            </Box>

            <Container maxW="7xl" py={16} mt={-20} position="relative" zIndex={2}>
                {/* Vision & Mission */}
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={10} mb={24}>
                    <VisionCard
                        title="Our Vision"
                        text="To be a center of excellence in education that nurtures holistic development and empowers students to become responsible global citizens."
                        icon={FiEye}
                        color="purple"
                        delay={0}
                    />
                    <VisionCard
                        title="Our Mission"
                        text="To provide a stimulating learning environment that fosters critical thinking, creativity, and ethical values through innovative teaching practices."
                        icon={FiTarget}
                        color="blue"
                        delay={0.2}
                    />
                    <VisionCard
                        title="Core Values"
                        text="Integrity, Excellence, Compassion, and Respect form the pillars of our educational philosophy, guiding every interaction."
                        icon={FiHeart}
                        color="pink"
                        delay={0.4}
                    />
                </SimpleGrid>

                {/* Student Life */}
                <Box mb={24}>
                    <VStack spacing={4} textAlign="center" mb={12}>
                        <Heading size="xl" color="gray.800">Student Life</Heading>
                        <Text color="gray.600" fontSize="lg" maxW="2xl">
                            Education happens both inside and outside the classroom. Our vibrant campus life ensures students explore their passions.
                        </Text>
                    </VStack>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={8}>
                        <ActivityCard
                            title="Sports & Athletics"
                            text="From basketball to athletics, we encourage physical fitness and team spirit."
                            icon={FiActivity}
                            color="orange"
                        />
                        <ActivityCard
                            title="Arts & Culture"
                            text="Music, dance, and drama clubs to unleash creative potential."
                            icon={FiMusic}
                            color="pink"
                        />
                        <ActivityCard
                            title="Competitions"
                            text="Regular debates, quizzes, and science fairs to challenge young minds."
                            icon={FiAward}
                            color="blue"
                        />
                        <ActivityCard
                            title="Community Service"
                            text="Instilling a sense of social responsibility through outreach programs."
                            icon={FiHeart}
                            color="red"
                        />
                        <ActivityCard
                            title="Leadership"
                            text="Student council and leadership camps to develop future leaders."
                            icon={FiTarget}
                            color="purple"
                        />
                        <ActivityCard
                            title="Clubs & Societies"
                            text="Various clubs for science, literature, and environment enthusiasts."
                            icon={FiCheckCircle}
                            color="green"
                        />
                    </SimpleGrid>
                </Box>

                {/* FAQ Section */}
                <Box maxW="4xl" mx="auto" mb={24}>
                    <Heading size="xl" mb={10} textAlign="center" color="gray.800">Frequently Asked Questions</Heading>
                    <Accordion allowToggle>
                        <AccordionItem border="none" mb={4} bg="white" rounded="xl" shadow="sm">
                            <h2>
                                <AccordionButton p={6} _expanded={{ bg: 'purple.50', color: 'purple.600', rounded: 'xl' }}>
                                    <Box flex="1" textAlign="left" fontWeight="bold" fontSize="lg">
                                        What is the admission process?
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={6} px={6} color="gray.600">
                                Admissions are open for all grades. You can apply online or visit the school office. For higher grades, an entrance test may be conducted.
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem border="none" mb={4} bg="white" rounded="xl" shadow="sm">
                            <h2>
                                <AccordionButton p={6} _expanded={{ bg: 'purple.50', color: 'purple.600', rounded: 'xl' }}>
                                    <Box flex="1" textAlign="left" fontWeight="bold" fontSize="lg">
                                        Is transportation available?
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={6} px={6} color="gray.600">
                                Yes, we provide safe and reliable bus transportation covering major routes in and around Krishnagiri and Bargur.
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem border="none" mb={4} bg="white" rounded="xl" shadow="sm">
                            <h2>
                                <AccordionButton p={6} _expanded={{ bg: 'purple.50', color: 'purple.600', rounded: 'xl' }}>
                                    <Box flex="1" textAlign="left" fontWeight="bold" fontSize="lg">
                                        What are the school timings?
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={6} px={6} color="gray.600">
                                The school operates from 8:45 AM to 3:45 PM, Monday through Friday. Saturday timings may vary for higher grades.
                            </AccordionPanel>
                        </AccordionItem>

                        <AccordionItem border="none" mb={4} bg="white" rounded="xl" shadow="sm">
                            <h2>
                                <AccordionButton p={6} _expanded={{ bg: 'purple.50', color: 'purple.600', rounded: 'xl' }}>
                                    <Box flex="1" textAlign="left" fontWeight="bold" fontSize="lg">
                                        Do you offer extracurricular activities?
                                    </Box>
                                    <AccordionIcon />
                                </AccordionButton>
                            </h2>
                            <AccordionPanel pb={6} px={6} color="gray.600">
                                Absolutely! We have a wide range of activities including sports, music, dance, art, and various academic clubs.
                            </AccordionPanel>
                        </AccordionItem>
                    </Accordion>
                </Box>

                {/* CTA */}
                <Box
                    bgGradient="linear(to-r, purple.600, blue.600)"
                    rounded="3xl"
                    p={12}
                    textAlign="center"
                    color="white"
                    shadow="2xl"
                >
                    <Heading size="xl" mb={6}>Ready to Join Our Community?</Heading>
                    <Text fontSize="xl" mb={8} opacity={0.9}>
                        Take the first step towards a bright future for your child.
                    </Text>
                    <Button
                        size="lg"
                        bg="white"
                        color="purple.600"
                        _hover={{ bg: 'gray.100', transform: 'scale(1.05)' }}
                        rightIcon={<Icon as={FiArrowRight as any} />}
                        rounded="full"
                        px={10}
                        h={14}
                        fontSize="lg"
                        as="a"
                        href="/apply"
                    >
                        Apply Now
                    </Button>
                </Box>
            </Container>

            <PublicFooter />
        </Box>
    );
}
