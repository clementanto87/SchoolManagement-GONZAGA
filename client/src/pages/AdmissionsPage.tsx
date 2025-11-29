import React, { useState } from 'react';
import * as FileSaver from 'file-saver';

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
    Button,
    Step,
    StepDescription,
    StepIcon,
    StepIndicator,
    StepNumber,
    StepSeparator,
    StepStatus,
    StepTitle,
    Stepper,
    useSteps,
    Flex,
    Badge,
} from '@chakra-ui/react';
import {
    FiFileText,
    FiCheckCircle,
    FiDownload,
    FiArrowRight,
    FiUserCheck,
    FiCalendar,
    FiCreditCard,
} from 'react-icons/fi';
import PublicHeader from '../components/Layout/PublicHeader';
import PublicFooter from '../components/Layout/PublicFooter';
import { motion } from 'framer-motion';
import { API_URL } from '../config';

const { saveAs } = FileSaver;

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

const steps = [
    { title: 'Inquiry', description: 'Submit an online inquiry or visit the school office.', icon: FiFileText },
    { title: 'Application', description: 'Purchase and fill out the application form.', icon: FiUserCheck },
    { title: 'Assessment', description: 'Student interaction/assessment for grade placement.', icon: FiCalendar },
    { title: 'Interview', description: 'Parent interaction with the Principal.', icon: FiCheckCircle },
    { title: 'Admission', description: 'Payment of fees and submission of documents.', icon: FiCreditCard },
];

const DocumentCard = ({ title, icon, index }: { title: string, icon: any, index: number }) => (
    <MotionBox
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: index * 0.1 }}
        bg="white"
        p={6}
        rounded="xl"
        shadow="md"
        display="flex"
        alignItems="center"
        border="1px solid"
        borderColor="gray.100"
        _hover={{ borderColor: 'blue.400', shadow: 'lg', transform: 'translateY(-2px)' }}
        cursor="default"
    >
        <Flex
            w={12}
            h={12}
            align="center"
            justify="center"
            bg="blue.50"
            color="blue.500"
            rounded="lg"
            mr={4}
        >
            <Icon as={icon as any} w={6} h={6} />
        </Flex>
        <Text fontWeight="semibold" color="gray.700">{title}</Text>
    </MotionBox>
);

