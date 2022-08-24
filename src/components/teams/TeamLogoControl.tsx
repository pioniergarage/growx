import { VStack, Button } from '@chakra-ui/react';
import { uploadTeamLogo, removeTeamLogo } from 'api/teams';
import { Team } from 'model';
import { useState } from 'react';
import FileSelect from '../FileSelect';
import TeamLogo from './TeamLogo';

export default function TeamLogoControl({ team }: { team: Team }) {
    const [loading, setLoading] = useState(false);
    const [logoOverwrite, setLogoOverwrite] = useState('');
    async function handleLogoUpload(files: FileList | null) {
        if (!files || files.length === 0) {
            throw new Error('You must select an image to upload.');
        }
        setLoading(true);
        const { logo } = await uploadTeamLogo(team, files[0]);
        setLogoOverwrite(logo || '');
        setLoading(false);
    }

    async function handleLogoRemove() {
        setLoading(true);
        await removeTeamLogo(team);
        setLogoOverwrite('');
        setLoading(false);
    }

    return (
        <VStack>
            <TeamLogo
                logo={logoOverwrite ? logoOverwrite : team.logo}
                loading={loading}
            />
            <FileSelect onSelect={handleLogoUpload}>
                <Button isLoading={loading} size="xs" variant="outline">
                    Update Logo
                </Button>
            </FileSelect>
            <Button
                onClick={handleLogoRemove}
                isLoading={loading}
                size="xs"
                variant="outline"
            >
                Remove Logo
            </Button>
        </VStack>
    );
}
