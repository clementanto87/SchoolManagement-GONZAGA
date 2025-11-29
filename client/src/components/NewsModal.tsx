import React from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalCloseButton,
    ModalBody,
    ModalFooter,
    Box,
    Icon,
    VStack,
    Tag,
    Heading,
    Text,
    Flex,
    Button
} from '@chakra-ui/react';
import { FiAward } from 'react-icons/fi';

const NewsModal = ({ isOpen, onClose, news }: { isOpen: boolean; onClose: () => void; news: any }) => {
    if (!news) return null;
    return (
        <Modal isOpen={isOpen} onClose={onClose} size="2xl" isCentered scrollBehavior="inside">
            <ModalOverlay backdropFilter="blur(8px)" bg="blackAlpha.600" />
            <ModalContent rounded="2xl" overflow="hidden" shadow="2xl">
                <ModalHeader
                    bgGradient="linear(to-r, blue.600, purple.600)"
                    color="white"
                    py={8}
                    px={8}
                    position="relative"
                >
                    <Box position="absolute" top={0} right={0} opacity={0.1}>
                        <Icon as={FiAward as any} w={40} h={40} transform="rotate(15deg) translate(20px, -20px)" />
                    </Box>
                    <VStack align="start" spacing={3} position="relative" zIndex={1}>
                        <Tag size="md" variant="solid" colorScheme="whiteAlpha" rounded="full">
                            {new Date(news.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                        </Tag>
                        <Heading size="xl" lineHeight="tight">
                            {news.title}
                        </Heading>
                    </VStack>
                </ModalHeader>
                <ModalCloseButton color="white" size="lg" mt={2} mr={2} _hover={{ bg: 'whiteAlpha.200' }} />
                <ModalBody py={8} px={8}>
                    <Text fontSize="lg" lineHeight="1.8" color="gray.700" whiteSpace="pre-wrap" sx={{ columnCount: { base: 1, md: 1 }, columnGap: 8 }}>
                        {news.content || news.excerpt}
                    </Text>
                    {news.author && (
                        <Flex mt={8} align="center" borderTopWidth={1} borderColor="gray.100" pt={6}>
                            <Box w={10} h={10} rounded="full" bgGradient="linear(to-br, orange.400, red.500)" color="white" display="flex" alignItems="center" justifyContent="center" mr={3} fontSize="sm" fontWeight="bold" shadow="md">
                                {news.author.charAt(0).toUpperCase()}
                            </Box>
                            <Box>
                                <Text fontSize="sm" fontWeight="bold" color="gray.800">Posted by {news.author}</Text>
                                <Text fontSize="xs" color="gray.500">School Administrator</Text>
                            </Box>
                        </Flex>
                    )}
                </ModalBody>
                <ModalFooter bg="gray.50" py={4} px={8}>
                    <Button onClick={onClose} size="lg" w="full" colorScheme="gray">
                        Close Article
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default NewsModal;
