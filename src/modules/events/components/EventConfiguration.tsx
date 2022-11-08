import { Box, Button, Flex } from '@chakra-ui/react';

import EventForm from 'modules/events/components/EventForm';
import TimelineEvent from 'modules/events/components/TimelineEvent';
import { GrowEvent } from 'modules/events/types';
import { useState } from 'react';

type EventConfigurationProps = {
    initialEvent: GrowEvent;
    isLoading: boolean;

    onSave: (event: GrowEvent) => void;
    onDelete: () => void;
};

const EventConfiguration: React.FC<EventConfigurationProps> = ({
    initialEvent,
    onDelete,
    onSave,
    isLoading,
}) => {
    const [isEditing, setEditing] = useState(false);
    const [event, setEvent] = useState(initialEvent);

    return (
        <>
            <Flex justifyContent="space-between">
                <Box maxW="xl">
                    <TimelineEvent event={event} />
                </Box>
                <Button onClick={() => setEditing(true)} isDisabled={isEditing}>
                    Edit
                </Button>
            </Flex>
            {isEditing && (
                <EventForm
                    onSubmit={(e) => {
                        setEditing(false);
                        onSave(e);
                    }}
                    onChange={(updated) =>
                        setEvent({
                            ...event,
                            ...updated,
                            id: initialEvent.id,
                        })
                    }
                    initialValue={initialEvent}
                    onDelete={onDelete}
                    onCancel={() => {
                        setEditing(false);
                        setEvent(initialEvent);
                    }}
                    isLoading={isLoading}
                />
            )}
        </>
    );
};

export default EventConfiguration;
