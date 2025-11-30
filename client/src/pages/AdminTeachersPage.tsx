import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import AppLayout from '../components/Layout/AppLayout';

export default function AdminTeachersPage() {
    return (
        <AppLayout>
            <Box p={8}>
                <Heading>Manage Teachers</Heading>
                <Text mt={4}>Teacher management functionality coming soon.</Text>
            </Box>
        </AppLayout>
    );
}
