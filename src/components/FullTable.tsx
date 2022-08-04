import {
    TableContainer,
    Table,
    Thead,
    Tr,
    Th,
    Tbody,
    Td,
    Spinner,
    Box,
    Heading,
    BoxProps,
    Text
} from '@chakra-ui/react';

export default function FullTable<T>({
    values,
    idProp,
    heading,
    ...rest
}: BoxProps & {
    values: T[];
    idProp: keyof T;
    heading: string;
}) {
    return (
        <Box>
            <Heading as="h3" size="md">
                {heading}
            </Heading>
            {!values || values.length === 0 ? (
                <Spinner my={4} />
            ) : (
                <Box overflow="scroll" {...rest}>
                    <TableContainer py={2}>
                        <Table size="sm">
                            <Thead>
                                <Tr>
                                    {Object.keys(values[0]).map((p) => (
                                        <Th key={p}>{p}</Th>
                                    ))}
                                </Tr>
                            </Thead>
                            <Tbody>
                                {values.map((value: T) => (
                                    <Tr key={String(value[idProp])}>
                                        {Object.keys(values[0]).map((p) => (
                                            <Td key={value[idProp] + p}>
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
            <Text fontSize='sm' color='whiteAlpha.600'>{!values ? 0: values.length} values</Text>
        </Box>
    );
}
