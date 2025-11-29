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
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Flex,
    Badge,
    useToast,
} from '@chakra-ui/react';
import {
    FiMapPin,
    FiPhone,
    FiMail,
    FiSend,
    FiClock,
} from 'react-icons/fi';
import PublicHeader from '../components/Layout/PublicHeader';
import PublicFooter from '../components/Layout/PublicFooter';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

const ContactCard = ({ title, content, icon, color, delay }: { title: string, content: React.ReactNode, icon: any, color: string, delay: number }) => (
    <MotionBox
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay }}
        bg="white"
        p={8}
        rounded="2xl"
        shadow="lg"
        textAlign="center"
        _hover={{ shadow: '2xl', transform: 'translateY(-5px)' }}
        position="relative"
        overflow="hidden"
    >
        <Box
            position="absolute"
            top="-20px"
            right="-20px"
            w="100px"
            h="100px"
            bg={`${color}.50`}
            rounded="full"
            opacity={0.5}
        />
        <Flex
            w={16}
            h={16}
            align="center"
            justify="center"
            bgGradient={`linear(to-br, ${color}.400, ${color}.600)`}
            color="white"
            rounded="2xl"
            mx="auto"
            mb={6}
            shadow="md"
        >
            <Icon as={icon as any} w={8} h={8} />
        </Flex>
        <Heading size="md" mb={4} color="gray.800">{title}</Heading>
        <Text fontSize="md" color="gray.600" lineHeight="relaxed">
            {content}
        </Text>
    </MotionBox>
);

