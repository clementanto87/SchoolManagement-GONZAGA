import React from 'react';
import { Box, Heading, Text } from '@chakra-ui/react';
import AppLayout from '../components/Layout/AppLayout';

export default function AdminStudentsPage() {
    return (
        <AppLayout>
            <Box p={8}>
                <Heading>Manage Students</Heading>
                <Text mt={4}>Student management functionality coming soon.</Text>
            </Box>
        </AppLayout>
    );
}
