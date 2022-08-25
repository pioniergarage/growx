import { Button, VStack } from '@chakra-ui/react';
import { useRemoveTeamLogo, useUploadTeamLogo } from 'hooks/team';
import { Team } from 'model';
import FileSelect from '../FileSelect';
import TeamLogo from './TeamLogo';

export default function TeamLogoControl({ team }: { team: Team }) {
    const { uploadTeamLogo, isLoading: uploading } = useUploadTeamLogo();
    const { removeTeamLogo, isLoading: removing } = useRemoveTeamLogo();

    async function handleLogoUpload(files: FileList | null) {
        if (!files || files.length === 0) {
            throw new Error('You must select an image to upload.');
        }
        await uploadTeamLogo({ team, file: files[0] });
    }

    async function handleLogoRemove() {
        await removeTeamLogo({ team });
    }

    return (
        <VStack>
            <TeamLogo logo={team.logo} loading={uploading} />
            <FileSelect onSelect={handleLogoUpload}>
                <Button isLoading={uploading} size="xs" variant="outline">
                    Update Logo
                </Button>
            </FileSelect>
            <Button
                onClick={handleLogoRemove}
                isLoading={removing}
                size="xs"
                variant="outline"
            >
                Remove Logo
            </Button>
        </VStack>
    );
}