export default function ContactPage() {
    const bgColor = useColorModeValue('gray.50', 'gray.900');
    const toast = useToast();
    const [isSubmitting, setIsSubmitting] = React.useState(false);
    const [formData, setFormData] = React.useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        try {
            const response = await fetch('http://localhost:5001/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (!response.ok) throw new Error('Failed to send message');

            toast({
                title: 'Message Sent!',
                description: "We've received your message and will get back to you soon.",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });

            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Failed to send message. Please try again.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Box bg={bgColor} minH="100vh" overflowX="hidden">
            <PublicHeader />

            {/* Hero Section */}
            <Box bg="blue.900" color="white" pt={32} pb={40} position="relative" overflow="hidden">
                <Box
                    position="absolute"
                    top="-20%"
                    left="-10%"
                    w="60%"
                    h="140%"
                    bgGradient="linear(to-br, blue.400, blue.900)"
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
                    bgGradient="linear(to-tl, cyan.500, blue.800)"
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
                                We're Here to Help
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
                            Get in <Text as="span" bgGradient="linear(to-r, cyan.400, blue.200)" bgClip="text">Touch</Text>
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
                            Have questions about admissions, academics, or campus life? Reach out to us, and we'll be happy to assist you.
                        </MotionText>
                    </VStack>
                </Container>
            </Box>

            <Container maxW="7xl" py={16} mt={-24} position="relative" zIndex={2}>
                {/* Contact Info Cards */}
                <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mb={16}>
                    <ContactCard
                        title="Visit Us"
                        content={
                            <>
                                G7RQ+JJ3, Kathanpallam, Krishnagiri,<br />
                                Palepalle, Tamil Nadu 635108
                            </>
                        }
                        icon={FiMapPin}
                        color="red"
                        delay={0}
                    />
                    <ContactCard
                        title="Call Us"
                        content={
                            <>
                                +91 12345 67890<br />
                                Mon-Sat, 9:00 AM - 4:00 PM
                            </>
                        }
                        icon={FiPhone}
                        color="green"
                        delay={0.1}
                    />
                    <ContactCard
                        title="Email Us"
                        content={
                            <>
                                info@gonzagaschool.com<br />
                                admissions@gonzagaschool.com
                            </>
                        }
                        icon={FiMail}
                        color="blue"
                        delay={0.2}
                    />
                </SimpleGrid>

                <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={10}>
                    {/* Contact Form */}
                    <MotionBox
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        bg="white"
                        rounded="3xl"
                        shadow="xl"
                        p={{ base: 8, md: 10 }}
                        position="relative"
                        overflow="hidden"
                    >
                        <Box
                            position="absolute"
                            top={0}
                            left={0}
                            w="full"
                            h="6px"
                            bgGradient="linear(to-r, blue.400, cyan.400)"
                        />
                        <Heading size="lg" mb={2} color="gray.800">Send us a Message</Heading>
                        <Text color="gray.500" mb={8}>Fill out the form below and we'll get back to you shortly.</Text>

                        <Stack spacing={6} as="form" onSubmit={(e) => { e.preventDefault(); handleSubmit(); }}>
                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6}>
                                <FormControl isRequired>
                                    <FormLabel fontWeight="bold" color="gray.700">Name</FormLabel>
                                    <Input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Your Name"
                                        focusBorderColor="blue.500"
                                        size="lg"
                                        bg="gray.50"
                                        border="none"
                                        _focus={{ bg: 'white', shadow: 'md' }}
                                    />
                                </FormControl>
                                <FormControl isRequired>
                                    <FormLabel fontWeight="bold" color="gray.700">Email</FormLabel>
                                    <Input
                                        name="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        type="email"
                                        placeholder="Your Email"
                                        focusBorderColor="blue.500"
                                        size="lg"
                                        bg="gray.50"
                                        border="none"
                                        _focus={{ bg: 'white', shadow: 'md' }}
                                    />
                                </FormControl>
                            </SimpleGrid>
                            <FormControl isRequired>
                                <FormLabel fontWeight="bold" color="gray.700">Subject</FormLabel>
                                <Input
                                    name="subject"
                                    value={formData.subject}
                                    onChange={handleInputChange}
                                    placeholder="How can we help?"
                                    focusBorderColor="blue.500"
                                    size="lg"
                                    bg="gray.50"
                                    border="none"
                                    _focus={{ bg: 'white', shadow: 'md' }}
                                />
                            </FormControl>
                            <FormControl isRequired>
                                <FormLabel fontWeight="bold" color="gray.700">Message</FormLabel>
                                <Textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Your Message..."
                                    rows={6}
                                    focusBorderColor="blue.500"
                                    size="lg"
                                    bg="gray.50"
                                    border="none"
                                    _focus={{ bg: 'white', shadow: 'md' }}
                                    resize="none"
                                />
                            </FormControl>
                            <Button
                                type="submit"
                                isLoading={isSubmitting}
                                loadingText="Sending..."
                                size="lg"
                                colorScheme="blue"
                                bgGradient="linear(to-r, blue.500, cyan.500)"
                                _hover={{ bgGradient: "linear(to-r, blue.600, cyan.600)", shadow: 'lg', transform: 'translateY(-2px)' }}
                                rightIcon={<Icon as={FiSend as any} />}
                                w="full"
                                rounded="xl"
                            >
                                Send Message
                            </Button>
                        </Stack>
                    </MotionBox>

                    {/* Map Placeholder */}
                    <MotionBox
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        bg="gray.200"
                        rounded="3xl"
                        shadow="xl"
                        overflow="hidden"
                        minH="500px"
                        position="relative"
                        border="4px solid"
                        borderColor="white"
                    >
                        <Box
                            as="iframe"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3896.316678765432!2d78.2234!3d12.5432!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bac174677777777%3A0x7777777777777777!2sGONZAGA%20MATRIC%20HIGHER%20SEC%20SCHOOL!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin"
                            width="100%"
                            height="100%"
                            style={{ border: 0, position: 'absolute', top: 0, left: 0 }}
                            allowFullScreen
                            loading="lazy"
                        />
                        <Box
                            position="absolute"
                            top={4}
                            right={4}
                            bg="white"
                            p={4}
                            rounded="xl"
                            shadow="lg"
                            maxW="200px"
                        >
                            <HStack mb={1}>
                                <Icon as={FiClock as any} color="orange.500" />
                                <Text fontWeight="bold" fontSize="sm">Office Hours</Text>
                            </HStack>
                            <Text fontSize="xs" color="gray.600">
                                Mon - Sat: 9:00 AM - 4:00 PM<br />
                                Sunday: Closed
                            </Text>
                        </Box>
                    </MotionBox>
                </SimpleGrid>
            </Container>

            <PublicFooter />
        </Box>
    );
}
