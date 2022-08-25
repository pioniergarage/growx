import {
    Box,
    BoxProps,
    Heading,
    Spinner,
    Table,
    TableContainer,
    Tbody,
    Td,
    Text,
    Th,
    Thead,
    Tr,
} from '@chakra-ui/react';

interface FullTableProps<T> extends BoxProps {
    values: T[];
    idProp: keyof T;
    heading: string;
    loading?: boolean;
}

export default function FullTableProps<T>({
    values,
    idProp,
    heading,
    loading = false,
    ...rest
}: FullTableProps<T>) {
    return (
        <Box>
            <Heading as="h3" size="md">
                {heading}
            </Heading>
            {loading ? (
                <Spinner my={4} />
            ) : (
                <Box overflow="scroll" {...rest}>
                    <TableContainer py={2}>
                        <Table size="sm">
                            {values.length > 0 ? (
                                <Thead>
                                    <Tr>
                                        {Object.keys(values[0]).map((p) => (
                                            <Th key={p}>{p}</Th>
                                        ))}
                                    </Tr>
                                </Thead>
                            ) : undefined}
                            <Tbody>
                                {values.map((value: T) => (
                                    <Tr key={String(value[idProp])}>
                                        {(
                                            Object.keys(values[0]) as Array<
                                                keyof T
                                            >
                                        ).map((p: keyof T) => (
                                            <Td key={String(p)}>
                                                {String(value[p])}
                                            </Td>
                                        ))}
                                    </Tr>
                                ))}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            )}
            <Text fontSize="sm" color="whiteAlpha.600">
                {!values ? 0 : values.length} values
            </Text>
        </Box>
    );
}