export default function AdmissionsPage() {
    const [isDownloading, setIsDownloading] = useState(false);

    const downloadApplicationForm = async () => {
        setIsDownloading(true);
        try {

            const response = await fetch(`${API_URL}/api/applications/form`);
            const blob = await response.blob();
            saveAs(blob, 'GONZAGA_Application_Form.pdf');
        } catch (error) {
            console.error('Error downloading form:', error);
            // You might want to show an error toast here
        } finally {
            setIsDownloading(false);
        }
    };

    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const { activeStep } = useSteps({
        index: 1,
        count: steps.length,
    });

    return (
        <Box bg={bgColor} minH="100vh" overflowX="hidden">
            <PublicHeader />

            {/* Hero Section */}
            <Box bg="teal.900" color="white" pt={32} pb={40} position="relative" overflow="hidden">
                <Box
                    position="absolute"
                    top="-20%"
                    right="-10%"
                    w="60%"
                    h="140%"
                    bgGradient="linear(to-bl, teal.400, teal.900)"
                    rounded="full"
                    opacity={0.3}
                    filter="blur(60px)"
                />
                <Box
                    position="absolute"
                    bottom="-10%"
                    left="-10%"
                    w="40%"
                    h="80%"
                    bgGradient="linear(to-tr, blue.500, teal.800)"
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
                            <Badge colorScheme="teal" variant="solid" px={4} py={1} rounded="full" fontSize="sm" textTransform="uppercase" letterSpacing="wide">
                                Admissions Open 2024-25
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
                            Join Our <Text as="span" bgGradient="linear(to-r, teal.300, blue.300)" bgClip="text">Community</Text>
                        </MotionHeading>

                        <MotionText
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.4 }}
                            fontSize="xl"
                            color="teal.100"
                            maxW="2xl"
                            lineHeight="relaxed"
                        >
                            We welcome students who are eager to learn and grow. Discover the path to becoming part of the Gonzaga family.
                        </MotionText>

                        <MotionBox
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.6 }}
                        >
                            <Button
                                size="lg"
                                bg="white"
                                color="teal.900"
                                _hover={{ bg: 'gray.100', transform: 'translateY(-2px)', shadow: 'xl' }}
                                rightIcon={<Icon as={FiArrowRight as any} />}
                                rounded="full"
                                px={8}
                                fontWeight="bold"
                                as="a"
                                href="/apply"
                            >
                                Apply Now
                            </Button>
                        </MotionBox>
                    </VStack>
                </Container>
            </Box>

            <Container maxW="7xl" py={16} mt={-20} position="relative" zIndex={2}>
                <SimpleGrid columns={{ base: 1, lg: 12 }} spacing={12}>
                    {/* Left Column: Process & Eligibility */}
                    <Box gridColumn={{ lg: "span 8" }}>
                        <VStack spacing={12} align="stretch">
                            {/* Admission Process */}
                            <MotionBox
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6 }}
                                bg="white"
                                p={10}
                                rounded="3xl"
                                shadow="xl"
                            >
                                <Heading size="lg" mb={10} color="gray.800">Admission Process</Heading>
                                <Stepper index={activeStep} orientation="vertical" height="400px" gap="0" colorScheme="teal">
                                    {steps.map((step, index) => (
                                        <Step key={index}>
                                            <StepIndicator>
                                                <StepStatus
                                                    complete={<StepIcon />}
                                                    incomplete={<StepNumber />}
                                                    active={<StepNumber />}
                                                />
                                            </StepIndicator>

                                            <Box flexShrink='0' mb={8} ml={4}>
                                                <StepTitle>
                                                    <Heading size="sm" color="gray.800">{step.title}</Heading>
                                                </StepTitle>
                                                <StepDescription>
                                                    <Text fontSize="sm" color="gray.500" mt={1}>{step.description}</Text>
                                                </StepDescription>
                                            </Box>

                                            <StepSeparator />
                                        </Step>
                                    ))}
                                </Stepper>
                            </MotionBox>

                            {/* Eligibility Criteria */}
                            <MotionBox
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                                bg="white"
                                p={10}
                                rounded="3xl"
                                shadow="xl"
                                borderLeft="6px solid"
                                borderColor="teal.500"
                            >
                                <Heading size="lg" mb={8} color="gray.800">Eligibility Criteria</Heading>
                                <VStack align="stretch" spacing={6}>
                                    <Box p={6} bg="teal.50" rounded="xl">
                                        <Heading size="md" mb={2} color="teal.700">Pre-Primary (LKG)</Heading>
                                        <Text color="teal.800">Child should have completed 3 years of age by March 31st of the academic year.</Text>
                                    </Box>
                                    <Box p={6} bg="blue.50" rounded="xl">
                                        <Heading size="md" mb={2} color="blue.700">Grade 1</Heading>
                                        <Text color="blue.800">Child should have completed 5 years of age by March 31st of the academic year.</Text>
                                    </Box>
                                    <Box p={6} bg="purple.50" rounded="xl">
                                        <Heading size="md" mb={2} color="purple.700">Higher Grades</Heading>
                                        <Text color="purple.800">Admission is based on the performance in the entrance test and availability of seats.</Text>
                                    </Box>
                                </VStack>
                            </MotionBox>
                        </VStack>
                    </Box>

                    {/* Right Column: Documents & CTA */}
                    <Box gridColumn={{ lg: "span 4" }}>
                        <VStack spacing={8} position="sticky" top="100px">
                            {/* Documents Required */}
                            <MotionBox
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                                bg="white"
                                p={8}
                                rounded="2xl"
                                shadow="xl"
                                w="full"
                            >
                                <Heading size="md" mb={6} color="gray.800">Documents Required</Heading>
                                <VStack spacing={4} align="stretch">
                                    <DocumentCard title="Birth Certificate" icon={FiFileText} index={0} />
                                    <DocumentCard title="Transfer Certificate" icon={FiFileText} index={1} />
                                    <DocumentCard title="Passport Size Photos" icon={FiUserCheck} index={2} />
                                    <DocumentCard title="Aadhar Card" icon={FiCreditCard} index={3} />
                                    <DocumentCard title="Report Card (Prev)" icon={FiFileText} index={4} />
                                </VStack>
                            </MotionBox>

                            {/* Download Application */}
                            <MotionBox
                                initial={{ opacity: 0, x: 20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: 0.6 }}
                                bgGradient="linear(to-br, teal.500, blue.600)"
                                p={8}
                                rounded="2xl"
                                shadow="xl"
                                color="white"
                                textAlign="center"
                                w="full"
                            >
                                <Icon as={FiDownload as any} w={10} h={10} mb={4} />
                                <Heading size="md" mb={2}>Offline Application</Heading>
                                <Text fontSize="sm" mb={6} opacity={0.9}>
                                    Download the application form, fill it out, and submit it at the school office.
                                </Text>
                                <Button
                                    size="lg"
                                    colorScheme="teal"
                                    leftIcon={<Icon as={FiCheckCircle as any} />}
                                    as="a"
                                    href="/apply"
                                    mb={4}
                                    w="full"
                                >
                                    Apply Online
                                </Button>
                                <Button
                                    size="lg"
                                    variant="outline"
                                    colorScheme="whiteAlpha"
                                    leftIcon={<Icon as={FiFileText as any} />}
                                    onClick={downloadApplicationForm}
                                    isLoading={isDownloading}
                                    loadingText="Preparing..."
                                    w="full"
                                    _hover={{ bg: 'rgba(255, 255, 255, 0.1)' }}
                                >
                                    Download Form
                                </Button>
                            </MotionBox>
                        </VStack>
                    </Box>
                </SimpleGrid>
            </Container>

            <PublicFooter />
        </Box>
    );
}
