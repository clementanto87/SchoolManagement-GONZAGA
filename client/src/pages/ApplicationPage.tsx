import React, { useState } from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    VStack,
    HStack,
    FormControl,
    FormLabel,
    Input,
    Select,
    Button,
    useToast,
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
    SimpleGrid,
    useColorModeValue,
    Icon,
} from '@chakra-ui/react';
import { API_URL } from '../config';
import { FiUser, FiUsers, FiCheckCircle, FiArrowRight, FiArrowLeft } from 'react-icons/fi';
import PublicHeader from '../components/Layout/PublicHeader';
import PublicFooter from '../components/Layout/PublicFooter';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

const steps = [
    { title: 'Student Details', description: 'Personal information', icon: FiUser },
    { title: 'Parent Details', description: 'Contact information', icon: FiUsers },
    { title: 'Review', description: 'Confirm details', icon: FiCheckCircle },
];

export default function ApplicationPage() {
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const toast = useToast();
    const { activeStep, setActiveStep } = useSteps({
        index: 0,
        count: steps.length,
    });

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        grade: '',
        parentName: '',
        parentEmail: '',
        parentPhone: '',
        address: '',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleNext = () => {
        if (activeStep < steps.length - 1) {
            setActiveStep(activeStep + 1);
        }
    };

    const handleBack = () => {
        if (activeStep > 0) {
            setActiveStep(activeStep - 1);
        }
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {

            // ... imports

            const response = await fetch(`${API_URL}/api/applications`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) {
                throw new Error('Failed to submit application');
            }

            toast({
                title: 'Application Submitted',
                description: "We've received your application. We'll be in touch soon.",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            // Reset form or redirect
            setFormData({
                firstName: '',
                lastName: '',
                dob: '',
                gender: '',
                grade: '',
                parentName: '',
                parentEmail: '',
                parentPhone: '',
                address: '',
            });
            setActiveStep(0);

        } catch (error) {
            toast({
                title: 'Error',
                description: 'Something went wrong. Please try again.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const renderStepContent = (step: number) => {
        switch (step) {
            case 0:
                return (
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                        <FormControl isRequired>
                            <FormLabel>First Name</FormLabel>
                            <Input name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="First Name" />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Last Name</FormLabel>
                            <Input name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Last Name" />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Date of Birth</FormLabel>
                            <Input type="date" name="dob" value={formData.dob} onChange={handleInputChange} />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Gender</FormLabel>
                            <Select name="gender" value={formData.gender} onChange={handleInputChange} placeholder="Select Gender">
                                <option value="MALE">Male</option>
                                <option value="FEMALE">Female</option>
                                <option value="OTHER">Other</option>
                            </Select>
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Grade Applying For</FormLabel>
                            <Select name="grade" value={formData.grade} onChange={handleInputChange} placeholder="Select Grade">
                                <option value="LKG">LKG</option>
                                <option value="UKG">UKG</option>
                                <option value="1">Grade 1</option>
                                <option value="2">Grade 2</option>
                                <option value="3">Grade 3</option>
                                <option value="4">Grade 4</option>
                                <option value="5">Grade 5</option>
                                <option value="6">Grade 6</option>
                                <option value="7">Grade 7</option>
                                <option value="8">Grade 8</option>
                                <option value="9">Grade 9</option>
                                <option value="11">Grade 11</option>
                            </Select>
                        </FormControl>
                    </SimpleGrid>
                );
            case 1:
                return (
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                        <FormControl isRequired>
                            <FormLabel>Parent/Guardian Name</FormLabel>
                            <Input name="parentName" value={formData.parentName} onChange={handleInputChange} placeholder="Parent Name" />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Email Address</FormLabel>
                            <Input type="email" name="parentEmail" value={formData.parentEmail} onChange={handleInputChange} placeholder="Email" />
                        </FormControl>
                        <FormControl isRequired>
                            <FormLabel>Phone Number</FormLabel>
                            <Input type="tel" name="parentPhone" value={formData.parentPhone} onChange={handleInputChange} placeholder="Phone Number" />
                        </FormControl>
                        <FormControl isRequired gridColumn={{ md: "span 2" }}>
                            <FormLabel>Address</FormLabel>
                            <Input name="address" value={formData.address} onChange={handleInputChange} placeholder="Full Address" />
                        </FormControl>
                    </SimpleGrid>
                );
            case 2:
                return (
                    <VStack align="start" spacing={4} w="full">
                        <Heading size="md" color="teal.600">Review Application</Heading>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4} w="full" bg="gray.50" p={4} rounded="md">
                            <Box>
                                <Text fontWeight="bold" color="gray.600">Student Name:</Text>
                                <Text>{formData.firstName} {formData.lastName}</Text>
                            </Box>
                            <Box>
                                <Text fontWeight="bold" color="gray.600">Date of Birth:</Text>
                                <Text>{formData.dob}</Text>
                            </Box>
                            <Box>
                                <Text fontWeight="bold" color="gray.600">Gender:</Text>
                                <Text>{formData.gender}</Text>
                            </Box>
                            <Box>
                                <Text fontWeight="bold" color="gray.600">Grade:</Text>
                                <Text>{formData.grade}</Text>
                            </Box>
                            <Box>
                                <Text fontWeight="bold" color="gray.600">Parent Name:</Text>
                                <Text>{formData.parentName}</Text>
                            </Box>
                            <Box>
                                <Text fontWeight="bold" color="gray.600">Email:</Text>
                                <Text>{formData.parentEmail}</Text>
                            </Box>
                            <Box>
                                <Text fontWeight="bold" color="gray.600">Phone:</Text>
                                <Text>{formData.parentPhone}</Text>
                            </Box>
                            <Box>
                                <Text fontWeight="bold" color="gray.600">Address:</Text>
                                <Text>{formData.address}</Text>
                            </Box>
                        </SimpleGrid>
                        <Text fontSize="sm" color="gray.500">By submitting this form, you confirm that the information provided is accurate.</Text>
                    </VStack>
                );
            default:
                return null;
        }
    };

    return (
        <Box bg={bgColor} minH="100vh">
            <PublicHeader />

            <Container maxW="4xl" py={20}>
                <VStack spacing={10}>
                    <Box textAlign="center">
                        <Heading size="xl" mb={2} bgGradient="linear(to-r, teal.500, blue.500)" bgClip="text">Online Application</Heading>
                        <Text color="gray.600">Complete the form below to apply for admission.</Text>
                    </Box>

                    <Stepper index={activeStep} colorScheme="teal" w="full">
                        {steps.map((step, index) => (
                            <Step key={index}>
                                <StepIndicator>
                                    <StepStatus
                                        complete={<StepIcon />}
                                        incomplete={<StepNumber />}
                                        active={<StepNumber />}
                                    />
                                </StepIndicator>

                                <Box flexShrink='0' display={{ base: 'none', md: 'block' }}>
                                    <StepTitle>{step.title}</StepTitle>
                                    <StepDescription>{step.description}</StepDescription>
                                </Box>

                                <StepSeparator />
                            </Step>
                        ))}
                    </Stepper>

                    <MotionBox
                        key={activeStep}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.3 }}
                        w="full"
                        bg="white"
                        p={8}
                        rounded="xl"
                        shadow="lg"
                    >
                        {renderStepContent(activeStep)}
                    </MotionBox>

                    <HStack spacing={4} w="full" justify="flex-end">
                        <Button
                            isDisabled={activeStep === 0}
                            onClick={handleBack}
                            variant="ghost"
                            leftIcon={<Icon as={FiArrowLeft as any} />}
                        >
                            Back
                        </Button>
                        {activeStep === steps.length - 1 ? (
                            <Button
                                colorScheme="teal"
                                onClick={handleSubmit}
                                isLoading={isSubmitting}
                                loadingText="Submitting"
                                rightIcon={<Icon as={FiCheckCircle as any} />}
                            >
                                Submit Application
                            </Button>
                        ) : (
                            <Button
                                colorScheme="blue"
                                onClick={handleNext}
                                rightIcon={<Icon as={FiArrowRight as any} />}
                            >
                                Next
                            </Button>
                        )}
                    </HStack>
                </VStack>
            </Container>

            <PublicFooter />
        </Box>
    );
}
