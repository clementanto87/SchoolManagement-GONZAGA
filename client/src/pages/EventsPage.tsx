import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import AppLayout from '../components/Layout/AppLayout';

export default function EventsPage() {
    return (
        <AppLayout>
            <Box p={8}>
                <Heading>Events</Heading>
                <Text mt={4}>Upcoming school events will be listed here.</Text>
            </Box>
        </AppLayout>
    );
}
